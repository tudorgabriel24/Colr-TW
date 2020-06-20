var userObjectList = [];
var articleObjectList = [];

function addEventsToCards() {
  var userListContainers = document.querySelectorAll(".user-information-container");
  userListContainers.forEach(element => {
    element.addEventListener("click", function () {
      removeSelectedUser(userListContainers);
      element.classList.add('selected-user');
    }
  );
})}

function removeSelectedUser(userListContainers) {
  userListContainers.forEach(element => {
    element.classList.remove('selected-user');
  })
}

async function deleteUserRequest(email) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    let responseBody = JSON.parse(xhttp.responseText);
    console.log(responseBody.success);
    
  };
  xhttp.open("DELETE", "http://localhost:3000/users", true);
  xhttp.getResponseHeader("Access-Control-Allow-Origin", "*");
  xhttp.getAllResponseHeaders("Access-Control-Allow-Origin", "*");
  xhttp.setRequestHeader("Content-Type", "application/json");
  const authToken = localStorage.getItem("Authorization");
  console.log(authToken);
  xhttp.setRequestHeader(
    "Authorization",
    authToken
  );
  let sendData = {
    email: email
  }
  xhttp.send(JSON.stringify(sendData));
} 

function renderArticles(object,fullName) {
  let sectionContainer = document.getElementById('admin-panel-section');
  document.getElementById('articles-container').remove();
  let articlesContainer = document.createElement("DIV");
  articlesContainer.id = "articles-container";
  sectionContainer.appendChild(articlesContainer);
  let chosenUser = document.createElement("DIV");
  chosenUser.id = "chosen-user";
  let userFullName = document.createElement("P");
  userFullName.innerHTML = `${fullName}'s articles`;

  let articleList = document.createElement("DIV");
  articleList.id = "article-list";

  articlesContainer.appendChild(chosenUser);
  chosenUser.appendChild(userFullName);
  articlesContainer.appendChild(articleList);

  for(let index = 0; index < object.length; index++) {
    let article = document.createElement("DIV");
    article.classList.add("article");

    let articleImage = document.createElement("IMG");
    articleImage.src = `../project-node-app/images/${object[index].ID}.png`;
    articleImage.alt = ``;

    let articleDetails = document.createElement("DIV");
    articleDetails.classList.add("article-details");

    let articleTitle = document.createElement("P");
    articleTitle.classList.add("article-title");
    articleTitle.innerHTML = object[index].name;

    let articleDescription = document.createElement("P");
    articleDescription.classList.add("article-description");
    articleDescription.innerHTML = object[index].description;

    let articleControllers = document.createElement("DIV");
    articleControllers.classList.add("article-controllers");

    let updateArticleButton = document.createElement("DIV");
    updateArticleButton.classList.add("update-article-button");

    let updateArticleIcon = document.createElement("I");
    updateArticleIcon.classList.add("fas");
    updateArticleIcon.classList.add("fa-edit");

    let updateArticleText = document.createElement("SPAN");
    updateArticleText.innerHTML = "UPDATE";

    let deleteArticleButton = document.createElement("DIV");
    deleteArticleButton.classList.add("delete-article-button");

    let deleteArticleIcon = document.createElement("I");
    deleteArticleIcon.classList.add("fas");
    deleteArticleIcon.classList.add("fa-trash-alt");

    let deleteArticleText = document.createElement("SPAN");
    deleteArticleText.innerHTML = "DELETE";

    articleList.appendChild(article);
    article.appendChild(articleImage);
    article.appendChild(articleDetails);
    articleDetails.appendChild(articleTitle);
    articleDetails.appendChild(articleDescription);
    articleDetails.appendChild(articleControllers);
    articleControllers.appendChild(updateArticleButton);
    updateArticleButton.appendChild(updateArticleIcon);
    updateArticleButton.appendChild(updateArticleText);
    articleControllers.appendChild(deleteArticleButton);
    deleteArticleButton.appendChild(deleteArticleIcon);
    deleteArticleButton.appendChild(deleteArticleText);

  }
}

