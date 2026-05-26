/* inventory.template.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.inventoryTemplate = {
  getHTML: function() {
    var IDS = WaCRM.IDS;
    return '<div style="padding:20px 18px 18px 18px;font-family:sans-serif;min-height:320px;display:flex;flex-direction:column;">' +
      '<div style="padding-bottom:12px;border-bottom:1px solid #eee;position:relative;">' +
        '<div style="font-weight:600;font-size:18px;color:#222;">Inventory Management</div>' +
        '<button id="wa-crm-close-inventory-pane" style="position:absolute;top:0;right:0;background:#eee;border:none;border-radius:50%;width:28px;height:28px;font-size:16px;cursor:pointer;">&times;</button>' +
      '</div>' +
      '<div style="padding:18px 0 0 0;flex:1;display:flex;flex-direction:column;gap:18px;">' +
        '<form id="' + IDS.INV_FORM + '" style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;margin-bottom:10px;">' +
          '<div style="display:flex;flex-direction:column;">' +
            '<label style="font-size:13px;color:#444;margin-bottom:4px;">Product 1 Stock</label>' +
            '<input id="' + IDS.INV_INPUT_P1 + '" type="number" min="0" step="1" style="width:90px;padding:7px 8px;border-radius:6px;border:1px solid #bbb;background:#f6f6f6;font-size:15px;" required />' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;">' +
            '<label style="font-size:13px;color:#444;margin-bottom:4px;">Product 2 Stock</label>' +
            '<input id="' + IDS.INV_INPUT_P2 + '" type="number" min="0" step="1" style="width:90px;padding:7px 8px;border-radius:6px;border:1px solid #bbb;background:#f6f6f6;font-size:15px;" required />' +
          '</div>' +
          '<button type="submit" style="background:#2a4bff;color:#fff;border:none;border-radius:6px;padding:8px 18px;font-size:15px;font-weight:600;cursor:pointer;">Update</button>' +
        '</form>' +
        '<div style="display:flex;gap:18px;justify-content:center;align-items:flex-end;">' +
          '<div style="display:flex;flex-direction:column;align-items:center;">' +
            '<canvas id="' + IDS.INV_CANVAS_P1 + '" width="90" height="90"></canvas>' +
            '<span id="' + IDS.INV_LABEL_P1 + '" style="margin-top:6px;font-size:14px;font-weight:600;">Product 1</span>' +
            '<div id="' + IDS.INV_WARN_P1 + '" style="margin-top:4px;font-size:13px;font-weight:600;"></div>' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;align-items:center;">' +
            '<canvas id="' + IDS.INV_CANVAS_P2 + '" width="90" height="90"></canvas>' +
            '<span id="' + IDS.INV_LABEL_P2 + '" style="margin-top:6px;font-size:14px;font-weight:600;">Product 2</span>' +
            '<div id="' + IDS.INV_WARN_P2 + '" style="margin-top:4px;font-size:13px;font-weight:600;"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }
};
