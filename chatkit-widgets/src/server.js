const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

// Import custom modules
const widgetTemplates = require('./widgets/templates');
const widgetBuilder = require('./utils/widgetBuilder');
const authMiddleware = require('./middleware/auth');
const { validateWidget, validateAction } = require('./utils/validation');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Sample data (in production, this would come from a database)
let products = [
  {
    id: 'prod_1',
    name: 'Ergo Chair 2',
    price: '$499',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    description: 'Ergonomic and stylish office chair',
    inStock: true,
    category: 'furniture'
  },
  {
    id: 'prod_2',
    name: 'Standing Desk Pro',
    price: '$899',
    image: 'https://images.unsplash.com/photo-1595515106969-c9d1c8e5d640?w=400',
    description: 'Electric adjustable standing desk',
    inStock: false,
    category: 'furniture'
  },
  {
    id: 'prod_3',
    name: 'Wireless Headphones',
    price: '$299',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    description: 'High-fidelity, noise-canceling headphones',
    inStock: true,
    category: 'electronics'
  }
];

let cart = [];
let formSubmissions = [];

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Utility function to broadcast real-time updates
function broadcastUpdate(event, data, roomId = 'default') {
  io.to(roomId).emit(event, data);
}

// === WIDGET API ENDPOINTS ===

// Get dynamic product list widget
app.get('/api/widget/products', (req, res) => {
  try {
    const { category, inStock } = req.query;
    
    let filteredProducts = products;
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    if (inStock !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.inStock === (inStock === 'true'));
    }

    const widget = widgetBuilder.generateProductListWidget(filteredProducts);
    
    res.json({
      success: true,
      widget,
      meta: {
        total: filteredProducts.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error generating product widget:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate product widget',
      details: error.message 
    });
  }
});

