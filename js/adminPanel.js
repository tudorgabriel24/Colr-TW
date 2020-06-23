var userObjectList = [];
var articleObjectList = [];

function addEventsToCards() {
  var userListContainers = document.querySelectorAll(
    ".user-information-container"
  );
  userListContainers.forEach((element) => {
    element.addEventListener("click", function () {
      removeSelectedUser(userListContainers);
      element.classList.add("selected-user");
    });
  });
}

function renderDeleteUserDialog(question, email) {
  let bodyPage = document.querySelector("body");

  let dialog = document.createElement("DIV");
  dialog.id = "delete-dialog";

  let dialogQuestion = document.createElement("P");
  dialogQuestion.id = "dialog-question";
  dialogQuestion.innerHTML = question;

  let dialogControllers = document.createElement("DIV");
  dialogControllers.id = "dialog-controllers";

  let yesButton = document.createElement("DIV");
  yesButton.id = "yes-button";
  let yesButtonText = document.createElement("P");
  yesButtonText.innerHTML = "YES";
  yesButton.addEventListener("click", function () {
    deleteUserRequest(email);

    dialog.remove();
  });
  let noButton = document.createElement("DIV");
  noButton.id = "no-button";
  let noButtonText = document.createElement("P");
  noButtonText.innerHTML = "NO";

  noButton.addEventListener("click", function () {
    dialog.remove();
  });

  bodyPage.appendChild(dialog);
  dialog.appendChild(dialogQuestion);
  dialog.appendChild(dialogControllers);
  dialogControllers.appendChild(yesButton);
  yesButton.appendChild(yesButtonText);
  dialogControllers.appendChild(noButton);
  noButton.appendChild(noButtonText);
}

function renderDeleteArticleDialog(question, id) {
  let bodyPage = document.querySelector("body");

  let dialog = document.createElement("DIV");
  dialog.id = "delete-dialog";

  let dialogQuestion = document.createElement("P");
  dialogQuestion.id = "dialog-question";
  dialogQuestion.innerHTML = question;

  let dialogControllers = document.createElement("DIV");
  dialogControllers.id = "dialog-controllers";

  let yesButton = document.createElement("DIV");
  yesButton.id = "yes-button";
  let yesButtonText = document.createElement("P");
  yesButtonText.innerHTML = "YES";
  yesButton.addEventListener("click", function () {
    deleteArticle(id);
    dialog.remove();
  });
  let noButton = document.createElement("DIV");
  noButton.id = "no-button";
  let noButtonText = document.createElement("P");
  noButtonText.innerHTML = "NO";

  noButton.addEventListener("click", function () {
    dialog.remove();
  });

  bodyPage.appendChild(dialog);
  dialog.appendChild(dialogQuestion);
  dialog.appendChild(dialogControllers);
  dialogControllers.appendChild(yesButton);
  yesButton.appendChild(yesButtonText);
  dialogControllers.appendChild(noButton);
  noButton.appendChild(noButtonText);
}

function removeSelectedUser(userListContainers) {
  userListContainers.forEach((element) => {
    element.classList.remove("selected-user");
  });
}

async function deleteUserRequest(email) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    let responseBody = JSON.parse(xhttp.responseText);
    console.log(responseBody.success);
    if (responseBody.success) {
      location.reload();
    }
  };
  xhttp.open("DELETE", "http://localhost:3000/users", true);
  xhttp.getResponseHeader("Access-Control-Allow-Origin", "*");
  xhttp.getAllResponseHeaders("Access-Control-Allow-Origin", "*");
  xhttp.setRequestHeader("Content-Type", "application/json");
  const authToken = localStorage.getItem("Authorization");
  console.log(authToken);
  xhttp.setRequestHeader("Authorization", authToken);
  let sendData = {
    email: email,
  };
  console.log(sendData);
  xhttp.send(JSON.stringify(sendData));
}

async function deleteArticle(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    let responseBody = JSON.parse(xhttp.responseText);
    console.log(responseBody.success);
    if (responseBody.success) {
      location.reload();
      console.log(id);
      // let deletedArticle = document.getElementById(`${id}`);
      // console.log(deleteArticle);
      // deletedArticle.remove();
    }
  };
  xhttp.open("DELETE", `http://localhost:3000/articles?id=${id}`, true);
  xhttp.getResponseHeader("Access-Control-Allow-Origin", "*");
  xhttp.getAllResponseHeaders("Access-Control-Allow-Origin", "*");
  xhttp.setRequestHeader("Content-Type", "application/json");
  const authToken = localStorage.getItem("Authorization");
  console.log(authToken);
  xhttp.setRequestHeader("Authorization", authToken);
  xhttp.send();
}

