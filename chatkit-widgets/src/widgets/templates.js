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

const analysisWidget = {
  type: "card",
  key: "analysis-widget",
  size: "lg",
  theme: "light",
  background: "#ffffff",
  padding: "lg",
  radius: "lg",
  children: [
    {
      type: "title",
      value: "Analysis Overview",
      size: "xl",
      weight: "bold"
    },
    {
      type: "text",
      value: "Executive summary powered by composable AI components.",
      size: "sm",
      color: "#64748b"
    },
    {
      type: "divider",
      spacing: "md"
    },
    {
      type: "col",
      gap: "sm",
      children: [
        { type: "text", value: "• Sentiment: Positive (+72)", size: "sm" },
        { type: "text", value: "• Confidence: 94%", size: "sm" },
        { type: "text", value: "• Key Topics: Product Fit, UX, Pricing", size: "sm" }
      ]
    }
  ]
};

const lyricsWidget = {
  type: "card",
  key: "lyrics-widget",
  size: "lg",
  theme: "dark",
  background: "#0f172a",
  padding: "lg",
  radius: "lg",
  children: [
    {
      type: "title",
      value: "Lyrics Workspace",
      size: "xl",
      weight: "bold",
      color: "#f8fafc"
    },
    {
      type: "text",
      value: "Draft, refine, and remix lines with structured AI assistance.",
      size: "sm",
      color: "#cbd5e1"
    },
    {
      type: "divider",
      spacing: "md"
    },
    {
      type: "text",
      value: "\"City lights, midnight flights, we build the rhythm of tomorrow.\"",
      size: "md",
      color: "#e2e8f0"
    },
    {
      type: "row",
      gap: "sm",
      children: [
        { type: "badge", label: "Verse", color: "info", variant: "soft", pill: true },
        { type: "badge", label: "Hook", color: "success", variant: "soft", pill: true },
        { type: "badge", label: "Bridge", color: "warning", variant: "soft", pill: true }
      ]
    }
  ]
};

const audioWidget = {
  type: "card",
  key: "audio-widget",
  size: "lg",
  theme: "light",
  background: "#ffffff",
  padding: "lg",
  radius: "lg",
  children: [
    {
      type: "title",
      value: "Audio Intelligence",
      size: "xl",
      weight: "bold"
    },
    {
      type: "text",
      value: "Track loudness, clarity, and speech-to-text confidence in real-time.",
      size: "sm",
      color: "#64748b"
    },
    {
      type: "divider",
      spacing: "md"
    },
    {
      type: "col",
      gap: "sm",
      children: [
        { type: "text", value: "• Loudness: -14 LUFS", size: "sm" },
        { type: "text", value: "• Clarity Score: 8.9 / 10", size: "sm" },
        { type: "text", value: "• Transcript Confidence: 96%", size: "sm" }
      ]
    }
  ]
};

const youtubeThemesWidget = {
  type: "card",
  key: "youtube-themes-widget",
  size: "lg",
  theme: "light",
  background: "#ffffff",
  padding: "lg",
  radius: "lg",
  children: [
    {
      type: "title",
      value: "YouTube Theme Planner",
      size: "xl",
      weight: "bold"
    },
    {
      type: "text",
      value: "Generate series themes and content angles for channel growth.",
      size: "sm",
      color: "#64748b"
    },
    {
      type: "divider",
      spacing: "md"
    },
    {
      type: "row",
      gap: "sm",
      children: [
        { type: "badge", label: "Creator Growth", color: "danger", variant: "soft", pill: true },
        { type: "badge", label: "Product Breakdowns", color: "info", variant: "soft", pill: true },
        { type: "badge", label: "AI Tutorials", color: "success", variant: "soft", pill: true }
      ]
    }
  ]
};

function createElevenLabsAgentEmbedCode(agentId = 'YOUR_AGENT_ID') {
  return [
    '<!-- ElevenLabs Conversational AI Widget -->',
    '<elevenlabs-convai agent-id="' + agentId + '"></elevenlabs-convai>',
    '<script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>'
  ].join('\n');
}

