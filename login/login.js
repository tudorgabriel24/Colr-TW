
var loginSwitch = document.querySelector(".switch-login");
var registerSwitch = document.querySelector(".switch-register");
var activeForm = "login";

loginSwitch.addEventListener('click', (event) => {
    event.preventDefault();
    if(activeForm === "register") {
        loginSwitch.classList.add('active-form');
        registerSwitch.classList.remove('active-form');
        registerSwitch.setAttribute("style","border-bottom-left-radius: 15px;");
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
        registerSwitch.setAttribute("style","border-bottom-left-radius: 0px;");
        // alert(`${loginSwitch.classList} ${registerSwitch.classList} `);
    }
});
