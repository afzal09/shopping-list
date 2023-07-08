const itemInput = document.getElementById('item-input');
const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');

// Functions

function addItem(e) {
    e.preventDefault();
    const newItem = itemInput.value;
    if (newItem === '') {
        alert('Please enter an item');
        return;
    }    
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
    itemInput.value = '';
}
function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}
function createIcon(classss) {
    const icon = document.createElement('i');
    icon.className = classss;
    return icon;
}
function removeAll() {
    while (itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
}
function clickRemove(e){
    if (e.target.parentElement.classList.contains('remove-item')){
        e.target.parentElement.parentElement.remove();
    }
}
// Events 
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', clickRemove)
clearBtn.addEventListener('click',removeAll);