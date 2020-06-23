var ctx = document.getElementById("myChart");

// Global Options
Chart.defaults.global.defaultFontFamily = "sans-serif";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";

var myChart = new Chart(ctx, {
  type: "horizontalBar", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels: ["Cap", "Label", "Cork"],
    datasets: [
      {
        label: "Views",
        data: [50, 19, 25], //aici trebuie puse views-urile
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
      padding: { left: 220, right: 0, bottom: 0, top: 0 },
    },

    events: ["mousemove"],
  },
});

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
