# Widget Examples

This directory contains practical examples of ChatKit widgets for various use cases.

## Product Showcase Example

A complete product showcase with interactive cards, detailed views, and shopping cart functionality.

### Features
- Product grid layout with images and descriptions
- Add to cart functionality
- Real-time inventory updates
- Product detail modals
- Shopping cart with quantity management

### Usage
```javascript
// Get product showcase widget
const response = await fetch('/api/widget/products?category=electronics');
const { widget } = await response.json();

// Display widget in ChatKit
chatkit.displayWidget(widget);
```

## E-commerce Shopping Cart

Advanced shopping cart widget with item management, pricing calculations, and checkout flow.

### Features
- Item quantity adjustment
- Price calculations with tax
- Remove item functionality
- Empty cart state
- Checkout button with total

### Usage
```javascript
// Get cart widget
const response = await fetch('/api/widget/cart');
const { widget } = await response.json();

// Handle cart actions
chatkit.setOptions({
  widgets: {
    async onAction(action, item) {
      if (action.name === 'add_to_cart') {
        await fetch('/api/widget-action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, itemId: item.id })
        });
      }
    }
  }
});
```

## Contact Form with Validation

Multi-step contact form with validation, file uploads, and confirmation.

### Features
- Form validation
- Multiple input types (text, select, date)
- Required field indicators
- Success/error messaging
- Email format validation

### Usage
```javascript
// Get contact form widget
const response = await fetch('/api/widget/contact-form');
const { widget } = await response.json();

// Handle form submission
chatkit.setOptions({
  widgets: {
    async onAction(action, item) {
      if (action.name === 'submit_contact_form') {
        const formData = extractFormData(item);
        await fetch('/api/widget-action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, formData })
        });
      }
    }
  }
});
```

## Real-time Dashboard

Live dashboard with real-time data updates, charts, and interactive controls.

### Features
- Real-time data visualization
- Interactive controls
- Live status indicators
- Performance metrics
- Auto-refreshing content

### Usage
```javascript
// Setup real-time connection
const socket = io('http://localhost:3000');
socket.emit('join-room', 'dashboard');

// Listen for real-time updates
socket.on('data-updated', (data) => {
  updateDashboard(data);
});

// Get dashboard widget
const response = await fetch('/api/widget/dashboard');
const { widget } = await response.json();
```

## Interactive Survey

Multi-question survey with progress tracking and conditional logic.

### Features
- Multiple question types
- Progress bar
- Conditional question flow
- Result summary
- Response validation

### Usage
```javascript
// Get survey widget
const response = await fetch('/api/widget/survey');
const { widget } = await response.json();

// Track survey progress
let currentQuestion = 0;
const totalQuestions = widget.children.length;

chatkit.setOptions({
  widgets: {
    async onAction(action, item) {
      if (action.name === 'next_question') {
        currentQuestion++;
        updateProgress(currentQuestion / totalQuestions);
      }
    }
  }
});
```

## Notification Center

Notification management system with different types and actions.

### Features
- Multiple notification types (success, warning, error, info)
- Dismiss functionality
- Action buttons
- Timestamp display
- Priority sorting

### Usage
```javascript
// Get notifications widget
const response = await fetch('/api/widget/notifications');
const { widget } = await response.json();

// Handle notification actions
chatkit.setOptions({
  widgets: {
    async onAction(action, item) {
      if (action.name === 'dismiss_notification') {
        await fetch('/api/widget-action', {
          method: 'POST',
          body: JSON.stringify({
            action,
            itemId: action.parameters.notificationId
          })
        });
      }
    }
  }
});
```

## Media Gallery

Image and video gallery with preview, filtering, and pagination.

### Features
- Grid and list view modes
- Image/video previews
- Category filtering
- Pagination controls
- Lightbox functionality

### Usage
```javascript
// Get gallery widget with pagination
const response = await fetch('/api/widget/gallery?page=1&limit=12');
const { widget } = await response.json();

// Handle media interactions
chatkit.setOptions({
  widgets: {
    async onAction(action, item) {
      if (action.name === 'view_media') {
        showLightbox(action.parameters.mediaUrl);
      } else if (action.name === 'paginate') {
        loadPage(action.parameters.page);
      }
    }
  }
});
```

## Settings Panel

Configuration interface with various input types and sections.

