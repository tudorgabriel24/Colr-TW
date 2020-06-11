window.onload = function makeContentRequest() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    console.log(xhttp.responseText);
  };
  xhttp.open("GET", "http://localhost:3000/cart", true);
  xhttp.getResponseHeader("Access-Control-Allow-Origin", "*");
  xhttp.getAllResponseHeaders("Access-Control-Allow-Origin", "*");
  xhttp.setRequestHeader("Content-Type", "application/json");
  const authToken = localStorage.getItem("Authorization");
  xhttp.setRequestHeader(
    "Authorization",
    authToken
  );
  xhttp.send(JSON.stringify({ name: "capac" }));
};

function navigateToLogin() {
  window.location.replace('http://localhost:5500/html/login.html');
}