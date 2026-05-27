/* dashboard.template.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.dashboardTemplate = {
  getHTML: function() {
    var IDS = WaCRM.IDS;

    /* Export icon — inline SVG, no PNG needed */
    var exportSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';

    return '<div style="padding:18px 12px 0 12px;position:relative;flex:1;display:flex;flex-direction:column;min-height:0;">' +

      /* ── Header icons ── */
      '<div style="position:absolute;top:10px;right:10px;z-index:2;display:flex;gap:8px;">' +
        '<div id="' + IDS.DASHBOARD_EXPORT + '" title="Export CSV" style="display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;background:#f0f0f0;border-radius:50%;width:28px;height:28px;">' +
          exportSVG +
          '<span id="wa-crm-dashboard-export-tooltip" style="display:none;position:absolute;top:34px;right:0;background:#222;color:#fff;padding:4px 10px;border-radius:6px;font-size:12px;white-space:nowrap;z-index:10;">Export CSV</span>' +
        '</div>' +
        '<div id="' + IDS.DASHBOARD_RESET + '" title="Reset Data" style="display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;background:#f0f0f0;border-radius:50%;width:28px;height:28px;">' +
          '<span style="color:#e74c3c;font-size:16px;font-weight:700;line-height:1;">&#8635;</span>' +
          '<span id="wa-crm-dashboard-reset-tooltip" style="display:none;position:absolute;top:34px;right:0;background:#222;color:#fff;padding:4px 10px;border-radius:6px;font-size:12px;white-space:nowrap;z-index:10;">Reset Data</span>' +
        '</div>' +
        '<div id="' + IDS.DASHBOARD_CLOSE + '" title="Close" style="display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;background:#f0f0f0;border-radius:50%;width:28px;height:28px;">' +
          '<span style="font-size:16px;color:#333;line-height:1;">&times;</span>' +
          '<span id="wa-crm-dashboard-close-tooltip" style="display:none;position:absolute;top:34px;right:0;background:#222;color:#fff;padding:4px 10px;border-radius:6px;font-size:12px;white-space:nowrap;z-index:10;">Close</span>' +
        '</div>' +
      '</div>' +

      '<div style="font-size:22px;font-weight:700;margin-bottom:6px;color:#2a4bff;padding-right:100px;">Admin Dashboard</div>' +
      '<div style="height:1px;background:#e6e6e6;margin-bottom:14px;"></div>' +

      /* ── Donut charts ── */
      '<div style="display:flex;gap:14px;margin-bottom:14px;justify-content:center;">' +
        '<div style="background:#f6f8ff;border-radius:16px;padding:14px 12px;display:flex;gap:14px;box-shadow:0 2px 8px rgba(0,0,0,0.04);align-items:center;">' +
          '<div style="display:flex;flex-direction:column;align-items:center;">' +
            '<canvas id="' + IDS.PIE_PAID    + '" width="80" height="80"></canvas>' +
            '<span style="margin-top:4px;font-size:12px;color:#00bfae;font-weight:600;">Paid</span>' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;align-items:center;">' +
            '<canvas id="' + IDS.PIE_UNPAID  + '" width="80" height="80"></canvas>' +
            '<span style="margin-top:4px;font-size:12px;color:#e74c3c;font-weight:600;">Unpaid</span>' +
          '</div>' +
        '</div>' +
        '<div style="background:#fff7e6;border-radius:16px;padding:14px 12px;display:flex;gap:14px;box-shadow:0 2px 8px rgba(0,0,0,0.04);align-items:center;">' +
          '<div style="display:flex;flex-direction:column;align-items:center;">' +
            '<canvas id="' + IDS.PIE_PRODUCT1 + '" width="80" height="80"></canvas>' +
            '<span style="margin-top:4px;font-size:12px;color:#673ab7;font-weight:600;">Product 1</span>' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;align-items:center;">' +
            '<canvas id="' + IDS.PIE_PRODUCT2 + '" width="80" height="80"></canvas>' +
            '<span style="margin-top:4px;font-size:12px;color:#f44336;font-weight:600;">Product 2</span>' +
          '</div>' +
        '</div>' +
      '</div>' +

      /* ── Add transaction form ── */
      '<form id="' + IDS.DASHBOARD_FORM + '" style="display:flex;gap:8px;margin-bottom:14px;align-items:flex-end;flex-wrap:wrap;">' +
        '<div style="display:flex;flex-direction:column;"><label style="font-size:11px;color:#666;margin-bottom:3px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Rate</label>' +
          '<input id="' + IDS.DASHBOARD_RATE + '" type="number" min="0" step="0.01" placeholder="0.00" style="width:80px;padding:6px 8px;border-radius:6px;border:1px solid #ddd;background:#fafafa;font-size:14px;" required /></div>' +
        '<div style="display:flex;flex-direction:column;"><label style="font-size:11px;color:#666;margin-bottom:3px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Qty</label>' +
          '<input id="' + IDS.DASHBOARD_QTY + '" type="number" min="1" step="1" placeholder="1" style="width:70px;padding:6px 8px;border-radius:6px;border:1px solid #ddd;background:#fafafa;font-size:14px;" required /></div>' +
        '<div style="display:flex;flex-direction:column;"><label style="font-size:11px;color:#666;margin-bottom:3px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Product</label>' +
          '<select id="' + IDS.DASHBOARD_PRODUCT + '" style="width:105px;padding:6px 8px;border-radius:6px;border:1px solid #ddd;background:#fafafa;font-size:14px;color:#333;">' +
            '<option value="" disabled selected>Select</option>' +
            '<option value="Product 1">Product 1</option>' +
            '<option value="Product 2">Product 2</option>' +
          '</select></div>' +
        '<div style="display:flex;flex-direction:column;align-items:center;"><label style="font-size:11px;color:#666;margin-bottom:3px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Paid</label>' +
          '<input id="' + IDS.DASHBOARD_PAID + '" type="checkbox" style="width:16px;height:16px;margin-top:6px;cursor:pointer;" /></div>' +
        '<button type="submit" style="background:#2a4bff;color:#fff;border:none;border-radius:6px;padding:7px 16px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;">+ Add</button>' +
      '</form>' +

      /* ── History header + filter ── */
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">' +
        '<div style="font-size:14px;font-weight:700;color:#222;text-transform:uppercase;letter-spacing:0.05em;">Transaction History</div>' +
        '<div style="display:flex;align-items:center;gap:4px;">' +
          '<select id="' + IDS.DASHBOARD_FILTER + '" style="padding:3px 8px;border-radius:6px;border:1px solid #ddd;font-size:12px;background:#f5f5f5;color:#333;min-width:85px;">' +
            '<option value="all">All Time</option>' +
            '<option value="today">Today</option>' +
            '<option value="week">This Week</option>' +
            '<option value="month">This Month</option>' +
            '<option value="custom">Custom</option>' +
          '</select>' +
          '<input type="date" id="' + IDS.DASHBOARD_DATE_FROM + '" style="display:none;padding:3px 6px;border-radius:6px;border:1px solid #ddd;font-size:12px;background:#f5f5f5;color:#333;" />' +
          '<input type="date" id="' + IDS.DASHBOARD_DATE_TO   + '" style="display:none;padding:3px 6px;border-radius:6px;border:1px solid #ddd;font-size:12px;background:#f5f5f5;color:#333;" />' +
        '</div>' +
      '</div>' +

      /* ── History list ── */
      '<div id="' + IDS.DASHBOARD_HISTORY + '" style="flex:1;overflow-y:auto;max-height:300px;border:1px solid #eee;border-radius:8px;background:#f8fafc;padding:8px 0;"></div>' +
    '</div>';
  }
};
