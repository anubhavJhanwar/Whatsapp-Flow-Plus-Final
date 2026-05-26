/* export.service.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.exportService = {
  downloadCSV: function(transactions) {
    if (!transactions || !transactions.length) return;
    var header = ['Name','Product','Date','Rate','Quantity','Total','Paid'];
    var rows = transactions.map(function(tx) {
      return [tx.name||'', tx.product||'', new Date(tx.date).toLocaleString(), tx.rate, tx.qty, tx.total, tx.paid?'Yes':'No'];
    });
    var csv = header.join(',') + '\n';
    rows.forEach(function(row) {
      csv += row.map(function(val) { return '"' + String(val).replace(/"/g,'""') + '"'; }).join(',') + '\n';
    });
    var blob = new Blob([csv], { type: 'text/csv' });
    var url  = URL.createObjectURL(blob);
    var a    = document.createElement('a');
    a.href = url; a.download = WaCRM.CSV_FILENAME;
    document.body.appendChild(a); a.click();
    setTimeout(function() { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
  }
};
