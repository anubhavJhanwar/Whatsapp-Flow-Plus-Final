# WA Flow Plus — Modular Architecture

A professional Chrome Extension CRM layer injected into WhatsApp Web.  
Manifest V3 · Vanilla JS · No build tools · No npm dependencies.

---

## Project Structure

```
extension/
│
├── manifest.json                    # Chrome Extension config (MV3)
│
├── assets/
│   ├── icons/                       # icon1.png – icon9.png (sidebar + export)
│   ├── images/                      # Reserved for future images
│   └── fonts/                       # Reserved for custom fonts
│
├── styles/
│   ├── global.css                   # Body, wrapper, WhatsApp layout overrides
│   ├── topbar.css                   # CRM top navigation bar
│   ├── sidebar.css                  # Right-hand icon sidebar
│   ├── panes.css                    # Shared pane styles + toggle switch
│   ├── dashboard.css                # Admin Dashboard pane
│   ├── inventory.css                # Inventory pane
│   ├── settings.css                 # Settings pane overrides
│   └── animations.css               # Slide-in transitions, toast animations
│
├── content/
│   ├── main.js                      # Entry point — boots the extension
│   │
│   ├── core/
│   │   ├── constants.js             # All IDs, keys, class names, config
│   │   ├── selectors.js             # All WhatsApp DOM selectors (centralized)
│   │   ├── storage.js               # localStorage wrapper (get/set/remove)
│   │   ├── eventBus.js              # Pub/sub event bus
│   │   ├── dom.js                   # DOM utilities (query, createElement, etc.)
│   │   ├── utils.js                 # General helpers (toast, formatDate, etc.)
│   │   ├── paneManager.js           # Centralized pane open/close/toggle
│   │   ├── injector.js              # Idempotent DOM injection helpers
│   │   └── observers.js             # MutationObserver management
│   │
│   ├── ui/
│   │   ├── topbar/
│   │   │   ├── topbar.js            # Entry point
│   │   │   ├── topbar.template.js   # HTML template
│   │   │   └── topbar.events.js     # Button click handlers
│   │   │
│   │   ├── sidebar/
│   │   │   ├── sidebar.js           # Entry point
│   │   │   ├── sidebar.template.js  # Icon rendering
│   │   │   └── sidebar.events.js    # Icon click handlers
│   │   │
│   │   └── panes/
│   │       ├── chartRenderer.js     # Shared reusable donut chart (Canvas API)
│   │       │
│   │       ├── addContact/
│   │       │   ├── addContact.js            # Entry point + paneManager registration
│   │       │   ├── addContact.template.js   # HTML template
│   │       │   ├── addContact.events.js     # Close + submit handlers
│   │       │   └── addContact.logic.js      # Data refresh + contact save logic
│   │       │
│   │       ├── dashboard/
│   │       │   ├── dashboard.js             # Entry point + eventBus subscriptions
│   │       │   ├── dashboard.template.js    # HTML template
│   │       │   ├── dashboard.events.js      # All button/form handlers
│   │       │   ├── dashboard.logic.js       # History list rendering + mark-paid
│   │       │   ├── dashboard.filters.js     # Filter dropdown + date range
│   │       │   ├── dashboard.export.js      # Export icon + CSV download
│   │       │   └── dashboard.charts.js      # 4 donut charts rendering
│   │       │
│   │       ├── inventory/
│   │       │   ├── inventory.js             # Entry point + eventBus subscriptions
│   │       │   ├── inventory.template.js    # HTML template
│   │       │   ├── inventory.events.js      # Close + form handlers
│   │       │   ├── inventory.logic.js       # Input population + update handler
│   │       │   └── inventory.charts.js      # 2 donut charts + warnings
│   │       │
│   │       └── settings/
│   │           ├── settings.js              # Entry point
│   │           ├── settings.template.js     # HTML template
│   │           ├── settings.events.js       # Toggle handlers
│   │           └── settings.logic.js        # Blur + topbar visibility logic
│   │
│   ├── services/
│   │   ├── whatsapp.service.js      # All WhatsApp DOM reads + native triggers
│   │   ├── dashboard.service.js     # Transaction business logic
│   │   ├── inventory.service.js     # Inventory business logic
│   │   ├── contact.service.js       # Contact save logic (stub → CRM API)
│   │   └── export.service.js        # CSV generation + file download
│   │
│   └── state/
│       ├── appState.js              # Top-level init flags
│       ├── dashboardState.js        # Transactions CRUD + filter state
│       ├── inventoryState.js        # Stock levels + deduction
│       └── settingsState.js         # Blur + topbar visibility flags
│
└── popup/
    ├── popup.html                   # Extension popup window
    ├── popup.css                    # Popup styles
    └── popup.js                     # Popup script
```

