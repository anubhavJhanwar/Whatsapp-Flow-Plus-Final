/* injector.js — Idempotent DOM injection. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.injector = {
  injectTopBar: function(innerHTML) {
    if (document.getElementById(WaCRM.IDS.TOP_BAR)) return;
    var waApp = document.querySelector(WaCRM.SELECTORS.WA_APP);
    if (!waApp) return;
    var topBar = document.createElement('div');
    topBar.id = WaCRM.IDS.TOP_BAR;
    topBar.innerHTML = innerHTML;
    waApp.parentNode.insertBefore(topBar, waApp);
  },
  injectSidebar: function() {
    if (document.getElementById(WaCRM.IDS.RIGHT_SIDEBAR)) return;
    var sidebar = document.createElement('div');
    sidebar.id = WaCRM.IDS.RIGHT_SIDEBAR;
    document.body.appendChild(sidebar);
  },
  injectWrapper: function() {
    var waApp = document.querySelector(WaCRM.SELECTORS.WA_APP);
    if (!waApp || document.getElementById(WaCRM.IDS.WA_WRAPPER)) return;
    var wrapper = document.createElement('div');
    wrapper.id = WaCRM.IDS.WA_WRAPPER;
    waApp.parentNode.insertBefore(wrapper, waApp);
    wrapper.appendChild(waApp);
  }
};
