const itemInput = document.getElementById('item-input');
const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');

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
    checkui();
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
    checkui();   
}
function clickRemove(e){
    if (e.target.parentElement.classList.contains('remove-item'))
    {
        if (confirm('Are you sure?'))
        {
            e.target.parentElement.parentElement.remove();
            checkui();

        }
        checkui();
    }
}
function filterItem(e) {
    const itemText = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll('li');
    items.forEach(item  => {
        const filterParam = item.firstChild.textContent.toLowerCase();
        if (filterParam.indexOf(itemText) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
        
    })
}    
function checkui() {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        filter.style.display = 'none';        
    } else {
        clearBtn.style.display = 'block';
        filter.style.display = 'block';
    }
}
// Events 
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', clickRemove)
clearBtn.addEventListener('click',removeAll);
filter.addEventListener('input', filterItem);
checkui();
