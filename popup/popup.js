// Start Observing Button
const startObserving = document.getElementById("startObserving");

/**
 * Start Observing the active tab
 */
startObserving.addEventListener("click",() => {
    // Get active browser tab
    chrome.tabs.query({active: true}, (tabs) => {
        const tab = tabs[0];
        if (tab) {
            // If we have an active tab then execute
            execScript(tab);
        } else {
            alert("There are no active tabs");
        }
    })
})

/**
 * Function executes a getLifeTotals() function on a web page,
 * opened on specified tab
 * @param tab - A tab to execute script on
 */
function execScript(tab) {
    // Execute a function on a page of the current browser tab
    // and process the result of execution
    chrome.scripting.executeScript(
        {
            target:{tabId: tab.id, allFrames: true},
            func:getLifeTotals
        },
        onResult
    );
}

function getLifeTotals() {
    // TODO - Get life totals from all players
    // Return an array of the values

    // Get Life Totals
    const lifeTotals = document.querySelectorAll('[aria-label="Life Total"]');
    console.log("hello", lifeTotals);
    return Array.from(lifeTotals);
}

function onResult(frames) {
    // If script execution failed on the remote end 
    // and could not return results
    if (!frames || !frames.length) { 
        alert("Could not retrieve life totals from specified page");
        return;
    }

    console.log(frames);
}