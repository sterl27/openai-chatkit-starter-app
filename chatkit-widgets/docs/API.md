# ChatKit Widget API Reference

Complete API documentation for the ChatKit Widget Development Framework.

## Base URL

```
http://localhost:3000/api
```

## Authentication

The API supports multiple authentication methods:

### 1. JWT Authentication
Include JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### 2. API Key Authentication
Include API key in headers:
```
X-API-Key: <your-api-key>
```

## Endpoints

### Widget Endpoints

#### Get Product List Widget
```http
GET /widget/products
```

**Query Parameters:**
- `category` (optional) - Filter by product category
- `inStock` (optional) - Filter by stock status (true/false)

**Response:**
```json
{
  "success": true,
  "widget": {
    "type": "listView",
    "key": "product-list-dynamic",
    "children": [...]
  },
  "meta": {
    "total": 3,
    "timestamp": "2025-10-20T12:00:00Z"
  }
}
```

#### Get Contact Form Widget
```http
GET /widget/contact-form
```

**Response:**
```json
{
  "success": true,
  "widget": {
    "type": "card",
    "key": "contact-form-01",
    "children": [...]
  }
}
```

#### Get Shopping Cart Widget
```http
GET /widget/cart
```

**Response:**
```json
{
  "success": true,
  "widget": {
    "type": "card",
    "key": "shopping-cart-filled",
    "children": [...]
  },
  "meta": {
    "itemCount": 2,
    "timestamp": "2025-10-20T12:00:00Z"
  }
}
```

#### Get Ableton Live 12 Suite Widget
```http
GET /widget/ableton-live-12-suite
```

**Response:**
```json
{
  "success": true,
  "widget": {
    "type": "card",
    "key": "ableton-live-12-suite",
    "children": [...]
  },
  "meta": {
    "product": "Ableton Live 12 Suite",
    "timestamp": "2025-10-20T12:00:00Z"
  }
}
```

#### Get Analysis Widget
```http
GET /widget/analysis
```

**Response:**
```json
{
  "success": true,
  "widget": {
    "type": "card",
    "key": "analysis-widget",
    "children": [...]
  },
  "meta": {
    "product": "Analysis",
    "timestamp": "2025-10-20T12:00:00Z"
  }
}
```

#### Get ElevenLabs Agent Widget
```http
GET /widget/elevenlabs-agent?agentId=YOUR_AGENT_ID
```

**Query Parameters:**
- `agentId` (optional) - ElevenLabs agent ID. Falls back to `ELEVENLABS_AGENT_ID` env var.

**Response:**
```json
{
  "success": true,
  "widget": {
    "type": "card",
    "key": "elevenlabs-agent-widget",
    "children": [...]
  },
  "meta": {
    "provider": "ElevenLabs",
    "agentId": "YOUR_AGENT_ID",
    "timestamp": "2026-02-26T12:00:00Z"
  }
}
```

#### Get TradingView Integration Guide Widget
```http
GET /widget/tradingview/guide
```

**Response:**
```json
{
  "success": true,
  "widget": {
    "type": "card",
    "key": "tradingview-integration-guide",
    "children": [...]
  },
  "meta": {
    "provider": "TradingView",
    "timestamp": "2026-02-26T12:00:00Z"
  }
}
```

#### Get TradingView Widget Catalog
```http
GET /widget/tradingview/catalog
```

**Response:**
```json
{
  "success": true,
  "widget": {
    "type": "card",
    "key": "tradingview-widget-catalog",
    "children": [...]
  },
  "data": [
    {
      "key": "advanced-chart",
      "name": "Advanced Real-Time Chart",
      "category": "Charts",
      "format": "iframe",
      "docsUrl": "https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/"
    }
  ],
  "meta": {
    "provider": "TradingView",
    "total": 20,
    "timestamp": "2026-02-26T12:00:00Z"
  }
}
```

#### Get TradingView Embed Widget
```http
GET /widget/tradingview?widget=advanced-chart&symbol=NASDAQ:AAPL
```

**Query Parameters:**
- `widget` (optional) - TradingView widget key (default: `advanced-chart`)
- `symbol` (optional) - Symbol override for symbol-based widgets (example: `NASDAQ:AAPL`)

**Response:**
```json
{
  "success": true,
  "widget": {
    "type": "card",
    "key": "tradingview-advanced-chart",
    "children": [
      {
        "type": "markdown",
        "value": "```html ... TradingView embed code ... ```"
      }
    ]
  },
  "meta": {
    "provider": "TradingView",
    "widget": "advanced-chart",
    "category": "Charts",
    "format": "iframe",
    "symbol": "NASDAQ:AAPL",
    "timestamp": "2026-02-26T12:00:00Z"
  }
}
```

#### Get TradingView Raw Embed Metadata
```http
GET /widget/tradingview/embed?widget=advanced-chart&symbol=NASDAQ:AAPL
```

Use this endpoint when rendering TradingView widgets directly on a webpage (outside ChatKit JSON rendering).

