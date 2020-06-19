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
  console.log(authToken);
  xhttp.setRequestHeader("Authorization", authToken);
  xhttp.send();
};
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
  let addButton = document.createElement("BUTTON");
  addButton.classList.add("addbtn");
  addButton.innerHTML = "Add";
  addButton.id = image;
  addButton.addEventListener("click", () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      console.log("yay");
    };
    xhttp.open("POST", "http://localhost:3000/cart", true);

    xhttp.getResponseHeader("Access-Control-Allow-Origin", "");
    xhttp.getAllResponseHeaders("Access-Control-Allow-Origin", "");
    xhttp.setRequestHeader("Content-Type", "application/json");
    // console.log(requestData.image.length);
    const authToken = localStorage.getItem("Authorization");
    xhttp.setRequestHeader("Authorization", authToken);
    xhttp.send(JSON.stringify({ id_article: `${addButton.id}` }));
  });
  let itemDescription = document.createElement("P");
  itemDescription.innerHTML = description;
  let popButton = document.createElement("SPAN");
  popButton.classList.add("pop_button");
  popButton.dataset.target = "#modal";
  popButton.innerHTML = "Show more";

  galleryGrid.appendChild(container);
  container.appendChild(itemImage);
  container.appendChild(itemDescription);
  itemDescription.appendChild(popButton);
  container.appendChild(addButton);
}
var btn = document.getElementsByClassName("addbtn");

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

  var formData = {};
  // console.log(country);
  // console.log(state);
  // console.log(price);
  // console.log(type);
  formData = {
    country: country,
    currentState: state,
    price: price,
    type: type,
  };
  formData = JSON.stringify(formData);
  console.log(formData);

  var xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    console.log("yay");
    if (this.state == 4) {
      refreshGallery(object);
    }
  };
  xhttp.open("GET", "http://localhost:3000/articles", true);
  xhttp.send(formData);
}

function refreshGallery(object) {
  galleryGrid.remove();
  galleryGrid = document.createElement("DIV");
  galleryGrid.classList.add("basic-grid");
  renderGalleryItems(object);
}
