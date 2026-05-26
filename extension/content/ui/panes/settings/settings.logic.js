/* settings.logic.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.settingsLogic = {
  applyChatListBlur: function(enabled) {
    WaCRM.settingsState.blurEnabled = enabled;
    var chatList = WaCRM.whatsappService.getChatListElement();
    if (chatList) chatList.style.filter = enabled ? 'blur(6px)' : '';
  },
  applyTopBarVisibility: function(hidden) {
    WaCRM.settingsState.topBarHidden = hidden;
    var topBar = document.getElementById(WaCRM.IDS.TOP_BAR);
    if (topBar) topBar.style.display = hidden ? 'none' : '';
  }
};
