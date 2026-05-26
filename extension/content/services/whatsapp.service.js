/* whatsapp.service.js — All WhatsApp DOM reads and filter triggers. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.whatsappService = {

  /* ── Contact info ─────────────────────────────────────── */
  getContactInfo: function() {
    /* Name: first span[dir=auto] in main header */
    var nameElem = document.querySelector('#main > header span[dir="auto"]');
    /* Number: look for a span that contains only digits/+ in header */
    var numberElem = null;
    var headerSpans = document.querySelectorAll('#main > header span[dir="auto"]');
    for (var i = 0; i < headerSpans.length; i++) {
      var t = headerSpans[i].textContent.trim();
      if (/^[+\d\s\-()]{7,}$/.test(t)) { numberElem = headerSpans[i]; break; }
    }
    var name   = nameElem   ? nameElem.textContent.trim()   : '';
    var number = numberElem ? numberElem.textContent.trim() : '';
    /* nameFound = true if name exists and is NOT a phone number */
    var nameFound = !!(name && !/^[+\d\s\-()]{7,}$/.test(name));
    return { name: name, number: number, nameFound: nameFound };
  },

  getActiveChatName: function() {
    var el = document.querySelector('#main > header span[dir="auto"]');
    return el ? el.textContent.trim() : '';
  },

  isPhoneNumber: function(str) {
    return /^\d{7,}$/.test((str || '').replace(/\D/g, ''));
  },

  /* ── Filter triggers ──────────────────────────────────── */

  /**
   * Click a WhatsApp filter tab by its visible label text.
   * Uses multiple fallback strategies to find the real DOM element.
   * @param {string} label - 'All' | 'Unread' | 'Groups' | 'Favourites'
   */
  triggerFilter: function(label) {
    var el = WaCRM.findWhatsAppTab(label);
    if (el) {
      el.click();
      return true;
    }
    console.warn('[WA CRM] Could not find WhatsApp tab:', label);
    return false;
  },

  triggerAllFilter:    function() { this.triggerFilter('All'); },
  triggerUnreadFilter: function() { this.triggerFilter('Unread'); },
  triggerGroupFilter:  function() { this.triggerFilter('Groups'); },
  triggerFavFilter:    function() { this.triggerFilter('Favourites'); },

  /* ── Chat list ────────────────────────────────────────── */
  getChatListElement: function() {
    return document.querySelector(WaCRM.SELECTORS.CHAT_LIST_PRIMARY)
        || document.querySelector(WaCRM.SELECTORS.CHAT_LIST_FALLBACK);
  }
};
