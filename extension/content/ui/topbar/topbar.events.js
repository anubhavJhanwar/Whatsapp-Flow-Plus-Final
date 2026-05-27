/* topbar.events.js — Top bar button handlers with active state + custom DOM filtering. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.topbarEvents = {

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
    var flt  = WaCRM.chatFilterService;
    var self = this;

    /* Buttons that use WhatsApp's native filter tabs */
    function bindNative(id, label) {
      var btn = document.getElementById(id);
      if (btn) {
        btn.onclick = function() {
          flt.showAll();           /* clear any custom DOM filter first */
          svc.triggerFilter(label);
          self.setActive(id);
        };
      }
    }

    /* Buttons that use our custom DOM filter */
    function bindCustom(id, filterKey) {
      var btn = document.getElementById(id);
      if (btn) {
        btn.onclick = function() {
          flt.applyFilter(filterKey);
          self.setActive(id);
        };
      }
    }

    /* ── Native WhatsApp filters ── */
    bindNative(IDS.BTN_ALL,      'All');
    bindNative(IDS.BTN_UNREAD,   'Unread');
    bindNative(IDS.BTN_GROUPS,   'Groups');
    bindNative(IDS.BTN_FOLLOWUP, 'Favourites');

    /* ── Custom CRM DOM filters ── */
    bindCustom(IDS.BTN_BUSINESSES, 'businesses');
    bindCustom(IDS.BTN_BRANDS,     'brands');
    bindCustom(IDS.BTN_UNKNOWN,    'unknown');
    bindCustom(IDS.BTN_ACTIVE,     'active');
    bindCustom(IDS.BTN_DUES,       'dues');
    bindCustom(IDS.BTN_RESPOND,    'respond');

    /* Default: All active on load */
    self.setActive(IDS.BTN_ALL);
  }
};
