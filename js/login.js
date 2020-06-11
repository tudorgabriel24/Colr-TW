var activeForm = "login";

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

    } else {
        // if(activeForm === "register") {

        // }
    }
}
