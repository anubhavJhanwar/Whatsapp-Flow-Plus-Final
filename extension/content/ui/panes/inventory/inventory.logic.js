/* inventory.logic.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.inventoryLogic = {
  populateInputs: function() {
    var inv = WaCRM.inventoryService.getInventory();
    var p1  = document.getElementById(WaCRM.IDS.INV_INPUT_P1);
    var p2  = document.getElementById(WaCRM.IDS.INV_INPUT_P2);
    if (p1) p1.value = inv.product1;
    if (p2) p2.value = inv.product2;
  },
  handleUpdate: function() {
    var p1Val = WaCRM.utils.safeInt(document.getElementById(WaCRM.IDS.INV_INPUT_P1).value);
    var p2Val = WaCRM.utils.safeInt(document.getElementById(WaCRM.IDS.INV_INPUT_P2).value);
    WaCRM.inventoryService.updateInventory(p1Val, p2Val);
    WaCRM.inventoryCharts.render();
    WaCRM.inventoryCharts.renderWarnings();
  }
};
