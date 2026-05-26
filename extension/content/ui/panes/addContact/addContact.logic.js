/* addContact.logic.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.addContactLogic = {
  refreshPaneData: function() {
    var info    = WaCRM.whatsappService.getContactInfo();
    var IDS     = WaCRM.IDS;
    var nameEl  = document.getElementById(IDS.AC_PANE_NAME);
    var numEl   = document.getElementById(IDS.AC_PANE_NUMBER);
    var inputEl = document.getElementById(IDS.AC_NAME_INPUT);
    if (nameEl)  nameEl.textContent  = info.name   || '';
    if (numEl)   numEl.textContent   = info.number || '';
    if (inputEl) { inputEl.value = info.name || ''; inputEl.placeholder = 'Enter name'; }
  },
  handleAddContact: function() {
    var nameInput = document.getElementById(WaCRM.IDS.AC_NAME_INPUT);
    var numberEl  = document.getElementById(WaCRM.IDS.AC_PANE_NUMBER);
    var name   = nameInput ? nameInput.value.trim()      : '';
    var number = numberEl  ? numberEl.textContent.trim() : '';
    WaCRM.contactService.saveContact(name, number);
  }
};
