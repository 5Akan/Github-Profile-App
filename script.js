const APIURL = 'https://api.github.com/users/';
const main = document.querySelector('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getUser('5Akan');

async function getUser(username){
    const resp = await fetch(APIURL + username);

    const respData = await resp.json();

    createUserCard(respData);

    getRepo(username);

}

async function getRepo(username) {
    const resp = await fetch(APIURL + username + "/repos");

    const respData = await resp.json();

    addRepoToCard(respData);

}

function addRepoToCard(repos) {
    const repoEL = document.getElementById('repos');

    console.log(repos);
}

function createUserCard(user) {
    
    const card = `
        <div class = "card">
            <div class = "img-container">
                <img class = "avatar" src = "${user.avatar_url}" alt = "${user.name}"/>
            </div>
            <div class = "user_info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul class = "info">
                    <li><strong>Repos</strong>${user.public_repos}</li>
                    <li><strong>Twitter</strong>${user.twitter_username}</li>
                    <li><strong>Following </strong>${user.following}</li>
                </ul>
                <ul class = "repos" id = "repos"></ul>
            </div>
        </div>
    `
    main.innerHTML = card;
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const user = search.value;

    if(user){
        getUser(user);

        search.value = '';
    }
})