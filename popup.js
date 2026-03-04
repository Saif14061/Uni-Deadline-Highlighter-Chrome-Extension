chrome.storage.local.get(["deadlines"]).then((result) => {
   result.deadlines.forEach(function(date){
    let div = document.createElement("div")
    div.textContent = date
    document.getElementsByClassName("section-3")[0].appendChild(div)
  })
})