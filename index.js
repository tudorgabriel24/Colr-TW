window.onload = function makeContentRequest() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    console.log(xhttp.responseText);
    renderGalleryItems(JSON.parse(xhttp.responseText));
  };
  xhttp.open("GET", "http://localhost:3000/articles", true);
  xhttp.getResponseHeader("Access-Control-Allow-Origin", "*");
  xhttp.getAllResponseHeaders("Access-Control-Allow-Origin", "*");
  // xhttp.setRequestHeader("Content-Type", "application/json");
  const authToken = localStorage.getItem("Authorization");
  xhttp.setRequestHeader("Authorization", authToken);
  xhttp.send();

  if(localStorage.getItem("Authorization") !== undefined && localStorage.getItem("Authorization") !== null) {
    getUser();
  }
  else {
   let loginButton = document.getElementById('userLogin');
   loginButton.addEventListener('click', function () {
     navigateToLogin();
   });
   
   let menuContainer = document.getElementById('nav-container');
   let homePage = document.createElement('a');
   homePage.href = './index.html';
   homePage.innerHTML = 'Home';
   menuContainer.appendChild(homePage);
  }


};

let getUser = async function () {
  console.log("AICI AA");
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    console.log(xhttp.responseText);
    let responseBody = JSON.parse(xhttp.responseText);
    console.log(responseBody);
    renderMenuData(responseBody);
    if(responseBody.success === true) {
      changeTopMenuName(responseBody.user.fullName);
    }
  };
  xhttp.open("GET", "http://localhost:3000/me", true);
  xhttp.getResponseHeader("Access-Control-Allow-Origin", "*");
  xhttp.getAllResponseHeaders("Access-Control-Allow-Origin", "*");
  // xhttp.setRequestHeader("Content-Type", "application/json");
  const authToken = localStorage.getItem("Authorization");
  console.log(authToken);
  xhttp.setRequestHeader("Authorization", authToken);
  xhttp.send();

}

let changeTopMenuName = function (fullName) {
  let showUsername = document.querySelector("#userLogin div p");
  let userContaier = document.getElementById('userLogin');
  userContaier.onclick = "";
  showUsername.innerHTML = fullName;
  console.log("here");
}



let renderMenuData = function (response) {
  let menuContainer = document.getElementById('nav-container');
  let homePage = document.createElement('a');
  homePage.href = './index.html';
  homePage.innerHTML = 'Home';
  menuContainer.appendChild(homePage);
  if(response.success === true) {
    let statisticsPage = document.createElement('a');
    statisticsPage.href = './html/export.html';
    statisticsPage.innerHTML = 'Statistics';
    let uploadPage = document.createElement('a');
    uploadPage.href = './html/upload.html';
    uploadPage.innerHTML = 'Upload articles';
    menuContainer.appendChild(statisticsPage);
    menuContainer.appendChild(uploadPage);


    if(response.user.admin) {
      let adminPage = document.createElement('a');
      adminPage.href = '../html/adminPanel.html';
      adminPage.innerHTML = "Admin panel";
      menuContainer.appendChild(adminPage);
    }
    let logout = document.createElement('a');
    logout.href = '';
    logout.innerHTML = 'Logout';
    menuContainer.appendChild(logout);

    logout.addEventListener('click', function () {
      localStorage.removeItem('Authorization');
      window.location.replace('http://localhost:5500/index.html');
    })
  }
}


var articlesLoaded = false;
function navigateToLogin() {
  window.location.replace("http://localhost:5500/html/login.html");
}

