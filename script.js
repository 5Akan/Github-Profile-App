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



function createUserCard(user) {
    
    const card = `
        <div class = "card">
            <div>
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
                <h4>Repos: </h4>
                <div id ="repos"></div>
            </div>
        </div>
    `
    main.innerHTML = card;
}

function addRepoToCard(repos) {
    const repoEl = document.getElementById('repos');

    repos.sort((a, b) => b.stargazers_count -a.
    stargazers_count)
    .slice(0, 5)
    .forEach((repo) => {
        //sort determines how the arrangement will be made(in this case by amount of stars)
        //slice simply counts the items that will appear
        const repoli = document.createElement('a');
        repoli.classList.add('repo');

        repoli.href = repo.html_url;
        repoli.target = '_blank';
        repoli.innerText = repo.name;
        

        repoEl.appendChild(repoli);
        
    });
      
    console.log(repos);
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const user = search.value;

    if(user){
        getUser(user);

        search.value = '';
    }
})