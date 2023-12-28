const startObserving = document.getElementById("startObserving");
startObserving.addEventListener("click",() => {    
    chrome.tabs.query({active: true}, (tabs) => {
        const tab = tabs[0];
        if (tab) {
            alert(tab.id)
        } else {
            alert("There are no active tabs")
        }
    })
})

// TODO: Eventually looking to grab value from all inputs with label of "aria-label="Life Total"
// Example HTML Object
// <input class="focus:outline-none bg-transparent font-bold text-center select-auto text-white text-3xl" type="number" aria-label="Life Total" value="40" style="width: 59px;">