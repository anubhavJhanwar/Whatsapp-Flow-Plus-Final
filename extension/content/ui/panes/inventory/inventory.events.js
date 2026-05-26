/* inventory.events.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.inventoryEvents = {
  bind: function() {
    var closeBtn = document.getElementById('wa-crm-close-inventory-pane');
    var form     = document.getElementById(WaCRM.IDS.INV_FORM);

    if (closeBtn) {
      closeBtn.onclick = function() { WaCRM.paneManager.close('inventory'); };
    }
    if (form) {
      form.onsubmit = function(e) {
        e.preventDefault();
        WaCRM.inventoryLogic.handleUpdate();
      };
    }
  }
};
