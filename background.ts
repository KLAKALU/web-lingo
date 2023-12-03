export {}

console.log(
  "Live now; make now always the most precious time. Now will never come again."
)
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save",
    title: "についてGPTに聞きます",
    contexts: ["selection"] // テキストが選択された場合にのみ表示
  })

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "save" && info.selectionText) {
      const selectedText = info.selectionText
      const menuTitle = ` ${selectedText}についてGPTに聞きます`
      console.log(menuTitle)
      console.log(selectedText)

      // 新しいタイトルでコンテキストメニューを更新
      chrome.contextMenus.update("save", { title: menuTitle })
    }
  })
})
