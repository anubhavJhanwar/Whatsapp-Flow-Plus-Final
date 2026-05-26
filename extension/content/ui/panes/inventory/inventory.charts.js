/* inventory.charts.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.inventoryCharts = {
  render: function() {
    var IDS  = WaCRM.IDS;
    var svc  = WaCRM.inventoryService;
    var inv  = svc.getInventory();
    var p1Low = svc.isProduct1Low();
    var p2Low = svc.isProduct2Low();
    var draw  = WaCRM.chartRenderer.draw;

    draw(document.getElementById(IDS.INV_CANVAS_P1), {
      value: inv.product1, total: 100,
      gradientColors: ['#673ab7','#00bcd4'], pointerColor: '#673ab7',
      labelText: inv.product1, labelColor: p1Low ? '#e74c3c' : '#673ab7'
    });
    draw(document.getElementById(IDS.INV_CANVAS_P2), {
      value: inv.product2, total: 100,
      gradientColors: ['#f44336','#ffeb3b'], pointerColor: '#f44336',
      labelText: inv.product2, labelColor: p2Low ? '#e74c3c' : '#f44336'
    });

    var label1 = document.getElementById(IDS.INV_LABEL_P1);
    var label2 = document.getElementById(IDS.INV_LABEL_P2);
    if (label1) label1.style.color = p1Low ? '#e74c3c' : '#673ab7';
    if (label2) label2.style.color = p2Low ? '#e74c3c' : '#f44336';
  },

  renderWarnings: function() {
    var IDS  = WaCRM.IDS;
    var svc  = WaCRM.inventoryService;
    var w1   = document.getElementById(IDS.INV_WARN_P1);
    var w2   = document.getElementById(IDS.INV_WARN_P2);
    if (w1) w1.textContent = svc.isProduct1Low() ? '⚠️ Low stock!' : '';
    if (w2) w2.textContent = svc.isProduct2Low() ? '⚠️ Low stock!' : '';
  }
};
