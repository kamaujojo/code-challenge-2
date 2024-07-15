
document.addEventListener('DOMContentLoaded', function() {
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const itemList = document.getElementById('item-list');
    const clearListButton = document.getElementById('clear-list-button');

    // Load items from localStorage when the page loads
    loadItems();

    // Event listener for adding new items
    addButton.addEventListener('click', function() {
        const itemText = itemInput.value.trim();
        if (itemText !== '') {
            addItems([itemText]);
            saveItems(); 
            itemInput.value = '';
        }
    });

    // Event listener for marking items as purchased
    itemList.addEventListener('change', function(event) {
        if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
            const listItem = event.target.parentElement;
            if (event.target.checked) {
                listItem.classList.add('purchased');
            } else {
                listItem.classList.remove('purchased');
            }
            saveItems(); 
        }
    });

    // Event listener for clearing the list
    clearListButton.addEventListener('click', function() {
        itemList.innerHTML = '';
        saveItems(); 
    });

    // Function to load items from localStorage
    function loadItems() {
        let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
        if (items.length === 0) {
            items = [];
           // items = ['pizza', 'chicken nuggets'];
        }
        addItems(items);
    }

    // Function to save items to localStorage
    function saveItems() {
        const items = [];
        itemList.querySelectorAll('li').forEach(item => {
            const itemText = item.childNodes[1].textContent;
            items.push(itemText);
        });
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }

    // Function to add new items
    function addItems(itemsArray) {
        itemsArray.forEach(text => {
            const listItem = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            listItem.appendChild(checkbox);
            listItem.appendChild(document.createTextNode(text));
            listItem.addEventListener('dblclick', function() {
                editItem(listItem);
            });
            itemList.appendChild(listItem);
        });
    }

    // Function to edit an existing item
    function editItem(listItem) {
        const currentText = listItem.childNodes[1].textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        listItem.innerHTML = '';
        listItem.appendChild(input);
        input.focus();

        input.addEventListener('blur', function() {
            const newText = input.value.trim();
            if (newText !== '') {
                listItem.innerHTML = '';
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                listItem.appendChild(checkbox);
                listItem.appendChild(document.createTextNode(newText));
                listItem.addEventListener('dblclick', function() {
                    editItem(listItem);
                });
                saveItems(); 
            } else {
                listItem.remove();
                saveItems(); 
            }
        });

        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                input.blur();
            }
        });
    }
});
