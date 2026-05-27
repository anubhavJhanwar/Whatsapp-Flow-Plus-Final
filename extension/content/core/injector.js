/* injector.js — Idempotent DOM injection with dynamic left-nav detection. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.injector = {

  /**
   * Detect WhatsApp's left icon navigation panel width dynamically.
   * WhatsApp has a ~72px left nav with icons (chats, status, channels, etc.)
   * We measure it so our topbar starts exactly where WhatsApp's content starts.
   * @returns {number} width in px
   */
  getWALeftNavWidth: function() {
    /* WhatsApp's left icon nav — try multiple selectors */
    var leftNav =
      document.querySelector('[data-testid="navigation-bar-side"]') ||
      document.querySelector('div[style*="width: 72px"]') ||
      document.querySelector('#app > div > div > div:first-child > div:first-child');

    if (leftNav) {
      var w = leftNav.getBoundingClientRect().width;
      if (w > 0 && w < 200) return Math.round(w);
    }

    /* Fallback: measure the gap between left edge and the chat list panel */
    var paneLeft = document.querySelector('#pane-side');
    if (paneLeft) {
      var rect = paneLeft.getBoundingClientRect();
      if (rect.left > 0 && rect.left < 200) return Math.round(rect.left);
    }

    return 72; /* safe default */
  },

  /**
   * Update the topbar position based on current left nav width.
   * Called on init and on resize.
   */
  updateTopBarPosition: function() {
    var topBar = document.getElementById(WaCRM.IDS.TOP_BAR);
    if (!topBar) return;
    var leftW = this.getWALeftNavWidth();
    topBar.style.left  = leftW + 'px';
    topBar.style.width = 'calc(100vw - ' + leftW + 'px - 60px)';

    /* Also update filter badge if visible */
    var badge = document.getElementById('wa-crm-filter-badge');
    if (badge) {
      badge.style.left  = leftW + 'px';
      badge.style.width = 'calc(100vw - ' + leftW + 'px - 60px)';
    }
  },

  injectTopBar: function(innerHTML) {
    if (document.getElementById(WaCRM.IDS.TOP_BAR)) return;
    var waApp = document.querySelector(WaCRM.SELECTORS.WA_APP);
    if (!waApp) return;
    var topBar = document.createElement('div');
    topBar.id = WaCRM.IDS.TOP_BAR;
    topBar.innerHTML = innerHTML;
    document.body.appendChild(topBar); /* append to body so it's not inside WA's DOM tree */

    /* Position dynamically after a short delay to let WA render its nav */
    var self = this;
    setTimeout(function() { self.updateTopBarPosition(); }, 300);
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