function generateElevenLabsAgentWidget(agentId = 'YOUR_AGENT_ID') {
  const embedCode = createElevenLabsAgentEmbedCode(agentId);

  return {
    type: 'card',
    key: 'elevenlabs-agent-widget',
    size: 'lg',
    theme: 'light',
    background: '#ffffff',
    padding: 'lg',
    radius: 'lg',
    children: [
      {
        type: 'title',
        value: 'ElevenLabs Agent Widget',
        size: 'xl',
        weight: 'bold'
      },
      {
        type: 'text',
        value: 'Embed an ElevenLabs voice agent into your ChatKit experience using your agent ID.',
        size: 'sm',
        color: '#64748b'
      },
      {
        type: 'divider',
        spacing: 'md'
      },
      {
        type: 'row',
        gap: 'sm',
        children: [
          {
            type: 'badge',
            label: 'Voice Agent',
            color: 'discovery',
            variant: 'soft',
            pill: true
          },
          {
            type: 'badge',
            label: 'ElevenLabs',
            color: 'info',
            variant: 'soft',
            pill: true
          }
        ]
      },
      {
        type: 'text',
        value: 'Embed snippet:',
        size: 'sm',
        weight: 'medium'
      },
      {
        type: 'markdown',
        value: `\`\`\`html\n${embedCode}\n\`\`\``
      },
      {
        type: 'row',
        gap: 'sm',
        children: [
          {
            type: 'button',
            label: 'Open ElevenLabs Agents',
            variant: 'outline',
            size: 'sm',
            onClickAction: {
              type: 'navigate',
              name: 'open_elevenlabs_agents',
              parameters: {
                url: 'https://elevenlabs.io/app/agents'
              }
            }
          }
        ]
      }
    ]
  };
}

