let d = document.getElementById("top");
let d_nested = document.getElementById("nested");
let throwawayNode = d.removeChild(d_nested);

window.emptyList = function () {
  var lis = document.querySelectorAll("#myList li");
  for (var i = 0; (li = lis[i]); i++) {
    li.parentNode.removeChild(li);
    i -= 1;
  }
};
