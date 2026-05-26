/* dashboard.logic.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.dashboardLogic = {
  renderHistory: function() {
    var historyDiv = document.getElementById(WaCRM.IDS.DASHBOARD_HISTORY);
    if (!historyDiv) return;

    var transactions = WaCRM.dashboardState.getFiltered();
    var C = WaCRM.CLASSES;

    if (!transactions.length) {
      historyDiv.innerHTML = '<div style="color:#888;text-align:center;padding:24px 0;">No transactions yet.</div>';
      return;
    }

    historyDiv.innerHTML = transactions.map(function(tx, idx) {
      var d          = new Date(tx.date);
      var dateStr    = WaCRM.utils.formatDateTime(d);
      var paidBadge  = '<span class="' + (tx.paid ? C.PAID_BADGE : C.UNPAID_BADGE) + '">' + (tx.paid ? 'Payment Received' : 'Unpaid') + '</span>';
      var markPaid   = !tx.paid
        ? '<label style="margin-left:8px;"><input type="checkbox" class="' + C.MARK_PAID + '" data-idx="' + idx + '" /> Mark as Paid</label>'
        : '';
      return '<div class="' + C.HISTORY_ROW + '">' +
        '<div><b>Name:</b> '    + (tx.name    || '-') + '</div>' +
        '<div><b>Product:</b> ' + (tx.product || '-') + '</div>' +
        '<div><b>Date:</b> '    + dateStr             + '</div>' +
        '<div><b>Amount:</b> \u20B9' + tx.rate + ' \u00D7 ' + tx.qty + ' = <b>\u20B9' + tx.total + '</b></div>' +
        '<div><b>Status:</b> '  + paidBadge + markPaid + '</div>' +
      '</div>';
    }).join('');

    /* Bind mark-as-paid checkboxes */
    var checkboxes = historyDiv.querySelectorAll('.' + C.MARK_PAID);
    checkboxes.forEach(function(cb) {
      cb.addEventListener('change', function() {
        if (!this.checked) return;
        var idx = parseInt(this.getAttribute('data-idx'), 10);
        var tx  = WaCRM.dashboardState.getFiltered()[idx];
        if (tx) {
          WaCRM.dashboardService.markTransactionPaid(tx);
          WaCRM.dashboardLogic.renderHistory();
          WaCRM.dashboardCharts.render();
        }
      });
    });
  }
};
