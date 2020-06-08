function loadHeader() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../html/header.html", true);

  xhr.onload = function () {
    if (this.status == 200) {
      document.getElementById("header").innerHTML = this.responseText;
    } else if ((this.status = 404)) {
      document.getElementById("header").innerHTML = "Not Found";
    }
  };
  xhr.onerror = function () {
    console.log("Request Error...");
  };
  xhr.send();
}

function loadFilters() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../html/filters.html", true);

  xhr.onload = function () {
    if (this.status == 200) {
      document.getElementById("filters").innerHTML = this.responseText;
    } else if ((this.status = 404)) {
      document.getElementById("filters").innerHTML = "Not Found";
    }
  };
  xhr.onerror = function () {
    console.log("Request Error...");
  };
  xhr.send();
}

function loadGallery() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../html/gallery.html", true);

  xhr.onload = function () {
    if (this.status == 200) {
      document.getElementById("gallery").innerHTML = this.responseText;
    } else if ((this.status = 404)) {
      document.getElementById("gallery").innerHTML = "Not Found";
    }
  };
  xhr.onerror = function () {
    console.log("Request Error...");
  };
  xhr.send();
}

function loadLogin() {
  // Are o eroare
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../html/login.html", true);

  xhr.onload = function () {
    if (this.status == 200) {
      console.log(this.responseText);
      document.getElementById("userLogin").innerHTML = this.responseText;
    } else if ((this.status = 404)) {
      document.getElementById("userLogin").innerHTML = "Not Found";
    }
  };
  xhr.onerror = function () {
    console.log("Request Error...");
  };
  //Sends request
  xhr.send();
}

loadHeader();
loadGallery();
loadFilters();
