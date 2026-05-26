/* selectors.js — All WhatsApp DOM selectors in one place. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.SELECTORS = {
  WA_APP:    '#app',
  MAIN_CHAT: '#main',

  /* Contact info in active chat header */
  CONTACT_NUMBER:   '#main > header span[dir="auto"]',
  CONTACT_NAME:     '#main > header span[dir="auto"]',
  ACTIVE_CHAT_NAME: '#main > header span[dir="auto"]',

  /* WhatsApp filter tabs — target by aria-label or data-tab */
  /* These are the real selectors WhatsApp uses for its tab bar */
  FILTER_TAB_BAR:   '#pane-side [data-tab]',

  /* Chat list panel — used for blur toggle */
  CHAT_LIST_PRIMARY:  '#pane-side',
  CHAT_LIST_FALLBACK: '[data-testid="chat-list"]',
};

/**
 * Find a WhatsApp filter tab by its visible text label.
 * WhatsApp renders tabs like: All, Unread, Favourites, Groups
 * We find them by scanning the tab bar for matching text.
 * @param {string} label - e.g. 'All', 'Unread', 'Groups'
 * @returns {Element|null}
 */
WaCRM.findWhatsAppTab = function(label) {
  /* Strategy 1: aria-label match */
  var byAria = document.querySelector('[aria-label="' + label + '"]');
  if (byAria) return byAria;

  /* Strategy 2: scan all buttons/spans in the filter tab area for text match */
  var tabArea = document.querySelector('#pane-side');
  if (!tabArea) return null;

  var allBtns = tabArea.querySelectorAll('button, [role="tab"], [role="button"]');
  for (var i = 0; i < allBtns.length; i++) {
    var text = allBtns[i].textContent.trim();
    if (text === label || text.toLowerCase() === label.toLowerCase()) {
      return allBtns[i];
    }
  }

  /* Strategy 3: scan entire document for the tab text in known tab containers */
  var allSpans = document.querySelectorAll('[data-tab] span, [role="tab"] span');
  for (var j = 0; j < allSpans.length; j++) {
    if (allSpans[j].textContent.trim().toLowerCase() === label.toLowerCase()) {
      return allSpans[j].closest('[data-tab], [role="tab"], button');
    }
  }

  return null;
};
