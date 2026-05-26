/* observers.js — Centralized MutationObserver management. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.observers = {
  /* Re-inject top bar if WhatsApp's SPA navigation removes it */
  startSpaObserver: function() {
    var observer = new MutationObserver(function() {
      if (!document.getElementById(WaCRM.IDS.TOP_BAR)) {
        WaCRM.injector.injectTopBar(WaCRM.topbarTemplate.getHTML());
        WaCRM.topbarEvents.bind();
      }
    });
    observer.observe(document.body, { childList: true, subtree: false });
  },

  /* Auto-open Add Contact pane for unsaved numbers */
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
  }
};
