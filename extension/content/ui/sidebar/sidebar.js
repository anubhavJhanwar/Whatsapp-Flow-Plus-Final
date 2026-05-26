/* sidebar.js — Sidebar entry point. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.sidebar = {
  init: function() {
    WaCRM.injector.injectSidebar();
    var sidebar = document.getElementById(WaCRM.IDS.RIGHT_SIDEBAR);
    if (sidebar) {
      WaCRM.sidebarTemplate.render(sidebar);
      WaCRM.sidebarEvents.bind();
    }
  }
};
