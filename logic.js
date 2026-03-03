let observer = new MutationObserver(function(){
    scanPage()
})
observer.observe(document.body, {childList: true, subtree: true})

function scanPage(){
    let elements = document.querySelectorAll("p,div,span")
    let pattern = /\d{1,2}\/\d{1,2}\/\d{2,4}/
    
    elements.forEach(function(element){
        let text = element.textContent
        if(text.includes("Due on")){
            let parts = text.split("Due on")
            if(parts[1]){
                chrome.storage.local.set({ deadlines: date})
                let date = parts[1].split("PM")[0].trim() + "PM"
                console.log("Date found " + date)
            }
        }
    })
}