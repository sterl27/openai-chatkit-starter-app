/**
 * Widget Builder Utilities
 * Dynamic widget generation and composition tools
 */

/**
 * Generate a product list widget from product data
 */
function generateProductListWidget(products) {
  if (!products || products.length === 0) {
    return {
      type: "card",
      key: "empty-products",
      size: "md",
      padding: "lg",
      children: [
        {
          type: "text",
          value: "No products available",
          size: "md",
          color: "#666",
          textAlign: "center"
        }
      ]
    };
  }

  return {
    type: "listView",
    key: "product-list-dynamic",
    theme: "light",
    children: products.map(product => ({
      type: "listViewItem",
      key: product.id,
      onClickAction: {
        type: "custom",
        name: "view_product_details",
        parameters: { productId: product.id }
      },
      children: [
        {
          type: "row",
          gap: "md",
          align: "start",
          padding: "md",
          children: [
            {
              type: "image",
              src: product.image,
              alt: product.name,
              width: "80px",
              height: "80px",
              radius: "md",
              fit: "cover"
            },
            {
              type: "col",
              gap: "sm",
              flex: 1,
              children: [
                {
                  type: "row",
                  justify: "between",
                  align: "start",
                  children: [
                    {
                      type: "title",
                      value: product.name,
                      size: "md",
                      weight: "semibold"
                    },
                    {
                      type: "badge",
                      label: product.inStock ? "In Stock" : "Out of Stock",
                      color: product.inStock ? "success" : "danger",
                      variant: "soft",
                      size: "sm"
                    }
                  ]
                },
                {
                  type: "text",
                  value: product.description,
                  size: "sm",
                  color: "#555",
                  maxLines: 2
                },
                {
                  type: "row",
                  justify: "between",
                  align: "center",
                  children: [
                    {
                      type: "text",
                      value: product.price,
                      size: "lg",
                      weight: "bold",
                      color: "#2563eb"
                    },
                    {
                      type: "button",
                      label: product.inStock ? "Add to Cart" : "Notify Me",
                      style: product.inStock ? "primary" : "secondary",
                      size: "sm",
                      disabled: !product.inStock,
                      onClickAction: {
                        type: "custom",
                        name: product.inStock ? "add_to_cart" : "notify_when_available",
                        parameters: { productId: product.id }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }))
  };
}

/**
 * Generate a detailed product widget for a single product
 */
function generateProductDetailWidget(product) {
  return {
    type: "card",
    key: `product-detail-${product.id}`,
    size: "lg",
    theme: "light",
    background: "#ffffff",
    padding: "lg",
    children: [
      {
        type: "row",
        gap: "lg",
        align: "start",
        children: [
          {
            type: "image",
            src: product.image,
            alt: product.name,
            width: "300px",
            height: "300px",
            radius: "lg",
            fit: "cover"
          },
          {
            type: "col",
            gap: "md",
            flex: 1,
            children: [
              {
                type: "row",
                justify: "between",
                align: "start",
                children: [
                  {
                    type: "title",
                    value: product.name,
                    size: "2xl",
                    weight: "bold"
                  },
                  {
                    type: "badge",
                    label: product.inStock ? "In Stock" : "Out of Stock",
                    color: product.inStock ? "success" : "danger",
                    variant: "soft"
                  }
                ]
              },
              {
                type: "text",
                value: product.description,
                size: "md",
                color: "#555"
              },
              {
                type: "title",
                value: product.price,
                size: "3xl",
                color: "#2563eb",
                weight: "bold"
              },
              {
                type: "row",
                gap: "md",
                children: [
                  {
                    type: "button",
                    label: product.inStock ? "Add to Cart" : "Notify When Available",
                    style: "primary",
                    size: "lg",
                    block: true,
                    disabled: !product.inStock,
                    onClickAction: {
                      type: "custom",
                      name: product.inStock ? "add_to_cart" : "notify_when_available",
                      parameters: { productId: product.id }
                    }
                  }
                ]
              },
              {
                type: "divider",
                spacing: "md"
              },
              {
                type: "text",
                value: "Product Details",
                size: "lg",
                weight: "semibold"
              },
              {
                type: "col",
                gap: "xs",
                children: [
                  {
                    type: "row",
                    justify: "between",
                    children: [
                      {
                        type: "text",
                        value: "Category:",
                        size: "sm",
                        weight: "medium"
                      },
                      {
                        type: "text",
                        value: product.category || "General",
                        size: "sm"
                      }
                    ]
                  },
                  {
                    type: "row",
                    justify: "between",
                    children: [
                      {
                        type: "text",
                        value: "Availability:",
                        size: "sm",
                        weight: "medium"
                      },
                      {
                        type: "text",
                        value: product.inStock ? "In Stock" : "Out of Stock",
                        size: "sm",
                        color: product.inStock ? "#16a34a" : "#dc2626"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
}

/**
 * Generate a shopping cart widget from cart data
 */
function generateCartWidget(cartItems, products) {
  if (!cartItems || cartItems.length === 0) {
    return {
      type: "card",
      key: "empty-cart",
      size: "md",
      theme: "light",
      background: "#ffffff",
      padding: "lg",
      children: [
        {
          type: "title",
          value: "Shopping Cart",
          size: "xl",
          weight: "bold",
          textAlign: "center"
        },
        {
          type: "divider",
          spacing: "md"
        },
        {
          type: "text",
          value: "Your cart is empty",
          size: "md",
          color: "#666",
          textAlign: "center"
        },
        {
          type: "button",
          label: "Continue Shopping",
          style: "primary",
          variant: "outline",
          block: true,
          onClickAction: {
            type: "custom",
            name: "continue_shopping",
            parameters: {}
          }
        }
      ]
    };
  }

  const cartWithDetails = cartItems.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)
  })).filter(item => item.product);

  const subtotal = cartWithDetails.reduce((sum, item) => {
    const price = parseFloat(item.product.price.replace('$', ''));
    return sum + (price * item.quantity);
  }, 0);

  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return {
    type: "card",
    key: "shopping-cart-filled",
    size: "lg",
    theme: "light",
    background: "#ffffff",
    padding: "lg",
    children: [
      {
        type: "row",
        justify: "between",
        align: "center",
        children: [
          {
            type: "title",
            value: "Shopping Cart",
            size: "xl",
            weight: "bold"
          },
          {
            type: "badge",
            label: `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''}`,
            color: "info",
            variant: "soft"
          }
        ]
      },
      {
        type: "divider",
        spacing: "md"
      },
      {
        type: "listView",
        children: cartWithDetails.map(item => ({
          type: "listViewItem",
          key: `cart-${item.productId}`,
          children: [
            {
              type: "row",
              gap: "md",
              align: "center",
              padding: "sm",
              children: [
                {
                  type: "image",
                  src: item.product.image,
                  alt: item.product.name,
                  width: "60px",
                  height: "60px",
                  radius: "md",
                  fit: "cover"
                },
                {
                  type: "col",
                  gap: "xs",
                  flex: 1,
                  children: [
                    {
                      type: "text",
                      value: item.product.name,
                      size: "md",
                      weight: "semibold"
                    },
                    {
                      type: "text",
                      value: `Quantity: ${item.quantity}`,
                      size: "sm",
                      color: "#666"
                    }
                  ]
                },
                {
                  type: "col",
                  gap: "xs",
                  align: "end",
                  children: [
                    {
                      type: "text",
                      value: item.product.price,
                      size: "md",
                      weight: "bold"
                    },
                    {
                      type: "button",
                      label: "Remove",
                      variant: "ghost",
                      color: "danger",
                      size: "sm",
                      onClickAction: {
                        type: "custom",
                        name: "remove_from_cart",
                        parameters: { productId: item.productId }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }))
      },
      {
        type: "divider",
        spacing: "md"
      },
      {
        type: "col",
        gap: "sm",
        children: [
          {
            type: "row",
            justify: "between",
            children: [
              {
                type: "text",
                value: "Subtotal:",
                size: "md"
              },
              {
                type: "text",
                value: `$${subtotal.toFixed(2)}`,
                size: "md"
              }
            ]
          },
          {
            type: "row",
            justify: "between",
            children: [
              {
                type: "text",
                value: "Tax:",
                size: "md"
              },
              {
                type: "text",
                value: `$${tax.toFixed(2)}`,
                size: "md"
              }
            ]
          },
          {
            type: "divider",
            spacing: "sm"
          },
          {
            type: "row",
            justify: "between",
            children: [
              {
                type: "title",
                value: "Total:",
                size: "lg",
                weight: "bold"
              },
              {
                type: "title",
                value: `$${total.toFixed(2)}`,
                size: "lg",
                weight: "bold",
                color: "#2563eb"
              }
            ]
          }
        ]
      },
      {
        type: "button",
        label: "Proceed to Checkout",
        style: "primary",
        size: "lg",
        block: true,
        onClickAction: {
          type: "custom",
          name: "checkout",
          parameters: { cartItems, total: total.toFixed(2) }
        }
      }
    ]
  };
}

/**
 * Generate a notification widget
 */
function generateNotificationWidget(type, title, message, actions = []) {
  const colors = {
    success: { bg: "#f0fdf4", icon: "#16a34a", text: "#15803d" },
    error: { bg: "#fef2f2", icon: "#dc2626", text: "#dc2626" },
    warning: { bg: "#fffbeb", icon: "#d97706", text: "#92400e" },
    info: { bg: "#eff6ff", icon: "#2563eb", text: "#1d4ed8" }
  };

  const icons = {
    success: "check-circle",
    error: "x-circle",
    warning: "exclamation-triangle",
    info: "information-circle"
  };

  const colorScheme = colors[type] || colors.info;

  return {
    type: "card",
    key: `notification-${type}`,
    size: "md",
    theme: "light",
    background: colorScheme.bg,
    padding: "lg",
    radius: "lg",
    children: [
      {
        type: "row",
        gap: "md",
        align: "start",
        children: [
          {
            type: "icon",
            name: icons[type],
            color: colorScheme.icon,
            size: "xl"
          },
          {
            type: "col",
            gap: "sm",
            flex: 1,
            children: [
              {
                type: "title",
                value: title,
                size: "lg",
                color: colorScheme.text,
                weight: "bold"
              },
              {
                type: "text",
                value: message,
                size: "sm",
                color: colorScheme.text
              },
              ...(actions.length > 0 ? [
                {
                  type: "row",
                  gap: "sm",
                  children: actions
                }
              ] : [])
            ]
          }
        ]
      }
    ]
  };
}

/**
 * Generate a paginated list widget
 */
function generatePaginatedListWidget(items, currentPage = 1, itemsPerPage = 10, totalItems = 0) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return {
    type: "card",
    key: "paginated-list",
    size: "lg",
    children: [
      {
        type: "listView",
        children: items
      },
      ...(totalPages > 1 ? [
        {
          type: "divider",
          spacing: "md"
        },
        {
          type: "row",
          justify: "between",
          align: "center",
          padding: "md",
          children: [
            {
              type: "text",
              value: `Showing ${startIndex + 1}-${endIndex} of ${totalItems}`,
              size: "sm",
              color: "#666"
            },
            {
              type: "row",
              gap: "sm",
              children: [
                {
                  type: "button",
                  label: "Previous",
                  variant: "outline",
                  size: "sm",
                  disabled: currentPage === 1,
                  onClickAction: {
                    type: "custom",
                    name: "paginate",
                    parameters: { page: currentPage - 1 }
                  }
                },
                {
                  type: "text",
                  value: `${currentPage} / ${totalPages}`,
                  size: "sm"
                },
                {
                  type: "button",
                  label: "Next",
                  variant: "outline",
                  size: "sm",
                  disabled: currentPage === totalPages,
                  onClickAction: {
                    type: "custom",
                    name: "paginate",
                    parameters: { page: currentPage + 1 }
                  }
                }
              ]
            }
          ]
        }
      ] : [])
    ]
  };
}

module.exports = {
  generateProductListWidget,
  generateProductDetailWidget,
  generateCartWidget,
  generateNotificationWidget,
  generatePaginatedListWidget
};