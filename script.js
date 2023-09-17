// Get the button element
var btn = document.querySelector('.up');

// Show the button when the user scrolls down a certain amount
window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
});


// Function to add a comment to the comments section
function addComment(name, comment) {
    const commentsDiv = document.getElementById('comments');
    const commentDiv = document.createElement('div');
    commentDiv.innerHTML = `<strong>${name}:</strong> ${comment}`;
    commentsDiv.appendChild(commentDiv);
}

// Function to save a comment to local storage
function saveCommentToLocalStorage(name, comment) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push({ name, comment });
    localStorage.setItem('comments', JSON.stringify(comments));
}

// Function to load comments from local storage
function loadCommentsFromLocalStorage() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    for (const comment of comments) {
        addComment(comment.name, comment.comment);
    }
}

// Event listener for form submission
document.getElementById('comment-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    if (name.trim() !== '' && comment.trim() !== '') {
        addComment(name, comment);
        saveCommentToLocalStorage(name, comment);

        // Clear the form fields
        document.getElementById('name').value = '';
        document.getElementById('comment').value = '';
    }
});



// Load comments from local storage when the page loads
window.addEventListener('load', loadCommentsFromLocalStorage);

function count_word( val ){
    var wom = val.match(/\S+/g);
    return {
        words : wom ? wom.length : 0
    };
}
const max_words = 20;
var commentText = document.getElementById("comment");
var showWordCount = document.getElementById("word-count");

commentText.addEventListener("input", function () {
    var v = count_word(this.value);
    showWordCount.innerHTML = "Words: " + v.words;
    if(v.words == max_words){
        document.getElementById("comment").disabled = true;
        showWordCount.innerHTML = "You have reached the max count of words";
    }
}, false);