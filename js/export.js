// window.emptyList = function () {
//   var lis = document.querySelectorAll("#myList li");
//   for (var i = 0; (li = lis[i]); i++) {
//     li.parentNode.removeChild(li);
//     i -= 1;
//   }
// };

// window.emptyList = function () {
//   var lis = document.querySelectorAll("#myList li");
//   for (var i = 0; (li = lis[i]); i++) {
//     li.parentNode.removeChild(li);
//     this.event.stopPropagation();
//   }
// };

//Cross the list item
var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

//Eliminate list elements
var items = document.querySelectorAll("#mylist li"),
  tab = [],
  liIndex;

// populate tab with li data
for (var i = 0; i < items.length; i++) {
  tab.push(items[i].innerHTML);
}
console.log(tab);

// get li index using tab array on li click event
for (var i = 0; i < items.length; i++) {
  items[i].onclick = function () {
    liIndex = tab.indexOf(this.innerHTML);
    console.log(this.innerHTML + " INDEX = " + liIndex);
  };
}

function removeElement() {
  console.log(items);
  items[liIndex].parentNode.removeChild(items[liIndex]);
}
