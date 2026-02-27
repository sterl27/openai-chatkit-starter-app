/**
 * Basic Widget Tests
 * Test suite for widget functionality and validation
 */

const { testWidget, createMockActionHandler, profileWidget } = require('../src/utils/testing');
const widgetTemplates = require('../src/widgets/templates');
const widgetBuilder = require('../src/utils/widgetBuilder');

describe('Widget Templates', () => {
  test('Contact form widget should be valid', () => {
    const result = testWidget(widgetTemplates.contactForm);
    expect(result.success).toBe(true);
    expect(result.failed).toBe(0);
  });

  test('Product card widget should be valid', () => {
    const result = testWidget(widgetTemplates.productCard);
    expect(result.success).toBe(true);
    expect(result.failed).toBe(0);
  });

  test('Shopping cart widget should be valid', () => {
    const result = testWidget(widgetTemplates.shoppingCart);
    expect(result.success).toBe(true);
    expect(result.failed).toBe(0);
  });

  test('Success message widget should be valid', () => {
    const result = testWidget(widgetTemplates.successMessage);
    expect(result.success).toBe(true);
    expect(result.failed).toBe(0);
  });

  test('Ableton Live 12 Suite widget should be valid', () => {
    const result = testWidget(widgetTemplates.abletonLive12Suite);
    expect(result.success).toBe(true);
    expect(result.failed).toBe(0);
  });

  test('TradingView integration guide widget should be valid', () => {
    const result = testWidget(widgetTemplates.tradingViewIntegrationGuide);
    expect(result.success).toBe(true);
    expect(result.failed).toBe(0);
  });

  test('TradingView catalog widget should be valid', () => {
    const result = testWidget(widgetTemplates.tradingViewWidgetCatalog);
    expect(result.success).toBe(true);
    expect(result.failed).toBe(0);
  });
});

describe('Widget Builder', () => {
  const sampleProducts = [
    {
      id: 'test_1',
      name: 'Test Product',
      price: '$99',
      image: 'https://example.com/image.jpg',
      description: 'Test description',
      inStock: true,
      category: 'test'
    }
  ];

  test('Should generate valid product list widget', () => {
    const widget = widgetBuilder.generateProductListWidget(sampleProducts);
    const result = testWidget(widget);
    
    expect(result.success).toBe(true);
    expect(widget.type).toBe('listView');
    expect(widget.children).toHaveLength(1);
  });

  test('Should generate empty state for no products', () => {
    const widget = widgetBuilder.generateProductListWidget([]);
    const result = testWidget(widget);
    
    expect(result.success).toBe(true);
    expect(widget.type).toBe('card');
  });

  test('Should generate valid product detail widget', () => {
    const widget = widgetBuilder.generateProductDetailWidget(sampleProducts[0]);
    const result = testWidget(widget);
    
    expect(result.success).toBe(true);
    expect(widget.type).toBe('card');
  });

  test('Should generate valid cart widget', () => {
    const cartItems = [
      { productId: 'test_1', quantity: 2 }
    ];
    const widget = widgetBuilder.generateCartWidget(cartItems, sampleProducts);
    const result = testWidget(widget);
    
    expect(result.success).toBe(true);
    expect(widget.type).toBe('card');
  });

  test('Should generate empty cart widget', () => {
    const widget = widgetBuilder.generateCartWidget([], sampleProducts);
    const result = testWidget(widget);
    
    expect(result.success).toBe(true);
    expect(widget.type).toBe('card');
  });

  test('Should generate TradingView embed widget', () => {
    const widget = widgetTemplates.generateTradingViewEmbedWidget('advanced-chart', {
      symbol: 'NASDAQ:MSFT'
    });
    const result = testWidget(widget);

    expect(result.success).toBe(true);
    expect(widget.key).toContain('tradingview');
  });
});

