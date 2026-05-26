/* dom.js — DOM utility helpers. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.dom = {
  query: function(selector, root) {
    try { return (root || document).querySelector(selector); } catch(e) { return null; }
  },
  queryAll: function(selector, root) {
    try { return Array.from((root || document).querySelectorAll(selector)); } catch(e) { return []; }
  },
  byId: function(id) {
    return document.getElementById(id);
  },
  show: function(el) { if (el) el.style.display = ''; },
  hide: function(el) { if (el) el.style.display = 'none'; },
  setStyles: function(el, styles) { if (el) Object.assign(el.style, styles); }
};
