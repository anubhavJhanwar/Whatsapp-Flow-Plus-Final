/* dashboard.js — Dashboard pane entry point. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.dashboardPane = {
  open: function() {
    var pane = document.getElementById(WaCRM.IDS.PANE_DASHBOARD);
    if (!pane) {
      pane = document.createElement('div');
      pane.id = WaCRM.IDS.PANE_DASHBOARD;
      pane.innerHTML = WaCRM.dashboardTemplate.getHTML();
      document.body.appendChild(pane);
      WaCRM.dashboardEvents.bind();
    } else {
      pane.style.display = 'flex';
    }
    WaCRM.dashboardLogic.renderHistory();
    WaCRM.dashboardCharts.render();
  },

  init: function() {
    WaCRM.paneManager.register('dashboard', WaCRM.IDS.PANE_DASHBOARD, function() {
      WaCRM.dashboardPane.open();
    });

    /* Re-render on data events */
    WaCRM.eventBus.on(WaCRM.EVENTS.TRANSACTION_ADDED,   function() { WaCRM.dashboardLogic.renderHistory(); WaCRM.dashboardCharts.render(); });
    WaCRM.eventBus.on(WaCRM.EVENTS.TRANSACTION_UPDATED, function() { WaCRM.dashboardLogic.renderHistory(); WaCRM.dashboardCharts.render(); });
    WaCRM.eventBus.on(WaCRM.EVENTS.TRANSACTIONS_RESET,  function() { WaCRM.dashboardLogic.renderHistory(); WaCRM.dashboardCharts.render(); });
  }
};
