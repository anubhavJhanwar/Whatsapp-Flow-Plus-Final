/* inventoryState.js — Inventory state. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.inventoryState = {
  get: function() {
    return WaCRM.storage.get(WaCRM.STORAGE_KEYS.INVENTORY, { product1: 0, product2: 0 });
  },
  set: function(inv) {
    WaCRM.storage.set(WaCRM.STORAGE_KEYS.INVENTORY, inv);
    WaCRM.eventBus.emit(WaCRM.EVENTS.INVENTORY_UPDATED, inv);
  },
  deduct: function(product, qty) {
    var inv = this.get();
    if (product === WaCRM.PRODUCTS.PRODUCT_1) inv.product1 = Math.max(0, (inv.product1 || 0) - qty);
    if (product === WaCRM.PRODUCTS.PRODUCT_2) inv.product2 = Math.max(0, (inv.product2 || 0) - qty);
    this.set(inv);
  },
  isLow: function(key) {
    return (this.get()[key] || 0) <= WaCRM.LOW_STOCK_THRESHOLD;
  }
};
