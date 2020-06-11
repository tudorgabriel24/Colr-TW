//Create event listener
document.getElementById("button").addEventListener("click", loadText);

function loadText() {
  //Create the XHR Object
  var xhr = new XMLHttpRequest();
  //Open - type, url/file, async
  xhr.open("GET", "sample2.txt", true);

  xhr.onload = function () {
    if (this.status == 200) {
      console.log(this.responseText);
      document.getElementById("text").innerHTML = this.responseText;
    } else if ((this.status = 404)) {
      document.getElementById("text").innerHTML = "Not Found";
    }
  };
  xhr.onerror = function () {
    console.log("Request Error...");
  };
  //Sends request
  xhr.send();
}

// HTTP Statuses
// 200: "OK"
// 403: "Forbidden"
// 404: "Not found"
