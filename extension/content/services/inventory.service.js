/* inventory.service.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.inventoryService = {
  getInventory:   function() { return WaCRM.inventoryState.get(); },
  updateInventory: function(p1, p2) {
    WaCRM.inventoryState.set({ product1: WaCRM.utils.safeInt(p1), product2: WaCRM.utils.safeInt(p2) });
  },
  isProduct1Low: function() { return WaCRM.inventoryState.isLow('product1'); },
  isProduct2Low: function() { return WaCRM.inventoryState.isLow('product2'); }
};