**Query Parameters:**
- `widget` (optional) - TradingView widget key (default: `advanced-chart`)
- `symbol` (optional) - Symbol override for symbol-based widgets (example: `NASDAQ:AAPL`)

**Response:**
```json
{
  "success": true,
  "data": {
    "key": "advanced-chart",
    "name": "Advanced Real-Time Chart",
    "category": "Charts",
    "format": "iframe",
    "docsUrl": "https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/",
    "scriptUrl": "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js",
    "elementTag": null,
    "attributes": null,
    "config": {
      "symbol": "NASDAQ:AAPL",
      "interval": "D",
      "theme": "dark",
      "locale": "en",
      "autosize": true
    },
    "embedCode": "<!-- TradingView Widget ... -->"
  },
  "meta": {
    "provider": "TradingView",
    "symbol": "NASDAQ:AAPL",
    "timestamp": "2026-02-26T12:00:00Z"
  }
}
```

#### Get Audio Widget
```http
GET /widget/audio
```

**Response:**
```json
{
  "success": true,
  "widget": {
    "type": "card",
    "key": "audio-widget",
    "children": [...]
  },
  "meta": {
    "product": "Audio",
    "timestamp": "2025-10-20T12:00:00Z"
  }
}
```

**Resilient streaming example:**
```javascript
async function loadAudioWidget(updateWidget) {
  try {
    const response = await fetch('/api/widget/audio', {
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const payload = await response.json();
    const { success, widget, error } = payload || {};

    if (!success || !widget) {
      throw new Error(error || 'Audio widget payload was invalid');
    }

    // Initial render, then your audio pipeline can stream updates.
    updateWidget(widget);
    return widget;
  } catch (err) {
    console.error('Failed to load audio widget:', err);

    updateWidget({
      type: 'card',
      key: 'audio-widget-error',
      size: 'md',
      theme: 'light',
      background: '#fef2f2',
      padding: 'lg',
      radius: 'lg',
      children: [
        {
          type: 'title',
          value: 'Unable to load audio widget',
          size: 'lg',
          weight: 'bold',
          color: '#b91c1c'
        },
        {
          type: 'text',
          value: 'Check connectivity and retry.',
          size: 'sm',
          color: '#7f1d1d'
        }
      ]
    });

    return null;
  }
}
```

**Resilient client example:**
```javascript
async function loadAnalysisWidget(sterling) {
  try {
    const response = await fetch('/api/widget/analysis', {
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const payload = await response.json();
    const { success, widget, error } = payload || {};

    if (!success || !widget) {
      throw new Error(error || 'Analysis widget payload was invalid');
    }

    sterling.setOptions({
      widgets: { initial: [widget] }
    });

    return widget;
  } catch (err) {
    console.error('Failed to load analysis widget:', err);

    sterling.setOptions({
      widgets: {
        initial: [
          {
            type: 'card',
            key: 'analysis-widget-error',
            size: 'md',
            theme: 'light',
            background: '#fef2f2',
            padding: 'lg',
            radius: 'lg',
            children: [
              {
                type: 'title',
                value: 'Unable to load analysis',
                size: 'lg',
                weight: 'bold',
                color: '#b91c1c'
              },
              {
                type: 'text',
                value: 'Please try again in a moment.',
                size: 'sm',
                color: '#7f1d1d'
              }
            ]
          }
        ]
      }
    });

    return null;
  }
}
```

### Action Handler

#### Process Widget Action
```http
POST /widget-action
```

**Request Body:**
```json
{
  "action": {
    "type": "custom",
    "name": "add_to_cart",
    "parameters": {
      "productId": "prod_1"
    }
  },
  "itemId": "optional-item-id",
  "formData": {
    "user_name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Action processed successfully",
  "data": {
    "cartTotal": 2,
    "widget": {...}
  }
}
```

### Data Endpoints

#### Get All Products
```http
GET /products
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "prod_1",
      "name": "Ergo Chair 2",
      "price": "$499",
      "image": "https://...",
      "description": "Ergonomic office chair",
      "inStock": true,
      "category": "furniture"
    }
  ],
  "meta": {
    "total": 3
  }
}
```

#### Get Cart Contents
```http
GET /cart
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "productId": "prod_1",
      "quantity": 2,
      "product": {...}
    }
  ],
  "meta": {
    "itemCount": 1,
    "totalQuantity": 2
  }
}
```

#### Get Form Submissions
```http
GET /submissions
```

**Auth Required:** Yes (Admin role)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "sub_1634567890",
      "user_name": "John Doe",
      "email": "john@example.com",
      "reason": "demo",
      "message": "Interested in your product",
      "timestamp": "2025-10-20T12:00:00Z",
      "status": "pending"
    }
  ]
}
```

### Utility Endpoints

#### Health Check
```http
GET /health
```

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2025-10-20T12:00:00Z",
  "version": "1.0.0"
}
```

## Widget Action Types