---

## Installation

1. Copy your icon PNGs (`icon1.png` – `icon9.png`) into `assets/icons/`
2. Open Chrome → `chrome://extensions/`
3. Enable **Developer Mode**
4. Click **Load unpacked** → select the `extension/` folder
5. Open [WhatsApp Web](https://web.whatsapp.com)

---

## Architecture Principles

### Separation of Concerns
| Layer | Responsibility |
|---|---|
| `core/` | Infrastructure — storage, events, DOM, observers |
| `services/` | Business logic — no UI, no direct DOM rendering |
| `state/` | Data — reads/writes storage, emits events |
| `ui/` | Rendering — templates, event binding, chart drawing |

### Key Patterns

**EventBus** — modules communicate without importing each other:
```js
eventBus.emit(EVENTS.TRANSACTION_ADDED, tx);   // dashboard.service
eventBus.on(EVENTS.TRANSACTION_ADDED, render); // inventory.js listens
```

**PaneManager** — single API for all pane open/close/toggle:
```js
paneManager.toggle('dashboard');
paneManager.close('inventory');
```

**Centralized Selectors** — WhatsApp DOM changes break one file, not many:
```js
// selectors.js
CONTACT_NUMBER: '#main > header > div.x78zum5...'
```

**Idempotent Injection** — safe to call from MutationObserver repeatedly:
```js
if (byId(IDS.TOP_BAR)) return; // already injected
```

---

## Data Flow

```
User clicks sidebar icon
  → sidebar.events.js
    → paneManager.toggle('dashboard')
      → dashboard.js openDashboardPane()
        → dashboard.template.js (renders HTML)
        → dashboard.events.js (binds form)
          → dashboardService.addTransaction()
            → inventoryState.deduct()   ← auto stock deduction
            → dashboardState.addTransaction()
              → eventBus.emit(TRANSACTION_ADDED)
                → dashboard.js re-renders history + charts
                → inventory.js re-renders charts (if open)
```

---

## Scalability Roadmap

### 1. React Migration Path
The current architecture is already component-shaped.  
Each `pane/` folder maps 1:1 to a React component:
```
addContact/ → <AddContactPane />
dashboard/  → <DashboardPane />
```
Migration: replace `template.js` + `events.js` with JSX, keep `logic.js` and `services/` unchanged.

### 2. IndexedDB Migration
Replace `storage.js` internals only:
```js
// storage.js — swap localStorage for IndexedDB
export async function storageGet(key, defaultValue) { ... }
```
No other files change — they all call `storageGet/storageSet`.

### 3. Backend Sync (Firebase / Supabase)
Add a `sync.service.js` in `services/`:
```js
// On transaction added:
eventBus.on(EVENTS.TRANSACTION_ADDED, tx => syncService.push(tx));
```
Zero changes to existing modules.

### 4. Multi-Agent / Multi-User
Add `agentState.js` to `state/` — tracks which WhatsApp account is active.  
`whatsapp.service.js` already isolates all DOM reads, making per-agent context easy to add.

### 5. Build Tool Integration (Webpack / Vite)
The ES Module structure is already build-tool ready.  
Add a `vite.config.js` or `webpack.config.js` to bundle into a single `content.bundle.js` for production.  
Development can continue without any build step.
