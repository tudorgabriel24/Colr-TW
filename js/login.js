var activeForm = "login";
myStorage = window.localStorage;

window.onload = function makeContentRequest() {
    if(this.localStorage.getItem('Authorization') !== null) {
        navigateToGallery();
    }
}

function navigateToGallery() {
    window.location.replace('http://localhost:5500/index.html');
  }

function onClickLogin(event) {
    let loginSwitch = document.querySelector(".switch-login");
    let registerSwitch = document.querySelector(".switch-register");
    let fullNameGroup = document.querySelectorAll(".full-name-group");
    event.preventDefault();
    if(activeForm === "register") {
        loginSwitch.classList.add('active-form');
        registerSwitch.classList.remove('active-form');
        for (let index=0; index < fullNameGroup.length; index++) {
            fullNameGroup[index].classList.add('hide');
        }
        activeForm = "login";
    } 
}

function onClickRegister(event) {
    let loginSwitch = document.querySelector(".switch-login");
    let registerSwitch = document.querySelector(".switch-register");
    let fullNameGroup = document.querySelectorAll(".full-name-group");
    event.preventDefault();
    if(activeForm === "login") {
        registerSwitch.classList.add('active-form');
        loginSwitch.classList.remove('active-form');
        activeForm = "register";
        for (var index=0; index < fullNameGroup.length; index++) {
            fullNameGroup[index].classList.remove('hide');
        }
    }
}

function onSubmit(event) {
    event.preventDefault();
    let emailInput = document.querySelector("#email-input").value;
    let passwordInput = document.querySelector("#password-input").value;
    let fullNameInput = document.querySelector("#full-name-input").value;
    console.log(emailInput," ", passwordInput, " ", fullNameInput);

    if(activeForm === "login") {
        makeLoginRequest(emailInput,passwordInput);
    } else {
        if(activeForm === "register") {
            makeRegisterRequest(fullNameInput,emailInput,passwordInput);
        }
    }
}

function makeLoginRequest(email,password) {

    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if(this.readyState == 4) {
            if (this.status == 200) {
                console.log(xhttp.responseText);
                let authToken = xhttp.getResponseHeader('Authorization');
                console.log("AUTH",authToken);
                localStorage.setItem('Authorization', authToken);
                window.location.replace('http://localhost:5500/index.html');
              }
        }
    };
    const requestData = {
        email: email,
        password: password
    };
    xhttp.open('POST', 'http://localhost:3000/login', true);
    xhttp.getResponseHeader('Access-Control-Allow-Origin', '*');
    xhttp.getAllResponseHeaders('Access-Control-Allow-Origin', '*');
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.send(JSON.stringify(requestData));
}

function makeRegisterRequest(fullName,email,password) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        console.log(xhttp.responseText);
        if(this.readyState == 4) {
            if (this.status == 201) {
                showNotification("User created!");
            }
            else {
                showNotification("User already exist!");
            }
        }
        // let respObj = JSON.parse(xhttp.responseText);
        // console.log(respObj);
    };
    const requestData = {
        fullName: fullName,
        email: email,
        password: password
    };
    xhttp.open('POST', 'http://localhost:3000/register', true);
    xhttp.getResponseHeader('Access-Control-Allow-Origin', '*');
    xhttp.getAllResponseHeaders('Access-Control-Allow-Origin', '*');
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.send(JSON.stringify(requestData));
}

function showNotification(notificationMessage) {
    let loginPage = document.querySelector(".login-page");
    let notificationContainer = document.createElement("DIV");
    notificationContainer.classList.add("notification");
    let message = document.createElement("SPAN");
    message.innerHTML = notificationMessage;

    loginPage.appendChild(notificationContainer);
    notificationContainer.appendChild(message);

    setTimeout(function(){ 
        loginPage.removeChild(notificationContainer);
        notificationContainer.removeChild(message);
    }, 2000);
}
// function clearInputs() {
//     let emailInput = document.querySelector('#')
// }