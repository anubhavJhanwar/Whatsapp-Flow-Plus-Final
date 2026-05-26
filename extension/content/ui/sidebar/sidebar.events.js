/* sidebar.events.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.sidebarEvents = {
  bind: function() {
    var IDS = WaCRM.IDS;
    var pm  = WaCRM.paneManager;
    var svc = WaCRM.whatsappService;

    function bindIcon(id, handler) {
      var el = document.getElementById(id);
      if (el) el.onclick = handler;
    }

    bindIcon(IDS.ICON_HOME,    function() { svc.triggerAllFilter(); });
    bindIcon(IDS.ICON_REFRESH, function() { location.reload(); });

    bindIcon(IDS.ICON_ADD_CONTACT, function() {
      var info = svc.getContactInfo();
      if (!info.nameFound && info.number) pm.toggle('addContact');
    });

    bindIcon(IDS.ICON_SETTINGS,     function() { pm.toggle('settings'); });
    bindIcon(IDS.ICON_ADMIN,        function() { pm.toggle('dashboard'); });
    bindIcon(IDS.ICON_CONTACT_BOOK, function() { pm.toggle('inventory'); });

    /* Notification + Contact — placeholders */
    bindIcon(IDS.ICON_NOTIFICATION, function() { /* TODO */ });
    bindIcon(IDS.ICON_CONTACT,      function() { /* TODO */ });
  }
};
