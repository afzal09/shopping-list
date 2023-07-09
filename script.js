const itemInput = document.getElementById("item-input");
const itemForm = document.getElementById("item-form");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filter = document.getElementById("filter");
formBtn = itemForm.querySelector("button");
let isEditMode = false;

// Functions

function display() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));
  checkui();
}

function addItemtostorage(e) {
  e.preventDefault();
  // Reset button color to default
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i>   Add Item';
    formBtn.style.backgroundColor = "#333";
  const item = itemInput.value;
  if (item === "") {
    alert("Please enter an item");
    return;
  }
  if (isEditMode) {
    itemText = document.querySelector(".edit-mode");
    removeItemFromStorage(itemText.textContent);
    itemText.classList.remove("edit-mode");
    itemText.remove();
    isEditMode = false;
  } else {
    if (ifItemExist(item)) {
      alert("Item already exist");
      return;
    }
  }
  // adding items to dom
  addItemToDom(item);
  addToStorage(item);
  itemInput.value = "";
  checkui();
}
function addToStorage(listItem) {
  //Adding to local storage
  let itemFromStorage = getItemsFromStorage();
  itemFromStorage.push(listItem);
  // set items to local storage
  localStorage.setItem("listItems", JSON.stringify(itemFromStorage));
}
function getItemsFromStorage() {
  let itemFromStorage;
  if (localStorage.getItem("listItems") === null) {
    itemFromStorage = [];
  } else {
    itemFromStorage = JSON.parse(localStorage.getItem("listItems"));
  }
  return itemFromStorage;
}
function addItemToDom(item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  itemList.appendChild(li);
}
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}
function createIcon(classss) {
  const icon = document.createElement("i");
  icon.className = classss;
  return icon;
}
function removeAll() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
    localStorage.clear();
  }
  checkui();
}
function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  }
  setItemtoEdit(e.target);
}
function ifItemExist(item) {
  const itemFromStorage = getItemsFromStorage();
  return itemFromStorage.includes(item);
}
function setItemtoEdit(item) {
  isEditMode = true;
  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));
  item.classList.add("edit-mode");
  itemInput.value = item.textContent;
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>   Update Item';
  formBtn.style.backgroundColor = "#228B22";
}

function removeItem(item) {
  if (confirm("Are you sure?")) {
    // remove from dom
    item.remove();

    // remove from local storage
    removeItemFromStorage(item.textContent);
    checkui();
    // Reset button color to default
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i>   Add Item';
    formBtn.style.backgroundColor = "#333";
  }
}
function removeItemFromStorage(item) {
  let itemFromStorage = getItemsFromStorage();

  //Filter out the item to be removed
  itemFromStorage = itemFromStorage.filter((i) => i !== item);

  // set items to local storage
  localStorage.setItem("listItems", JSON.stringify(itemFromStorage));
}
function filterItem(e) {
  const itemText = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");
  items.forEach((item) => {
    const filterParam = item.firstChild.textContent.toLowerCase();
    if (filterParam.indexOf(itemText) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}
function checkui() {
  if (itemList.children.length === 0) {
    clearBtn.style.display = "none";
    filter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    filter.style.display = "block";
  }
  itemInput.value = "";
}
// Events
function init() {
  itemForm.addEventListener("submit", addItemtostorage);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", removeAll);
  filter.addEventListener("input", filterItem);
  document.addEventListener("DOMContentLoaded", display);
  checkui();
}
init();