async function updateArticleRequest(article) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    let responseBody = JSON.parse(xhttp.responseText);
    console.log(responseBody.success);
    if (responseBody.success) {
      location.reload();
      console.log(id);
      // let deletedArticle = document.getElementById(`${id}`);
      // console.log(deleteArticle);
      // deletedArticle.remove();
    }
  };
  xhttp.open("PUT", `http://localhost:3000/articles`, true);
  xhttp.getResponseHeader("Access-Control-Allow-Origin", "*");
  xhttp.getAllResponseHeaders("Access-Control-Allow-Origin", "*");
  xhttp.setRequestHeader("Content-Type", "application/json");
  const authToken = localStorage.getItem("Authorization");
  console.log(authToken);
  xhttp.setRequestHeader("Authorization", authToken);
  xhttp.send(JSON.stringify(article));
}

function updateArticle(article) {
  console.log(article);
  let updatedArticle = article;
  let updateDialog = document.getElementsByClassName('update-article-dialog');
  updateDialog[0].classList.remove('dialog-hidden');
  let closeButton = document.getElementById('close-without-save-button');
  let saveButton = document.getElementById('save-changes-button');

  let title = document.getElementById('input-title');
  title.value = article.name;
  let description = document.getElementById('input-description');
  description.value = article.description;
  let currentState = document.getElementById('input-current-state');
  currentState.value = article.currentState;
  let country = document.getElementById('input-country');
  country.value = article.country;
  let price = document.getElementById('price-range-input')
  price.value = article.priceRange;
  let year = document.getElementById('input-year');
  year.value = article.year;
  let type = document.getElementById('input-type');
  type.value = article.type;
  let alcoholic = document.getElementById('alcoholic-checkbox');
  alcoholic.checked = article.alcoholic === 'on' ? true : false;

  closeButton.addEventListener('click', function () {
    updateDialog[0].classList.add('dialog-hidden');
  });

  saveButton.addEventListener('click', function() {
    updatedArticle.name = title.value;
    updatedArticle.description = description.value;
    updatedArticle.currentState = currentState.value;
    updatedArticle.country = country.value;
    updatedArticle.priceRange = price.value;
    updatedArticle.year = year.value;
    updatedArticle.type = type.value;
    updatedArticle.alcoholic = alcoholic.checked ? 'on' : 'off';
    console.log(updatedArticle);
    updateArticleRequest(updatedArticle);
  });
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

  for (let index = 0; index < object.length; index++) {
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

    updateArticleButton.addEventListener('click', function () {
      updateArticle(object[index]);
    })

    let deleteArticleButton = document.createElement("DIV");
    deleteArticleButton.classList.add("delete-article-button");

    let deleteArticleIcon = document.createElement("I");
    deleteArticleIcon.classList.add("fas");
    deleteArticleIcon.classList.add("fa-trash-alt");

    let deleteArticleText = document.createElement("SPAN");
    deleteArticleText.innerHTML = "DELETE";

    deleteArticleButton.addEventListener("click", function () {
      renderDeleteArticleDialog(
        "Are you sure you want to delete this article?",
        object[index].ID
      );
    });

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

function getUserArticles(email, fullName) {
  let userEmail = email;
  console.log(userEmail);
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    let responseBody = JSON.parse(xhttp.responseText);
    if (responseBody.success) {
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
  xhttp.setRequestHeader("Authorization", authToken);

  xhttp.send();
}

function deleteUser(event) {
  console.log("DELETE ICON CLICKED ON ID ", event.path[1].id);
  let userEmailToDelete = event.path[1].childNodes[2].lastChild.innerText;
  console.log(userEmailToDelete);
  renderDeleteUserDialog(
    "Are you sure you want to delete this user?",
    userEmailToDelete
  );
}

function createUserCards(users) {
  let userList = document.querySelector("#user-list-container");
  for (let index = 0; index < users.length; index++) {
    let userCard = document.createElement("DIV");
    userCard.classList.add("user-information-container");
    userCard.id = index;
    userCard.addEventListener("click", function () {
      getUserArticles(users[index].email, users[index].fullName);
    });
    let deleteUserIcon = document.createElement("I");
    deleteUserIcon.classList.add("fas");
    deleteUserIcon.classList.add("fa-times");
    deleteUserIcon.classList.add("delete-user-icon");
    deleteUserIcon.addEventListener("click", function (event) {
      event.stopPropagation();
      console.log(event);
      deleteUser(event);
    });
    let userImage = document.createElement("IMG");
    userImage.setAttribute("src", "../assets/user.svg");
    userImage.setAttribute("alt", "user-image");
    userImage.classList.add("user-image");
    let userDetails = document.createElement("DIV");
    userDetails.classList.add("user-details");
    let fullName = document.createElement("P");
    fullName.classList.add("full-name");
    fullName.innerHTML = users[index].fullName;
    let email = document.createElement("P");
    email.classList.add("email");
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
  xhttp.setRequestHeader("Authorization", authToken);
  xhttp.send();
};
