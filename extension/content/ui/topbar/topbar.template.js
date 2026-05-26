/* topbar.template.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.topbarTemplate = {
  getHTML: function() {
    var IDS = WaCRM.IDS, C = WaCRM.CLASSES;
    return '<div class="wa-crm-top-inner"><div class="wa-crm-top-buttons">' +
      '<button class="' + C.TOP_BTN + '" id="' + IDS.BTN_ALL        + '">All</button>' +
      '<button class="' + C.TOP_BTN + '" id="' + IDS.BTN_UNREAD     + '">Unread</button>' +
      '<button class="' + C.TOP_BTN + '" id="' + IDS.BTN_ACTIVE     + '">Active</button>' +
      '<button class="' + C.TOP_BTN + '" id="' + IDS.BTN_DUES       + '">Dues</button>' +
      '<button class="' + C.TOP_BTN + '" id="' + IDS.BTN_FOLLOWUP   + '">Followup</button>' +
      '<button class="' + C.TOP_BTN + '" id="' + IDS.BTN_RESPOND    + '">Respond</button>' +
      '<button class="' + C.TOP_BTN + '" id="' + IDS.BTN_UNKNOWN    + '">Unknown</button>' +
      '<button class="' + C.TOP_BTN + '" id="' + IDS.BTN_GROUPS     + '">Groups</button>' +
      '<button class="' + C.TOP_BTN + '" id="' + IDS.BTN_BUSINESSES + '">Businesses</button>' +
      '<button class="' + C.TOP_BTN + '" id="' + IDS.BTN_BRANDS     + '">Brands</button>' +
      '</div></div>';
  }
};
