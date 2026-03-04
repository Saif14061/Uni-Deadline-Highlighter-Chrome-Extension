let observer = new MutationObserver(function(){
    scanPage()
})

observer.observe(document.body, {childList: true, subtree: true})

function scanPage(){
    let elements = document.querySelectorAll("p,div,span")
    
    elements.forEach(function(element){
        let text = element.textContent
        if(text.includes("Due on")){
            let parts = text.split("Due on")
            if(parts[1]){
                let date = parts[1].split("PM")[0].trim() + "PM"
                console.log("Date found " + date)
                chrome.storage.local.get(["deadlines"]).then((result) => {
                    let existing = result.deadlines || []
                    existing.push(date)
                    chrome.storage.local.set({ deadlines: existing })
                })
            }
        }
    })
}