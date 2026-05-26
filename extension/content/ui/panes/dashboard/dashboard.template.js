/* dashboard.template.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.dashboardTemplate = {
  getHTML: function() {
    var IDS = WaCRM.IDS;
    var exportSrc = chrome.runtime.getURL('assets/icons/icon9.png');
    return '<div style="padding:18px 12px 0 12px;position:relative;flex:1;display:flex;flex-direction:column;min-height:0;">' +

      /* ── Header icons ── */
      '<div style="position:absolute;top:10px;right:10px;z-index:2;display:flex;gap:8px;">' +
        '<div id="' + IDS.DASHBOARD_EXPORT + '" style="display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;background:#eee;border-radius:50%;width:28px;height:28px;">' +
          '<img src="' + exportSrc + '" alt="Export" style="width:20px;height:20px;" />' +
          '<span id="wa-crm-dashboard-export-tooltip" style="display:none;position:absolute;top:32px;left:50%;transform:translateX(-50%);background:#222;color:#fff;padding:4px 10px;border-radius:6px;font-size:13px;white-space:nowrap;z-index:10;">Export Data</span>' +
        '</div>' +
        '<div id="' + IDS.DASHBOARD_RESET + '" style="display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;background:#eee;border-radius:50%;width:28px;height:28px;">' +
          '<span style="color:#e74c3c;font-size:18px;font-weight:700;">&#8635;</span>' +
          '<span id="wa-crm-dashboard-reset-tooltip" style="display:none;position:absolute;top:32px;left:50%;transform:translateX(-50%);background:#222;color:#fff;padding:4px 10px;border-radius:6px;font-size:13px;white-space:nowrap;z-index:10;">Reset Data</span>' +
        '</div>' +
        '<div id="' + IDS.DASHBOARD_CLOSE + '" style="display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;background:#eee;border-radius:50%;width:28px;height:28px;">' +
          '<span style="font-size:16px;color:#111;">&times;</span>' +
          '<span id="wa-crm-dashboard-close-tooltip" style="display:none;position:absolute;top:32px;left:50%;transform:translateX(-50%);background:#222;color:#fff;padding:4px 10px;border-radius:6px;font-size:13px;white-space:nowrap;z-index:10;">Close</span>' +
        '</div>' +
      '</div>' +

      '<div style="font-size:26px;font-weight:700;margin-bottom:8px;color:#2a4bff;">Admin Dashboard</div>' +
      '<div style="height:1px;background:#e6e6e6;margin-bottom:18px;"></div>' +

      /* ── Donut charts ── */
      '<div style="display:flex;gap:22px;margin-bottom:18px;justify-content:center;">' +
        '<div style="background:#f6f8ff;border-radius:22px;padding:18px 16px;display:flex;gap:18px;box-shadow:0 2px 8px rgba(0,0,0,0.04);align-items:center;">' +
          '<div style="display:flex;flex-direction:column;align-items:center;">' +
            '<canvas id="' + IDS.PIE_PAID    + '" width="90" height="90"></canvas>' +
            '<span style="margin-top:6px;font-size:14px;color:#00bfae;font-weight:600;">Paid</span>' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;align-items:center;">' +
            '<canvas id="' + IDS.PIE_UNPAID  + '" width="90" height="90"></canvas>' +
            '<span style="margin-top:6px;font-size:14px;color:#e74c3c;font-weight:600;">Unpaid</span>' +
          '</div>' +
        '</div>' +
        '<div style="background:#fff7e6;border-radius:22px;padding:18px 16px;display:flex;gap:18px;box-shadow:0 2px 8px rgba(0,0,0,0.04);align-items:center;">' +
          '<div style="display:flex;flex-direction:column;align-items:center;">' +
            '<canvas id="' + IDS.PIE_PRODUCT1 + '" width="90" height="90"></canvas>' +
            '<span style="margin-top:6px;font-size:14px;color:#673ab7;font-weight:600;">Product 1</span>' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;align-items:center;">' +
            '<canvas id="' + IDS.PIE_PRODUCT2 + '" width="90" height="90"></canvas>' +
            '<span style="margin-top:6px;font-size:14px;color:#f44336;font-weight:600;">Product 2</span>' +
          '</div>' +
        '</div>' +
      '</div>' +

      /* ── Add transaction form ── */
      '<form id="' + IDS.DASHBOARD_FORM + '" style="display:flex;gap:10px;margin-bottom:18px;align-items:flex-end;flex-wrap:wrap;">' +
        '<div style="display:flex;flex-direction:column;"><label style="font-size:13px;color:#444;margin-bottom:4px;">Rate</label>' +
          '<input id="' + IDS.DASHBOARD_RATE + '" type="number" min="0" step="0.01" style="width:90px;padding:7px 8px;border-radius:6px;border:1px solid #bbb;background:#f6f6f6;font-size:15px;" required /></div>' +
        '<div style="display:flex;flex-direction:column;"><label style="font-size:13px;color:#444;margin-bottom:4px;">Quantity</label>' +
          '<input id="' + IDS.DASHBOARD_QTY + '" type="number" min="1" step="1" style="width:90px;padding:7px 8px;border-radius:6px;border:1px solid #bbb;background:#f6f6f6;font-size:15px;" required /></div>' +
        '<div style="display:flex;flex-direction:column;"><label style="font-size:13px;color:#444;margin-bottom:4px;">Product</label>' +
          '<select id="' + IDS.DASHBOARD_PRODUCT + '" style="width:110px;padding:7px 8px;border-radius:6px;border:1px solid #bbb;background:#f6f6f6;font-size:15px;color:#000;">' +
            '<option value="" disabled selected>Select Product</option>' +
            '<option value="Product 1">Product 1</option>' +
            '<option value="Product 2">Product 2</option>' +
          '</select></div>' +
        '<div style="display:flex;flex-direction:column;"><label style="font-size:13px;color:#444;margin-bottom:4px;">Payment Received</label>' +
          '<input id="' + IDS.DASHBOARD_PAID + '" type="checkbox" style="width:18px;height:18px;margin-top:7px;" /></div>' +
        '<button type="submit" style="background:#2a4bff;color:#fff;border:none;border-radius:6px;padding:8px 18px;font-size:15px;font-weight:600;cursor:pointer;">Add</button>' +
      '</form>' +

      /* ── History header + filter ── */
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">' +
        '<div style="font-size:18px;font-weight:600;color:#222;">Transaction History</div>' +
        '<div style="display:flex;align-items:center;gap:6px;">' +
          '<select id="' + IDS.DASHBOARD_FILTER + '" style="padding:3px 8px;border-radius:6px;border:1px solid #bbb;font-size:14px;background:#f0f1f3;color:#111;min-width:90px;">' +
            '<option value="all">All</option><option value="today">Today</option>' +
            '<option value="week">This Week</option><option value="month">This Month</option>' +
            '<option value="custom">Custom</option>' +
          '</select>' +
          '<input type="date" id="' + IDS.DASHBOARD_DATE_FROM + '" style="display:none;margin-left:4px;padding:3px 6px;border-radius:6px;border:1px solid #bbb;font-size:13px;background:#f0f1f3;color:#111;" />' +
          '<input type="date" id="' + IDS.DASHBOARD_DATE_TO   + '" style="display:none;margin-left:2px;padding:3px 6px;border-radius:6px;border:1px solid #bbb;font-size:13px;background:#f0f1f3;color:#111;" />' +
        '</div>' +
      '</div>' +

      /* ── History list ── */
      '<div id="' + IDS.DASHBOARD_HISTORY + '" style="flex:1;overflow-y:auto;max-height:320px;border:1px solid #eee;border-radius:8px;background:#f4f7fa;padding:10px 0;"></div>' +
    '</div>';
  }
};
