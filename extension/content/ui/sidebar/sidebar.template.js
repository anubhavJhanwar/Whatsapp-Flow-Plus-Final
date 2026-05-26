/* sidebar.template.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.sidebarTemplate = {
  render: function(sidebarEl) {
    sidebarEl.innerHTML = '';
    WaCRM.SIDEBAR_ICONS.forEach(function(icon) {
      var div = document.createElement('div');
      div.className = WaCRM.CLASSES.LOGO_ITEM;
      div.id = icon.id;
      if (icon.tooltip) div.setAttribute('data-tooltip', icon.tooltip);

      var img = document.createElement('img');
      img.src = chrome.runtime.getURL(icon.src);
      img.alt = icon.tooltip || icon.id;

      div.appendChild(img);
      sidebarEl.appendChild(div);
    });
  }
};
