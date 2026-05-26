/* dashboard.filters.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.dashboardFilters = {
  setup: function() {
    var IDS         = WaCRM.IDS;
    var state       = WaCRM.dashboardState;
    var filterSel   = document.getElementById(IDS.DASHBOARD_FILTER);
    var dateFromInp = document.getElementById(IDS.DASHBOARD_DATE_FROM);
    var dateToInp   = document.getElementById(IDS.DASHBOARD_DATE_TO);
    if (!filterSel) return;

    filterSel.onchange = function() {
      state.filter = this.value;
      if (state.filter === 'custom') {
        dateFromInp.style.display = 'inline-block';
        dateToInp.style.display   = 'inline-block';
      } else {
        dateFromInp.style.display = 'none';
        dateToInp.style.display   = 'none';
        state.dateFrom = null;
        state.dateTo   = null;
        WaCRM.dashboardLogic.renderHistory();
      }
    };

    dateFromInp.onchange = function() {
      state.dateFrom = this.value;
      WaCRM.dashboardLogic.renderHistory();
    };
    dateToInp.onchange = function() {
      state.dateTo = this.value;
      WaCRM.dashboardLogic.renderHistory();
    };
  }
};
