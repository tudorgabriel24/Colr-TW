// var rows = [];
// const container = document.querySelector(".container");
// window.onload = function getCartData() {
//   const xhttp = new XMLHttpRequest();
//   xhttp.onload = function () {
//     console.log(xhttp.responseText);
//     // insertInCart(JSON.parse(xhttp.responseText));
//   };
//   xhttp.open("GET", "http://localhost:3000/cart", true);
//   xhttp.getResponseHeader("Access-Control-Allow-Origin", "*");
//   xhttp.getAllResponseHeaders("Access-Control-Allow-Origin", "*");
//   // xhttp.setRequestHeader("Content-Type", "application/json");
//   const authToken = localStorage.getItem("Authorization");
//   console.log(authToken);
//   xhttp.setRequestHeader("Authorization", authToken);
//   xhttp.send();
// };

// function insertInCart(object) {
//   for (let index = 0; index < object.length; index++) {
//     new item(
//       object[index].name,
//       `../project-node-app/images/${object[index].ID}.png`,
//       object[index].id_article
//     );
//   }
//   exportList(object);
// }

// class item {
//   constructor(itemName, image_url, ID) {
//     this.createDiv(itemName, image_url, ID);
//   }
//   createDiv(itemName, image_url, ID) {
//     let input = document.createElement("p");
//     input.value = itemName;
//     // input.disabled = true;
//     input.classList.add("item_input");
//     input.type = "text";
//     input.innerHTML = itemName;

//     let image = document.createElement("img");
//     image.value = image_url;
//     image.setAttribute("src", image_url);
//     image.classList.add("size");

//     let itemBox = document.createElement("div");
//     itemBox.classList.add("item");

//     let removeButton = document.createElement("button");
//     removeButton.innerHTML = "remove";
//     removeButton.classList.add("removeButton");
//     removeButton.id = ID;

//     container.appendChild(itemBox);

//     itemBox.appendChild(image);
//     itemBox.appendChild(input);
//     itemBox.appendChild(removeButton);

//     removeButton.addEventListener("click", () =>
//       this.removeItem(itemBox, removeButton.id)
//     );
//   }

// removeItem(item, id) {
//   container.removeChild(item);
//   const xhttp = new XMLHttpRequest();
//   xhttp.onload = function () {
//     console.log("yay");
//   };
//   xhttp.open("DELETE", "http://localhost:3000/cart", true);

//   xhttp.getResponseHeader("Access-Control-Allow-Origin", "");
//   xhttp.getAllResponseHeaders("Access-Control-Allow-Origin", "");
//   xhttp.setRequestHeader("Content-Type", "application/json");
//   const authToken = localStorage.getItem("Authorization");
//   xhttp.setRequestHeader("Authorization", authToken);
//   xhttp.send({ id_article: `${id}` });
// }
//}

window.onload = function renderMenuItems () {
  if(localStorage.getItem("Authorization") !== undefined) {
    getUser();
  }
  else {
    window.location.replace('http://localhost:5500/index.html');
  }
}

let getUser = function () {
  console.log("AICI AA");
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    console.log(xhttp.responseText);
    let responseBody = JSON.parse(xhttp.responseText);
    console.log(responseBody);
    renderMenuData(responseBody);
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

let renderMenuData = function (response) {
  let menuContainer = document.getElementById('nav-container');
  let homePage = document.createElement('a');
  homePage.href = '../index.html';
  homePage.innerHTML = 'Home';
  menuContainer.appendChild(homePage);
  if(response.success === true) {
    let statisticsPage = document.createElement('a');
    statisticsPage.href = '../html/export.html';
    statisticsPage.innerHTML = 'Statistics';
    let uploadPage = document.createElement('a');
    uploadPage.href = '../html/upload.html';
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
    logout.href = '../index.html';
    logout.innerHTML = 'Logout';
    menuContainer.appendChild(logout);

    logout.addEventListener('click', function () {
      // window.location.replace('http://localhost:5500/index.html');
      localStorage.removeItem('Authorization');
    })
  }
}

function exportCSV() {
  let csvContent = "data:text/csv;charset=utf-8,";
  console.log(rows);
  csvContent += ["Type", "Country", "Number_views", "Brand", "Value"];
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

function exportDocBook() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    console.log(xhttp.responseText);
    doc(xhttp.responseText);
  };

  xhttp.open("GET", "../project-node-app/xml/docBook.xml", true);

  xhttp.getResponseHeader("Access-Control-Allow-Origin", "");
  xhttp.getAllResponseHeaders("Access-Control-Allow-Origin", "");
  xhttp.setRequestHeader("Content-Type", "application/json");
  const authToken = localStorage.getItem("Authorization");
  xhttp.setRequestHeader("Authorization", authToken);
  xhttp.send();

  function doc(object) {
    let docContent = "data:text/plain;charset=utf-8,";
    docContent += object;
    //request pe server sa iei fisierul
    var encoded = encodeURI(docContent);
    var doc = document.createElement("a");
    doc.setAttribute("href", encoded);
    doc.setAttribute("download", "my_data.xml");
    document.body.appendChild(doc);
    doc.click();
  }
}

// function exportList(object) {
//   for (let index = 0; index < object.length; index++) {
//     rows.push([
//       object[index].name,
//       object[index].country,
//       object[index].description,
//       object[index].brand,
//       object[index].currentState,
//     ]);
//   }
//   console.log(rows);
// }

///De testare, urmeaza sa fie luate din baza de date
// new item("Descriere/Titlu", "../assets/coca.jpeg");
// new item("Descriere/Titlu", "../assets/coca.jpeg");
// new item("Descriere/Titlu", "../assets/coca.jpeg");
// new item("Descriere/Titlu", "../assets/coca.jpeg");
// new item("Descriere/Titlu", "../assets/coca.jpeg");
// new item("Descriere/Titlu", "../assets/coca.jpeg");
