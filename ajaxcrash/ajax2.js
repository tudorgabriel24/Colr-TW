document.getElementById("button1").addEventListener("click", loadUser);
document.getElementById("button2").addEventListener("click", loadUsers);

function loadUser() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "user.json", true);

  xhr.onload = function () {
    if (this.status == 200) {
      console.log(this.responseText);

      var user = JSON.parse(this.responseText);
      var output = "";

      output +=
        "<ul>" +
        "<li>ID: " +
        user.id +
        "</li>" +
        "<li>Name: " +
        user.name +
        "</li>" +
        "</ul>";
      document.getElementById("user").innerHTML = output;
    }
  };
  xhr.send();
}

function loadUsers() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "users.json", true);

  xhr.onload = function () {
    if (this.status == 200) {
      console.log(this.responseText);

      var users = JSON.parse(this.responseText);
      var output = "";

      for (var i in users) {
        output +=
          "<ul>" +
          "<li>ID: " +
          users[i].id +
          "</li>" +
          "<li>Name: " +
          users[i].name +
          "</li>" +
          "</ul>";
      }
      document.getElementById("users").innerHTML = output;
    }
  };
  xhr.send();
}