### Features
- Grouped settings sections
- Toggle switches
- Slider controls
- Color pickers
- Save/reset functionality

### Usage
```javascript
// Get settings widget
const response = await fetch('/api/widget/settings');
const { widget } = await response.json();

// Handle settings changes
chatkit.setOptions({
  widgets: {
    async onAction(action, item) {
      if (action.name === 'save_settings') {
        const settings = extractFormData(item);
        await saveSettings(settings);
        showNotification('Settings saved successfully');
      }
    }
  }
});
```

## Event Calendar

Interactive calendar with event management and scheduling.

### Features
- Month/week/day views
- Event creation and editing
- Time slot selection
- Recurring events
- Conflict detection

### Usage
```javascript
// Get calendar widget
const response = await fetch('/api/widget/calendar?month=2025-10');
const { widget } = await response.json();

// Handle calendar interactions
chatkit.setOptions({
  widgets: {
    async onAction(action, item) {
      if (action.name === 'create_event') {
        const eventData = {
          title: action.parameters.title,
          date: action.parameters.date,
          time: action.parameters.time
        };
        await createEvent(eventData);
      }
    }
  }
});
```

## File Upload Interface

Drag-and-drop file upload with progress and validation.

### Features
- Drag-and-drop area
- Multiple file selection
- Upload progress bars
- File type validation
- Preview thumbnails

### Usage
```javascript
// Get file upload widget
const response = await fetch('/api/widget/file-upload');
const { widget } = await response.json();

// Handle file uploads
chatkit.setOptions({
  widgets: {
    async onAction(action, item) {
      if (action.name === 'upload_files') {
        const files = action.parameters.files;
        for (const file of files) {
          await uploadFile(file);
        }
      }
    }
  }
});
```

## Integration Examples

### React Integration
```jsx
import { useEffect, useState } from 'react';
import ChatKit from '@chatkit/react';

function ChatKitWidgets() {
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    // Load initial widgets
    loadWidgets();
    
    // Setup real-time updates
    const socket = io();
    socket.on('widget-updated', updateWidget);
    
    return () => socket.disconnect();
  }, []);

  const loadWidgets = async () => {
    const response = await fetch('/api/widget/products');
    const { widget } = await response.json();
    setWidgets([widget]);
  };

  const handleWidgetAction = async (action, item) => {
    await fetch('/api/widget-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, itemId: item.id })
    });
  };

  return (
    <ChatKit
      widgets={widgets}
      onAction={handleWidgetAction}
    />
  );
}
```

### Vue.js Integration
```vue
<template>
  <div id="chatkit-container">
    <ChatKitWidget
      v-for="widget in widgets"
      :key="widget.key"
      :config="widget"
      @action="handleAction"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ChatKitWidget from '@chatkit/vue';

export default {
  components: { ChatKitWidget },
  setup() {
    const widgets = ref([]);

    const loadWidgets = async () => {
      const response = await fetch('/api/widget/products');
      const { widget } = await response.json();
      widgets.value = [widget];
    };

    const handleAction = async (action, item) => {
      await fetch('/api/widget-action', {
        method: 'POST',
        body: JSON.stringify({ action, itemId: item.id })
      });
    };

    onMounted(loadWidgets);

    return { widgets, handleAction };
  }
};
</script>
```

### Angular Integration
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-chatkit-widgets',
  template: `
    <div *ngFor="let widget of widgets">
      <chatkit-widget 
        [config]="widget"
        (action)="handleAction($event)">
      </chatkit-widget>
    </div>
  `
})
export class ChatKitWidgetsComponent implements OnInit, OnDestroy {
  widgets: any[] = [];
  private socket: Socket;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadWidgets();
    this.socket = io();
    this.socket.on('widget-updated', this.updateWidget.bind(this));
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  async loadWidgets() {
    const response = await this.http.get('/api/widget/products').toPromise();
    this.widgets = [response.widget];
  }

  async handleAction(event: { action: any, item: any }) {
    await this.http.post('/api/widget-action', {
      action: event.action,
      itemId: event.item.id
    }).toPromise();
  }

  updateWidget(data: any) {
    // Update widget in the array
    const index = this.widgets.findIndex(w => w.key === data.key);
    if (index !== -1) {
      this.widgets[index] = data.widget;
    }
  }
}
```

---

For more detailed implementation guides, see the [main documentation](../README.md) and [API reference](./API.md).