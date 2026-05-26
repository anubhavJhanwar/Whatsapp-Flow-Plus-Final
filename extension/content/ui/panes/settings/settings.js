/* settings.js — Settings pane entry point. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.settingsPane = {
  open: function() {
    var pane = document.getElementById(WaCRM.IDS.PANE_SETTINGS);
    if (!pane) {
      pane = document.createElement('div');
      pane.id = WaCRM.IDS.PANE_SETTINGS;
      pane.innerHTML = WaCRM.settingsTemplate.getHTML();
      document.body.appendChild(pane);
      WaCRM.settingsEvents.bind();
    } else {
      pane.style.display = 'block';
    }
  },
  init: function() {
    WaCRM.paneManager.register('settings', WaCRM.IDS.PANE_SETTINGS, function() {
      WaCRM.settingsPane.open();
    });
  }
};
