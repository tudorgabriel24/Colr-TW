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
  // let addButton = document.createElement("BUTTON");
  // addButton.classList.add("addbtn");
  // addButton.innerHTML = "Add";
  // addButton.id = image;
  // addButton.addEventListener("click", () => {
  //   const xhttp = new XMLHttpRequest();
  //   xhttp.onload = function () {
  //     console.log("yay");
  //   };
  //   xhttp.open("POST", "http://localhost:3000/articles", true);

  //   xhttp.getResponseHeader("Access-Control-Allow-Origin", "");
  //   xhttp.getAllResponseHeaders("Access-Control-Allow-Origin", "");
  //   xhttp.setRequestHeader("Content-Type", "application/json");
  //   // console.log(requestData.image.length);
  //   const authToken = localStorage.getItem("Authorization");
  //   xhttp.setRequestHeader("Authorization", authToken);
  //   xhttp.send(JSON.stringify({ id_article: `${addButton.id}` }));
  // });
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
  // container.appendChild(addButton);
}
// var btn = document.getElementsByClassName("addbtn");

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
