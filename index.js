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
  let showUsername = document.querySelector("#userLogin span div");
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
    let chartPage = document.createElement('a');
    chartPage.href = '../html/chart.html';
    chartPage.innerHTML = 'Most popular';
    menuContainer.appendChild(statisticsPage);
    menuContainer.appendChild(uploadPage);
    menuContainer.appendChild(chartPage);

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

function loadItem(image, description) {
  console.log("render2");
  let container = document.createElement("DIV");
  container.classList.add("container");
  let itemImage = document.createElement("IMG");
  itemImage.src = `./project-node-app/images/${image}.png`;
  itemImage.alt = ``;

  let bottomArticleContainer = document.createElement('DIV');
  bottomArticleContainer.classList.add('bottom-article-container');

  let itemDescription = document.createElement("P");
  itemDescription.innerHTML = description;
  let popButton = document.createElement("SPAN");
  popButton.classList.add("pop_button");
  popButton.dataset.target = "#modal";
  popButton.innerHTML = "Show more";

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
      loadItem(object[index].ID, object[index].description);
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
