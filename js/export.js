function exportCSV() {
  let csvContent = "data:text/csv;charset=utf-8,";

  rows.forEach(function (rowArray) {
    let row = rowArray.join(",");
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
const rows = [
  ["name1", "city1", "some other info"],
  ["name2", "city2", "more info"],
];

// function exportCSV() {}
