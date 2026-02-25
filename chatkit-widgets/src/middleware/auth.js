/**
 * Authentication Middleware
 * JWT-based authentication for widget endpoints
 */

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

/**
 * Generate JWT token for authenticated users
 */
function generateToken(payload, expiresIn = '24h') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Verify JWT token
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Authentication middleware for protected routes
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required'
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
}

/**
 * Optional authentication middleware - doesn't block unauthenticated requests
 */
function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
    } catch (error) {
      // Token exists but is invalid - continue without user
      req.user = null;
    }
  } else {
    req.user = null;
  }
  
  next();
}

/**
 * Role-based authorization middleware
 */
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    if (req.user.role !== role && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: `Access denied. Required role: ${role}`
      });
    }

    next();
  };
}

/**
 * Rate limiting by user
 */
function createUserRateLimit(windowMs = 15 * 60 * 1000, maxRequests = 100) {
  const userRequests = new Map();

  return (req, res, next) => {
    const userId = req.user?.id || req.ip;
    const now = Date.now();
    
    if (!userRequests.has(userId)) {
      userRequests.set(userId, { requests: 1, windowStart: now });
      return next();
    }

    const userData = userRequests.get(userId);
    
    // Reset window if expired
    if (now - userData.windowStart > windowMs) {
      userRequests.set(userId, { requests: 1, windowStart: now });
      return next();
    }

    // Check if user exceeded limit
    if (userData.requests >= maxRequests) {
      return res.status(429).json({
        success: false,
        error: 'Rate limit exceeded',
        resetTime: userData.windowStart + windowMs
      });
    }

    userData.requests++;
    next();
  };
}

/**
 * API key authentication for server-to-server communication
 */
function authenticateAPIKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: 'API key required'
    });
  }

  // In production, validate against your API key store
  const validAPIKeys = process.env.VALID_API_KEYS ? 
    process.env.VALID_API_KEYS.split(',') : 
    ['demo-api-key-12345'];

  if (!validAPIKeys.includes(apiKey)) {
    return res.status(403).json({
      success: false,
      error: 'Invalid API key'
    });
  }

  req.apiAuthenticated = true;
  next();
}

/**
 * Widget action authorization - ensure users can only perform actions on their own resources
 */
function authorizeWidgetAction(req, res, next) {
  const { action, itemId } = req.body;
  
  // For demo purposes, allow all actions
  // In production, implement proper authorization logic
  if (process.env.NODE_ENV === 'production' && req.user) {
    // Example authorization logic:
    // - Check if user owns the resource
    // - Validate action permissions
    // - Log security events
    
    console.log(`User ${req.user.id} performing action ${action?.name} on item ${itemId}`);
  }

  next();
}

/**
 * Security headers middleware
 */
function securityHeaders(req, res, next) {
  // Prevent XSS attacks
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Enforce HTTPS in production
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  next();
}

/**
 * Input validation middleware for widget actions
 */
function validateWidgetInput(req, res, next) {
  const { action, formData } = req.body;
  
  // Sanitize action name
  if (action && action.name) {
    action.name = action.name.replace(/[^a-zA-Z0-9_-]/g, '');
  }
  
  // Sanitize form data
  if (formData && typeof formData === 'object') {
    for (const [key, value] of Object.entries(formData)) {
      if (typeof value === 'string') {
        // Basic XSS prevention
        formData[key] = value
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;')
          .trim();
      }
    }
  }
  
  next();
}

module.exports = {
  generateToken,
  verifyToken,
  authenticateToken,
  optionalAuth,
  requireRole,
  createUserRateLimit,
  authenticateAPIKey,
  authorizeWidgetAction,
  securityHeaders,
  validateWidgetInput
};