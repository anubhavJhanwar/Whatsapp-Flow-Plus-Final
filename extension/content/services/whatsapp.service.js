/* whatsapp.service.js — All WhatsApp DOM reads. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.whatsappService = {
  getContactInfo: function() {
    var numberElem = document.querySelector(WaCRM.SELECTORS.CONTACT_NUMBER);
    var nameElem   = document.querySelector(WaCRM.SELECTORS.CONTACT_NAME);
    var number     = numberElem ? numberElem.textContent.trim() : '';
    var name       = nameElem   ? nameElem.textContent.trim()   : '';
    return { name: name, number: number, nameFound: !!(nameElem && name) };
  },
  getActiveChatName: function() {
    var el = document.querySelector(WaCRM.SELECTORS.ACTIVE_CHAT_NAME);
    return el ? el.textContent.trim() : '';
  },
  isPhoneNumber: function(str) {
    return /^\d{7,}$/.test((str || '').replace(/\D/g, ''));
  },
  triggerAllFilter: function() {
    var el = document.querySelector(WaCRM.SELECTORS.NATIVE_ALL_FILTER);
    if (el) el.click();
  },
  triggerUnreadFilter: function() {
    var el = document.querySelector(WaCRM.SELECTORS.NATIVE_UNREAD_FILTER);
    if (el) el.click();
  },
  triggerGroupFilter: function() {
    var el = document.querySelector(WaCRM.SELECTORS.NATIVE_GROUP_FILTER);
    if (el) el.click();
  },
  getChatListElement: function() {
    return document.querySelector(WaCRM.SELECTORS.CHAT_LIST_PRIMARY)
        || document.querySelector(WaCRM.SELECTORS.CHAT_LIST_FALLBACK);
  }
};
