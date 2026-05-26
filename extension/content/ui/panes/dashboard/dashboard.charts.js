/* dashboard.charts.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.dashboardCharts = {
  render: function() {
    var IDS  = WaCRM.IDS;
    var txs  = WaCRM.dashboardState.getAll();
    var paid     = txs.filter(function(t) { return t.paid; }).length;
    var unpaid   = txs.length - paid;
    var product1 = txs.filter(function(t) { return t.product === 'Product 1'; }).length;
    var product2 = txs.filter(function(t) { return t.product === 'Product 2'; }).length;
    var total    = paid + unpaid;
    var draw     = WaCRM.chartRenderer.draw;

    draw(document.getElementById(IDS.PIE_PAID), {
      value: paid, total: total,
      gradientColors: ['#00e6d0','#0099ff'], pointerColor: '#00bfae',
      labelText: paid, labelColor: '#00bfae'
    });
    draw(document.getElementById(IDS.PIE_UNPAID), {
      value: unpaid, total: total,
      gradientColors: ['#ffb199','#ff0844'], pointerColor: '#e74c3c',
      labelText: unpaid, labelColor: '#e74c3c'
    });
    draw(document.getElementById(IDS.PIE_PRODUCT1), {
      value: product1, total: product1 + product2,
      gradientColors: ['#673ab7','#00bcd4'], pointerColor: '#673ab7',
      labelText: product1, labelColor: '#673ab7'
    });
    draw(document.getElementById(IDS.PIE_PRODUCT2), {
      value: product2, total: product1 + product2,
      gradientColors: ['#f44336','#ffeb3b'], pointerColor: '#f44336',
      labelText: product2, labelColor: '#f44336'
    });
  }
};
