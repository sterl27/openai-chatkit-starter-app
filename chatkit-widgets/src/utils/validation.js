/**
 * Widget and Action Validation Utilities
 */

/**
 * Validate widget structure according to ChatKit schema
 */
function validateWidget(widget) {
  if (!widget || typeof widget !== 'object') {
    return { valid: false, error: 'Widget must be an object' };
  }

  if (!widget.type) {
    return { valid: false, error: 'Widget must have a type property' };
  }

  // Validate container types
  const containerTypes = ['card', 'listView', 'form'];
  const componentTypes = [
    'badge', 'box', 'row', 'col', 'button', 'caption', 'datePicker',
    'divider', 'icon', 'image', 'listViewItem', 'markdown', 'select',
    'spacer', 'text', 'title', 'transition'
  ];

  const validTypes = [...containerTypes, ...componentTypes];
  
  if (!validTypes.includes(widget.type)) {
    return { valid: false, error: `Invalid widget type: ${widget.type}` };
  }

  // Validate required properties for specific types
  switch (widget.type) {
    case 'button':
      if (!widget.label) {
        return { valid: false, error: 'Button widget must have a label property' };
      }
      if (widget.onClickAction && !validateAction(widget.onClickAction).valid) {
        return { valid: false, error: 'Button widget has invalid onClickAction' };
      }
      break;

    case 'form':
      if (!widget.onSubmitAction) {
        return { valid: false, error: 'Form widget must have an onSubmitAction property' };
      }
      if (!validateAction(widget.onSubmitAction).valid) {
        return { valid: false, error: 'Form widget has invalid onSubmitAction' };
      }
      break;

    case 'image':
      if (!widget.src) {
        return { valid: false, error: 'Image widget must have a src property' };
      }
      break;

    case 'icon':
      if (!widget.name) {
        return { valid: false, error: 'Icon widget must have a name property' };
      }
      break;

    case 'text':
    case 'title':
    case 'caption':
    case 'markdown':
      if (widget.value === undefined && !widget.editable) {
        return { valid: false, error: `${widget.type} widget must have a value property` };
      }
      break;

    case 'select':
      if (!widget.options || !Array.isArray(widget.options)) {
        return { valid: false, error: 'Select widget must have an options array' };
      }
      if (!widget.name) {
        return { valid: false, error: 'Select widget must have a name property' };
      }
      break;
  }

  // Recursively validate children
  if (widget.children && Array.isArray(widget.children)) {
    for (let i = 0; i < widget.children.length; i++) {
      const childValidation = validateWidget(widget.children[i]);
      if (!childValidation.valid) {
        return { valid: false, error: `Child ${i}: ${childValidation.error}` };
      }
    }
  }

  return { valid: true };
}

/**
 * Validate action structure
 */
function validateAction(action) {
  if (!action || typeof action !== 'object') {
    return { valid: false, error: 'Action must be an object' };
  }

  if (!action.type) {
    return { valid: false, error: 'Action must have a type property' };
  }

  if (!action.name) {
    return { valid: false, error: 'Action must have a name property' };
  }

  // Validate action type
  const validActionTypes = ['custom', 'navigate', 'submit'];
  if (!validActionTypes.includes(action.type)) {
    return { valid: false, error: `Invalid action type: ${action.type}` };
  }

  // Validate parameters (if present)
  if (action.parameters && typeof action.parameters !== 'object') {
    return { valid: false, error: 'Action parameters must be an object' };
  }

  return { valid: true };
}

/**
 * Validate form data against expected schema
 */
function validateFormData(formData, schema = {}) {
  const errors = [];

  // Check required fields
  if (schema.required && Array.isArray(schema.required)) {
    for (const field of schema.required) {
      if (!formData[field] || formData[field].trim() === '') {
        errors.push(`${field} is required`);
      }
    }
  }

  // Validate email format
  if (formData.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Invalid email format');
    }
  }

  // Validate phone number format (if present)
  if (formData.phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.push('Invalid phone number format');
    }
  }

  // Validate URL format (if present)
  if (formData.url) {
    try {
      new URL(formData.url);
    } catch {
      errors.push('Invalid URL format');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Sanitize user input to prevent XSS and injection attacks
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return input;
  }

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Validate widget size constraints
 */
function validateWidgetSize(widget) {
  const warnings = [];

  // Check for excessive nesting
  function checkNesting(node, depth = 0) {
    if (depth > 10) {
      warnings.push('Widget has excessive nesting (>10 levels)');
      return;
    }

    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        checkNesting(child, depth + 1);
      }
    }
  }

  checkNesting(widget);

  // Check for too many children in a single container
  if (widget.children && widget.children.length > 50) {
    warnings.push('Widget container has too many direct children (>50)');
  }

  // Estimate JSON size
  const jsonSize = JSON.stringify(widget).length;
  if (jsonSize > 100000) { // 100KB
    warnings.push('Widget JSON is very large (>100KB) - consider simplifying');
  }

  return {
    valid: warnings.length === 0,
    warnings,
    jsonSize
  };
}

/**
 * Validate color values
 */
function validateColor(color) {
  if (!color) return { valid: true };

  // Support for theme-aware colors
  if (typeof color === 'object' && color.light && color.dark) {
    return {
      valid: validateColor(color.light).valid && validateColor(color.dark).valid
    };
  }

  // Hex color validation
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (hexRegex.test(color)) {
    return { valid: true };
  }

  // RGB/RGBA validation
  const rgbRegex = /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*[01]?\.?\d*)?\s*\)$/;
  if (rgbRegex.test(color)) {
    return { valid: true };
  }

  // CSS color names (basic validation)
  const cssColors = [
    'black', 'white', 'red', 'green', 'blue', 'yellow', 'orange', 'purple',
    'pink', 'brown', 'gray', 'grey', 'transparent'
  ];
  if (cssColors.includes(color.toLowerCase())) {
    return { valid: true };
  }

  return { valid: false, error: `Invalid color format: ${color}` };
}

/**
 * Validate accessibility compliance
 */
function validateAccessibility(widget) {
  const issues = [];

  function checkNode(node) {
    // Check for missing alt text on images
    if (node.type === 'image' && !node.alt) {
      issues.push('Image missing alt text for accessibility');
    }

    // Check for proper form labels
    if (node.type === 'text' && node.editable && !node.editable.placeholder) {
      issues.push('Form input missing placeholder text');
    }

    // Check button labels
    if (node.type === 'button' && (!node.label || node.label.trim() === '')) {
      issues.push('Button missing descriptive label');
    }

    // Recursively check children
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(checkNode);
    }
  }

  checkNode(widget);

  return {
    compliant: issues.length === 0,
    issues
  };
}

module.exports = {
  validateWidget,
  validateAction,
  validateFormData,
  sanitizeInput,
  validateWidgetSize,
  validateColor,
  validateAccessibility
};