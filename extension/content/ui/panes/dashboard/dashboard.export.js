/* dashboard.export.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.dashboardExport = {
  setup: function() {
    var exportIcon    = document.getElementById(WaCRM.IDS.DASHBOARD_EXPORT);
    var exportTooltip = document.getElementById('wa-crm-dashboard-export-tooltip');
    if (!exportIcon) return;

    exportIcon.onmouseenter = function() { if (exportTooltip) exportTooltip.style.display = 'block'; };
    exportIcon.onmouseleave = function() { if (exportTooltip) exportTooltip.style.display = 'none';  };
    exportIcon.onclick = function() {
      WaCRM.exportService.downloadCSV(WaCRM.dashboardState.getFiltered());
    };
  }
};
