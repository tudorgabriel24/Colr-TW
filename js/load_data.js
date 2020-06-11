form.submit.addEventListener("click", () => {
  const request = new XMLHttpRequest();
  request.onload = () => {
    console.log(request.responseText);
    let respObj = JSON.parse(request.responseText);
    console.log(respObj);
    // location.href = 'noutati.html';
  };
  const requestData = {
    name: form.name.value,
    year: form.year.value,
    brand: form.brand.value,
    country: form.country.value,
    description: form.description.value,
    currentState: form.currentState.value,
  };
  request.open("POST", "http://localhost:3000/articles", true);

  request.getResponseHeader("Access-Control-Allow-Origin", "*");
  request.getAllResponseHeaders("Access-Control-Allow-Origin", "*");
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(requestData));
});
