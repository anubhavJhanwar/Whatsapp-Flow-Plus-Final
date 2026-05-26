/* paneManager.js — Centralized pane open/close/toggle. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.paneManager = (function() {
  var _registry = {};
  return {
    register: function(key, domId, opener) {
      _registry[key] = { id: domId, opener: opener };
    },
    open: function(key) {
      var entry = _registry[key];
      if (!entry) return;
      var existing = document.getElementById(entry.id);
      if (existing && existing.style.display !== 'none') return;
      entry.opener();
      WaCRM.eventBus.emit(WaCRM.EVENTS.PANE_OPENED, key);
    },
    close: function(key) {
      var entry = _registry[key];
      if (!entry) return;
      var el = document.getElementById(entry.id);
      if (el) el.style.display = 'none';
      WaCRM.eventBus.emit(WaCRM.EVENTS.PANE_CLOSED, key);
    },
    toggle: function(key) {
      var entry = _registry[key];
      if (!entry) return;
      var el = document.getElementById(entry.id);
      if (el && el.style.display !== 'none') {
        this.close(key);
      } else {
        this.open(key);
      }
    },
    isOpen: function(key) {
      var entry = _registry[key];
      if (!entry) return false;
      var el = document.getElementById(entry.id);
      return !!(el && el.style.display !== 'none');
    }
  };
})();
