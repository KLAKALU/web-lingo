export {}

console.log(
  "Live now; make now always the most precious time. Now will never come again."
)
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save",
    title: "GPTに聞きます",
    contexts: ["all"]
  })
})

var sendText = document.getSelection()
console.log(sendText)
