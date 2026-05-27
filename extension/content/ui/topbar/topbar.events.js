/* topbar.events.js — Top bar button click handlers with active state. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.topbarEvents = {
  /**
   * Set the active visual state on a top bar button.
   * Removes active from all others first.
   * @param {string} activeId - The button ID to mark active.
   */
  setActive: function(activeId) {
    var IDS = WaCRM.IDS;
    var allBtnIds = [
      IDS.BTN_ALL, IDS.BTN_UNREAD, IDS.BTN_ACTIVE, IDS.BTN_DUES,
      IDS.BTN_FOLLOWUP, IDS.BTN_RESPOND, IDS.BTN_UNKNOWN,
      IDS.BTN_GROUPS, IDS.BTN_BUSINESSES, IDS.BTN_BRANDS
    ];
    allBtnIds.forEach(function(id) {
      var btn = document.getElementById(id);
      if (btn) btn.classList.remove('active');
    });
    var activeBtn = document.getElementById(activeId);
    if (activeBtn) activeBtn.classList.add('active');
  },

  bind: function() {
    var IDS  = WaCRM.IDS;
    var svc  = WaCRM.whatsappService;
    var self = this;

    function bindBtn(id, filterLabel) {
      var btn = document.getElementById(id);
      if (btn) {
        btn.onclick = function() {
          svc.triggerFilter(filterLabel);
          self.setActive(id);
        };
      }
    }

    bindBtn(IDS.BTN_ALL,        'All');
    bindBtn(IDS.BTN_UNREAD,     'Unread');
    bindBtn(IDS.BTN_ACTIVE,     'Active');
    bindBtn(IDS.BTN_DUES,       'All');
    bindBtn(IDS.BTN_FOLLOWUP,   'Favourites');
    bindBtn(IDS.BTN_RESPOND,    'Unread');
    bindBtn(IDS.BTN_UNKNOWN,    'All');
    bindBtn(IDS.BTN_GROUPS,     'Groups');
    bindBtn(IDS.BTN_BUSINESSES, 'All');
    bindBtn(IDS.BTN_BRANDS,     'All');

    /* Default: mark All as active on load */
    self.setActive(IDS.BTN_ALL);
  }
};
