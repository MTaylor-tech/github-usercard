/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
//const axios = require('axios');
const primeUser = 'MTaylor-tech';
const cardContainer = document.querySelector('.cards');
let followersArray = [  'tetondan',
                        'dustinmyers',
                        'justsml',
                        'luishrd',
                        'bigknell'];
                        
                        
// Make a request for a user with a given ID


function displayCard (username) {
  axios.get(`https://api.github.com/users/${username}`)
    .then(function (response) {
      // handle success
      console.log(response.data);
      const card = makeCard(response.data);
      if (username === primeUser) {
        cardContainer.insertBefore(card, cardContainer.childNodes[0]);
      } else {
        cardContainer.appendChild(card);
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
     // run after
    });
}

function getFollowers (username) {
  let followers = [];
  axios.get(`https://api.github.com/users/${username}/followers`)
        .then(function (response) {
          followers = response.data.map(f=>f.login);
          followers.forEach(u=>displayCard(u));
          return followers;
        })
        .catch(function (error) {
          console.log(error);
          return null;
        });
}


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function makeCard (user) {
  const card = document.createElement('div');
  card.classList.add('card');
  const img = document.createElement('img');
  img.src = user.avatar_url;
  card.appendChild(img);
  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');
  card.appendChild(cardInfo);
  
  const name = document.createElement('h3');
  name.classList.add('name');
  name.textContent = user.name;
  cardInfo.appendChild(name);
  const username = document.createElement('p');
  username.classList.add('username');
  username.textContent = user.login;
  cardInfo.appendChild(username);
  const profile = document.createElement('p');
  profile.textContent = `Profile: `;
  const profileLink = document.createElement('a');
  profileLink.href = user.html_url;
  profileLink.textContent = user.html_url;
  profile.appendChild(profileLink);
  cardInfo.appendChild(profile);
  const followers = document.createElement('p');
  followers.textContent = `Followers: ${user.followers}`;
  cardInfo.appendChild(followers);
  const following = document.createElement('p');
  following.textContent = `Following: ${user.following}`;
  cardInfo.appendChild(following);
  if (user.bio != null) {
    const bio = document.createElement('p');
    bio.textContent = `Bio: ${user.bio}`;
    cardInfo.appendChild(bio);
  }
  
  //Stretch
  const calendar = document.createElement('div');
  calendar.classList.add('calendar');
  calendar.textContent = `Loading the data just for you & ${user.login}`;
  cardInfo.appendChild(calendar);
  GitHubCalendar(calendar, user.login, { responsive: true });
  calendar.style.display = `none`;
  
  let closed = true;
  const moreButton = document.createElement('i');
  moreButton.style.position = `relative`;
  moreButton.style.color = `darkturquoise`;
  moreButton.style.left = `1rem`;
  moreButton.style.margin = `5px`;
  moreButton.classList.add('fas');
  moreButton.classList.add('fa-2x');
  moreButton.classList.add('fa-plus-circle');
  cardInfo.appendChild(moreButton);
  moreButton.addEventListener('click',()=> {
        if (closed) {
          calendar.style.display = `inline-block`;
          moreButton.classList.remove('fa-plus-circle');
          moreButton.classList.add('fa-minus-circle');
          closed = false;
        } else {
          calendar.style.display = `none`;
          moreButton.classList.remove('fa-minus-circle');
          moreButton.classList.add('fa-plus-circle');
          closed = true;
        }
    });
  
  return card;
}

displayCard(primeUser);
getFollowers(primeUser);
followersArray.forEach(u=>displayCard(u));


/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
