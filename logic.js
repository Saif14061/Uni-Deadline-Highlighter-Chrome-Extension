let observer = new MutationObserver(function(){
    scanPage()
})

observer.observe(document.body, {childList: true, subtree: true})

function scanPage(){
    let rows = document.querySelectorAll(".d2l-table-row, tr")
    
    rows.forEach(function(row){
        let nameEl = row.querySelector(".d2l-foldername strong")
        let dateEl = row.querySelector(".d2l-folderdates-wrapper")
        
        if(nameEl && dateEl){
            let text = dateEl.textContent
            if(text.includes("Due on")){
                let parts = text.split("Due on")
                if(parts[1]){
                    let date = parts[1].split("PM")[0].trim() + "PM"
                    let assignmentName = nameEl.textContent.trim()
                    console.log("Name: " + assignmentName + " | Date: " + date)
                    chrome.storage.local.get(["deadlines"]).then((result) => {
                        let existing = result.deadlines || []
                        let alreadyExists = existing.some(item => item.date === date)
                        if(!alreadyExists){
                            existing.push({ date: date, name: assignmentName })
                        }
                        chrome.storage.local.set({ deadlines: existing }).then(() => {
                            console.log("Saved to storage!")
                        })
                    })
                }
            }
        }
    })
}