// Get contact form widget
app.get('/api/widget/contact-form', (req, res) => {
  try {
    const widget = widgetTemplates.contactForm;
    res.json({
      success: true,
      widget,
      meta: {
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error generating contact form widget:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate contact form widget' 
    });
  }
});

// Get shopping cart widget
app.get('/api/widget/cart', (req, res) => {
  try {
    const widget = widgetBuilder.generateCartWidget(cart, products);
    res.json({
      success: true,
      widget,
      meta: {
        itemCount: cart.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error generating cart widget:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate cart widget' 
    });
  }
});

// Get Ableton Live 12 Suite widget
app.get('/api/widget/ableton-live-12-suite', (req, res) => {
  try {
    const widget = widgetTemplates.abletonLive12Suite;
    res.json({
      success: true,
      widget,
      meta: {
        product: 'Ableton Live 12 Suite',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error generating Ableton Live 12 Suite widget:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate Ableton Live 12 Suite widget'
    });
  }
});

// === WIDGET ACTION HANDLER ===
app.post('/api/widget-action', async (req, res) => {
  try {
    const { action, itemId, formData } = req.body;
    
    // Validate action structure
    if (!validateAction(action)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid action structure'
      });
    }

    console.log(`Processing action: ${action.name}`, { itemId, formData });

    let response = { success: true, message: 'Action processed successfully' };

    switch (action.name) {
      case 'view_product_details':
        const productId = action.parameters?.productId || itemId;
        const product = products.find(p => p.id === productId);
        
        if (!product) {
          return res.status(404).json({
            success: false,
            error: 'Product not found'
          });
        }

        response = {
          success: true,
          message: 'Product details retrieved',
          data: {
            product,
            widget: widgetBuilder.generateProductDetailWidget(product)
          }
        };
        
        // Broadcast real-time update
        broadcastUpdate('product-viewed', { productId, timestamp: new Date() });
        break;

      case 'add_to_cart':
        const addProductId = action.parameters?.productId;
        const addProduct = products.find(p => p.id === addProductId);
        
        if (!addProduct) {
          return res.status(404).json({
            success: false,
            error: 'Product not found'
          });
        }

        if (!addProduct.inStock) {
          return res.status(400).json({
            success: false,
            error: 'Product is out of stock'
          });
        }

        // Add to cart
        const existingItem = cart.find(item => item.productId === addProductId);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({ productId: addProductId, quantity: 1 });
        }

        response = {
          success: true,
          message: `${addProduct.name} added to cart`,
          data: {
            cartTotal: cart.length,
            widget: widgetBuilder.generateCartWidget(cart, products)
          }
        };

        // Broadcast real-time cart update
        broadcastUpdate('cart-updated', { 
          cart, 
          total: cart.reduce((sum, item) => sum + item.quantity, 0) 
        });
        break;

      case 'remove_from_cart':
        const removeProductId = action.parameters?.productId;
        cart = cart.filter(item => item.productId !== removeProductId);
        
        response = {
          success: true,
          message: 'Item removed from cart',
          data: {
            cartTotal: cart.length,
            widget: widgetBuilder.generateCartWidget(cart, products)
          }
        };

        broadcastUpdate('cart-updated', { cart });
        break;

      case 'submit_contact_form':
        if (!formData) {
          return res.status(400).json({
            success: false,
            error: 'Form data is required'
          });
        }

        // Validate required fields
        if (!formData.user_name || !formData.reason) {
          return res.status(400).json({
            success: false,
            error: 'Name and reason are required fields'
          });
        }

        // Store form submission
        const submission = {
          id: `sub_${Date.now()}`,
          ...formData,
          timestamp: new Date().toISOString(),
          status: 'pending'
        };
        
        formSubmissions.push(submission);

        response = {
          success: true,
          message: 'Contact form submitted successfully',
          data: {
            submissionId: submission.id,
            widget: widgetTemplates.successMessage
          }
        };

        // Broadcast new form submission
        broadcastUpdate('form-submitted', submission);
        break;

      case 'update_inventory':
        const updateProductId = action.parameters?.productId;
        const inStock = action.parameters?.inStock;
        
        const updateProduct = products.find(p => p.id === updateProductId);
        if (updateProduct) {
          updateProduct.inStock = inStock;
          
          response = {
            success: true,
            message: 'Inventory updated',
            data: { product: updateProduct }
          };

          broadcastUpdate('inventory-updated', { 
            productId: updateProductId, 
            inStock 
          });
        }
        break;

      default:
        console.warn('Unknown action received:', action.name);
        response = {
          success: false,
          error: `Unknown action: ${action.name}`
        };
    }

    res.json(response);

  } catch (error) {
    console.error('Error processing widget action:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// === ADDITIONAL API ENDPOINTS ===

// Get all products (for admin/debugging)
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    data: products,
    meta: { total: products.length }
  });
});

// Get cart contents
app.get('/api/cart', (req, res) => {
  const cartWithDetails = cart.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)
  }));

  res.json({
    success: true,
    data: cartWithDetails,
    meta: { 
      itemCount: cart.length,
      totalQuantity: cart.reduce((sum, item) => sum + item.quantity, 0)
    }
  });
});

// Get form submissions (for admin)
app.get('/api/submissions', (req, res) => {
  res.json({
    success: true,
    data: formSubmissions,
    meta: { total: formSubmissions.length }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Root endpoint with API documentation
app.get('/', (req, res) => {
  res.json({
    message: 'ChatKit Widget Server',
    version: '1.0.0',
    endpoints: {
      widgets: {
        'GET /api/widget/products': 'Get dynamic product list widget',
        'GET /api/widget/contact-form': 'Get contact form widget',
        'GET /api/widget/cart': 'Get shopping cart widget',
        'GET /api/widget/ableton-live-12-suite': 'Get Ableton Live 12 Suite widget'
      },
      actions: {
        'POST /api/widget-action': 'Handle widget actions (clicks, form submissions, etc.)'
      },
      data: {
        'GET /api/products': 'Get all products',
        'GET /api/cart': 'Get cart contents',
        'GET /api/submissions': 'Get form submissions'
      },
      utility: {
        'GET /api/health': 'Health check',
        'GET /': 'This documentation'
      }
    },
    documentation: 'See /docs for detailed API documentation'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 ChatKit Widget Server running on http://localhost:${PORT}`);
  console.log(`📊 Socket.IO enabled for real-time updates`);
  console.log(`📚 API documentation available at http://localhost:${PORT}`);
});

module.exports = { app, server, io };