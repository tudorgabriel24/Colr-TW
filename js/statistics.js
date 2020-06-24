var myChart;

window.onload = function renderMenuItems() {
  if (localStorage.getItem("Authorization") !== undefined) {
    getUser();
  } else {
    window.location.replace("http://localhost:5500/index.html");
  }
};

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
};

let renderMenuData = function (response) {
  let menuContainer = document.getElementById("nav-container");
  let homePage = document.createElement("a");
  homePage.href = "../index.html";
  homePage.innerHTML = "Home";
  menuContainer.appendChild(homePage);
  if (response.success === true) {
    let statisticsPage = document.createElement("a");
    statisticsPage.href = "../html/export.html";
    statisticsPage.innerHTML = "Statistics";
    let uploadPage = document.createElement("a");
    uploadPage.href = "../html/upload.html";
    uploadPage.innerHTML = "Upload articles";
    menuContainer.appendChild(statisticsPage);
    menuContainer.appendChild(uploadPage);

    if (response.user.admin) {
      let adminPage = document.createElement("a");
      adminPage.href = "../html/adminPanel.html";
      adminPage.innerHTML = "Admin panel";
      menuContainer.appendChild(adminPage);
    }
    let logout = document.createElement("a");
    logout.href = "../index.html";
    logout.innerHTML = "Logout";
    menuContainer.appendChild(logout);

    logout.addEventListener("click", function () {
      // window.location.replace('http://localhost:5500/index.html');
      localStorage.removeItem("Authorization");
    });
  }
};

var docbook = '';

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
  doc(docbook);

  function doc(object) {
    let docContent = "data:text/plain;charset=utf-8,";
    docContent += object;
    var encoded = encodeURI(docContent);
    var doc = document.createElement("a");
    doc.setAttribute("href", encoded);
    doc.setAttribute("download", "my_data.xml");
    document.body.appendChild(doc);
    doc.click();
  }
}

var stats = document.getElementsByClassName("stats_button");
for (let i = 0; i < stats.length; i++) {
  stats[i].addEventListener("click", function () {
    console.log(i);
    getStatistics(stats[i].id.split("_")[1]);
  });
}

function getStatistics(param) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    // console.log(xhttp.responseText);
    var response = JSON.parse(xhttp.responseText);
    var label = [];
    var views = [];
    var times = [];
    // console.log(param);
    for (var i in response) {
      label.push(response[i][param]);
      views.push(response[i].totalViews);
      times.push(response[i].timesUploaded);
    }
    option(label, views, times);
  };

  xhttp.open("GET", `http://localhost:3000/stats/${param}`, true);

  xhttp.getResponseHeader("Access-Control-Allow-Origin", "");
  xhttp.getAllResponseHeaders("Access-Control-Allow-Origin", "");
  xhttp.setRequestHeader("Content-Type", "application/json");
  const authToken = localStorage.getItem("Authorization");
  xhttp.setRequestHeader("Authorization", authToken);
  xhttp.send();

  const docXHTTP = new XMLHttpRequest();
  docXHTTP.onload = function () {
    console.log("Export response is:");
    console.log(docXHTTP.responseText);
    docbook = docXHTTP.responseText;
  };
  docXHTTP.open("GET", `http://localhost:3000/export?param=${param}`, true);
  console.log('asd');
  docXHTTP.getResponseHeader("Access-Control-Allow-Origin", "");
  docXHTTP.getAllResponseHeaders("Access-Control-Allow-Origin", "");
  docXHTTP.setRequestHeader("Content-Type", "application/json");
  docXHTTP.setRequestHeader("Authorization", authToken);
  docXHTTP.send();
}

function option(label_list, views_list, times_list) {
  if (myChart != undefined) {
    console.log('se distruge canvasul');
    myChart.destroy();
  }
  my_label = label_list;
  no_views = views_list;
  times_upl = times_list;
  opt = {
    type: "bar", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      labels: [my_label[0], my_label[1], my_label[2], my_label[3]],
      datasets: [
        {
          label: "Number of views",
          data: [no_views[0], no_views[1], no_views[2], no_views[3]],

          backgroundColor: [
            "rgba(52, 128, 235, 0.6)",
            "rgba(34, 186, 112, 0.6)",
            "rgba(166, 31, 70, 0.6)",
            "rgba(222, 209, 33,0.6)",
          ],
          borderColor: [
            "rgba(39, 114, 219, 1)",
            "rgba(29, 153, 93, 1)",
            "rgba(143, 47, 75, 1)",
            "rgba(222, 209, 33,1)",
          ],
          borderWidth: 1,
        },
        {
          label: "Times uploaded",
          data: [times_upl[0], times_upl[1], times_upl[2], times_upl[3]],
          backgroundColor: [
            "rgba(52, 128, 235, 0.6)",
            "rgba(34, 186, 112, 0.6)",
            "rgba(166, 31, 70, 0.6)",
            "rgba(222, 209, 33, 0.6)",
          ],
          borderColor: [
            "rgba(39, 114, 219, 1)",
            "rgba(29, 153, 93, 1)",
            "rgba(143, 47, 75, 1)",
            "rgba(222, 209, 33, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Statistics",
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
  };
  myChart = new Chart(ctx, opt);
}
