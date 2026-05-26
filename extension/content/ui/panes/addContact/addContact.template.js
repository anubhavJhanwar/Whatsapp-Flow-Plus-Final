/* addContact.template.js */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.addContactTemplate = {
  getHTML: function(name, number) {
    var IDS = WaCRM.IDS;
    name   = name   || '';
    number = number || '';
    return '<div style="padding:20px 18px 18px 18px;font-family:sans-serif;height:100%;display:flex;flex-direction:column;">' +
      '<div style="padding-bottom:12px;border-bottom:1px solid #eee;">' +
        '<div id="' + IDS.AC_PANE_NAME   + '" style="font-weight:600;font-size:18px;color:#222;">' + name   + '</div>' +
        '<div id="' + IDS.AC_PANE_NUMBER + '" style="font-size:15px;color:#555;margin-top:2px;">'  + number + '</div>' +
      '</div>' +
      '<div style="padding:18px 0 0 0;flex:1;display:flex;flex-direction:column;">' +
        '<div style="color:#00bfae;font-size:18px;font-weight:600;margin-bottom:8px;">New Contact!</div>' +
        '<div style="color:#888;font-size:14px;margin-bottom:16px;">This contact is not saved in your CRM yet. To utilize CRM features such as tickets, activities, and chat sync, create a contact first.</div>' +
        '<label for="' + IDS.AC_NAME_INPUT + '" style="font-size:13px;color:#444;margin-bottom:6px;">Name</label>' +
        '<input id="' + IDS.AC_NAME_INPUT + '" type="text" value="' + name + '" placeholder="Enter name" ' +
          'style="width:calc(100% - 30px);margin:0 auto 16px auto;display:block;padding:8px 10px;border-radius:6px;border:1px solid #222;background:#f6f6f6;font-size:15px;" />' +
        '<button id="' + IDS.AC_CREATE_BTN + '" style="background:#2a4bff;color:#fff;border:none;border-radius:6px;padding:8px 0;font-size:15px;font-weight:600;cursor:pointer;margin-bottom:12px;width:140px;align-self:flex-start;">Add to Contacts</button>' +
        '<div id="wa-crm-google-status"></div>' +
      '</div>' +
      '<button id="' + IDS.AC_CLOSE_BTN + '" style="position:absolute;top:10px;right:10px;background:#eee;border:none;border-radius:50%;width:28px;height:28px;font-size:16px;cursor:pointer;">&times;</button>' +
    '</div>';
  }
};
