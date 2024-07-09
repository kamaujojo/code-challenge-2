const itemInput = document.getElementById("itemInput")
const addButton = document.getElementById("addButton")
const itemList = document.getElementById("itemList")
const clearList = document.getElementById("clearList")
const container = document.querySelector("#container")



//array
//create li for element 
//add the element content

const shoppingListArray = []

function renderItems(){
container.innerhtml = ""
shoppingListArray.forEach((item)=> {
    const Ii = document.createElement('Ii')
    Ii.innerHTML= item
    container.appendChild (Ii) // container (ul)
})
}


function NewIistRendered(){
    let inputtext = inputtextut.value.trim();
    if (inputtext !== ''){
 shoppingListArraypush(inputtext);
    }
}


let button = document.getElementById("markPurchased");
console.log(button);
button.addEventListener(click , function(){
    alert("markPurchased")
})
