/* chatFilter.service.js
 * DOM-based chat list filtering for custom CRM filters.
 * Handles: Businesses, Brands, Unknown, Active, Dues, Followup, Respond.
 *
 * Strategy:
 *  - Read all chat rows from WhatsApp's DOM chat list
 *  - Detect business/brand accounts by:
 *      1. WhatsApp business badge SVG presence in the chat row
 *      2. Known brand keyword list
 *      3. User-saved manual tags (localStorage)
 *  - Show/hide rows based on active filter
 *  - "All" restores all rows
 */

var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

/* ── Known brand/business keywords (auto-detection) ── */
WaCRM.BRAND_KEYWORDS = [
  'zomato','swiggy','rapido','ola','uber','amazon','flipkart','myntra',
  'nykaa','meesho','blinkit','zepto','dunzo','bigbasket','grofers',
  'phonepe','paytm','gpay','google pay','hdfc','icici','sbi','axis',
  'airtel','jio','vi','vodafone','bsnl','dominos','pizza hut','kfc',
  'mcdonalds','subway','starbucks','netflix','hotstar','spotify',
  'instagram','facebook','twitter','linkedin','youtube','whatsapp',
  'bank','insurance','hospital','clinic','pharmacy','courier',
  'bluedart','delhivery','dtdc','fedex','dhl','indiapost',
  'irctc','makemytrip','goibibo','yatra','cleartrip','booking',
  'oyo','treebo','fabhotels','lenskart','1mg','practo','apollo',
  'tata','reliance','adani','infosys','wipro','tcs','hcl',
  'byju','unacademy','vedantu','upgrad','coursera',
];

WaCRM.chatFilterService = {

  /* ── Active filter state ── */
  _activeFilter: 'all',

  /* ── Manual tags storage key ── */
  _TAGS_KEY: 'waCrmChatTags',

  /* ── Get all manual tags ── */
  getTags: function() {
    return WaCRM.storage.get(this._TAGS_KEY, {});
    /* Format: { "Contact Name": "business" | "brand" | "unknown" | "active" | "dues" | "followup" | "respond" } */
  },

  /* ── Save a tag for a contact name ── */
  setTag: function(contactName, tag) {
    var tags = this.getTags();
    tags[contactName.toLowerCase()] = tag;
    WaCRM.storage.set(this._TAGS_KEY, tags);
  },

  /* ── Remove a tag ── */
  removeTag: function(contactName) {
    var tags = this.getTags();
    delete tags[contactName.toLowerCase()];
    WaCRM.storage.set(this._TAGS_KEY, tags);
  },

  /* ── Get all chat rows from WhatsApp's DOM ── */
  getChatRows: function() {
    /* WhatsApp renders each chat as a list item in #pane-side */
    var rows = document.querySelectorAll('#pane-side [role="listitem"], #pane-side [data-testid="cell-frame-container"]');
    if (!rows || !rows.length) {
      /* Fallback: any direct children of the chat list */
      rows = document.querySelectorAll('#pane-side > div > div > div > div');
    }
    return Array.from(rows);
  },

  /* ── Get contact name from a chat row ── */
  getRowName: function(row) {
    /* WhatsApp puts the contact name in a span with dir="auto" or data-testid="cell-frame-title" */
    var nameEl = row.querySelector('[data-testid="cell-frame-title"] span') ||
                 row.querySelector('span[dir="auto"]');
    return nameEl ? nameEl.textContent.trim() : '';
  },

  /* ── Check if a row has WhatsApp's business badge ── */
  isBusinessRow: function(row) {
    /* WhatsApp renders a business badge as an SVG with specific path or data-testid */
    var badge = row.querySelector('[data-testid="verified-badge"]') ||
                row.querySelector('[data-icon="verified"]') ||
                row.querySelector('svg[data-testid*="business"]') ||
                row.querySelector('[data-testid="status-v3-verified"]');
    if (badge) return true;

    /* Also check for business account indicator in aria-label */
    var ariaLabel = row.getAttribute('aria-label') || '';
    if (ariaLabel.toLowerCase().includes('business')) return true;

    return false;
  },

  /* ── Check if a name matches known brand keywords ── */
  isBrandName: function(name) {
    if (!name) return false;
    var lower = name.toLowerCase();
    return WaCRM.BRAND_KEYWORDS.some(function(kw) {
      return lower.includes(kw);
    });
  },

  /* ── Determine the category of a chat row ── */
  getRowCategory: function(row) {
    var name = this.getRowName(row);
    var tags = this.getTags();
    var nameLower = name.toLowerCase();

    /* Manual tag takes priority */
    if (tags[nameLower]) return tags[nameLower];

    /* Auto-detect business badge */
    if (this.isBusinessRow(row)) return 'business';

    /* Auto-detect brand by keyword */
    if (this.isBrandName(name)) return 'brand';

    /* Phone number only = unknown contact */
    if (/^[+\d\s\-()]{7,}$/.test(name)) return 'unknown';

    return 'personal';
  },

  /* ── Apply a filter to the chat list ── */
  applyFilter: function(filterKey) {
    this._activeFilter = filterKey;

    /* 'all' = restore everything */
    if (filterKey === 'all') {
      this.showAll();
      return;
    }

    /* First show all, then hide non-matching */
    this.showAll();

    var self = this;
    var rows = this.getChatRows();

    if (!rows.length) {
      console.warn('[WA CRM] No chat rows found for filtering. WhatsApp may not be fully loaded.');
      return;
    }

    rows.forEach(function(row) {
      var category = self.getRowCategory(row);
      var show = false;

      switch (filterKey) {
        case 'businesses':
          show = (category === 'business' || category === 'brand');
          break;
        case 'brands':
          show = (category === 'brand');
          break;
        case 'unknown':
          show = (category === 'unknown');
          break;
        case 'active':
          show = (category === 'active');
          break;
        case 'dues':
          show = (category === 'dues');
          break;
        case 'followup':
          show = (category === 'followup');
          break;
        case 'respond':
          show = (category === 'respond');
          break;
        default:
          show = true;
      }

      /* Hide/show the row */
      row.style.display = show ? '' : 'none';
    });

    /* Show count of visible results */
    var visible = rows.filter(function(r) { return r.style.display !== 'none'; }).length;
    WaCRM.chatFilterService._showFilterBadge(filterKey, visible, rows.length);
  },

  /* ── Restore all chat rows ── */
  showAll: function() {
    var rows = this.getChatRows();
    rows.forEach(function(row) { row.style.display = ''; });
    this._removeFilterBadge();
  },

  /* ── Show a small badge below topbar showing filter result count ── */
  _showFilterBadge: function(filterKey, visible, total) {
    this._removeFilterBadge();
    var badge = document.createElement('div');
    badge.id = 'wa-crm-filter-badge';
    badge.textContent = visible + ' of ' + total + ' chats — ' + filterKey;
    Object.assign(badge.style, {
      position:     'fixed',
      top:          '48px',
      left:         '0',
      width:        'calc(100vw - 60px)',
      background:   '#00a884',
      color:        '#fff',
      fontSize:     '11px',
      fontFamily:   '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontWeight:   '600',
      textAlign:    'center',
      padding:      '3px 0',
      zIndex:       '999997',
      letterSpacing:'0.04em',
      textTransform:'uppercase',
    });
    document.body.appendChild(badge);
  },

  _removeFilterBadge: function() {
    var old = document.getElementById('wa-crm-filter-badge');
    if (old) old.parentNode.removeChild(old);
  },
};
