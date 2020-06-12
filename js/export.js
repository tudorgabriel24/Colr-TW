

<<<<<<< HEAD



// function exportCSV() {}
=======
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
>>>>>>> 4def81dd51d53cb3835423c4fb10bc957d384f81
