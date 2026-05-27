/* main.js — Extension entry point. Boots the entire CRM layer. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

function initExtension() {
  if (WaCRM.appState.initialized) return;

  /* 1. Inject layout */
  WaCRM.injector.injectWrapper();
  WaCRM.topbar.init();
  WaCRM.sidebar.init();

  /* 2. Register all panes with paneManager */
  WaCRM.addContactPane.init();
  WaCRM.settingsPane.init();
  WaCRM.dashboardPane.init();
  WaCRM.inventoryPane.init();

  /* 3. Start observers */
  WaCRM.observers.startSpaObserver();
  WaCRM.observers.startUnsavedContactObserver();
  WaCRM.observers.startResizeObserver();

  WaCRM.appState.initialized = true;
  console.log('[WA CRM] Extension initialized.');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExtension);
} else {
  initExtension();
}
