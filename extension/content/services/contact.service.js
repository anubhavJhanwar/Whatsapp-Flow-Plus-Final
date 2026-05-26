/* contact.service.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.contactService = {
  saveContact: function(name, number) {
    WaCRM.utils.showToast('Contact added successfully!');
  }
};
