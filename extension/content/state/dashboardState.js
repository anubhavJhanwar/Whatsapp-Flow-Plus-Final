/* dashboardState.js — Transaction state. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.dashboardState = {
  filter:   'all',
  dateFrom: null,
  dateTo:   null,

  getAll: function() {
    return WaCRM.storage.get(WaCRM.STORAGE_KEYS.TRANSACTIONS, []);
  },
  setAll: function(transactions) {
    WaCRM.storage.set(WaCRM.STORAGE_KEYS.TRANSACTIONS, transactions);
  },
  addTransaction: function(tx) {
    var all = this.getAll();
    all.unshift(tx);
    this.setAll(all);
    WaCRM.eventBus.emit(WaCRM.EVENTS.TRANSACTION_ADDED, tx);
  },
  markPaid: function(tx) {
    var all = this.getAll();
    var idx = -1;
    for (var i = 0; i < all.length; i++) {
      if (all[i].date === tx.date && all[i].total === tx.total && all[i].name === tx.name) {
        idx = i; break;
      }
    }
    if (idx !== -1 && !all[idx].paid) {
      all[idx].paid = true;
      this.setAll(all);
      WaCRM.eventBus.emit(WaCRM.EVENTS.TRANSACTION_UPDATED, all[idx]);
    }
  },
  reset: function() {
    WaCRM.storage.remove(WaCRM.STORAGE_KEYS.TRANSACTIONS);
    WaCRM.eventBus.emit(WaCRM.EVENTS.TRANSACTIONS_RESET);
  },
  getFiltered: function() {
    var all = this.getAll();
    var now = new Date();
    if (this.filter === 'all') return all;
    if (this.filter === 'today') {
      return all.filter(function(tx) { return new Date(tx.date).toDateString() === now.toDateString(); });
    }
    if (this.filter === 'week') {
      var start = new Date(now); start.setDate(now.getDate() - now.getDay()); start.setHours(0,0,0,0);
      var end = new Date(start); end.setDate(start.getDate() + 6); end.setHours(23,59,59,999);
      return all.filter(function(tx) { var d = new Date(tx.date); return d >= start && d <= end; });
    }
    if (this.filter === 'month') {
      return all.filter(function(tx) {
        var d = new Date(tx.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });
    }
    if (this.filter === 'custom' && this.dateFrom && this.dateTo) {
      var from = new Date(this.dateFrom);
      var to   = new Date(this.dateTo); to.setHours(23,59,59,999);
      return all.filter(function(tx) { var d = new Date(tx.date); return d >= from && d <= to; });
    }
    return all;
  }
};
