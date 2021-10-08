let menu = document.querySelector('#menu-icon')
let navbar = document.querySelector('.navbar')

menu.onclick = () =>{
    navbar.classList.toggle('active')
}

window.onscroll = () =>{
    navbar.classList.remove('active')
}


var removeItem = document.getElementsByClassName("btn-remove")
for (var i =0; i<removeItem.length; i++){
    var button = removeItem[i]
    button.addEventListener('click', removeCartItem) 
}

var addToCart = document.getElementsByClassName('add')
for (var i =0; i <addToCart.length; i++){
    var button = addToCart[i]
    button.addEventListener('click', addToCartClicked)
}
document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchase)

var quantityInputs = document.getElementsByClassName("cart-quantity-input")
for (var i =0; i<quantityInputs.length; i++){
    var input = quantityInputs[i]
    input.addEventListener('click', quantityChanges)
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
    updateCartTotal()
}


//adds to the cart
function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('title-price')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText
    var imagesrc = shopItem.getElementsByClassName("image")

    console.log(title,price)
    alert('added to cart')
    addItemToCart(title, price, imagesrc)
}

//add to cart
function addItemToCart(title, price, imagesrc){
    const cartrow = document.createElement('div')
    cartrow.classList.add('cart-row')
    const cartItem = document.getElementsByClassName("cart-items")[0]
    cartrowcontent = 
    `<div class="cart-item cart-column">
    <img class="cart-item-image" src="${imagesrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
   </div>
   <span class="cart-price cart-column">${price}</span>
   <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="2">
    <button class="btn-remove" type="button">remove</button>
   </div>`
    cartrow.innerHTML = cartrowcontent
    cartItem.append(cartrow)
    cartrow.getElementsByClassName("btn-remove")[0].addEventListener('click', removeCartItem)
    cartrow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', quantityChanges)
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

//updates the cart total
function updateCartTotal(){
   var cart = document.getElementsByClassName("cart-items")[0]
   var cartRows = cart.getElementsByClassName("cart-row")
   var total = 0
   for (var i =0; i< cartRows.length; i++){
       var cartRow = cartRows[i]
       var price = cartRow.getElementsByClassName("cart-price")[0]
       var quantity = cartRow.getElementsByClassName("cart-quantity")[0]

       var prices = parseFloat(price.innerText.replace('$', ''))
       var qty = quantity.value
       total = total + (prices * qty)
   }
   total = Math.round(total * 100)/ 100
   document.getElementsByClassName("cart-total-price")[0].innerText = '$' + total
}