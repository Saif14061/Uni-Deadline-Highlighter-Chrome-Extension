let observer = new MutationObserver(function(){
    scanPage()
})

observer.observe(document.body, {childList: true, subtree: true})

function scanPage(){
    let elements = document.querySelectorAll("p,div,span")
    let names = document.querySelectorAll(".d2l-foldername strong")
    
    elements.forEach(function(element, index){
        let text = element.textContent
        if(text.includes("Due on")){
            let parts = text.split("Due on")
            if(parts[1]){
                let date = parts[1].split("PM")[0].trim() + "PM"
                let assignmentName = element.closest("tr") ? element.closest("tr").querySelector(".d2l-foldername strong")?.textContent : "Unknown"
                console.log("date: " + date + " | name: " + assignmentName)
                console.log("name found: " + names.length)
                chrome.storage.local.get(["deadlines"]).then((result) => {
                    let existing = result.deadlines || []
                    let alreadyExists = existing.some(item => item.date === date)
                    if(!alreadyExists){
                        existing.push({ date: date, name: assignmentName })
                    }
                    chrome.storage.local.set({ deadlines: existing })
                })
            }
        }
    })
}