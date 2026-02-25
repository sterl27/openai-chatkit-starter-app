/**
 * ChatKit Widget Templates
 * Pre-built widget configurations for common use cases
 */

const contactForm = {
  type: "card",
  key: "contact-form-01",
  size: "md",
  theme: "light",
  background: "#ffffff",
  padding: "lg",
  children: [
    {
      type: "title",
      value: "Request a Demo",
      size: "xl",
      weight: "bold",
      textAlign: "center"
    },
    {
      type: "text",
      value: "Fill out the form and we'll get in touch shortly.",
      size: "sm",
      color: "#666",
      textAlign: "center"
    },
    {
      type: "divider",
      spacing: "md"
    },
    {
      type: "form",
      onSubmitAction: {
        type: "custom",
        name: "submit_contact_form",
        parameters: {}
      },
      gap: "md",
      children: [
        {
          type: "col",
          gap: "xs",
          children: [
            {
              type: "text",
              value: "Your Name *",
              size: "sm",
              weight: "medium"
            },
            {
              type: "text",
              editable: {
                name: "user_name",
                placeholder: "Enter your full name",
                required: true,
                autoComplete: "name"
              }
            }
          ]
        },
        {
          type: "col",
          gap: "xs",
          children: [
            {
              type: "text",
              value: "Email Address *",
              size: "sm",
              weight: "medium"
            },
            {
              type: "text",
              editable: {
                name: "email",
                placeholder: "your@email.com",
                required: true,
                autoComplete: "email",
                pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"
              }
            }
          ]
        },
        {
          type: "col",
          gap: "xs",
          children: [
            {
              type: "text",
              value: "Reason for Contact *",
              size: "sm",
              weight: "medium"
            },
            {
              type: "select",
              name: "reason",
              placeholder: "Select reason",
              options: [
                { label: "Schedule Demo", value: "demo" },
                { label: "Sales Inquiry", value: "sales" },
                { label: "Technical Support", value: "support" },
                { label: "Partnership Opportunity", value: "partnership" },
                { label: "General Question", value: "general" }
              ],
              clearable: true,
              variant: "outline"
            }
          ]
        },
        {
          type: "col",
          gap: "xs",
          children: [
            {
              type: "text",
              value: "Message",
              size: "sm",
              weight: "medium"
            },
            {
              type: "text",
              editable: {
                name: "message",
                placeholder: "Tell us more about your needs...",
                required: false
              }
            }
          ]
        },
        {
          type: "button",
          label: "Submit Request",
          submit: true,
          style: "primary",
          variant: "solid",
          block: true,
          size: "lg"
        }
      ]
    }
  ]
};