const tradingViewWidgetDirectory = [
  // Charts
  {
    key: 'advanced-chart',
    name: 'Advanced Real-Time Chart',
    category: 'Charts',
    format: 'iframe',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/',
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js',
    defaultConfig: {
      symbol: 'NASDAQ:AAPL',
      interval: 'D',
      theme: 'dark',
      locale: 'en',
      autosize: true
    }
  },
  {
    key: 'symbol-overview',
    name: 'Symbol Overview',
    category: 'Charts',
    format: 'iframe',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/charts/symbol-overview/',
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js',
    defaultConfig: {
      symbols: [
        ['Apple', 'NASDAQ:AAPL|1D'],
        ['Google', 'NASDAQ:GOOGL|1D'],
        ['Microsoft', 'NASDAQ:MSFT|1D']
      ],
      colorTheme: 'dark',
      locale: 'en',
      autosize: true
    }
  },
  {
    key: 'mini-chart',
    name: 'Mini Chart',
    category: 'Charts',
    format: 'web-component',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/charts/mini-chart/',
    scriptUrl: 'https://widgets.tradingview-widget.com/w/en/tv-mini-chart.js',
    elementTag: 'tv-mini-chart',
    defaultAttributes: {
      symbol: 'NASDAQ:AAPL'
    }
  },
  // Watchlists
  {
    key: 'market-overview',
    name: 'Market Overview',
    category: 'Watchlists',
    format: 'iframe',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/watchlists/market-overview/',
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js',
    defaultConfig: {
      colorTheme: 'dark',
      locale: 'en'
    }
  },
  {
    key: 'stock-market',
    name: 'Stock Market',
    category: 'Watchlists',
    format: 'iframe',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/watchlists/stock-market/',
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js',
    defaultConfig: {
      exchange: 'US',
      colorTheme: 'dark',
      locale: 'en'
    }
  },
  {
    key: 'market-data',
    name: 'Market Data',
    category: 'Watchlists',
    format: 'iframe',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/watchlists/market-quotes/',
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js',
    defaultConfig: {
      colorTheme: 'dark',
      locale: 'en'
    }
  },
  // Tickers
  {
    key: 'ticker-tape',
    name: 'Ticker Tape',
    category: 'Tickers',
    format: 'web-component',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tape/',
    scriptUrl: 'https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js',
    elementTag: 'tv-ticker-tape',
    defaultAttributes: {
      symbols: 'FOREXCOM:SPXUSD,FOREXCOM:NSXUSD,FOREXCOM:DJI,FX:EURUSD,BITSTAMP:BTCUSD'
    }
  },
  {
    key: 'ticker',
    name: 'Ticker',
    category: 'Tickers',
    format: 'iframe',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/tickers/ticker/',
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js',
    defaultConfig: {
      colorTheme: 'dark',
      locale: 'en'
    }
  },
  {
    key: 'single-ticker',
    name: 'Single Ticker',
    category: 'Tickers',
    format: 'iframe',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/tickers/single-ticker/',
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js',
    defaultConfig: {
      symbol: 'NASDAQ:AAPL',
      colorTheme: 'dark',
      locale: 'en'
    }
  },
  // Heatmaps & Screeners
  {
    key: 'stock-heatmap',
    name: 'Stock Heatmap',
    category: 'Heatmaps & Screeners',
    format: 'iframe',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/heatmaps/stock-heatmap/',
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js',
    defaultConfig: {
      dataSource: 'SPX500',
      colorTheme: 'dark',
      locale: 'en',
      width: '100%',
      height: '100%'
    }
  },
  {
    key: 'crypto-heatmap',
    name: 'Crypto Coins Heatmap',
    category: 'Heatmaps & Screeners',
    format: 'iframe',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/heatmaps/crypto-heatmap/',
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js',
    defaultConfig: {
      dataSource: 'Crypto',
      colorTheme: 'dark',
      locale: 'en',
      width: '100%',
      height: '100%'
    }
  },
  {
    key: 'etf-heatmap',
    name: 'ETF Heatmap',
    category: 'Heatmaps & Screeners',
    format: 'iframe',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/heatmaps/etf-heatmap/',
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-etf-heatmap.js',
    defaultConfig: {
      dataSource: 'AllUSEtf',
      colorTheme: 'dark',
      locale: 'en',
      width: '100%',
      height: '100%'
    }
  },
  {
    key: 'screener',
    name: 'Screener',
    category: 'Heatmaps & Screeners',
    format: 'iframe',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/screeners/screener/',
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js',
    defaultConfig: {
      market: 'forex',
      defaultColumn: 'overview',
      colorTheme: 'dark',
      locale: 'en',
      width: '100%',
      height: 550
    }
  },
  // Symbol Details
  {
    key: 'symbol-info',
    name: 'Symbol Info',
    category: 'Symbol Details',
    format: 'iframe',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/symbol-details/symbol-info/',
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js',
    defaultConfig: {
      symbol: 'NASDAQ:AAPL',
      colorTheme: 'dark',
      locale: 'en'
    }
  },
  {
    key: 'technical-analysis',
    name: 'Technical Analysis',
    category: 'Symbol Details',
    format: 'iframe',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/symbol-details/technical-analysis/',
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js',
    defaultConfig: {
      symbol: 'NASDAQ:AAPL',
      interval: '1m',
      colorTheme: 'dark',
      locale: 'en'
    }
  },
  {
    key: 'fundamental-data',
    name: 'Fundamental Data',
    category: 'Symbol Details',
    format: 'iframe',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/symbol-details/fundamental-data/',
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-financials.js',
    defaultConfig: {
      symbol: 'NASDAQ:AAPL',
      displayMode: 'regular',
      colorTheme: 'dark',
      locale: 'en'
    }
  },
  {
    key: 'company-profile',
    name: 'Company Profile',
    category: 'Symbol Details',
    format: 'iframe',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/symbol-details/company-profile/',
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js',
    defaultConfig: {
      symbol: 'NASDAQ:AAPL',
      colorTheme: 'dark',
      locale: 'en'
    }
  },
  // Data & News
  {
    key: 'forex-cross-rates',
    name: 'Forex Cross Rates',
    category: 'Data & News',
    format: 'iframe',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/heatmaps/forex-cross-rates/',
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js',
    defaultConfig: {
      colorTheme: 'dark',
      locale: 'en',
      currencies: ['EUR', 'USD', 'JPY', 'GBP', 'CHF', 'AUD', 'CAD', 'NZD']
    }
  },
  {
    key: 'top-stories',
    name: 'Top Stories',
    category: 'Data & News',
    format: 'iframe',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/news/top-stories/',
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js',
    defaultConfig: {
      displayMode: 'regular',
      feedMode: 'all_symbols',
      colorTheme: 'dark',
      locale: 'en'
    }
  },
  {
    key: 'economic-calendar',
    name: 'Economic Calendar',
    category: 'Data & News',
    format: 'iframe',
    docsUrl: 'https://www.tradingview.com/widget-docs/widgets/calendars/economic-calendar/',
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-events.js',
    defaultConfig: {
      colorTheme: 'dark',
      locale: 'en',
      countryFilter: 'us,eu,gb,jp',
      importanceFilter: '-1,0,1'
    }
  }
];

