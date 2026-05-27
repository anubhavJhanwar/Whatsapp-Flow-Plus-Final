/* chatFilter.service.js
 * DOM-based chat filtering using CSS injection + aria-label matching.
 *
 * WHY CSS INJECTION:
 * WhatsApp uses a React virtualized list. Setting display:none on rows
 * doesn't work — React re-renders them and ignores our style.
 * Instead we inject a <style> tag with CSS rules that target chat rows
 * by their aria-label attribute (which WhatsApp sets to the contact name).
 * This survives React re-renders because CSS is applied by the browser engine.
 *
 * FILTER APPROACH:
 * 1. Scan all currently loaded chat rows, collect names + categories
 * 2. Build a CSS rule: hide ALL rows, then un-hide matching ones
 * 3. Inject the CSS — browser handles the rest, even on re-render
 */

var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.BRAND_KEYWORDS = [
  'zomato','swiggy','rapido','ola','uber','amazon','flipkart','myntra',
  'nykaa','meesho','blinkit','zepto','dunzo','bigbasket','grofers',
  'phonepe','paytm','gpay','google pay','hdfc','icici','sbi','axis',
  'airtel','jio','vodafone','bsnl','dominos','pizza hut','kfc',
  'mcdonalds','subway','starbucks','netflix','hotstar','spotify',
  'bank','insurance','hospital','clinic','pharmacy','courier',
  'bluedart','delhivery','dtdc','fedex','dhl','india post',
  'irctc','makemytrip','goibibo','yatra','cleartrip','booking',
  'oyo','lenskart','1mg','practo','apollo','tata','reliance',
  'infosys','wipro','tcs','hcl','byju','unacademy','upgrad',
];

