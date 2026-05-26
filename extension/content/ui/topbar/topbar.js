/* topbar.js — Top bar entry point. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.topbar = {
  init: function() {
    WaCRM.injector.injectTopBar(WaCRM.topbarTemplate.getHTML());
    WaCRM.topbarEvents.bind();
  }
};
