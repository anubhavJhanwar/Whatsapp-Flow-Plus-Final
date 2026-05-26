/* utils.js — General helpers. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.utils = {
  showToast: function(message, duration) {
    duration = duration || 1800;
    var toast = document.createElement('div');
    toast.textContent = message;
    Object.assign(toast.style, {
      position:'fixed', top:'30px', right:'30px',
      background:'#2a4bff', color:'#fff', padding:'16px 28px',
      borderRadius:'8px', fontSize:'18px', fontWeight:'600',
      zIndex:'10000', boxShadow:'0 2px 12px rgba(0,0,0,0.15)'
    });
    document.body.appendChild(toast);
    setTimeout(function() { if (toast.parentNode) toast.parentNode.removeChild(toast); }, duration);
  },
  formatDateTime: function(date) {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
  },
  isPhoneNumber: function(str) {
    return /^\d{7,}$/.test((str || '').replace(/\D/g, ''));
  },
  safeInt: function(val) { var n = parseInt(val, 10); return isNaN(n) ? 0 : n; },
  safeFloat: function(val) { var n = parseFloat(val); return isNaN(n) ? 0 : n; }
};
