/* addContact.events.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.addContactEvents = {
  bind: function() {
    var IDS = WaCRM.IDS;
    var closeBtn  = document.getElementById(IDS.AC_CLOSE_BTN);
    var createBtn = document.getElementById(IDS.AC_CREATE_BTN);
    if (closeBtn) {
      closeBtn.onclick = function() { WaCRM.paneManager.close('addContact'); };
    }
    if (createBtn) {
      createBtn.onclick = function() {
        WaCRM.addContactLogic.handleAddContact();
        WaCRM.paneManager.close('addContact');
      };
    }
  }
};