function getTradingViewWidgetByKey(key) {
  return tradingViewWidgetDirectory.find(widget => widget.key === key);
}

function buildTradingViewEmbedCode(widgetConfig, options = {}) {
  if (!widgetConfig) return '';

  if (widgetConfig.format === 'web-component') {
    const attrs = {
      ...(widgetConfig.defaultAttributes || {}),
      ...(options.attributes || {})
    };

    const attrString = Object.entries(attrs)
      .map(([attrKey, value]) => `${attrKey}="${String(value)}"`)
      .join(' ');

    return [
      '<!-- TradingView Widget (Web Component) -->',
      `<script type="module" src="${widgetConfig.scriptUrl}"></script>`,
      `<${widgetConfig.elementTag} ${attrString}></${widgetConfig.elementTag}>`
    ].join('\n');
  }

  const mergedConfig = {
    ...(widgetConfig.defaultConfig || {}),
    ...(options.config || {})
  };

  if (options.symbol) {
    mergedConfig.symbol = options.symbol;
  }

  return [
    '<!-- TradingView Widget (iframe script) -->',
    '<div class="tradingview-widget-container">',
    '  <div class="tradingview-widget-container__widget"></div>',
    `  <script type="text/javascript" src="${widgetConfig.scriptUrl}" async>`,
    `${JSON.stringify(mergedConfig, null, 2)}`,
    '  </script>',
    '</div>'
  ].join('\n');
}

const tradingViewIntegrationGuide = {
  type: 'card',
  key: 'tradingview-integration-guide',
  size: 'lg',
  theme: 'light',
  background: '#ffffff',
  padding: 'lg',
  radius: 'lg',
  children: [
    {
      type: 'title',
      value: 'TradingView + ChatKit Integration Guide',
      size: 'xl',
      weight: 'bold'
    },
    {
      type: 'text',
      value: 'Use iframe-type TradingView widgets for maximum compatibility with backend-served ChatKit JSON widgets.',
      size: 'sm',
      color: '#64748b'
    },
    {
      type: 'divider',
      spacing: 'md'
    },
    {
      type: 'col',
      gap: 'sm',
      children: [
        { type: 'text', value: '1) Select an iframe widget in TradingView docs', size: 'sm' },
        { type: 'text', value: '2) Customize settings and copy generated embed snippet', size: 'sm' },
        { type: 'text', value: '3) Serve widget JSON from backend with embed metadata/snippet', size: 'sm' },
        { type: 'text', value: '4) Handle widget actions through /api/widget-action for dynamic updates', size: 'sm' }
      ]
    }
  ]
};

