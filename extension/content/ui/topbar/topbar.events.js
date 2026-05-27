/* topbar.events.js — Top bar button click handlers. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.topbarEvents = {
  bind: function() {
    var IDS = WaCRM.IDS;
    var svc = WaCRM.whatsappService;

    function bindBtn(id, handler) {
      var btn = document.getElementById(id);
      if (btn) { btn.onclick = handler; btn._crmBound = true; }
    }

    bindBtn(IDS.BTN_ALL,        function() { svc.triggerAllFilter(); });
    bindBtn(IDS.BTN_UNREAD,     function() { svc.triggerUnreadFilter(); });
    bindBtn(IDS.BTN_GROUPS,     function() { svc.triggerGroupFilter(); });
    bindBtn(IDS.BTN_ACTIVE,     function() { svc.triggerFilter('Active'); });
    bindBtn(IDS.BTN_FOLLOWUP,   function() { svc.triggerFilter('Favourites'); });
    bindBtn(IDS.BTN_RESPOND,    function() { svc.triggerFilter('Unread'); });
    bindBtn(IDS.BTN_UNKNOWN,    function() { svc.triggerFilter('All'); });
    bindBtn(IDS.BTN_BUSINESSES, function() { svc.triggerFilter('All'); });
    bindBtn(IDS.BTN_BRANDS,     function() { svc.triggerFilter('All'); });
    bindBtn(IDS.BTN_DUES,       function() { svc.triggerFilter('All'); });
  }
};
