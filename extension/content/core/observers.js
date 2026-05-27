/* observers.js — Centralized MutationObserver management. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.observers = {

  startSpaObserver: function() {
    var observer = new MutationObserver(function() {
      /* Re-inject topbar if WhatsApp SPA navigation removed it */
      if (!document.getElementById(WaCRM.IDS.TOP_BAR)) {
        WaCRM.injector.injectTopBar(WaCRM.topbarTemplate.getHTML());
        WaCRM.topbarEvents.bind();
      }
      /* Always re-sync topbar position in case WA re-rendered its left nav */
      WaCRM.injector.updateTopBarPosition();
    });
    observer.observe(document.body, { childList: true, subtree: false });
  },

  startUnsavedContactObserver: function() {
    var mainChat = document.querySelector(WaCRM.SELECTORS.MAIN_CHAT);
    if (!mainChat) return;

    var contactObserver = new MutationObserver(function() {
      var info = WaCRM.whatsappService.getContactInfo();
      if (!info.nameFound && info.number && WaCRM.whatsappService.isPhoneNumber(info.number)) {
        WaCRM.paneManager.open('addContact');
      }
    });
    contactObserver.observe(mainChat, { childList: true, subtree: true });
  },

  /**
   * Watch for window resize to re-sync topbar position.
   */
  startResizeObserver: function() {
    window.addEventListener('resize', function() {
      WaCRM.injector.updateTopBarPosition();
    });
  }
};
