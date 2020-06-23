var ctx = document.getElementById("myChart");

// Global Options
Chart.defaults.global.defaultFontFamily = "sans-serif";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";

var my_data = [50, 19, 25];

var myChart = new Chart(ctx, {
  type: "horizontalBar", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels: ["Cap", "Label", "Cork"],
    datasets: [
      {
        label: "Views",
        data: [my_data[0], my_data[1], my_data[2]], //aici trebuie puse views-urile
        backgroundColor: [
          "rgba(52, 128, 235, 0.6)",
          "rgba(34, 186, 112, 0.6)",
          "rgba(166, 31, 70, 0.6)",
        ],
        borderColor: [
          "rgba(39, 114, 219, 1)",
          "rgba(29, 153, 93, 1)",
          "rgba(143, 47, 75, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Most viewed items",
      fontSize: 25,
    },
    legend: {
      display: false,
      position: "right",
    },
    layout: {
      padding: { left: 0, right: 0, bottom: 0, top: 0 },
    },

    events: ["mousemove"],
  },
});

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
