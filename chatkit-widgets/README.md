# Sterling Atkinson 2026 Widget Platform

A production-ready full-stack platform for building, testing, and deploying interactive Sterling Atkinson 2026 widgets with real-time updates, secure APIs, and dynamic content delivery.

## 🚀 Core Capabilities

- **Dynamic Widget Generation** - Generate widgets programmatically from structured data sources
- **Real-time Updates** - Socket.IO integration for live state synchronization and event delivery
- **Authentication & Security** - JWT-based authentication with role-aware access controls
- **Comprehensive Validation** - Structural, accessibility, and performance validation for widgets
- **Testing Suite** - Built-in tooling for behavior, interaction, and reliability testing
- **Pre-built Templates** - Reusable templates for common product and workflow scenarios
- **Performance Monitoring** - Profiling insights and optimization recommendations

## 📁 Project Structure

```
chatkit-widgets/
├── src/
│   ├── server.js              # Main Express server with Socket.IO
│   ├── widgets/
│   │   └── templates.js       # Pre-built widget templates
│   ├── utils/
│   │   ├── widgetBuilder.js   # Dynamic widget generation
│   │   ├── validation.js      # Widget and action validation
│   │   └── testing.js         # Testing utilities
│   └── middleware/
│       └── auth.js            # Authentication middleware
├── tests/                     # Test files
├── docs/                      # Documentation
├── examples/                  # Example implementations
└── package.json              # Dependencies and scripts
```

## 🛠 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access API Documentation**
   Open http://localhost:3000 for API endpoints and documentation

## 📊 API Endpoints

### Widget Endpoints
- `GET /api/widget/products` - Dynamic product list widget
- `GET /api/widget/contact-form` - Contact form widget  
- `GET /api/widget/cart` - Shopping cart widget
- `GET /api/widget/ableton-live-12-suite` - Ableton Live 12 Suite product widget
- `GET /api/widget/elevenlabs-agent?agentId=YOUR_AGENT_ID` - ElevenLabs conversational agent widget
- `GET /api/widget/tradingview/guide` - TradingView + ChatKit integration guide widget
- `GET /api/widget/tradingview/catalog` - TradingView widget directory catalog
- `GET /api/widget/tradingview/embed?widget=advanced-chart&symbol=NASDAQ:AAPL` - Raw TradingView embed metadata/code for host-page rendering
- `GET /api/widget/tradingview?widget=advanced-chart&symbol=NASDAQ:AAPL` - TradingView embed snippet widget

### Action Handlers
- `POST /api/widget-action` - Process widget interactions (clicks, forms, etc.)

### Data Endpoints
- `GET /api/products` - Get all products
- `GET /api/cart` - Get cart contents
- `GET /api/submissions` - Get form submissions (admin)

### Utility
- `GET /api/health` - Health check
- `GET /` - API documentation

## 🧩 Widget Templates

### Product Card
```javascript
const productWidget = widgetBuilder.generateProductListWidget(products);
```

### Contact Form
```javascript
const formWidget = widgetTemplates.contactForm;
```

### Shopping Cart
```javascript
const cartWidget = widgetBuilder.generateCartWidget(cartItems, products);
```

### Ableton Live 12 Suite
```javascript
const live12SuiteWidget = widgetTemplates.abletonLive12Suite;
```

### TradingView Embed Widget
```javascript
// TradingView widget payload (ChatKit-compatible)
const response = await fetch('/api/widget/tradingview?widget=advanced-chart&symbol=NASDAQ:AAPL');
const { widget } = await response.json();
```

### ElevenLabs Agent Widget
```javascript
// ElevenLabs widget payload (ChatKit-compatible)
const response = await fetch('/api/widget/elevenlabs-agent?agentId=YOUR_AGENT_ID');
const { widget } = await response.json();
```

## 🔐 Authentication

### JWT Token Generation
```javascript
const token = generateToken({ 
  id: userId, 
  role: 'user' 
});
```

### Protected Routes
```javascript
app.get('/api/admin/*', authenticateToken, requireRole('admin'), handler);
```

### API Key Authentication
```javascript
app.post('/api/widget-action', authenticateAPIKey, handler);
```

## 📡 Real-time Updates

### Client Connection
```javascript
const socket = io('http://localhost:3000');
socket.emit('join-room', 'default');

// Listen for updates
socket.on('cart-updated', (data) => {
  console.log('Cart updated:', data);
});

socket.on('product-viewed', (data) => {
  console.log('Product viewed:', data);
});
```

