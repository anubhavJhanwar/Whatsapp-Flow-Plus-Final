/* addContact.js — Add Contact pane entry point. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.addContactPane = {
  open: function() {
    var info = WaCRM.whatsappService.getContactInfo();
    if (info.nameFound || !info.number) return;

    var pane = document.getElementById(WaCRM.IDS.PANE_ADD_CONTACT);
    if (!pane) {
      pane = document.createElement('div');
      pane.id = WaCRM.IDS.PANE_ADD_CONTACT;
      pane.innerHTML = WaCRM.addContactTemplate.getHTML(info.name, info.number);
      document.body.appendChild(pane);
      WaCRM.addContactEvents.bind();
    } else {
      WaCRM.addContactLogic.refreshPaneData();
      pane.style.display = 'block';
    }
  },
  init: function() {
    WaCRM.paneManager.register('addContact', WaCRM.IDS.PANE_ADD_CONTACT, function() {
      WaCRM.addContactPane.open();
    });
  }
};
