/* sidebar.template.js — Renders SVG icons into the sidebar with dividers. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.sidebarTemplate = {
  render: function(sidebarEl) {
    sidebarEl.innerHTML = '';

    /*
     * Icon groups — separated by a thin divider line.
     * Group 1: Navigation (Home, Notifications, Contacts)
     * Group 2: CRM Actions (Inventory, Add Contact, Settings)
     * Group 3: System (Refresh, Admin Dashboard)
     */
    var groups = [
      [0, 1, 2],   /* Home, Notifications, Contacts */
      [3, 4, 5],   /* Inventory, Add Contact, Settings */
      [6, 7],      /* Refresh, Admin Dashboard */
    ];

    groups.forEach(function(groupIndices, groupIdx) {
      groupIndices.forEach(function(iconIdx) {
        var icon = WaCRM.SIDEBAR_ICONS[iconIdx];
        var div  = document.createElement('div');
        div.className = WaCRM.CLASSES.LOGO_ITEM;
        div.id        = icon.id;
        div.setAttribute('data-tooltip', icon.tooltip);
        div.innerHTML = icon.svg;
        sidebarEl.appendChild(div);
      });

      /* Add divider after each group except the last */
      if (groupIdx < groups.length - 1) {
        var divider = document.createElement('div');
        divider.className = 'wa-crm-sidebar-divider';
        sidebarEl.appendChild(divider);
      }
    });
  }
};