### Supported Actions

#### `view_product_details`
View detailed information about a product.

**Parameters:**
- `productId` (string, required) - ID of the product to view

**Response Data:**
- `product` (object) - Product details
- `widget` (object) - Product detail widget JSON

#### `add_to_cart`
Add a product to the shopping cart.

**Parameters:**
- `productId` (string, required) - ID of the product to add

**Response Data:**
- `cartTotal` (number) - Total items in cart
- `widget` (object) - Updated cart widget JSON

#### `remove_from_cart`
Remove a product from the shopping cart.

**Parameters:**
- `productId` (string, required) - ID of the product to remove

**Response Data:**
- `cartTotal` (number) - Total items in cart
- `widget` (object) - Updated cart widget JSON

#### `submit_contact_form`
Submit a contact form with user information.

**Form Data:**
- `user_name` (string, required) - User's full name
- `email` (string, required) - User's email address
- `reason` (string, required) - Reason for contact
- `message` (string, optional) - Additional message

**Response Data:**
- `submissionId` (string) - Unique submission ID
- `widget` (object) - Success message widget JSON

#### `update_inventory`
Update product inventory status (Admin only).

**Parameters:**
- `productId` (string, required) - ID of the product to update
- `inStock` (boolean, required) - New stock status

**Response Data:**
- `product` (object) - Updated product information

## Real-time Events

The API supports real-time updates via Socket.IO connections.

### Connection
```javascript
const socket = io('http://localhost:3000');
socket.emit('join-room', 'default');
```

### Events

#### `cart-updated`
Triggered when cart contents change.

**Payload:**
```json
{
  "cart": [...],
  "total": 3
}
```

#### `product-viewed`
Triggered when a product is viewed.

**Payload:**
```json
{
  "productId": "prod_1",
  "timestamp": "2025-10-20T12:00:00Z"
}
```

#### `inventory-updated`
Triggered when product inventory changes.

**Payload:**
```json
{
  "productId": "prod_1",
  "inStock": false
}
```

#### `form-submitted`
Triggered when a form is submitted.

**Payload:**
```json
{
  "id": "sub_1634567890",
  "user_name": "John Doe",
  "email": "john@example.com",
  "timestamp": "2025-10-20T12:00:00Z"
}
```

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details (dev mode only)"
}
```

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid auth)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `429` - Rate Limited
- `500` - Internal Server Error

### Common Error Scenarios

#### Invalid Widget Action
```json
{
  "success": false,
  "error": "Invalid action structure"
}
```

#### Product Not Found
```json
{
  "success": false,
  "error": "Product not found"
}
```

#### Out of Stock
```json
{
  "success": false,
  "error": "Product is out of stock"
}
```

#### Rate Limit Exceeded
```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "resetTime": 1634567890000
}
```

## Rate Limits

### Default Limits
- **General API**: 100 requests per 15 minutes per IP
- **Authenticated Users**: 500 requests per 15 minutes per user
- **API Keys**: 1000 requests per 15 minutes per key

### Headers
Rate limit information is included in response headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 85
X-RateLimit-Reset: 1634567890
```

## SDK Examples

### JavaScript/Node.js
```javascript
const axios = require('axios');

const client = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Authorization': 'Bearer your-jwt-token'
  }
});

// Get products widget
const response = await client.get('/widget/products');
console.log(response.data.widget);

// Handle widget action
await client.post('/widget-action', {
  action: {
    type: 'custom',
    name: 'add_to_cart',
    parameters: { productId: 'prod_1' }
  }
});
```

### Python
```python
import requests

class ChatKitClient:
    def __init__(self, base_url, token=None):
        self.base_url = base_url
        self.headers = {}
        if token:
            self.headers['Authorization'] = f'Bearer {token}'
    
    def get_widget(self, widget_type, **params):
        response = requests.get(
            f'{self.base_url}/widget/{widget_type}',
            headers=self.headers,
            params=params
        )
        return response.json()
    
    def handle_action(self, action, **kwargs):
        response = requests.post(
            f'{self.base_url}/widget-action',
            headers=self.headers,
            json={'action': action, **kwargs}
        )
        return response.json()

# Usage
client = ChatKitClient('http://localhost:3000/api', 'your-jwt-token')
widget = client.get_widget('products', category='furniture')
```

## Testing

### Widget Testing Endpoint
```http
POST /test/widget
```

**Request Body:**
```json
{
  "widget": {
    "type": "card",
    "children": [...]
  },
  "options": {
    "maxSize": 50000,
    "validateAccessibility": true
  }
}
```

**Response:**
```json
{
  "structure": {
    "passed": 5,
    "failed": 0,
    "warnings": 1,
    "success": true
  },
  "interactions": {
    "total": 3,
    "hasInteractions": true
  },
  "recommendations": [
    {
      "type": "warning",
      "message": "Consider adding alt text to images"
    }
  ]
}
```

---

For more examples and detailed guides, see the [main documentation](./README.md).