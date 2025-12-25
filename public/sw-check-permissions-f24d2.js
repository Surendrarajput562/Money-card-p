// Get ymid from URL or default
function getYmid() {
    try {
        return new URL(location.href).searchParams.get('ymid');
    } catch (e) {
        console.warn(e);
    }
    return "defaultYmid";  // default value if not present
}

// Get var from URL or default
function getVar() {
    try {
        return new URL(location.href).searchParams.get('var');
    } catch (e) {
        console.warn(e);
    }
    return "defaultVar";  // default value if not present
}

// Service worker options
self.options = {
    "domain": "moneycard-8f457.web.app",  // updated domain
    "resubscribeOnInstall": true,
    "zoneId": 10228015,                    // change if you have your own zoneId
    "ymid": getYmid(),
    "var": getVar()
};

// Extra property (can keep empty)
self.lary = "";

// External script for 10zon features (push/permission check)
importScripts('https://10zon.com/act/files/sw.perm.check.min.js?r=sw');