describe('Mock Action Handler', () => {
  test('Should handle actions correctly', () => {
    const mockHandler = createMockActionHandler();
    
    const action = {
      type: 'custom',
      name: 'test_action',
      parameters: { testParam: 'value' }
    };
    
    const result = mockHandler.handle(action);
    
    expect(result.success).toBe(true);
    expect(result.message).toContain('test_action');
    
    const handledActions = mockHandler.getHandledActions();
    expect(handledActions).toHaveLength(1);
    expect(handledActions[0].action).toBe(action);
  });

  test('Should reset handled actions', () => {
    const mockHandler = createMockActionHandler();
    
    mockHandler.handle({ type: 'custom', name: 'test' });
    expect(mockHandler.getHandledActions()).toHaveLength(1);
    
    mockHandler.reset();
    expect(mockHandler.getHandledActions()).toHaveLength(0);
  });
});

describe('Widget Performance', () => {
  test('Should profile widget performance', () => {
    const widget = widgetTemplates.contactForm;
    const profile = profileWidget(widget);
    
    expect(profile.performance).toBeDefined();
    expect(profile.performance.totalProcessingTime).toBeGreaterThan(0);
    expect(profile.performance.jsonSize).toBeGreaterThan(0);
    expect(profile.performance.elementCount).toBeGreaterThan(0);
    
    expect(profile.metrics).toBeDefined();
    expect(profile.recommendations).toBeDefined();
  });

  test('Should warn about large widgets', () => {
    // Create a large widget for testing
    const largeWidget = {
      type: 'card',
      children: Array(200).fill({
        type: 'text',
        value: 'This is a test text element to create a large widget for performance testing purposes.'
      })
    };
    
    const profile = profileWidget(largeWidget);
    
    expect(profile.recommendations.warnings.length).toBeGreaterThan(0);
    expect(profile.recommendations.warnings.some(w => 
      w.includes('Element count exceeds')
    )).toBe(true);
  });
});

describe('Widget Accessibility', () => {
  test('Should pass accessibility checks for well-formed widgets', () => {
    const accessibleWidget = {
      type: 'card',
      children: [
        {
          type: 'image',
          src: 'https://example.com/image.jpg',
          alt: 'Descriptive alt text'
        },
        {
          type: 'button',
          label: 'Click me',
          onClickAction: {
            type: 'custom',
            name: 'test_action'
          }
        },
        {
          type: 'text',
          editable: {
            name: 'test_input',
            placeholder: 'Enter text here'
          }
        }
      ]
    };

    const result = testWidget(accessibleWidget);
    expect(result.warnings).toBe(0);
  });

  test('Should warn about accessibility issues', () => {
    const inaccessibleWidget = {
      type: 'card',
      children: [
        {
          type: 'image',
          src: 'https://example.com/image.jpg'
          // Missing alt text
        },
        {
          type: 'button'
          // Missing label
        },
        {
          type: 'text',
          editable: {
            name: 'test_input'
            // Missing placeholder
          }
        }
      ]
    };

    const result = testWidget(inaccessibleWidget);
    expect(result.warnings).toBeGreaterThan(0);
  });
});

describe('Widget Validation Edge Cases', () => {
  test('Should handle invalid widget structure', () => {
    const invalidWidget = {
      // Missing type
      children: []
    };

    const result = testWidget(invalidWidget);
    expect(result.success).toBe(false);
    expect(result.failed).toBeGreaterThan(0);
  });

  test('Should handle widgets with invalid actions', () => {
    const widgetWithInvalidAction = {
      type: 'card',
      children: [
        {
          type: 'button',
          label: 'Test Button',
          onClickAction: {
            // Missing type and name
            parameters: {}
          }
        }
      ]
    };

    const result = testWidget(widgetWithInvalidAction);
    expect(result.success).toBe(false);
  });

  test('Should handle deeply nested widgets', () => {
    // Create a deeply nested widget structure
    let deepWidget = {
      type: 'card',
      children: []
    };

    let current = deepWidget;
    for (let i = 0; i < 15; i++) {
      const newLevel = {
        type: 'box',
        children: []
      };
      current.children.push(newLevel);
      current = newLevel;
    }

    const result = testWidget(deepWidget);
    // Should pass validation but may have performance warnings
    expect(result.success).toBe(true);
  });
});