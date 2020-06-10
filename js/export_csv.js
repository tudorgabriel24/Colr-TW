document.getElementById("CSV").addEventListener("click", exportCSV);

function exportCSV() {
  var xhr = new XMLHttpRequest();
  console.log("sss");
  xhr.open("GET", "http://localhost:3000/sample", true);

  xhr.onload = function () {
    if (this.status == 200) {
      var content = JSON.parse(this.responseText);

      console.log(content);
    }
  };
  xhr.send();
}
