chrome.storage.local.get(["deadlines"]).then((result) => {
    if(result.deadlines){
        result.deadlines.forEach(function(item){
            let div = document.createElement("div")
            div.textContent = item.name + " — " + item.date
            div.className = "cards1"
            document.getElementsByClassName("section-3")[0].appendChild(div)
        })
    }
})