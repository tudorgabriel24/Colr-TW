var ctx = document.getElementById("myStatsChart");

// Global Options
Chart.defaults.global.defaultFontFamily = "sans-serif";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";

// var myChart = new Chart(ctx, opt);

//aici trebuie puse statistici
var label_list = ["Brand", "Label", "Cap", "Country"];
var views_list = [60, 70, 100, 26];
var times_list = [7, 30, 2, 10];

// document.getElementById("Stat1").addEventListener("click", option());

function option() {
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
  var myChart = new Chart(ctx, opt);
}
