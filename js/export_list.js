var rows = [];
const container = document.querySelector(".container");
window.onload = function getCartData() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    console.log(xhttp.responseText);
    insertInCart(JSON.parse(xhttp.responseText));
  };
  xhttp.open("GET", "http://localhost:3000/cart", true);
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
}

function insertInCart(object) {
  for(let index = 0; index < object.length;index++) {
    new item(object[index].name, `../project-node-app/images/${object[index].ID}.png`);
  }
  exportList(object);
}

class item {
  constructor(itemName, image_url) {
    this.createDiv(itemName, image_url);
  }
  createDiv(itemName, image_url) {
    let input = document.createElement("p");
    input.value = itemName;
    // input.disabled = true;
    input.classList.add("item_input");
    input.type = "text";
    input.innerHTML = itemName;

    let image = document.createElement("img");
    image.value = image_url;
    image.setAttribute("src", image_url);
    image.classList.add("size");

    let itemBox = document.createElement("div");
    itemBox.classList.add("item");

    let removeButton = document.createElement("button");
    removeButton.innerHTML = "remove";
    removeButton.classList.add("removeButton");

    container.appendChild(itemBox);

    itemBox.appendChild(image);
    itemBox.appendChild(input);
    itemBox.appendChild(removeButton);

    removeButton.addEventListener("click", () => this.remove(itemBox));
  }

  remove(item) {
    container.removeChild(item);
  }
}


function exportCSV() {
  let csvContent = "data:text/csv;charset=utf-8,";
  console.log(rows);
  rows.forEach(function (rowArray) {
    row = rowArray.join(",");
    csvContent += row + "\r\n";
  });

  console.log(csvContent);
  var encodedUri = encodeURI(csvContent);
  var csv = document.createElement("a");
  csv.setAttribute("href", encodedUri);
  csv.setAttribute("download", "my_data.csv");
  document.body.appendChild(csv);
  csv.click();
}
function exportList(object) {
  for(let index = 0; index < object.length; index++) {
    rows.push([object[index].name,object[index].country,object[index].description, object[index].brand,object[index].currentState]);
  }
  console.log(rows);
}


///De testare, urmeaza sa fie luate din baza de date
// new item("Descriere/Titlu", "../assets/coca.jpeg");
// new item("Descriere/Titlu", "../assets/coca.jpeg");
// new item("Descriere/Titlu", "../assets/coca.jpeg");
// new item("Descriere/Titlu", "../assets/coca.jpeg");
// new item("Descriere/Titlu", "../assets/coca.jpeg");
// new item("Descriere/Titlu", "../assets/coca.jpeg");