// <div class="article">
//               <img src="https://www.finestore.ro/image/cache/catalog/products/HB305-500x615.jpg" alt="">
//               <div class="article-details">
//                 <p class="article-title">Jack Daniels Bottle</p>
//                 <p class="article-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. At laudantium velit animi, aspernatur vel, assumenda adipisci quam, aliquid provident fugiat temporibus quia quis eius fuga eligendi est corrupti eaque earum!</p>
//                 <div class="article-controllers">
//                   <div class="update-article-button">
//                     <i class="fas fa-edit"></i>
//                     <span>UPDATE</span>
//                   </div>
//                   <div class="delete-article-button">
//                     <i class="fas fa-trash-alt"></i>
//                     <span>DELETE</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

function getUserArticles(email,fullName) {
  let userEmail = email;
  console.log(userEmail);
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    let responseBody = JSON.parse(xhttp.responseText);
    if(responseBody.success) {
      renderArticles(responseBody.articles, fullName);
    }
    console.log(responseBody);
    
  };
  xhttp.open("GET", `http://localhost:3000/articles?email=${userEmail}`, true);
  xhttp.getResponseHeader("Access-Control-Allow-Origin", "*");
  xhttp.getAllResponseHeaders("Access-Control-Allow-Origin", "*");
  xhttp.setRequestHeader("Content-Type", "application/json");
  const authToken = localStorage.getItem("Authorization");
  console.log(authToken);
  xhttp.setRequestHeader(
    "Authorization",
    authToken
  );
  
  xhttp.send();
}

function deleteUser(event) {
  console.log("DELETE ICON CLICKED ON ID ", event.path[1].id);
  let userEmailToDelete = event.path[1].childNodes[2].lastChild.innerText;
  console.log(userEmailToDelete);
  deleteUserRequest(userEmailToDelete);
}

function createUserCards(users) {
  let userList = document.querySelector('#user-list-container');
  for(let index = 0; index < users.length; index++) {
    let userCard = document.createElement('DIV');
    userCard.classList.add('user-information-container');
    userCard.id = index;
    userCard.addEventListener('click', function () {
      getUserArticles(users[index].email, users[index].fullName);
    });
    let deleteUserIcon = document.createElement('I');
    deleteUserIcon.classList.add('fas')
    deleteUserIcon.classList.add('fa-times');
    deleteUserIcon.classList.add('delete-user-icon');
    deleteUserIcon.addEventListener('click', function (event) {
      event.stopPropagation();
      console.log(event);
      deleteUser(event);
    }
    );
    let userImage = document.createElement('IMG');
    userImage.setAttribute('src','../assets/user.svg');
    userImage.setAttribute('alt','user-image');
    userImage.classList.add('user-image');
    let userDetails = document.createElement("DIV");
    userDetails.classList.add('user-details');
    let fullName = document.createElement('P');
    fullName.classList.add('full-name');
    fullName.innerHTML = users[index].fullName;
    let email = document.createElement('P');
    email.classList.add('email');
    email.innerText = users[index].email;

    userList.appendChild(userCard);
    userCard.appendChild(deleteUserIcon);
    userCard.appendChild(userImage);
    userCard.appendChild(userDetails);
    userDetails.appendChild(fullName);
    userDetails.appendChild(email);
  }

  addEventsToCards();
}

window.onload = function getUsers() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    console.log(xhttp.responseText);
    let responseBody = JSON.parse(xhttp.responseText);
    userObjectList = responseBody.users;
    createUserCards(responseBody.users);
  };
  xhttp.open("GET", "http://localhost:3000/users", true);
  xhttp.getResponseHeader("Access-Control-Allow-Origin", "*");
  xhttp.getAllResponseHeaders("Access-Control-Allow-Origin", "*");
  xhttp.setRequestHeader("Content-Type", "application/json");
  const authToken = localStorage.getItem("Authorization");
  console.log(authToken);
  xhttp.setRequestHeader(
    "Authorization",
    authToken
  );
  xhttp.send();
};
