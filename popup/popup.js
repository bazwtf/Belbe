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
            func:getLifeTotalValues
        },
        onResult
    );
}
/**
 * Function to retrieve the life total objects from Spelltable
 * then passing them back sanitised in an array
 * @returns {array} Array of integers
 */
function getLifeTotalValues() {

    let lifeTotalsObjects, index;
    let sanitisedLifeTotals = [];
    
    // Get life totals from objects
    lifeTotalsObjects = document.querySelectorAll('input[aria-label="Life Total"]');
    
    // Extract life total values from objects
    for (index = 0; index < lifeTotalsObjects.length; ++index) {
        // TODO: Error handling if user passes a string
        
        let lifeTotal = lifeTotalsObjects[index].value;
        
        // Pass value (assumed integer)
        sanitisedLifeTotals.push(lifeTotal);        
    }
    console.log(sanitisedLifeTotals);
    return sanitisedLifeTotals;
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