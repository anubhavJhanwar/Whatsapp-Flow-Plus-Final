/* settings.template.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.settingsTemplate = {
  getHTML: function() {
    var IDS = WaCRM.IDS, C = WaCRM.CLASSES;
    return '<div style="padding:16px 18px 0 18px;position:relative;height:calc(100vh - 52px);display:flex;flex-direction:column;">' +
      '<div style="position:absolute;top:10px;right:10px;z-index:2;">' +
        '<button id="' + IDS.SETTINGS_CLOSE + '" class="wa-crm-pane-close-btn">&times;</button>' +
      '</div>' +
      '<div style="font-size:24px;font-weight:700;margin-bottom:8px;color:#000;">Utilities</div>' +
      '<div style="height:1px;background:#e6e6e6;margin-bottom:18px;"></div>' +
      '<div class="' + C.SETTINGS_ROW + '">' +
        '<span class="' + C.SETTINGS_LABEL + '">Hide Chat List Data</span>' +
        '<label class="' + C.SWITCH + '"><input type="checkbox" id="' + IDS.TOGGLE_HIDE_CHAT + '"><span class="' + C.SLIDER + '"></span></label>' +
      '</div>' +
      '<div class="' + C.SETTINGS_ROW + '">' +
        '<span class="' + C.SETTINGS_LABEL + '">Hide Top Bar</span>' +
        '<label class="' + C.SWITCH + '"><input type="checkbox" id="' + IDS.TOGGLE_HIDE_TOPBAR + '"><span class="' + C.SLIDER + '"></span></label>' +
      '</div>' +
      '<div style="height:1px;background:#e6e6e6;margin:10px 0;"></div>' +
      '<div style="flex:1;"></div>' +
    '</div>';
  }
};
