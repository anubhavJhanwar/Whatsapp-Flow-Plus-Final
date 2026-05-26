/* eventBus.js — Lightweight pub/sub. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.eventBus = (function() {
  var _listeners = {};
  return {
    on: function(event, handler) {
      if (!_listeners[event]) _listeners[event] = [];
      _listeners[event].push(handler);
    },
    off: function(event, handler) {
      if (!_listeners[event]) return;
      _listeners[event] = _listeners[event].filter(function(h) { return h !== handler; });
    },
    emit: function(event, payload) {
      if (!_listeners[event]) return;
      _listeners[event].forEach(function(h) {
        try { h(payload); } catch(e) { console.warn('[WA CRM] eventBus error:', event, e); }
      });
    }
  };
})();
