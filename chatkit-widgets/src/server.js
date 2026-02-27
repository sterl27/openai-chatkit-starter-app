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

// Get analysis widget
app.get('/api/widget/analysis', (req, res) => {
  try {
    const widget = widgetTemplates.analysisWidget;
    res.json({
      success: true,
      widget,
      meta: {
        product: 'Analysis',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error generating analysis widget:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate analysis widget'
    });
  }
});

// Get lyrics widget
app.get('/api/widget/lyrics', (req, res) => {
  try {
    const widget = widgetTemplates.lyricsWidget;
    res.json({
      success: true,
      widget,
      meta: {
        product: 'Lyrics',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error generating lyrics widget:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate lyrics widget'
    });
  }
});

// Get audio widget
app.get('/api/widget/audio', (req, res) => {
  try {
    const widget = widgetTemplates.audioWidget;
    res.json({
      success: true,
      widget,
      meta: {
        product: 'Audio',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error generating audio widget:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate audio widget'
    });
  }
});

// Get YouTube themes widget
app.get('/api/widget/youtube-themes', (req, res) => {
  try {
    const widget = widgetTemplates.youtubeThemesWidget;
    res.json({
      success: true,
      widget,
      meta: {
        product: 'YouTube Themes',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error generating YouTube themes widget:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate YouTube themes widget'
    });
  }
});

// Get ElevenLabs agent widget
app.get('/api/widget/elevenlabs-agent', (req, res) => {
  try {
    const { agentId } = req.query;
    const resolvedAgentId = agentId || process.env.ELEVENLABS_AGENT_ID || 'YOUR_AGENT_ID';
    const widget = widgetTemplates.generateElevenLabsAgentWidget(resolvedAgentId);

    res.json({
      success: true,
      widget,
      meta: {
        provider: 'ElevenLabs',
        agentId: resolvedAgentId,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error generating ElevenLabs agent widget:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate ElevenLabs agent widget'
    });
  }
});

// Get TradingView integration guide widget
app.get('/api/widget/tradingview/guide', (req, res) => {
  try {
    const widget = widgetTemplates.tradingViewIntegrationGuide;
    res.json({
      success: true,
      widget,
      meta: {
        provider: 'TradingView',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error generating TradingView guide widget:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate TradingView guide widget'
    });
  }
});

// Get TradingView widget catalog
app.get('/api/widget/tradingview/catalog', (req, res) => {
  try {
    const widget = widgetTemplates.tradingViewWidgetCatalog;
    res.json({
      success: true,
      widget,
      data: widgetTemplates.tradingViewWidgetDirectory,
      meta: {
        provider: 'TradingView',
        total: widgetTemplates.tradingViewWidgetDirectory.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error generating TradingView catalog widget:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate TradingView catalog widget'
    });
  }
});

// Get TradingView raw embed metadata/code for host-page rendering
app.get('/api/widget/tradingview/embed', (req, res) => {
  try {
    const { widget: widgetKey = 'advanced-chart', symbol, size = 'medium' } = req.query;
    const selectedWidget = widgetTemplates.getTradingViewWidgetByKey(widgetKey)
      || widgetTemplates.getTradingViewWidgetByKey('advanced-chart');

    const config = {
      ...(selectedWidget.defaultConfig || {})
    };

    const sizePresets = {
      small: { width: 360, height: 280 },
      medium: { width: 550, height: 400 },
      large: { width: 980, height: 610 }
    };
    const resolvedSize = sizePresets[size] ? size : 'medium';
    const sizeConfig = sizePresets[resolvedSize];

    if (symbol && selectedWidget.format === 'iframe') {
      config.symbol = symbol;
    }

    if (selectedWidget.format === 'iframe' && sizeConfig) {
      if (config.autosize) {
        config.autosize = false;
      }
      config.width = sizeConfig.width;
      config.height = sizeConfig.height;
    }

    const attributes = {
      ...(selectedWidget.defaultAttributes || {})
    };

    if (symbol && selectedWidget.format === 'web-component') {
      attributes.symbol = symbol;
    }

    const embedCode = widgetTemplates.buildTradingViewEmbedCode(selectedWidget, {
      symbol,
      config,
      attributes
    });

    res.json({
      success: true,
      data: {
        key: selectedWidget.key,
        name: selectedWidget.name,
        category: selectedWidget.category,
        format: selectedWidget.format,
        docsUrl: selectedWidget.docsUrl,
        scriptUrl: selectedWidget.scriptUrl,
        elementTag: selectedWidget.elementTag || null,
        attributes: selectedWidget.format === 'web-component' ? attributes : null,
        config: selectedWidget.format === 'iframe' ? config : null,
        embedCode
      },
      meta: {
        provider: 'TradingView',
        size: resolvedSize,
        symbol: symbol || null,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error generating TradingView embed metadata:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate TradingView embed metadata',
      details: error.message
    });
  }
});

// Get a specific TradingView embed widget
app.get('/api/widget/tradingview', (req, res) => {
  try {
    const { widget: widgetKey = 'advanced-chart', symbol } = req.query;

    const selectedWidget = widgetTemplates.tradingViewWidgetDirectory.find(
      entry => entry.key === widgetKey
    );

    const widget = widgetTemplates.generateTradingViewEmbedWidget(widgetKey, {
      symbol
    });

    res.json({
      success: true,
      widget,
      meta: {
        provider: 'TradingView',
        widget: selectedWidget ? selectedWidget.key : 'advanced-chart',
        category: selectedWidget ? selectedWidget.category : 'Charts',
        format: selectedWidget ? selectedWidget.format : 'iframe',
        symbol: symbol || 'NASDAQ:AAPL',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error generating TradingView widget:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate TradingView widget',
      details: error.message
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
    message: 'Sterling Atkinson 2026 Widget Server',
    version: '1.0.0',
    endpoints: {
      widgets: {
        'GET /api/widget/products': 'Get dynamic product list widget',
        'GET /api/widget/contact-form': 'Get contact form widget',
        'GET /api/widget/cart': 'Get shopping cart widget',
        'GET /api/widget/ableton-live-12-suite': 'Get Ableton Live 12 Suite widget',
        'GET /api/widget/analysis': 'Get analysis widget',
        'GET /api/widget/lyrics': 'Get lyrics widget',
        'GET /api/widget/audio': 'Get audio intelligence widget',
        'GET /api/widget/youtube-themes': 'Get YouTube themes widget',
        'GET /api/widget/elevenlabs-agent?agentId=<id>': 'Get ElevenLabs Conversational AI widget',
        'GET /api/widget/tradingview/guide': 'Get TradingView + ChatKit integration guide widget',
        'GET /api/widget/tradingview/catalog': 'Get TradingView widget directory catalog',
        'GET /api/widget/tradingview/embed?widget=<key>&symbol=<symbol>': 'Get TradingView raw embed metadata/code',
        'GET /api/widget/tradingview?widget=<key>&symbol=<symbol>': 'Get TradingView embed snippet widget'
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
  console.log(`🚀 Sterling Atkinson 2026 Widget Server running on http://localhost:${PORT}`);
  console.log(`📊 Socket.IO enabled for real-time updates`);
  console.log(`📚 API documentation available at http://localhost:${PORT}`);
});

module.exports = { app, server, io };