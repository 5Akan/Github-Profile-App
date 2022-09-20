const APIURL = 'https://api.github.com/users/';
const main = document.querySelector('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getUser('5Akan');

async function getUser(user){
    const resp = await fetch(APIURL + user);

    const respData = await resp.json();

    createUserCard(respData);

}

function createUserCard(user) {
    
    const card = `
        <div class = "card">
            <div>
                <img class = "avatar" src = "${user.avatar_url}" alt = "${user.name}"/>
            </div>
            <div>
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul class = "info">
                    <li>${user.public_repos}</li>
                    <li>${user.twitter_username}</li>
                    <li>${user.following}</li>
                </ul>
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