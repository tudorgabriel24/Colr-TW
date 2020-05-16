
var loginSwitch = document.querySelector(".switch-login");
var registerSwitch = document.querySelector(".switch-register");
var confrimationInput = document.querySelectorAll(".confirm");
var activeForm = "login";

loginSwitch.addEventListener('click', (event) => {
    event.preventDefault();
    if(activeForm === "register") {
        loginSwitch.classList.add('active-form');
        registerSwitch.classList.remove('active-form');
        for (let index=0; index < confrimationInput.length; index++) {
            confrimationInput[index].classList.add('hide');
        }
        activeForm = "login";
        // alert(`${loginSwitch.classList} ${registerSwitch.classList} `);
    } 

});

registerSwitch.addEventListener('click', (event) => {
    event.preventDefault();
    if(activeForm === "login") {
        registerSwitch.classList.add('active-form');
        loginSwitch.classList.remove('active-form');
        activeForm = "register";
        for (var index=0; index < confrimationInput.length; index++) {
            confrimationInput[index].classList.remove('hide');
        }
        // confrimationInput.setAttribute("style","display:initial");
        // alert(`${loginSwitch.classList} ${registerSwitch.classList} `);
    }
});
