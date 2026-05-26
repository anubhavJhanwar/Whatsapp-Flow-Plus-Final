/* dashboard.events.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.dashboardEvents = {
  bind: function() {
    var IDS = WaCRM.IDS;

    /* Close icon */
    var closeIcon    = document.getElementById(IDS.DASHBOARD_CLOSE);
    var closeTooltip = document.getElementById('wa-crm-dashboard-close-tooltip');
    if (closeIcon) {
      closeIcon.onclick      = function() { WaCRM.paneManager.close('dashboard'); };
      closeIcon.onmouseenter = function() { if (closeTooltip) closeTooltip.style.display = 'block'; };
      closeIcon.onmouseleave = function() { if (closeTooltip) closeTooltip.style.display = 'none';  };
    }

    /* Reset icon */
    var resetIcon    = document.getElementById(IDS.DASHBOARD_RESET);
    var resetTooltip = document.getElementById('wa-crm-dashboard-reset-tooltip');
    if (resetIcon) {
      resetIcon.onclick = function() {
        if (confirm('Reset all dashboard data?')) {
          WaCRM.dashboardService.resetAll();
          WaCRM.dashboardLogic.renderHistory();
          WaCRM.dashboardCharts.render();
        }
      };
      resetIcon.onmouseenter = function() { if (resetTooltip) resetTooltip.style.display = 'block'; };
      resetIcon.onmouseleave = function() { if (resetTooltip) resetTooltip.style.display = 'none';  };
    }

    /* Add transaction form */
    var form = document.getElementById(IDS.DASHBOARD_FORM);
    if (form) {
      form.onsubmit = function(e) {
        e.preventDefault();
        var rate    = WaCRM.utils.safeFloat(document.getElementById(IDS.DASHBOARD_RATE).value);
        var qty     = WaCRM.utils.safeInt(document.getElementById(IDS.DASHBOARD_QTY).value);
        var paid    = document.getElementById(IDS.DASHBOARD_PAID).checked;
        var product = document.getElementById(IDS.DASHBOARD_PRODUCT).value;

        if (rate > 0 && qty > 0 && product) {
          WaCRM.dashboardService.addTransaction(rate, qty, paid, product);
          document.getElementById(IDS.DASHBOARD_RATE).value        = '';
          document.getElementById(IDS.DASHBOARD_QTY).value         = '';
          document.getElementById(IDS.DASHBOARD_PAID).checked      = false;
          document.getElementById(IDS.DASHBOARD_PRODUCT).selectedIndex = 0;
          WaCRM.dashboardLogic.renderHistory();
          WaCRM.dashboardCharts.render();
        }
      };
    }

    /* Filter + export */
    WaCRM.dashboardFilters.setup();
    WaCRM.dashboardExport.setup();
  }
};
