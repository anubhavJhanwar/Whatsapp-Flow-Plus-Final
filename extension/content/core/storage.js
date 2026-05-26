/* storage.js — localStorage wrapper. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.storage = {
  get: function(key, defaultValue) {
    if (defaultValue === undefined) defaultValue = null;
    try {
      var raw = localStorage.getItem(key);
      if (raw === null) return defaultValue;
      return JSON.parse(raw);
    } catch(e) { return defaultValue; }
  },
  set: function(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch(e) { console.warn('[WA CRM] storageSet failed:', key, e); }
  },
  remove: function(key) {
    try { localStorage.removeItem(key); }
    catch(e) { console.warn('[WA CRM] storageRemove failed:', key, e); }
  }
};
