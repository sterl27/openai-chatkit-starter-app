/**
 * Widget Testing Utilities
 * Tools for testing widget functionality and validation
 */

const { validateWidget, validateAction, validateAccessibility } = require('./validation');

/**
 * Test suite for widget functionality
 */
class WidgetTester {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      tests: []
    };
  }

  /**
   * Run a test with description and assertion
   */
  test(description, testFn) {
    try {
      const result = testFn();
      if (result === true || (result && result.passed)) {
        this.results.passed++;
        this.results.tests.push({
          description,
          status: 'PASS',
          message: result.message || 'Test passed'
        });
      } else {
        this.results.failed++;
        this.results.tests.push({
          description,
          status: 'FAIL',
          message: result.message || 'Test failed'
        });
      }
    } catch (error) {
      this.results.failed++;
      this.results.tests.push({
        description,
        status: 'FAIL',
        message: error.message
      });
    }
  }

  /**
   * Add a warning
   */
  warn(description, message) {
    this.results.warnings++;
    this.results.tests.push({
      description,
      status: 'WARN',
      message
    });
  }

  /**
   * Get test results summary
   */
  getSummary() {
    return {
      total: this.results.passed + this.results.failed,
      ...this.results,
      success: this.results.failed === 0
    };
  }

  /**
   * Reset test results
   */
  reset() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      tests: []
    };
  }
}

/**
 * Comprehensive widget validation
 */
function testWidget(widget, options = {}) {
  const tester = new WidgetTester();

  // Basic structure validation
  tester.test('Widget structure is valid', () => {
    const validation = validateWidget(widget);
    return {
      passed: validation.valid,
      message: validation.error || 'Widget structure is valid'
    };
  });

  // Accessibility validation
  tester.test('Widget meets accessibility standards', () => {
    const accessibility = validateAccessibility(widget);
    if (!accessibility.compliant && accessibility.issues.length > 0) {
      tester.warn('Accessibility issues found', accessibility.issues.join(', '));
    }
    return {
      passed: accessibility.compliant,
      message: accessibility.compliant ? 'All accessibility checks passed' : 
        `Accessibility issues: ${accessibility.issues.join(', ')}`
    };
  });

  // Action validation
  tester.test('All widget actions are valid', () => {
    const invalidActions = [];
    
    function checkActions(node) {
      if (node.onClickAction && !validateAction(node.onClickAction).valid) {
        invalidActions.push(`Invalid onClickAction in ${node.type}`);
      }
      if (node.onSubmitAction && !validateAction(node.onSubmitAction).valid) {
        invalidActions.push(`Invalid onSubmitAction in ${node.type}`);
      }
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(checkActions);
      }
    }
    
    checkActions(widget);
    
    return {
      passed: invalidActions.length === 0,
      message: invalidActions.length === 0 ? 'All actions are valid' : 
        `Invalid actions found: ${invalidActions.join(', ')}`
    };
  });

  // Performance validation
  tester.test('Widget performance is acceptable', () => {
    const jsonSize = JSON.stringify(widget).length;
    const maxSize = options.maxSize || 50000; // 50KB default
    
    if (jsonSize > maxSize) {
      tester.warn('Large widget size', `Widget JSON is ${jsonSize} bytes (>${maxSize} recommended)`);
    }
    
    return {
      passed: jsonSize <= maxSize,
      message: `Widget size: ${jsonSize} bytes`
    };
  });

  // Required properties validation
  tester.test('Required properties are present', () => {
    const missingProps = [];
    
    function checkRequiredProps(node, path = '') {
      if (node.type === 'image' && !node.alt) {
        missingProps.push(`${path}image missing alt text`);
      }
      if (node.type === 'button' && !node.label) {
        missingProps.push(`${path}button missing label`);
      }
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach((child, index) => 
          checkRequiredProps(child, `${path}children[${index}].`)
        );
      }
    }
    
    checkRequiredProps(widget);
    
    if (missingProps.length > 0) {
      missingProps.forEach(prop => tester.warn('Missing recommended property', prop));
    }
    
    return {
      passed: true,
      message: missingProps.length === 0 ? 'All required properties present' :
        `Recommended properties missing: ${missingProps.join(', ')}`
    };
  });

  return tester.getSummary();
}

/**
 * Test widget interactions
 */
