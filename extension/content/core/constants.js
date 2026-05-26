/* constants.js — Central config. No imports needed. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.STORAGE_KEYS = {
  TRANSACTIONS: 'waCrmDashboardTransactions',
  INVENTORY:    'waCrmInventory',
};

WaCRM.IDS = {
  TOP_BAR:           'wa-crm-top-bar',
  RIGHT_SIDEBAR:     'wa-crm-right-sidebar',
  WA_WRAPPER:        'wa-crm-wa-wrapper',
  ICON_HOME:         'sidebar-icon-home',
  ICON_NOTIFICATION: 'sidebar-icon-notification',
  ICON_CONTACT:      'sidebar-icon-contact',
  ICON_CONTACT_BOOK: 'sidebar-icon-contactBook',
  ICON_ADD_CONTACT:  'sidebar-icon-addContact',
  ICON_SETTINGS:     'sidebar-icon-settings',
  ICON_REFRESH:      'sidebar-icon-refresh',
  ICON_ADMIN:        'sidebar-icon-adminPanel',
  BTN_ALL:           'wa-crm-dashboard-btn',
  BTN_UNREAD:        'wa-crm-tickets-btn',
  BTN_ACTIVE:        'wa-crm-settings-btn',
  BTN_DUES:          'wa-crm-closed-btn',
  BTN_FOLLOWUP:      'wa-crm-followup-btn',
  BTN_RESPOND:       'wa-crm-respond-btn',
  BTN_UNKNOWN:       'wa-crm-unknown-btn',
  BTN_GROUPS:        'wa-crm-groups-btn',
  BTN_BUSINESSES:    'wa-crm-businesses-btn',
  BTN_BRANDS:        'wa-crm-brands-btn',
  PANE_ADD_CONTACT:  'wa-crm-add-contact-pane',
  PANE_SETTINGS:     'wa-crm-settings-pane',
  PANE_DASHBOARD:    'wa-crm-dashboard-pane',
  PANE_INVENTORY:    'wa-crm-inventory-pane',
  DASHBOARD_HISTORY:   'wa-crm-dashboard-history',
  DASHBOARD_FORM:      'wa-crm-dashboard-form',
  DASHBOARD_FILTER:    'wa-crm-dashboard-filter',
  DASHBOARD_DATE_FROM: 'wa-crm-dashboard-date-from',
  DASHBOARD_DATE_TO:   'wa-crm-dashboard-date-to',
  DASHBOARD_RATE:      'wa-crm-dashboard-rate',
  DASHBOARD_QTY:       'wa-crm-dashboard-qty',
  DASHBOARD_PRODUCT:   'wa-crm-dashboard-product',
  DASHBOARD_PAID:      'wa-crm-dashboard-paid',
  DASHBOARD_EXPORT:    'wa-crm-dashboard-export-icon',
  DASHBOARD_RESET:     'wa-crm-dashboard-reset-icon',
  DASHBOARD_CLOSE:     'wa-crm-dashboard-close-icon',
  PIE_PAID:            'wa-crm-dashboard-pie-paid',
  PIE_UNPAID:          'wa-crm-dashboard-pie-unpaid',
  PIE_PRODUCT1:        'wa-crm-dashboard-pie-product1',
  PIE_PRODUCT2:        'wa-crm-dashboard-pie-product2',
  INV_FORM:            'wa-crm-inventory-form',
  INV_INPUT_P1:        'wa-crm-inventory-product1',
  INV_INPUT_P2:        'wa-crm-inventory-product2',
  INV_CANVAS_P1:       'wa-crm-inventory-pie-product1',
  INV_CANVAS_P2:       'wa-crm-inventory-pie-product2',
  INV_LABEL_P1:        'wa-crm-inventory-label-product1',
  INV_LABEL_P2:        'wa-crm-inventory-label-product2',
  INV_WARN_P1:         'wa-crm-inventory-warning-product1',
  INV_WARN_P2:         'wa-crm-inventory-warning-product2',
  AC_PANE_NAME:        'wa-crm-pane-name',
  AC_PANE_NUMBER:      'wa-crm-pane-number',
  AC_NAME_INPUT:       'wa-crm-contact-name-input',
  AC_CREATE_BTN:       'wa-crm-create-contact-btn',
  AC_CLOSE_BTN:        'wa-crm-close-pane',
  SETTINGS_CLOSE:      'wa-crm-close-settings-pane',
  TOGGLE_HIDE_CHAT:    'wa-crm-toggle-hide-chat-list',
  TOGGLE_HIDE_TOPBAR:  'wa-crm-toggle-hide-top-bar',
};

WaCRM.CLASSES = {
  TOP_BTN:        'wa-crm-top-btn',
  LOGO_ITEM:      'wa-crm-logo-item',
  MARK_PAID:      'wa-crm-mark-paid',
  HISTORY_ROW:    'wa-crm-dashboard-history-row',
  PAID_BADGE:     'wa-crm-dashboard-paid',
  UNPAID_BADGE:   'wa-crm-dashboard-unpaid',
  SETTINGS_ROW:   'wa-crm-settings-row',
  SETTINGS_LABEL: 'wa-crm-settings-label',
  SWITCH:         'wa-crm-switch',
  SLIDER:         'wa-crm-slider',
};

WaCRM.PRODUCTS = { PRODUCT_1: 'Product 1', PRODUCT_2: 'Product 2' };
WaCRM.LOW_STOCK_THRESHOLD = 5;
WaCRM.CSV_FILENAME = 'transactions.csv';

/*
 * SIDEBAR_ICONS — inline SVG icons, no PNG files needed.
 * Each icon has: id, tooltip, svg (inline SVG string)
 */
WaCRM.SIDEBAR_ICONS = [
  {
    id: 'sidebar-icon-home',
    tooltip: 'Home — All Chats',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'
  },
  {
    id: 'sidebar-icon-notification',
    tooltip: 'Notifications',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>'
  },
  {
    id: 'sidebar-icon-contact',
    tooltip: 'Contacts',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
  },
  {
    id: 'sidebar-icon-contactBook',
    tooltip: 'Inventory Manager',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="6" y1="8" x2="18" y2="8"/><line x1="6" y1="12" x2="14" y2="12"/></svg>'
  },
  {
    id: 'sidebar-icon-addContact',
    tooltip: 'Add Unknown Contact',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>'
  },
  {
    id: 'sidebar-icon-settings',
    tooltip: 'Utilities & Settings',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
  },
  {
    id: 'sidebar-icon-refresh',
    tooltip: 'Refresh Page',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>'
  },
  {
    id: 'sidebar-icon-adminPanel',
    tooltip: 'Admin Dashboard',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>'
  },
];

WaCRM.EVENTS = {
  TRANSACTION_ADDED:   'transactionAdded',
  TRANSACTION_UPDATED: 'transactionUpdated',
  TRANSACTIONS_RESET:  'transactionsReset',
  INVENTORY_UPDATED:   'inventoryUpdated',
  PANE_OPENED:         'paneOpened',
  PANE_CLOSED:         'paneClosed',
};
