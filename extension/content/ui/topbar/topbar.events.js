/* topbar.events.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.topbarEvents = {
  bind: function() {
    var IDS = WaCRM.IDS;
    var svc = WaCRM.whatsappService;

    function bindBtn(id, handler) {
      var btn = document.getElementById(id);
      if (btn && !btn._crmBound) { btn.onclick = handler; btn._crmBound = true; }
    }

    bindBtn(IDS.BTN_ALL,    function() { svc.triggerAllFilter(); });
    bindBtn(IDS.BTN_UNREAD, function() { svc.triggerUnreadFilter(); });
    bindBtn(IDS.BTN_GROUPS, function() { svc.triggerGroupFilter(); });
    /* Active, Dues, Followup, Respond, Unknown, Businesses, Brands — future handlers */
  }
};
