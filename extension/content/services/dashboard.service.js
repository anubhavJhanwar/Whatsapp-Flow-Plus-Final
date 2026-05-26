/* dashboard.service.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.dashboardService = {
  addTransaction: function(rate, qty, paid, product) {
    var name = WaCRM.whatsappService.getActiveChatName();
    var tx = { rate: rate, qty: qty, total: rate * qty, paid: paid, product: product, name: name, date: new Date().toISOString() };
    WaCRM.inventoryState.deduct(product, qty);
    WaCRM.dashboardState.addTransaction(tx);
  },
  markTransactionPaid: function(tx) { WaCRM.dashboardState.markPaid(tx); },
  resetAll:            function()   { WaCRM.dashboardState.reset(); },
  getFiltered:         function()   { return WaCRM.dashboardState.getFiltered(); },
  getAll:              function()   { return WaCRM.dashboardState.getAll(); }
};
