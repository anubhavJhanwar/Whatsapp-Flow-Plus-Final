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
  TOP_BTN:       'wa-crm-top-btn',
  LOGO_ITEM:     'wa-crm-logo-item',
  MARK_PAID:     'wa-crm-mark-paid',
  HISTORY_ROW:   'wa-crm-dashboard-history-row',
  PAID_BADGE:    'wa-crm-dashboard-paid',
  UNPAID_BADGE:  'wa-crm-dashboard-unpaid',
  SETTINGS_ROW:  'wa-crm-settings-row',
  SETTINGS_LABEL:'wa-crm-settings-label',
  SWITCH:        'wa-crm-switch',
  SLIDER:        'wa-crm-slider',
};

WaCRM.PRODUCTS = { PRODUCT_1: 'Product 1', PRODUCT_2: 'Product 2' };
WaCRM.LOW_STOCK_THRESHOLD = 5;
WaCRM.CSV_FILENAME = 'transactions.csv';

WaCRM.SIDEBAR_ICONS = [
  { src: 'assets/icons/icon1.png', id: 'sidebar-icon-home',         tooltip: 'Home' },
  { src: 'assets/icons/icon2.png', id: 'sidebar-icon-notification', tooltip: 'Notifications' },
  { src: 'assets/icons/icon3.png', id: 'sidebar-icon-contact',      tooltip: 'Contacts' },
  { src: 'assets/icons/icon4.png', id: 'sidebar-icon-contactBook',  tooltip: 'Inventory' },
  { src: 'assets/icons/icon5.png', id: 'sidebar-icon-addContact',   tooltip: 'Add Contact' },
  { src: 'assets/icons/icon6.png', id: 'sidebar-icon-settings',     tooltip: 'Settings' },
  { src: 'assets/icons/icon7.png', id: 'sidebar-icon-refresh',      tooltip: 'Refresh' },
  { src: 'assets/icons/icon8.png', id: 'sidebar-icon-adminPanel',   tooltip: 'Admin Dashboard' },
];

WaCRM.EVENTS = {
  TRANSACTION_ADDED:   'transactionAdded',
  TRANSACTION_UPDATED: 'transactionUpdated',
  TRANSACTIONS_RESET:  'transactionsReset',
  INVENTORY_UPDATED:   'inventoryUpdated',
  PANE_OPENED:         'paneOpened',
  PANE_CLOSED:         'paneClosed',
};
