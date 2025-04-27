/*******************************************************************************
**
** Simple SCORM 1.2 API Wrapper
**
*******************************************************************************/

var scorm = (function() {
    var API = null;
    var isInitialized = false;
    var completionStatus = "incomplete"; // Default status

    // --- Private Functions ---

    // Function to find the SCORM API
    function findAPI(win) {
        var findAPITries = 0;
        while ((win.API == null) && (win.parent != null) && (win.parent != win)) {
            findAPITries++;
            if (findAPITries > 7) {
                console.error("Error finding API -- too deeply nested.");
                return null;
            }
            win = win.parent;
        }
        return win.API;
    }

    // Function to initialize the connection
    function initInternal() {
        if (isInitialized) {
            console.warn("SCORM already initialized.");
            return true;
        }

        API = findAPI(window);

        if ((API == null) && (window.opener != null) && (typeof(window.opener) != "undefined")) {
            API = findAPI(window.opener);
        }

        if (API == null) {
            console.error("Unable to find SCORM API.");
            return false;
        }

        var result = API.LMSInitialize("");
        if (result !== "true") {
            var error = getError();
            console.error("Error initializing SCORM: " + error.string + " (Code: " + error.code + ")");
            return false;
        }

        isInitialized = true;
        console.log("SCORM Initialized successfully.");

        // Get initial completion status
        completionStatus = getInternal("cmi.core.lesson_status");
        if (completionStatus === "not attempted") {
            setInternal("cmi.core.lesson_status", "incomplete");
        }

        return true;
    }

    // Function to terminate the connection
    function terminateInternal() {
        if (!isInitialized) {
            console.warn("SCORM not initialized, cannot terminate.");
            return false;
        }

        // Ensure score and status are saved before terminating
        saveInternal();

        var result = API.LMSFinish("");
        if (result !== "true") {
            var error = getError();
            console.error("Error terminating SCORM: " + error.string + " (Code: " + error.code + ")");
            // Don't return false here, as termination should proceed if possible
        }

        isInitialized = false;
        API = null;
        console.log("SCORM Terminated.");
        return true; // Indicate termination attempt was made
    }

    // Function to get a value from the LMS
    function getInternal(name) {
        if (!isInitialized || API == null) {
            console.error("SCORM not initialized, cannot get value for: " + name);
            return "";
        }
        var value = API.LMSGetValue(name);
        var error = getError();
        if (error.code !== "0") {
            console.warn("Error getting value for " + name + ": " + error.string + " (Code: " + error.code + ")");
        }
        // console.log("Get " + name + ": " + value);
        return value;
    }

    // Function to set a value in the LMS
    function setInternal(name, value) {
        if (!isInitialized || API == null) {
            console.error("SCORM not initialized, cannot set value for: " + name);
            return false;
        }
        // console.log("Set " + name + ": " + value);
        var result = API.LMSSetValue(name, value);
        if (result !== "true") {
            var error = getError();
            console.error("Error setting value for " + name + " to " + value + ": " + error.string + " (Code: " + error.code + ")");
            return false;
        }
        return true;
    }

    // Function to save data to the LMS
    function saveInternal() {
        if (!isInitialized || API == null) {
            console.error("SCORM not initialized, cannot save.");
            return false;
        }
        var result = API.LMSCommit("");
        if (result !== "true") {
            var error = getError();
            console.error("Error saving SCORM data: " + error.string + " (Code: " + error.code + ")");
            return false;
        }
        // console.log("SCORM Data Saved (Commit).");
        return true;
    }

    // Function to get the last error
    function getError() {
        var error = { code: "0", string: "No Error" };
        if (API != null) {
            error.code = API.LMSGetLastError();
            error.string = API.LMSGetErrorString(error.code);
            var diagnostic = API.LMSGetDiagnostic(error.code);
            if (diagnostic && diagnostic !== "") {
                error.diagnostic = diagnostic;
            }
        }
        return error;
    }

    // --- Public Interface ---
    return {
        init: function() {
            return initInternal();
        },
        quit: function() {
            return terminateInternal();
        },
        get: function(name) {
            return getInternal(name);
        },
        set: function(name, value) {
            // Automatically set exit to suspend if setting score or progress
            if (name !== "cmi.core.exit") {
                 setInternal("cmi.core.exit", "suspend");
            }
            return setInternal(name, value);
        },
        save: function() {
            return saveInternal();
        },
        isAvailable: function() {
            // Check if API was found, even if not initialized yet
            if (API == null) {
                API = findAPI(window);
                 if ((API == null) && (window.opener != null) && (typeof(window.opener) != "undefined")) {
                    API = findAPI(window.opener);
                 }
            }
            return API != null;
        },
        getCompletionStatus: function() {
            return completionStatus;
        },
        setCompleted: function() {
            if (completionStatus !== "completed") {
                completionStatus = "completed";
                return setInternal("cmi.core.lesson_status", "completed");
            }
            return true; // Already completed
        },
        setPassed: function() { // Optional: if you have pass/fail criteria
             if (completionStatus !== "passed") {
                 completionStatus = "passed";
                 return setInternal("cmi.core.lesson_status", "passed");
             }
             return true; // Already passed
        },
         setFailed: function() { // Optional: if you have pass/fail criteria
             if (completionStatus !== "failed") {
                 completionStatus = "failed";
                 return setInternal("cmi.core.lesson_status", "failed");
             }
             return true; // Already failed
         }
    };
})();

// Make scorm object accessible globally
window.scorm = scorm;
