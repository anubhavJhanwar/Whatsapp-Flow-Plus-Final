/* sidebar.template.js — Renders SVG icons into the sidebar. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.sidebarTemplate = {
  render: function(sidebarEl) {
    sidebarEl.innerHTML = '';

    WaCRM.SIDEBAR_ICONS.forEach(function(icon) {
      var div = document.createElement('div');
      div.className = WaCRM.CLASSES.LOGO_ITEM;
      div.id        = icon.id;
      div.setAttribute('data-tooltip', icon.tooltip);
      div.innerHTML = icon.svg;
      sidebarEl.appendChild(div);
    });
  }
};
