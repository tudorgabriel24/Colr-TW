function onClickLogin(event) {
    let loginSwitch = document.querySelector(".switch-login");
    let registerSwitch = document.querySelector(".switch-register");
    let confrimationInput = document.querySelectorAll(".confirm");
    event.preventDefault();
    if(activeForm === "register") {
        loginSwitch.classList.add('active-form');
        registerSwitch.classList.remove('active-form');
        for (let index=0; index < confrimationInput.length; index++) {
            confrimationInput[index].classList.add('hide');
        }
        activeForm = "login";
    } 
}

function onClickRegister(event) {
    let loginSwitch = document.querySelector(".switch-login");
    let registerSwitch = document.querySelector(".switch-register");
    let confrimationInput = document.querySelectorAll(".confirm");
    event.preventDefault();
    if(activeForm === "login") {
        registerSwitch.classList.add('active-form');
        loginSwitch.classList.remove('active-form');
        activeForm = "register";
        for (var index=0; index < confrimationInput.length; index++) {
            confrimationInput[index].classList.remove('hide');
        }
    }
}