const productCard = {
  type: "card",
  key: "product-card-template",
  size: "md",
  theme: "light",
  background: "#ffffff",
  padding: "md",
  radius: "lg",
  children: [
    {
      type: "row",
      gap: "md",
      align: "start",
      children: [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
          alt: "Product Image",
          width: "120px",
          height: "120px",
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
                  value: "Product Name",
                  size: "lg",
                  weight: "bold"
                },
                {
                  type: "badge",
                  label: "In Stock",
                  color: "success",
                  variant: "soft",
                  pill: true
                }
              ]
            },
            {
              type: "text",
              value: "Product description goes here with key features and benefits.",
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
                  type: "title",
                  value: "$299",
                  size: "xl",
                  color: "#2563eb",
                  weight: "bold"
                },
                {
                  type: "row",
                  gap: "sm",
                  children: [
                    {
                      type: "button",
                      label: "View Details",
                      variant: "outline",
                      size: "sm",
                      onClickAction: {
                        type: "custom",
                        name: "view_product_details",
                        parameters: { productId: "template" }
                      }
                    },
                    {
                      type: "button",
                      label: "Add to Cart",
                      style: "primary",
                      size: "sm",
                      onClickAction: {
                        type: "custom",
                        name: "add_to_cart",
                        parameters: { productId: "template" }
                      }
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

const shoppingCart = {
  type: "card",
  key: "shopping-cart",
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
          label: "3 items",
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
      children: [
        {
          type: "listViewItem",
          children: [
            {
              type: "text",
              value: "Your cart is empty",
              size: "md",
              color: "#666",
              textAlign: "center"
            }
          ]
        }
      ]
    },
    {
      type: "divider",
      spacing: "md"
    },
    {
      type: "row",
      justify: "between",
      align: "center",
      children: [
        {
          type: "title",
          value: "Total: $0.00",
          size: "lg",
          weight: "bold"
        },
        {
          type: "button",
          label: "Checkout",
          style: "primary",
          size: "lg",
          disabled: true,
          onClickAction: {
            type: "custom",
            name: "checkout",
            parameters: {}
          }
        }
      ]
    }
  ]
};

const successMessage = {
  type: "card",
  key: "success-message",
  size: "md",
  theme: "light",
  background: "#f0fdf4",
  padding: "lg",
  radius: "lg",
  children: [
    {
      type: "row",
      gap: "md",
      align: "center",
      children: [
        {
          type: "icon",
          name: "check-circle",
          color: "#16a34a",
          size: "xl"
        },
        {
          type: "col",
          gap: "xs",
          children: [
            {
              type: "title",
              value: "Success!",
              size: "lg",
              color: "#15803d",
              weight: "bold"
            },
            {
              type: "text",
              value: "Your request has been submitted successfully. We'll get back to you soon.",
              size: "sm",
              color: "#166534"
            }
          ]
        }
      ]
    }
  ]
};

const errorMessage = {
  type: "card",
  key: "error-message",
  size: "md",
  theme: "light",
  background: "#fef2f2",
  padding: "lg",
  radius: "lg",
  children: [
    {
      type: "row",
      gap: "md",
      align: "center",
      children: [
        {
          type: "icon",
          name: "x-circle",
          color: "#dc2626",
          size: "xl"
        },
        {
          type: "col",
          gap: "xs",
          children: [
            {
              type: "title",
              value: "Error",
              size: "lg",
              color: "#dc2626",
              weight: "bold"
            },
            {
              type: "text",
              value: "Something went wrong. Please try again.",
              size: "sm",
              color: "#991b1b"
            }
          ]
        }
      ]
    }
  ]
};

const loadingWidget = {
  type: "card",
  key: "loading-widget",
  size: "md",
  theme: "light",
  background: "#ffffff",
  padding: "lg",
  children: [
    {
      type: "row",
      gap: "md",
      align: "center",
      justify: "center",
      children: [
        {
          type: "icon",
          name: "loader",
          size: "md"
        },
        {
          type: "text",
          value: "Loading...",
          size: "md",
          color: "#666"
        }
      ]
    }
  ]
};

const paginationWidget = {
  type: "row",
  key: "pagination",
  gap: "sm",
  justify: "center",
  children: [
    {
      type: "button",
      label: "Previous",
      variant: "outline",
      size: "sm",
      onClickAction: {
        type: "custom",
        name: "paginate",
        parameters: { direction: "prev" }
      }
    },
    {
      type: "text",
      value: "Page 1 of 5",
      size: "sm",
      color: "#666"
    },
    {
      type: "button",
      label: "Next",
      variant: "outline",
      size: "sm",
      onClickAction: {
        type: "custom",
        name: "paginate",
        parameters: { direction: "next" }
      }
    }
  ]
};

const abletonLive12Suite = {
  type: "card",
  key: "ableton-live-12-suite",
  size: "lg",
  theme: "dark",
  background: "#111827",
  padding: "lg",
  radius: "lg",
  children: [
    {
      type: "row",
      gap: "md",
      align: "start",
      children: [
        {
          type: "image",
          src: "https://cdn-images.ableton.com/ableton-live-12-suite.jpg",
          alt: "Ableton Live 12 Suite user interface preview",
          width: "180px",
          height: "120px",
          radius: "md",
          fit: "cover"
        },
        {
          type: "col",
          gap: "xs",
          flex: 1,
          children: [
            {
              type: "title",
              value: "Ableton Live 12 Suite",
              size: "2xl",
              weight: "bold",
              color: "#f9fafb"
            },
            {
              type: "text",
              value: "Full DAW + all instruments, effects, and Max for Live to produce, perform, and sound design.",
              size: "sm",
              color: "#d1d5db"
            },
            {
              type: "row",
              gap: "sm",
              children: [
                {
                  type: "badge",
                  label: "Music Production",
                  color: "info",
                  variant: "soft",
                  pill: true
                },
                {
                  type: "badge",
                  label: "Max for Live Included",
                  color: "success",
                  variant: "soft",
                  pill: true
                }
              ]
            }
          ]
        }
      ]
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
          type: "text",
          value: "Choose your workflow",
          size: "sm",
          weight: "medium",
          color: "#f3f4f6"
        },
        {
          type: "select",
          name: "workflow",
          placeholder: "Select focus",
          options: [
            { label: "Songwriting", value: "songwriting" },
            { label: "Mixing", value: "mixing" },
            { label: "Live Performance", value: "performance" },
            { label: "Sound Design", value: "sound_design" }
          ],
          clearable: true,
          variant: "outline"
        }
      ]
    },
    {
      type: "row",
      justify: "between",
      align: "center",
      children: [
        {
          type: "title",
          value: "$749",
          size: "xl",
          weight: "bold",
          color: "#34d399"
        },
        {
          type: "row",
          gap: "sm",
          children: [
            {
              type: "button",
              label: "Compare Editions",
              variant: "outline",
              size: "sm",
              onClickAction: {
                type: "custom",
                name: "view_ableton_live_editions",
                parameters: { product: "live_12_suite" }
              }
            },
            {
              type: "button",
              label: "Start Free Trial",
              style: "primary",
              size: "sm",
              onClickAction: {
                type: "custom",
                name: "start_live_12_trial",
                parameters: { edition: "suite" }
              }
            }
          ]
        }
      ]
    }
  ]
};

module.exports = {
  contactForm,
  productCard,
  shoppingCart,
  successMessage,
  errorMessage,
  loadingWidget,
  paginationWidget,
  abletonLive12Suite
};