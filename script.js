let posts = []; 
let editingId = null;

// grabbing DOM elements
const form = document.getElementById('post-form');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('thoughts');
const titleError = document.getElementById('title-error');
const contentError = document.getElementById('content-error');
const postsContainer = document.getElementById('posts-container');

//function to load posts when applciation is run
function loadPosts() {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
        posts = JSON.parse(savedPosts);
    }
    renderPosts();
}

loadPosts();

//function to display posts
function renderPosts() {
    postsContainer.innerHTML = ''; 

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        const postTitle = document.createElement('h3');
        postTitle.textContent = post.title;

        const postContent = document.createElement('p');
        postContent.textContent = post.content;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editPost(post.id));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deletePost(post.id));

        postDiv.append(postTitle, postContent, editButton, deleteButton);
        postsContainer.appendChild(postDiv);
    });
}

//form submit button
form.addEventListener('submit', function(e) {
    e.preventDefault(); 


    titleError.textContent = '';
    contentError.textContent = '';

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title) titleError.textContent = 'Title is required';
    if (!content) contentError.textContent = 'Content is required';
    if (!title || !content) return;

    if (editingId) {
      
        const post = posts.find(p => p.id === editingId);
        post.title = title;
        post.content = content;
        editingId = null; 
    } else {
       
        const newPost = {
            id: Date.now(), 
            title,
            content
        };
        posts.push(newPost);
    }

    
    localStorage.setItem('posts', JSON.stringify(posts));

  
    renderPosts();

    
    form.reset();
});

//function to delete a post
function deletePost(id) {
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
}

//function to edit a post
function editPost(id) {
    const post = posts.find(p => p.id === id);
    titleInput.value = post.title;
    contentInput.value = post.content;
    editingId = id; 
}
