/* settings.events.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.settingsEvents = {
  bind: function() {
    var IDS = WaCRM.IDS;
    var closeBtn       = document.getElementById(IDS.SETTINGS_CLOSE);
    var hideChatToggle = document.getElementById(IDS.TOGGLE_HIDE_CHAT);
    var hideTopToggle  = document.getElementById(IDS.TOGGLE_HIDE_TOPBAR);

    if (closeBtn) {
      closeBtn.onclick = function() { WaCRM.paneManager.close('settings'); };
    }
    if (hideChatToggle) {
      hideChatToggle.onchange = function() { WaCRM.settingsLogic.applyChatListBlur(this.checked); };
    }
    if (hideTopToggle) {
      hideTopToggle.onchange = function() { WaCRM.settingsLogic.applyTopBarVisibility(this.checked); };
    }
  }
};
