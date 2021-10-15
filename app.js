let menu = document.querySelector('#menu-icon')
let navbar = document.querySelector('.navbar')

menu.onclick = () =>{
    navbar.classList.toggle('active')
}

window.onscroll = () =>{
    navbar.classList.remove('active')
}

const feature = [
    {
        name: "ipad 2020",
        cost: 200,
        images: ".images/ipadjpg.jpg"
    },
    {
        name: "iPhone 11 Pro",
        cost: 150,
        images: "./images/phone.jpg"
    },
    {
        name: "Haier Freezer",
        cost: 350,
        images: ".images/freezer.jpg"
    },
    {
        name: "Television",
        cost: 250,
        images: "./images/television.jpg"
    },
    {
        name: "Sweat-Shirt",
        cost: 20,
        images: "./images/shirt1.jpg"
    }
]
const shop = [
    {

    }
]

var removeItem = document.getElementsByClassName("btn-remove")
for (var i =0; i<removeItem.length; i++){
    var button = removeItem[i]
    button.addEventListener('click', removeCartItem) 
}

var quantityInputs = document.getElementsByClassName("cart-quantity-input")
for (var i =0; i<quantityInputs.length; i++){
    var input = quantityInputs[i]
    input.addEventListener('click', quantityChanges)
}

//purchase function
function purchase(){
    alert('Thanks for shopping with us')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}
//document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchase)


//function to display featured products to the screen
const container = document.querySelectorAll(".shop-container")
function featuredProduct(Items){
    let displayProducts = Items.map(function(item){
        return `<div class="box">
        <div class="box-img">
          <img src=${item.images} alt="apple" class="image">
        </div>
        <div class="title-price">
          <h3>${item.name}</h3>
        <span class="price">${item.cost}</span>
        <button class="add">add</button>
        </div>
      </div>`
     })
    displayProducts = displayProducts.join("")
    container.innerHTML = displayMenu
    console.log(displayProducts)
}

//removing items added to the cart
function removeCartItem(event){
    var buttonClickedd = event.target
    buttonClickedd.parentElement.parentElement.remove()
    updateCartTotal()
}

//checks for the value of the quantity 
function quantityChanges(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
     }
    subtotal()
    updateCartTotal()
}


const addbtn = document.getElementsByClassName("add")
const products = []
for (var i =0; i < addbtn.length; i++){
    let cartbtn = addbtn[i]
    cartbtn.addEventListener('click', ()=> {
        let product = {
            image: event.target.parentElement.parentElement.children[0].children[0].src,
            title: event.target.parentElement.parentElement.children[1].children[0].textContent,
            price: event.target.parentElement.parentElement.children[1].children[1].textContent,
        }
        alert('added to cart')
        addToStorage(product)
        displayCart()
        subtotal()
    })
}

//adding to local storage
function addToStorage(product){
    let cartItem = JSON.parse(localStorage.getItem("products"))
    if (cartItem === null){
        products.push(product)
        localStorage.setItem("products", JSON.stringify(products))
    }
    else {
        products.push(product)
    }

    localStorage.setItem("products", JSON.stringify(products))
}


//displaying to the cart-page
function displayCart(){
    const cartdisplay = document.getElementById("cart-items")
    let html = ""
    let cartitem = JSON.parse(localStorage.getItem("products"))
    cartitem.forEach(item => {
    html += `
        <div class="cart-row">
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${item.image}" width="100" height="100">
            <span class="cart-item-title">${item.title}</span>
        </div>
        <span class="cart-price cart-column">${item.price} </span>
        <div class="cart-qty cart-column">
            <input class="cart-quantity-input" type="number" value="2">
            <button class="btn-remove" type="button">remove</button>
        </div>
    </div>`
    })
    cartdisplay.innerHTML = html
    console.log(cartitem)
}
displayCart()


//function for subtotal
function subtotal(){
    let sum = 0
    var cart = document.getElementsById("cart-items")[0]
    var cartRows = cart.getElementsByClassName("cart-row")
    for (var i =0; i< cartRows.length; i++){
       var cartRow = cartRows[i]
       var price = cartRow.getElementsByClassName("cart-price")[0]
       var quantity = cartRow.getElementsByClassName("cart-quantity")[0]

       var prices = parseInt(price.innerText.replace('$', ''))
       var qty = quantity.value
       sum = prices * qty
   }
   document.getElementsByClassName("cart-sub")[0].innerText = '$' + sum
}

//updates the cart total
function updateCartTotal(){
   var cart = document.getElementsById("cart-items")[0]
   var cartRows = cart.getElementsByClassName("cart-row")
   var total = 0
   for (var i =0; i< cartRows.length; i++){
       var cartRow = cartRows[i]
       var price = cartRow.getElementsByClassName("cart-price")[0]
       var quantity = cartRow.getElementsByClassName("cart-quantity")[0]

       var prices = parseInt(price.innerText.replace('$', ''))
       var qty = quantity.value
       total = total + (prices * qty)
   }
   total = Math.round(total * 100)/ 100
   document.getElementsByClassName("cart-total-price")[0].innerText = '$' + total
}