const tradingViewWidgetCatalog = {
  type: 'card',
  key: 'tradingview-widget-catalog',
  size: 'lg',
  theme: 'light',
  background: '#ffffff',
  padding: 'lg',
  radius: 'lg',
  children: [
    {
      type: 'title',
      value: 'TradingView Widget Catalog',
      size: 'xl',
      weight: 'bold'
    },
    {
      type: 'text',
      value: 'Choose a widget and request /api/widget/tradingview?widget=<key>&symbol=NASDAQ:AAPL to generate embed-ready payloads.',
      size: 'sm',
      color: '#64748b'
    },
    {
      type: 'divider',
      spacing: 'md'
    },
    {
      type: 'listView',
      key: 'tradingview-widget-list',
      children: tradingViewWidgetDirectory.map(entry => ({
        type: 'listViewItem',
        key: `tradingview-${entry.key}`,
        children: [
          {
            type: 'row',
            justify: 'between',
            align: 'center',
            gap: 'md',
            children: [
              {
                type: 'col',
                gap: 'xs',
                flex: 1,
                children: [
                  { type: 'text', value: entry.name, size: 'md', weight: 'semibold' },
                  { type: 'text', value: `${entry.category} • ${entry.format}`, size: 'sm', color: '#64748b' }
                ]
              },
              {
                type: 'button',
                label: 'Open docs',
                variant: 'outline',
                size: 'sm',
                onClickAction: {
                  type: 'navigate',
                  name: 'open_tradingview_docs',
                  parameters: {
                    widget: entry.key,
                    url: entry.docsUrl
                  }
                }
              }
            ]
          }
        ]
      }))
    }
  ]
};

function generateTradingViewEmbedWidget(widgetKey = 'advanced-chart', options = {}) {
  const selected = getTradingViewWidgetByKey(widgetKey) || getTradingViewWidgetByKey('advanced-chart');
  const embedCode = buildTradingViewEmbedCode(selected, options);

  return {
    type: 'card',
    key: `tradingview-${selected.key}`,
    size: 'lg',
    theme: 'light',
    background: '#ffffff',
    padding: 'lg',
    radius: 'lg',
    children: [
      {
        type: 'row',
        justify: 'between',
        align: 'start',
        children: [
          {
            type: 'col',
            gap: 'xs',
            children: [
              { type: 'title', value: selected.name, size: 'xl', weight: 'bold' },
              { type: 'text', value: `${selected.category} • ${selected.format}`, size: 'sm', color: '#64748b' }
            ]
          },
          {
            type: 'badge',
            label: selected.format === 'iframe' ? 'iframe compatible' : 'web component',
            color: selected.format === 'iframe' ? 'success' : 'info',
            variant: 'soft',
            pill: true
          }
        ]
      },
      {
        type: 'divider',
        spacing: 'md'
      },
      {
        type: 'text',
        value: 'Embed snippet (copy into your host page/container):',
        size: 'sm',
        weight: 'medium'
      },
      {
        type: 'markdown',
        value: `\`\`\`html\n${embedCode}\n\`\`\``
      },
      {
        type: 'row',
        gap: 'sm',
        children: [
          {
            type: 'button',
            label: 'Open TradingView docs',
            variant: 'outline',
            size: 'sm',
            onClickAction: {
              type: 'navigate',
              name: 'open_tradingview_docs',
              parameters: {
                widget: selected.key,
                url: selected.docsUrl
              }
            }
          },
          {
            type: 'button',
            label: 'Regenerate widget',
            style: 'primary',
            size: 'sm',
            onClickAction: {
              type: 'custom',
              name: 'regenerate_tradingview_widget',
              parameters: {
                widget: selected.key,
                symbol: options.symbol || 'NASDAQ:AAPL'
              }
            }
          }
        ]
      }
    ]
  };
}

module.exports = {
  contactForm,
  productCard,
  shoppingCart,
  successMessage,
  errorMessage,
  loadingWidget,
  paginationWidget,
  abletonLive12Suite,
  analysisWidget,
  lyricsWidget,
  audioWidget,
  youtubeThemesWidget,
  tradingViewWidgetDirectory,
  tradingViewIntegrationGuide,
  tradingViewWidgetCatalog,
  generateTradingViewEmbedWidget,
  getTradingViewWidgetByKey,
  buildTradingViewEmbedCode,
  createElevenLabsAgentEmbedCode,
  generateElevenLabsAgentWidget
};