```javascript
let comments = [];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ comments });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'SAVE_COMMENT') {
    saveComment(request.data);
  } else if (request.message === 'LOAD_COMMENTS') {
    loadComments(request.data);
  }
});

function saveComment(comment) {
  comments.push(comment);
  chrome.storage.sync.set({ comments });
}

function loadComments(url) {
  chrome.storage.sync.get(['comments'], function(result) {
    let urlComments = result.comments.filter(comment => comment.url === url);
    chrome.runtime.sendMessage({ message: 'DISPLAY_COMMENTS', data: urlComments });
  });
}
```