```javascript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'LOAD_COMMENTS') {
        const url = request.url;
        chrome.storage.sync.get(url, (data) => {
            sendResponse({comments: data[url] || []});
        });
        return true;
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'SAVE_COMMENT') {
        const url = request.url;
        const comment = request.comment;
        chrome.storage.sync.get(url, (data) => {
            let comments = data[url] || [];
            comments.push(comment);
            chrome.storage.sync.set({[url]: comments}, () => {
                sendResponse({status: 'Comment saved'});
            });
        });
        return true;
    }
});
```