WaCRM.chatFilterService = {
  _activeFilter: 'all',
  _TAGS_KEY: 'waCrmChatTags',
  _STYLE_ID: 'wa-crm-filter-style',

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

  /* ── Scan all chat rows and return array of {name, category, ariaLabel} ── */
  scanChatRows: function() {
    var results = [];
    var self = this;
    var tags = this.getTags();

    /* WhatsApp sets aria-label on each chat row like:
     * "Zomato, 2:30 PM, Hey your order..." or just the contact name
     * We target: #pane-side [role="listitem"] or the scrollable list children */
    var rows = Array.from(document.querySelectorAll(
      '#pane-side [role="listitem"]'
    ));

    /* Fallback: find rows by looking for elements that have both a name span and a time */
    if (!rows.length) {
      var candidates = document.querySelectorAll('#pane-side div[tabindex="-1"]');
      rows = Array.from(candidates).filter(function(el) {
        return el.querySelector('span[dir="auto"]') &&
               el.offsetHeight > 30;
      });
    }

    rows.forEach(function(row) {
      /* Get aria-label — WhatsApp sets this to the contact name + preview */
      var ariaLabel = row.getAttribute('aria-label') || '';

      /* Get name from the title span */
      var nameEl = row.querySelector('[data-testid="cell-frame-title"] span') ||
                   row.querySelector('span[dir="auto"]');
      var name = nameEl ? nameEl.textContent.trim() : '';

      if (!name && !ariaLabel) return;

      var nameLower = name.toLowerCase();
      var category = 'personal';

      /* Manual tag takes priority */
      if (tags[nameLower]) {
        category = tags[nameLower];
      } else if (self._isBusinessRow(row)) {
        category = 'business';
      } else if (self._isBrandName(name)) {
        category = 'brand';
      } else if (/^[+\d\s\-()]{7,}$/.test(name)) {
        category = 'unknown';
      }

      results.push({ name: name, ariaLabel: ariaLabel, category: category, el: row });
    });

    return results;
  },

  _isBusinessRow: function(row) {
    return !!(
      row.querySelector('[data-testid="verified-badge"]') ||
      row.querySelector('[data-icon="verified"]') ||
      row.querySelector('[data-icon="business"]')
    );
  },

  _isBrandName: function(name) {
    if (!name) return false;
    var lower = name.toLowerCase();
    return WaCRM.BRAND_KEYWORDS.some(function(kw) {
      return lower.indexOf(kw) !== -1;
    });
  },

  /* ── Apply filter: show only matching rows, hide the rest ── */
  applyFilter: function(filterKey) {
    this._activeFilter = filterKey;
    this._removeFilterStyle();
    this._removeFilterBadge();

    if (filterKey === 'all') return; /* no CSS needed — show everything */

    var rows = this.scanChatRows();
    var self = this;

    var matching = rows.filter(function(r) {
      var cat = r.category;
      if (filterKey === 'businesses') return cat === 'business' || cat === 'brand';
      if (filterKey === 'brands')     return cat === 'brand';
      if (filterKey === 'unknown')    return cat === 'unknown';
      if (filterKey === 'active')     return cat === 'active';
      if (filterKey === 'dues')       return cat === 'dues';
      if (filterKey === 'followup')   return cat === 'followup';
      if (filterKey === 'respond')    return cat === 'respond';
      return true;
    });

    var nonMatching = rows.filter(function(r) {
      return matching.indexOf(r) === -1;
    });

    /* Hide non-matching rows directly — and keep re-applying on mutation */
    nonMatching.forEach(function(r) {
      r.el.style.setProperty('display', 'none', 'important');
    });
    matching.forEach(function(r) {
      r.el.style.removeProperty('display');
    });

    /* Store hidden elements so we can restore them */
    this._hiddenRows = nonMatching.map(function(r) { return r.el; });

    /* Watch for WhatsApp re-renders and re-apply */
    this._startFilterMutationWatch(filterKey);

    this._showFilterBadge(filterKey, matching.length, rows.length);
  },

  /* ── MutationObserver to re-apply filter after React re-renders ── */
  _filterObserver: null,
  _hiddenRows: [],

  _startFilterMutationWatch: function(filterKey) {
    this._stopFilterMutationWatch();
    var self = this;
    var pane = document.querySelector('#pane-side');
    if (!pane) return;

    this._filterObserver = new MutationObserver(function() {
      /* Re-apply after a short debounce */
      clearTimeout(self._filterDebounce);
      self._filterDebounce = setTimeout(function() {
        self.applyFilter(filterKey);
      }, 150);
    });
    this._filterObserver.observe(pane, { childList: true, subtree: true });
  },

  _stopFilterMutationWatch: function() {
    if (this._filterObserver) {
      this._filterObserver.disconnect();
      this._filterObserver = null;
    }
    clearTimeout(this._filterDebounce);
  },

  showAll: function() {
    this._activeFilter = 'all';
    this._stopFilterMutationWatch();
    this._removeFilterStyle();
    this._removeFilterBadge();

    /* Restore any hidden rows */
    if (this._hiddenRows) {
      this._hiddenRows.forEach(function(el) {
        el.style.removeProperty('display');
      });
      this._hiddenRows = [];
    }

    /* Also scan and restore all rows in pane-side */
    var all = document.querySelectorAll('#pane-side [role="listitem"], #pane-side div[tabindex="-1"]');
    all.forEach(function(el) { el.style.removeProperty('display'); });
  },

  _removeFilterStyle: function() {
    var old = document.getElementById(this._STYLE_ID);
    if (old && old.parentNode) old.parentNode.removeChild(old);
  },

  _showFilterBadge: function(filterKey, matched, total) {
    this._removeFilterBadge();
    var badge = document.createElement('div');
    badge.id = 'wa-crm-filter-badge';
    var label = filterKey.charAt(0).toUpperCase() + filterKey.slice(1);
    badge.textContent = matched
      ? matched + ' chats — ' + label
      : 'No ' + label + ' chats found. Tag contacts manually.';
    Object.assign(badge.style, {
      position:     'fixed',
      top:          '48px',
      left:         '0',
      width:        'calc(100vw - 60px)',
      background:   matched > 0 ? '#00a884' : '#e74c3c',
      color:        '#fff',
      fontSize:     '11px',
      fontFamily:   '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontWeight:   '600',
      textAlign:    'center',
      padding:      '3px 0',
      zIndex:       '999997',
      letterSpacing:'0.05em',
      textTransform:'uppercase',
      cursor:       'pointer',
    });
    /* Click badge to clear filter */
    badge.onclick = function() { WaCRM.chatFilterService.showAll(); };
    document.body.appendChild(badge);
  },

  _removeFilterBadge: function() {
    var old = document.getElementById('wa-crm-filter-badge');
    if (old && old.parentNode) old.parentNode.removeChild(old);
  },
};
