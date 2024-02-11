// Start Observing Button
const startObserving = document.getElementById("startObserving");

// Boolean to identify state of startObserving
let amIObserving = false;

/**
 * Start Observing the active tab
 */
startObserving.addEventListener("click",() => {
    // Get active browser tab
    chrome.tabs.query({active: true}, (tabs) => {
        const tab = tabs[0];
        if (tab) {
            // If we have an active tab then execute

            // Check amIObserving boolean
            // TODO: Boolean states for button.
            if (false === amIObserving) {
                amIObserving = true;
            }

            // Execute script in tab
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

        // Add player number to each LifeTotalsObject
        lifeTotalsObjects[index].setAttribute('data-player-number', index + 1 );
        
        let lifeTotal = lifeTotalsObjects[index].value;
        
        // Pass value (assumed integer)
        sanitisedLifeTotals.push(lifeTotal);        
    }
    console.log("Life Totals:" + sanitisedLifeTotals);

    // startListeners();
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

function startListeners() {
    // Start event listeners to track changes
    let playerOneLife = document.querySelectorAll('data-player-number="1"]').addEventListener('input', function (evt) {
        pushLifeTotal("player one", this.value);
    });
}

function pushLifeTotal(player, value) {
    // do something
    console.log("Player: " + player, "Life total: " + value);
}
