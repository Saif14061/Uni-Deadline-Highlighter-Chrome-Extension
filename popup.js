chrome.storage.local.get(["deadlines"]).then((result) => {
    if(result.deadlines){
        console.log("items: ", result.deadlines)
        result.deadlines.forEach(function(item){
            let div = document.createElement("div")
            div.textContent = item.name + " — " + item.date
            let today = new Date()
            let deadlineDate = new Date(item.date)
            let diffInMs = deadlineDate - today
            let diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
            if(diffInDays < 0){
                div.className = "cards1 overdue"
            } else if(diffInDays === 0){
                div.className = "cards1 today"
            } else if(diffInDays <= 2){
                div.className = "cards1 one-two-days"
            } else if(diffInDays <= 7){
                div.className = "cards1 three-seven-days"
            } else {
                div.className = "cards1 seven-plus-days"
            }
            if(diffInDays >=-999){
                document.getElementsByClassName("section-3")[0].appendChild(div)
            }
            
        })
    }
})