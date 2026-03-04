chrome.storage.local.get(["deadlines"]).then((result) => {
    console.log(result.deadlines)
})