var ctx = document.getElementById("myStatsChart");

// Global Options
Chart.defaults.global.defaultFontFamily = "sans-serif";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";

var rssButton = document.getElementById("rssButton");
rssButton.addEventListener("click", () => {
  console.log("Incepe");
  var xhttp = new XMLHttpRequest();
  xhttp.onload = () => {
    console.log("aici e");
    window.open("../project-node-app/xml/rss.xml", "_blank");
  };
  xhttp.open("GET", "http://localhost:3000/rss", true);
  xhttp.getResponseHeader("Access-Control-Allow-Origin", "*");
  xhttp.getAllResponseHeaders("Access-Control-Allow-Origin", "*");
  const authToken = localStorage.getItem("Authorization");
  console.log(authToken);
  xhttp.setRequestHeader("Authorization", authToken);
  xhttp.send();
  console.log("trimis");
});
