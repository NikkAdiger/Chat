const card = post => {
    return `
        <div class="card blue-grey darken-1">
             <div class="card-content white-text">
                    <span class="card-title">${post.tittle}</span>
                    <p style="white-space: pre-line">${post.text}</p>
                    <small>${new Date(post.date).toLocaleDateString()}</small>
                </div>
                <div class="card-action">
                    <button class="btn red js-remove" data-id="${post._id}">
                        <i class="material-icons js-remove">delete</i>
                    </button>
             </div>
        </div>
    `
}

const Base_Url = '/api/post';
let posts = [];
let modal;
let dataPicker;

class PostApi {
    static fetch() {
        return fetch(Base_Url, {method: 'get'}).then((res) => res.json());
    }

    static remove(idPost) {
        return fetch(`${Base_Url}/${idPost}`,
            {
            method: 'delete'
        }).then((res) => res.json());
    }

    static create(post) {
        return fetch(Base_Url,
            {
                method: 'post',
                body: JSON.stringify(post),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json());
    };
}

document.addEventListener('DOMContentLoaded', () => {

    modal = M.Modal.init(document.querySelector('.modal'));
    dataPicker = M.Datepicker.init(document.querySelectorAll('.datepicker'));

    PostApi.fetch().then((backendPosts) => {
        posts = backendPosts.concat();
        renderPosts(posts);
    })

    document.querySelector('#createPost').addEventListener('click', onCreatePost);
    document.querySelector('#posts').addEventListener('click', onDeletePost);

})

function renderPosts(_posts = []) {
    const $posts = document.querySelector('#posts');
    if (_posts.length > 0) {
        $posts.innerHTML = _posts.map((post) => card(post)).join(' ');
    } else {
        $posts.innerHTML = `<div class="center">No posts</div>`;
    }
}

function onCreatePost() {
    $tittle = document.querySelector('#tittle');
    $text = document.querySelector('#text');

    if ($tittle.value && $text.value) {
        const newPost = {
            tittle: $tittle.value,
            text: $text.value
        }

        PostApi.create(newPost).then((post) => {

            posts.push(post);
            renderPosts(posts);
        })
        modal.close();
        $tittle.value = '';
        $text.value = '';
        M.updateTextFields();
    }
}

function onDeletePost(event) {

    if (event.target.classList.contains('js-remove')) {

        const decision = confirm('Are you sure you want to delete the post?');

        if (decision) {
            const idPost = event.target.getAttribute('data-id');

            PostApi.remove(idPost).then(() => {
                const postIndex = posts.findIndex((el) => el._id === idPost);
                posts.splice(postIndex, 1);
                renderPosts(posts);
            })
        }
    }

}

