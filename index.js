window.onload = function makeContentRequest() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    console.log(xhttp.responseText);
  };
  xhttp.open("GET", "http://localhost:3000/articles", true);
  xhttp.getResponseHeader("Access-Control-Allow-Origin", "*");
  xhttp.getAllResponseHeaders("Access-Control-Allow-Origin", "*");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.setRequestHeader(
    "Authorization",
    this.localStorage.getItem("Authorization")
  );
  xhttp.send(JSON.stringify({ country: "Romania" }));
};
