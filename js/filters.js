var formData = new FormData();

function searchFil(event) {
  event.preventDefault();

  var country = document.getElementById("countries");
  var value = country.options[country.selectedIndex].value;

  var country = document.getElementById("countries").value;
  var state = document.getElementById("stat").value;
  var price = document.getElementById("price_range").value;
  var type = document.getElementById("post_type").value;
  // console.log(country);
  // console.log(state);
  // console.log(price);
  // console.log(type);
  formData.append("country", country);
  formData.append("currentState", state);
  // formData.append("price", `${price}`);
  formData.append("price", price);
  formData.append("type", type);

  for (var value of formData.values()) {
    console.log(value);
  }

  // var xhttp = new XMLHttpRequest();
  // xhttp.open("GET", "http://localhost:3000/articles", true);
  // xhttp.send(formData);
}