function testWidgetInteractions(widget) {
  const interactions = [];
  
  function findInteractions(node, path = '') {
    if (node.onClickAction) {
      interactions.push({
        type: 'click',
        element: node.type,
        path,
        action: node.onClickAction
      });
    }
    
    if (node.onSubmitAction) {
      interactions.push({
        type: 'submit',
        element: node.type,
        path,
        action: node.onSubmitAction
      });
    }
    
    if (node.onChangeAction) {
      interactions.push({
        type: 'change',
        element: node.type,
        path,
        action: node.onChangeAction
      });
    }
    
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach((child, index) => 
        findInteractions(child, `${path}children[${index}].`)
      );
    }
  }
  
  findInteractions(widget);
  
  return {
    total: interactions.length,
    interactions,
    hasInteractions: interactions.length > 0
  };
}

/**
 * Generate widget test report
 */
function generateTestReport(widget, options = {}) {
  const structureTest = testWidget(widget, options);
  const interactionTest = testWidgetInteractions(widget);
  
  return {
    widget: {
      type: widget.type,
      key: widget.key || 'unnamed',
      size: JSON.stringify(widget).length
    },
    structure: structureTest,
    interactions: interactionTest,
    timestamp: new Date().toISOString(),
    recommendations: generateRecommendations(structureTest, interactionTest)
  };
}

/**
 * Generate recommendations based on test results
 */
function generateRecommendations(structureTest, interactionTest) {
  const recommendations = [];
  
  if (structureTest.failed > 0) {
    recommendations.push({
      type: 'error',
      message: 'Fix structure validation errors before deployment'
    });
  }
  
  if (structureTest.warnings > 0) {
    recommendations.push({
      type: 'warning',
      message: 'Address accessibility and performance warnings'
    });
  }
  
  if (!interactionTest.hasInteractions) {
    recommendations.push({
      type: 'info',
      message: 'Consider adding interactive elements for better user engagement'
    });
  }
  
  if (interactionTest.total > 10) {
    recommendations.push({
      type: 'performance',
      message: 'Many interactions detected - consider simplifying the UI'
    });
  }
  
  return recommendations;
}

/**
 * Mock action handler for testing
 */
function createMockActionHandler() {
  const handledActions = [];
  
  return {
    handle: (action, context = {}) => {
      handledActions.push({
        action,
        context,
        timestamp: new Date().toISOString()
      });
      
      return {
        success: true,
        message: `Mock handled action: ${action.name}`,
        data: { mockResponse: true }
      };
    },
    
    getHandledActions: () => handledActions,
    
    reset: () => {
      handledActions.length = 0;
    }
  };
}

/**
 * Widget performance profiler
 */
function profileWidget(widget) {
  const start = Date.now();
  
  // Measure JSON serialization time
  const serializeStart = Date.now();
  const json = JSON.stringify(widget);
  const serializeTime = Date.now() - serializeStart;
  
  // Count elements
  let elementCount = 0;
  let maxDepth = 0;
  
  function countElements(node, depth = 0) {
    elementCount++;
    maxDepth = Math.max(maxDepth, depth);
    
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(child => countElements(child, depth + 1));
    }
  }
  
  countElements(widget);
  
  const totalTime = Date.now() - start;
  const safeTotalTime = Math.max(totalTime, 1);
  
  return {
    performance: {
      totalProcessingTime: safeTotalTime,
      serializationTime: serializeTime,
      jsonSize: json.length,
      elementCount,
      maxDepth
    },
    metrics: {
      elementsPerMs: elementCount / safeTotalTime,
      bytesPerElement: Math.round(json.length / elementCount),
      complexity: maxDepth * elementCount
    },
    recommendations: {
      acceptable: safeTotalTime < 100 && json.length < 100000 && maxDepth < 10,
      warnings: [
        ...(safeTotalTime > 100 ? ['Processing time exceeds 100ms'] : []),
        ...(json.length > 100000 ? ['JSON size exceeds 100KB'] : []),
        ...(maxDepth > 10 ? ['Widget depth exceeds 10 levels'] : []),
        ...(elementCount > 100 ? ['Element count exceeds 100'] : [])
      ]
    }
  };
}

module.exports = {
  WidgetTester,
  testWidget,
  testWidgetInteractions,
  generateTestReport,
  createMockActionHandler,
  profileWidget
};