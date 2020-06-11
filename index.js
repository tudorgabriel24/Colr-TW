// var page = "login";
// var activeForm = "login";

// window.onload = function() {
//   console.log("DOM HAS LOADED");

//   var Router = function(name, routes) {

//     return {
//       name: name,
//       routes
//     }

//   };

//   var mainRouter = new Router('mainRouter', [
//     {
//       path: '/login',
//       name: 'login'
//     },
//     {
//       path: '/news',
//       name: 'news'
//     }
//   ]);
//   console.log('mainRouter = ' + mainRouter);
//   var currentPath = window.location.pathname;
//   console.log('currentPath = '+ currentPath);
// }

// window.onpopstate = () =>  fetchLoginPage();

// (async function () {
//   await fetchLoginPage();
// })();

// async function fetchLoginPage() {
//   await fetch('./html/login.html')
//   .then(function(response) {
//     return response.text();
//   })
//   .then(function(body) {
//     console.log("aici");
//     history.pushState({},'',`/login`);
//     document.querySelector('#content').innerHTML = body;
//     // console.log(window.location.search);
//   });
// }
