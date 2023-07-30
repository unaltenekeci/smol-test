```javascript
let comments = [];

document.getElementById('saveButton').addEventListener('click', saveComment);
document.getElementById('optionsButton').addEventListener('click', openOptions);

function saveComment() {
    let commentText = document.getElementById('commentInput').value;
    let comment = {
        url: window.location.href,
        timestamp: new Date().getTime(),
        text: commentText
    };
    comments.push(comment);
    chrome.storage.sync.set({comments: comments}, function() {
        console.log('Comment saved');
    });
    displayComments();
}

function loadComments() {
    chrome.storage.sync.get(['comments'], function(result) {
        comments = result.comments || [];
        displayComments();
    });
}

function displayComments() {
    let commentList = document.getElementById('commentList');
    commentList.innerHTML = '';
    comments.forEach(function(comment) {
        let listItem = document.createElement('li');
        listItem.textContent = comment.text;
        commentList.appendChild(listItem);
    });
}

function openOptions() {
    chrome.runtime.openOptionsPage();
}

function init() {
    loadComments();
}

document.addEventListener('DOMContentLoaded', init);
```