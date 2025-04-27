// Basic SCORM 1.2 API Wrapper

var API = null;
var findAPITries = 0;

function findAPI(win) {
    while ((win.API == null) && (win.parent != null) && (win.parent != win)) {
        findAPITries++;
        if (findAPITries > 7) {
            console.warn("Error finding API -- too deeply nested.");
            return null;
        }
        win = win.parent;
    }
    return win.API;
}

function getAPI() {
    if ((window.parent != null) && (window.parent != window)) {
        API = findAPI(window.parent);
    }
    if ((API == null) && (window.opener != null)) {
        API = findAPI(window.opener);
    }
    if (API == null) {
        console.warn("Unable to find SCORM API");
    }
    return API;
}

// Public SCORM Functions
function ScormInitialize() {
    var api = getAPI();
    if (api == null) {
        console.error("SCORM API not found - Initialization failed.");
        return "false";
    }
    var result = api.LMSInitialize("");
    console.log("LMSInitialize: " + result);
    return result;
}

function ScormSetValue(element, value) {
    var api = getAPI();
    if (api == null) {
        console.error("SCORM API not found - Cannot set value for " + element);
        return "false";
    }
    var result = api.LMSSetValue(element, value);
    console.log("LMSSetValue(" + element + ", " + value + "): " + result);
    // Optional: Commit after setting critical values like status or score
    // if (element === 'cmi.core.lesson_status' || element === 'cmi.core.score.raw') {
    //     ScormCommit();
    // }
    return result;
}

function ScormGetValue(element) {
    var api = getAPI();
    if (api == null) {
        console.error("SCORM API not found - Cannot get value for " + element);
        return "";
    }
    var result = api.LMSGetValue(element);
    console.log("LMSGetValue(" + element + "): " + result);
    return result;
}

function ScormCommit() {
    var api = getAPI();
    if (api == null) {
        console.error("SCORM API not found - Cannot commit.");
        return "false";
    }
    var result = api.LMSCommit("");
    console.log("LMSCommit: " + result);
    return result;
}

function ScormFinish() {
    var api = getAPI();
    if (api == null) {
        console.error("SCORM API not found - Cannot finish.");
        return "false";
    }
    var result = api.LMSFinish("");
    console.log("LMSFinish: " + result);
    return result;
}

function ScormGetLastError() {
    var api = getAPI();
    if (api == null) {
        console.error("SCORM API not found - Cannot get last error.");
        return "0"; // Return "0" for No Error as per SCORM spec if API not found
    }
    return api.LMSGetLastError();
}

function ScormGetErrorString(errorCode) {
    var api = getAPI();
    if (api == null) {
        console.error("SCORM API not found - Cannot get error string.");
        return "SCORM API not found.";
    }
    return api.LMSGetErrorString(errorCode);
}

function ScormGetDiagnostic(errorCode) {
     var api = getAPI();
     if (api == null) {
         console.error("SCORM API not found - Cannot get diagnostic.");
         return "SCORM API not found.";
     }
     return api.LMSGetDiagnostic(errorCode);
}

// Make functions globally available
window.ScormInitialize = ScormInitialize;
window.ScormSetValue = ScormSetValue;
window.ScormGetValue = ScormGetValue;
window.ScormCommit = ScormCommit;
window.ScormFinish = ScormFinish;
window.ScormGetLastError = ScormGetLastError;
window.ScormGetErrorString = ScormGetErrorString;
window.ScormGetDiagnostic = ScormGetDiagnostic;
