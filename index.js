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
  xhttp.setRequestHeader(
    "Authorization",
    authToken
  );
  xhttp.send();
};
var articlesLoaded = false;
function navigateToLogin() {
  window.location.replace('http://localhost:5500/html/login.html');
}

var galleryGrid = document.querySelector('.basic-grid');

function loadItem(image,description) {
  console.log("render2");
  let container = document.createElement("DIV");
  container.classList.add("container");
  let itemImage = document.createElement("IMG");
  itemImage.src = `./project-node-app/images/${image}.png`;
  itemImage.alt = ``;
  let addButton = document.createElement('BUTTON');
  addButton.classList.add('addbtn');
  addButton.innerHTML = 'Add';
  addButton.id = image;
  addButton.addEventListener('click', () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      console.log('yay');
    }
    xhttp.open('POST', 'http://localhost:3000/cart', true);
  
    xhttp.getResponseHeader('Access-Control-Allow-Origin', '');
    xhttp.getAllResponseHeaders('Access-Control-Allow-Origin', '');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    // console.log(requestData.image.length);
    const authToken = localStorage.getItem("Authorization");
    xhttp.setRequestHeader(
      "Authorization",
      authToken
    );
    xhttp.send(JSON.stringify({'id_article': `${addButton.id}`}));
  });
  let itemDescription = document.createElement('P');
  itemDescription.innerHTML = description;
  let popButton = document.createElement('SPAN');
  popButton.classList.add('pop_button');
  popButton.dataset.target = '#modal';
  popButton.innerHTML = "Show more";

  galleryGrid.appendChild(container);
  container.appendChild(itemImage);
  container.appendChild(itemDescription);
  itemDescription.appendChild(popButton);
  container.appendChild(addButton);
}
var btn = document.getElementsByClassName('addbtn');

{/* <div class="container">
        <img src="./project-node-app/images/1d32a3d9ff33bd5ebcd4feaf0dd976da.png" alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          excepturi ducimus iste consectetur praesentium sed expedita rem error
          illum commodi.
          <span class="pop_button" data-modal-target="#modal">Show more</span>
        </p>
        <button class="addbtn">Add</button>
</div> */}

function renderGalleryItems(object) {
  console.log("render1");
  if(!articlesLoaded) {
    for(let index = 0; index < object.length; index++) {
      loadItem(object[index].ID, object[index].description);
    }
  }

  articlesLoaded = true;
}
