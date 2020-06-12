window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop >= 30 ||
    document.documentElement.scrollTop >= 30
  ) {
    document.getElementById("headerTitle").style.fontSize = "4rem";
    document.getElementById("headerTitle").style.paddingTop = "1rem";
  } else {
    document.getElementById("headerTitle").style.fontSize = "5rem";
  }
}
