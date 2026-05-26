/* chartRenderer.js — Shared reusable donut chart. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.chartRenderer = {
  draw: function(canvas, config) {
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var value = config.value, total = config.total;
    var gradientColors = config.gradientColors, pointerColor = config.pointerColor;
    var labelText = config.labelText, labelColor = config.labelColor;
    var cx = 45, cy = 45, r = 36, thickness = 8;

    ctx.clearRect(0, 0, 90, 90);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.strokeStyle = '#eee'; ctx.lineWidth = thickness; ctx.lineCap = 'round'; ctx.stroke();

    if (total > 0 && value > 0) {
      var startAngle = -0.5 * Math.PI;
      var endAngle   = startAngle + (value / total) * 2 * Math.PI;
      var grad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
      grad.addColorStop(0, gradientColors[0]); grad.addColorStop(1, gradientColors[1]);
      ctx.beginPath(); ctx.arc(cx, cy, r, startAngle, endAngle);
      ctx.strokeStyle = grad; ctx.lineWidth = thickness; ctx.lineCap = 'round'; ctx.stroke();
      var px = cx + r * Math.cos(endAngle), py = cy + r * Math.sin(endAngle);
      ctx.beginPath(); ctx.arc(px, py, thickness / 2 + 1, 0, 2 * Math.PI);
      ctx.fillStyle = pointerColor; ctx.shadowColor = pointerColor; ctx.shadowBlur = 4;
      ctx.fill(); ctx.shadowBlur = 0;
    }
    ctx.font = '16px sans-serif'; ctx.fillStyle = labelColor;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(String(labelText), cx, cy);
  }
};
