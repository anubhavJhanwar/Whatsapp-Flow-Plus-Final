/* selectors.js — All WhatsApp DOM selectors in one place. */
var WaCRM = window.WaCRM || {};
window.WaCRM = WaCRM;

WaCRM.SELECTORS = {
  WA_APP:               '#app',
  MAIN_CHAT:            '#main',
  CONTACT_NUMBER:       '#main > header > div.x78zum5.xdt5ytf.x1iyjqo2.xl56j7k.xeuugli.xtnn1bt.x9v5kkp.xmw7ebm.xrdum7p > div > div > div > div > span',
  CONTACT_NAME:         '#app > div > div.x78zum5.xdt5ytf.x5yr21d > div > div._aig-._as6h.x9f619.x1n2onr6.x5yr21d.x6ikm8r.x10wlt62.x17dzmu4.x1i1dayz.x2ipvbc.x1w8yi2h.xpilrb4.x1t7ytsu.x1m2ixmg.x1c4vz4f.x2lah0s.x1ks9yow.xwfak60.x5hsz1j.x17dq4o0.x10e4vud > span > div > span > div > div > section > div.x13mwh8y.x1q3qbx4.x1wg5k15.x3psx0u.xat24cr.x1280gxy.x1cnzs8.x1xnnf8n.xx6bls6.x106a9eq > div.x1c4vz4f.xs83m0k.xdl72j9.x1g77sc7.x78zum5.xozqiw3.x1oa3qoh.x12fk4p8.xeuugli.x2lwn1j.x1nhvcw1.xdt5ytf.x6s0dn4 > div.x1evy7pa.x1anpbxc > span > div',
  ACTIVE_CHAT_NAME:     '#main > header > div.x78zum5.xdt5ytf.x1iyjqo2.xl56j7k.xeuugli.xtnn1bt.x9v5kkp.xmw7ebm.xrdum7p > div > div > div > div > span',
  NATIVE_ALL_FILTER:    '#all-filter',
  NATIVE_UNREAD_FILTER: '#unread-filter',
  NATIVE_GROUP_FILTER:  '#group-filter',
  CHAT_LIST_PRIMARY:    '.two',
  CHAT_LIST_FALLBACK:   '[role="region"] [tabindex="-1"]',
};