var galleryGrid = document.querySelector(".basic-grid");
let postView = function (id) {
  if(localStorage.getItem('Authorization') !== null) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      console.log(xhttp.responseText);
    };
    xhttp.open("POST", "http://localhost:3000/view", true);
    xhttp.getResponseHeader("Access-Control-Allow-Origin", "*");
    xhttp.getAllResponseHeaders("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Content-Type", "application/json");
    const authToken = localStorage.getItem("Authorization");
    console.log(authToken);
    let requestBody = {
      id_article: id
    };
    xhttp.setRequestHeader("Authorization", authToken);
    xhttp.send(JSON.stringify(requestBody));
  }
}
let renderPopUp = function (description, title) {
  let body = document.querySelector('body');
  
  let popUpModal = document.createElement('DIV');
  popUpModal.id = 'pop-up-modal';
  let popUpTitle = document.createElement('P');
  popUpTitle.id = 'pop-up-title';
  popUpTitle.innerHTML = title;
  let popUpDescription = document.createElement('P');
  popUpDescription.id = 'pop-up-description';
  popUpDescription.innerHTML = description;
  let popUpCloseContainer = document.createElement('DIV');
  popUpCloseContainer.id = 'pop-up-close-container';
  let closeIcon = document.createElement('I');
  closeIcon.classList.add('fas','fa-times','pop-up-close-icon');
  let closeText = document.createElement('P');
  closeText.innerHTML = "CLOSE";

  body.appendChild(popUpModal);
  popUpModal.appendChild(popUpTitle);
  popUpModal.appendChild(popUpDescription);
  popUpModal.appendChild(popUpCloseContainer);
  popUpCloseContainer.appendChild(closeIcon);
  popUpCloseContainer.appendChild(closeText);

  popUpCloseContainer.addEventListener('click', function () {
    popUpModal.remove();
  });
}


//  <div id="pop-up-modal">
// <p id="pop-up-title">Title</p>
// <p id= "pop-up-description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum alias sunt cumque officia, reprehenderit nihil ipsum dolore. Sunt ad illum distinctio libero cumque labore cum placeat a pariatur! Eligendi, consequatur.</p>
// <div id="pop-up-close-container">
//   <i class="fas fa-times pop-up-close-icon"></i>
//   <p>CLOSE</p>
// </div>
// </div> 

function loadItem(id, description, title) {
  console.log("render2");
  let container = document.createElement("DIV");
  container.classList.add("container");
  let itemImage = document.createElement("IMG");
  itemImage.src = `./project-node-app/images/${id}.png`;
  itemImage.alt = ``;

  let bottomArticleContainer = document.createElement('DIV');
  bottomArticleContainer.classList.add('bottom-article-container');

  let itemDescription = document.createElement("P");
  itemDescription.innerHTML = description;
  let popButton = document.createElement("SPAN");
  popButton.classList.add("pop_button");
  // popButton.setAttribute("ID", "modal");
  popButton.id = "modal";
  // popButton.dataset.target = "#modal";
  popButton.innerHTML = "Show more";

  popButton.addEventListener('click', function () {
    postView(id);
    renderPopUp(description,title);
  });

  galleryGrid.appendChild(container);
  container.appendChild(itemImage);
  container.appendChild(bottomArticleContainer);
  bottomArticleContainer.appendChild(itemDescription);
  itemDescription.appendChild(popButton);
}

function renderGalleryItems(object) {
  console.log("render1");
  if (!articlesLoaded) {
    for (let index = 0; index < object.length; index++) {
      loadItem(object[index].ID, object[index].description, object[index].name);
    }
  }

  articlesLoaded = true;
}

//Filtres

function searchFil(event) {
  event.preventDefault();

  var country = document.getElementById("countries");
  var value = country.options[country.selectedIndex].value;

  var country = document.getElementById("countries").value;
  var state = document.getElementById("stat").value;
  var price = document.getElementById("price_range").value;
  var type = document.getElementById("post_type").value;

  var get_list = [];
  if (country != "Any") {
    get_list.push(`country=${country}`);
  }
  if (state != "Any") {
    get_list.push(`currentState=${state}`);
  }
  if (price != "Any") {
    get_list.push(`priceRange=${price}`);
  }
  if (type != "Any") {
    get_list.push(`type=${type}`);
  }
  get_list = get_list.join("&");
  console.log(get_list);

  var xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    console.log("yay");
    console.log(xhttp.responseText);

    refreshGallery(JSON.parse(xhttp.responseText));
  };

  xhttp.open("GET", `http://localhost:3000/articles?${get_list}`, true);
  xhttp.send();
}

function refreshGallery(object) {
  console.log("am sters gridu");
  galleryGrid.remove();
  body = document.getElementsByTagName("body")[0];
  articlesLoaded = false;
  galleryGrid = document.createElement("DIV");
  galleryGrid.classList.add("basic-grid");
  body.appendChild(galleryGrid);
  renderGalleryItems(object);
}
