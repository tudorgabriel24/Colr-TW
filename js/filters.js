function searchFil(event) {
  event.preventDefault();

  var country = document.getElementById("countries");
  var value = country.options[country.selectedIndex].value;

  var country = document.getElementById("countries").value;
  var state = document.getElementById("stat").value;
  var price = document.getElementById("price_range").value;
  var type = document.getElementById("post_type").value;

  var formData = {};
  // console.log(country);
  // console.log(state);
  // console.log(price);
  // console.log(type);
  formData = {
    country: country,
    currentState: state,
    price: price,
    type: type,
  };
  formData = JSON.stringify(formData);
  console.log(formData);

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/articles", true);
  xhttp.send(formData);
}
