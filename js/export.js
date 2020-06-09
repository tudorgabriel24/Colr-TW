const container = document.querySelector(".container");

class item {
  constructor(itemName, image_url) {
    this.createDiv(itemName, image_url);
  }
  createDiv(itemName, image_url) {
    let input = document.createElement("p");
    input.value = itemName;
    // input.disabled = true;
    input.classList.add("item_input");
    input.type = "text";
    input.innerHTML = itemName;

    let image = document.createElement("img");
    image.value = image_url;
    image.setAttribute("src", image_url);
    image.classList.add("size");

    let itemBox = document.createElement("div");
    itemBox.classList.add("item");

    let removeButton = document.createElement("button");
    removeButton.innerHTML = "remove";
    removeButton.classList.add("removeButton");

    container.appendChild(itemBox);

    itemBox.appendChild(image);
    itemBox.appendChild(input);
    itemBox.appendChild(removeButton);

    removeButton.addEventListener("click", () => this.remove(itemBox));
  }

  remove(item) {
    container.removeChild(item);
  }
}

///De testare, urmeaza sa fie luate din baza de date
new item("Descriere/Titlu", "../assets/coca.jpeg");
new item("Titlu", "../assets/jhonniewalker.jpeg ");
new item("Titlu", "../assets/jhonniewalker.jpeg ");
new item("Titlu", "../assets/jhonniewalker.jpeg ");
new item("Titlu", "../assets/jhonniewalker.jpeg ");
new item("Titlu", "../assets/jhonniewalker.jpeg ");
new item("Titlu", "../assets/jhonniewalker.jpeg ");
new item("Titlu", "../assets/jhonniewalker.jpeg ");
new item("Titlu", "../assets/jhonniewalker.jpeg ");
new item("Titlu", "../assets/jhonniewalker.jpeg ");
