/* chatFilter.service.js — DOM-based chat list filtering. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.BRAND_KEYWORDS = [
  'zomato','swiggy','rapido','ola','uber','amazon','flipkart','myntra',
  'nykaa','meesho','blinkit','zepto','dunzo','bigbasket','grofers',
  'phonepe','paytm','gpay','google pay','hdfc','icici','sbi','axis bank',
  'airtel','jio','vi ','vodafone','bsnl','dominos','pizza hut','kfc',
  'mcdonalds','subway','starbucks','netflix','hotstar','spotify',
  'bank','insurance','hospital','clinic','pharmacy','courier',
  'bluedart','delhivery','dtdc','fedex','dhl','india post',
  'irctc','makemytrip','goibibo','yatra','cleartrip','booking.com',
  'oyo','lenskart','1mg','practo','apollo','tata','reliance',
  'infosys','wipro','tcs','hcl','byju','unacademy','upgrad',
];

WaCRM.chatFilterService = {
  _activeFilter: 'all',
  _TAGS_KEY: 'waCrmChatTags',

  getTags: function() {
    return WaCRM.storage.get(this._TAGS_KEY, {});
  },
  setTag: function(name, tag) {
    var tags = this.getTags();
    tags[name.toLowerCase()] = tag;
    WaCRM.storage.set(this._TAGS_KEY, tags);
  },
  removeTag: function(name) {
    var tags = this.getTags();
    delete tags[name.toLowerCase()];
    WaCRM.storage.set(this._TAGS_KEY, tags);
  },

  /**
   * Find the actual chat row elements in WhatsApp's DOM.
   * WhatsApp renders chats inside a virtualized list.
   * We target the scrollable container and find direct row children.
   */
  getChatRows: function() {
    var rows = [];

    /* Strategy 1: data-testid on each chat row */
    rows = Array.from(document.querySelectorAll('[data-testid="cell-frame-container"]'));
    if (rows.length) return rows;

    /* Strategy 2: role=listitem inside pane-side */
    rows = Array.from(document.querySelectorAll('#pane-side [role="listitem"]'));
    if (rows.length) return rows;

    /* Strategy 3: find the scrollable chat list div and get its direct children */
    var chatList = document.querySelector('#pane-side > div > div > div');
    if (chatList) {
      /* The actual list is usually 2-3 levels deep */
      var deep = chatList.querySelector('div[style*="height"]') || chatList;
      rows = Array.from(deep.children).filter(function(el) {
        return el.offsetHeight > 20; /* filter out zero-height spacers */
      });
      if (rows.length) return rows;
    }

    /* Strategy 4: broadest fallback — any div inside pane-side that has a span[dir=auto] */
    var allDivs = document.querySelectorAll('#pane-side div');
    var seen = new Set();
    for (var i = 0; i < allDivs.length; i++) {
      var d = allDivs[i];
      /* A chat row has a name span and a time span */
      var hasName = d.querySelector('span[dir="auto"]');
      var hasTime = d.querySelector('span[data-testid="last-msg-time"]') ||
                    d.querySelector('div[data-testid="last-msg-time"]');
      if (hasName && hasTime && !seen.has(d)) {
        /* Make sure we get the outermost matching ancestor, not a child */
        var parent = d.parentElement;
        if (parent && !parent.querySelector('[data-testid="last-msg-time"]')) {
          seen.add(d);
          rows.push(d);
        }
      }
    }
    return rows;
  },

  getRowName: function(row) {
    var el = row.querySelector('[data-testid="cell-frame-title"] span') ||
             row.querySelector('span[dir="auto"]');
    return el ? el.textContent.trim() : '';
  },

  isBusinessRow: function(row) {
    /* WhatsApp business verified badge */
    if (row.querySelector('[data-testid="verified-badge"]')) return true;
    if (row.querySelector('[data-icon="verified"]'))         return true;
    if (row.querySelector('[data-icon="business"]'))         return true;
    /* Check aria-label on the row itself */
    var aria = row.getAttribute('aria-label') || '';
    if (/business/i.test(aria)) return true;
    return false;
  },

  isBrandName: function(name) {
    if (!name) return false;
    var lower = name.toLowerCase();
    return WaCRM.BRAND_KEYWORDS.some(function(kw) {
      return lower.indexOf(kw) !== -1;
    });
  },

  getRowCategory: function(row) {
    var name = this.getRowName(row);
    var tags = this.getTags();
    var key  = name.toLowerCase();

    if (tags[key]) return tags[key];
    if (this.isBusinessRow(row)) return 'business';
    if (this.isBrandName(name))  return 'brand';
    if (/^[+\d\s\-()]{7,}$/.test(name)) return 'unknown';
    return 'personal';
  },

  applyFilter: function(filterKey) {
    this._activeFilter = filterKey;
    this._removeFilterBadge();

    if (filterKey === 'all') {
      this.showAll();
      return;
    }

    /* First restore all so we work from a clean state */
    var rows = this.getChatRows();
    rows.forEach(function(r) { r.style.display = ''; });

    var self    = this;
    var visible = 0;

    rows.forEach(function(row) {
      var cat  = self.getRowCategory(row);
      var show = false;

      if (filterKey === 'businesses') show = (cat === 'business' || cat === 'brand');
      else if (filterKey === 'brands')    show = (cat === 'brand');
      else if (filterKey === 'unknown')   show = (cat === 'unknown');
      else if (filterKey === 'active')    show = (cat === 'active');
      else if (filterKey === 'dues')      show = (cat === 'dues');
      else if (filterKey === 'followup')  show = (cat === 'followup');
      else if (filterKey === 'respond')   show = (cat === 'respond');
      else show = true;

      row.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    this._showFilterBadge(filterKey, visible, rows.length);
  },

  showAll: function() {
    this.getChatRows().forEach(function(r) { r.style.display = ''; });
    this._removeFilterBadge();
  },

  _showFilterBadge: function(filterKey, visible, total) {
    this._removeFilterBadge();
    var leftW = WaCRM.injector ? WaCRM.injector.getWALeftNavWidth() : 72;
    var badge = document.createElement('div');
    badge.id = 'wa-crm-filter-badge';

    var label = filterKey.charAt(0).toUpperCase() + filterKey.slice(1);
    badge.textContent = visible + ' chats matched — ' + label;

    Object.assign(badge.style, {
      position:     'fixed',
      top:          '48px',
      left:         leftW + 'px',
      width:        'calc(100vw - ' + leftW + 'px - 60px)',
      background:   visible > 0 ? '#00a884' : '#e74c3c',
      color:        '#fff',
      fontSize:     '11px',
      fontFamily:   '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontWeight:   '600',
      textAlign:    'center',
      padding:      '3px 0',
      zIndex:       '999997',
      letterSpacing:'0.05em',
      textTransform:'uppercase',
    });
    document.body.appendChild(badge);
  },

  _removeFilterBadge: function() {
    var old = document.getElementById('wa-crm-filter-badge');
    if (old && old.parentNode) old.parentNode.removeChild(old);
  },
};