### Server Broadcasting
```javascript
// Broadcast to all clients in a room
io.to('default').emit('inventory-updated', { 
  productId: 'prod_1', 
  inStock: false 
});
```

## 🧪 Testing Widgets

### Basic Widget Testing
```javascript
const { testWidget } = require('./src/utils/testing');

const testResult = testWidget(myWidget, {
  maxSize: 50000 // 50KB limit
});

console.log('Test Results:', testResult);
```

### Performance Profiling
```javascript
const { profileWidget } = require('./src/utils/testing');

const profile = profileWidget(myWidget);
console.log('Performance:', profile.performance);
console.log('Recommendations:', profile.recommendations);
```

### Mock Action Testing
```javascript
const { createMockActionHandler } = require('./src/utils/testing');

const mockHandler = createMockActionHandler();
const result = mockHandler.handle({ 
  type: 'custom', 
  name: 'add_to_cart' 
});
```

## 📋 Widget Action Examples

### View Product Details
```json
{
  "type": "custom",
  "name": "view_product_details",
  "parameters": {
    "productId": "prod_1"
  }
}
```

### Add to Cart
```json
{
  "type": "custom", 
  "name": "add_to_cart",
  "parameters": {
    "productId": "prod_1"
  }
}
```

### Submit Contact Form
```json
{
  "type": "custom",
  "name": "submit_contact_form",
  "parameters": {},
  "formData": {
    "user_name": "John Doe",
    "email": "john@example.com", 
    "reason": "demo",
    "message": "Interested in your product"
  }
}
```

## 🔧 Configuration

### Environment Variables
```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# Security
JWT_SECRET=your-super-secret-jwt-key
VALID_API_KEYS=key1,key2,key3

# CORS
CORS_ORIGIN=http://localhost:3000

# ElevenLabs
ELEVENLABS_AGENT_ID=YOUR_AGENT_ID
```

### Rate Limiting
- **General**: 100 requests per 15 minutes per IP
- **Authenticated**: 500 requests per 15 minutes per user
- **API Key**: 1000 requests per 15 minutes per key

## 📈 Monitoring & Analytics

### Widget Performance Metrics
- JSON serialization time
- Element count and nesting depth
- Memory usage and size constraints
- Accessibility compliance

### Real-time Analytics
- Widget interaction tracking
- User engagement metrics
- Cart conversion rates
- Form submission analytics

## 🛡 Security Features

- **JWT Authentication** with role-based access
- **API Key validation** for server-to-server communication
- **Input sanitization** and XSS prevention
- **Rate limiting** per user/IP/API key
- **Security headers** (XSS, CSRF protection)
- **Action authorization** and audit logging

## 🎯 Best Practices

### Widget Design
1. Keep widgets under 50KB JSON size
2. Limit nesting depth to 10 levels
3. Include alt text for images
4. Use semantic action names
5. Implement proper error handling

### Performance
1. Use pagination for large lists
2. Optimize image sizes and formats
3. Cache frequently accessed widgets
4. Monitor real-time connection counts
5. Profile widgets before deployment

### Security
1. Validate all user inputs
2. Use HTTPS in production
3. Rotate JWT secrets regularly
4. Implement proper CORS policies
5. Log security events and anomalies

## 📚 Advanced Usage

### Custom Widget Types
```javascript
// Create custom widget generator
function generateCustomWidget(data, options) {
  return {
    type: "card",
    key: `custom-${data.id}`,
    children: [
      // Your custom widget structure
    ]
  };
}
```

### Real-time Widget Updates
```javascript
// Update widget state in real-time
function updateWidgetState(widgetId, newState) {
  io.emit('widget-updated', {
    widgetId,
    state: newState,
    timestamp: new Date()
  });
}
```

### Advanced Authentication
```javascript
// Custom authorization middleware
function authorizeWidgetAccess(widgetType) {
  return (req, res, next) => {
    if (!canAccessWidget(req.user, widgetType)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
}
```

## 📖 Additional Resources

- [Sterling Starter Repository](https://github.com/sterl27/openai-chatkit-starter-app)
- [Socket.IO Documentation](https://socket.io/docs/)
- [Express.js Guide](https://expressjs.com/guide/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Run tests: `npm test`
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Build confidently. Ship faster.**