/* inventory.js — Inventory pane entry point. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.inventoryPane = {
  open: function() {
    var pane = document.getElementById(WaCRM.IDS.PANE_INVENTORY);
    if (!pane) {
      pane = document.createElement('div');
      pane.id = WaCRM.IDS.PANE_INVENTORY;
      pane.innerHTML = WaCRM.inventoryTemplate.getHTML();
      document.body.appendChild(pane);
      WaCRM.inventoryEvents.bind();
    } else {
      pane.style.display = 'block';
    }
    WaCRM.inventoryLogic.populateInputs();
    WaCRM.inventoryCharts.render();
    WaCRM.inventoryCharts.renderWarnings();
  },

  init: function() {
    WaCRM.paneManager.register('inventory', WaCRM.IDS.PANE_INVENTORY, function() {
      WaCRM.inventoryPane.open();
    });

    /* Re-render charts when inventory changes (e.g. after transaction deduction) */
    WaCRM.eventBus.on(WaCRM.EVENTS.INVENTORY_UPDATED, function() {
      if (document.getElementById(WaCRM.IDS.PANE_INVENTORY)) {
        WaCRM.inventoryCharts.render();
        WaCRM.inventoryCharts.renderWarnings();
      }
    });
  }
};
