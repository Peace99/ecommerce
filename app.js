let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
};

const feature = [
  {
    name: "ipad 2020",
    cost: 200,
    images: ".images/ipadjpg.jpg",
  },
  {
    name: "iPhone 11 Pro",
    cost: 150,
    images: "./images/phone.jpg",
  },
  {
    name: "Haier Freezer",
    cost: 350,
    images: ".images/freezer.jpg",
  },
  {
    name: "Television",
    cost: 250,
    images: "./images/television.jpg",
  },
  {
    name: "Sweat-Shirt",
    cost: 20,
    images: "./images/shirt1.jpg",
  },
];
const shop = [{}];


//function to display featured products to the screen
const container = document.querySelectorAll(".shop-container");
function featuredProduct(Items) {
  let displayProducts = Items.map(function (item) {
    return `<div class="box">
        <div class="box-img">
          <img src=${item.images} alt="apple" class="image">
        </div>
        <div class="title-price">
          <h3>${item.name}</h3>
        <span class="price">${item.cost}</span>
        <button class="add">add</button>
        </div>
      </div>`;
  });
  displayProducts = displayProducts.join("");
  container.innerHTML = displayMenu;
  console.log(displayProducts);
}


//
const purchase = document.getElementsByClassName("purchase")[0]
//purchase.addEventListener('click', function(){
    try{
    const cartItems = document.querySelectorAll("cart-items")
    while (cart.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    alert("Thanks for shopping with us")
} catch(err){
}

//removing items added to the cart
function removeCartItem(id) {
  // var buttonClickedd = event.target
  // buttonClickedd.parentElement.parentElement.remove()
  // updateCartTotal()

  // read data from local storage
  const cart = JSON.parse(localStorage.getItem("products"));
  // remove product from cart
  const updateCart = cart.filter((prod, index) => index !== Number(id));
  // update local storage data
  localStorage.setItem("products", JSON.stringify(updateCart));
  // empty cart-items div
  document.getElementById("cart-items").innerHTML = "";
  // update cart page
  displayCart();
}

//checks for the value of the quantity
function quantityChanges(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  subtotal();
  updateCartTotal();
}

const addbtn = document.getElementsByClassName("add");
const products = [];
for (var i = 0; i < addbtn.length; i++) {
  let cartbtn = addbtn[i];
  cartbtn.addEventListener("click", () => {
    let product = {
      image:
        event.target.parentElement.parentElement.children[0].children[0].src,
      title:
        event.target.parentElement.parentElement.children[1].children[0]
          .textContent,
      price: Number(
        event.target.parentElement.parentElement.children[1].children[1].textContent.replace(
          /\$/g,
          ""
        )
      ),
      quantity: 1,
    };
    alert("added to cart");
    addToStorage(product);
    displayCart();
  });
}

//adding to local storage
function addToStorage(product) {
  let cartItem = JSON.parse(localStorage.getItem("products"));
  if (cartItem === null) {
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
  } else {
    let isItemNew = true;
    cartItem = cartItem.map((prod) => {
      if (prod.title == product.title) {
        isItemNew = false;
        const result = {
          image: product.image,
          price: product.price,
          quantity: prod.quantity + 1,
          title: product.title,
        };
        return result;
      } else return prod;
    });
    if (isItemNew) cartItem.push(product);
    localStorage.setItem("products", JSON.stringify(cartItem));
  }
}

const quantityIncrease = (id, val) => {
  try {
      if (val <= 1) alert("You have to select at least 1 quantity or remove item from cart");
    // get products from local storage
    const cart = JSON.parse(localStorage.getItem("products"));
    // update quantity of product
    const updateCart = cart.map((prod, index) => {
      return index === Number(id)
        ? {
            title: prod.title,
            image: prod.image,
            price: prod.price,
            quantity: prod.quantity > 0 && val > 0 ? val : prod.quantity,
          }
        : prod;
    });
    // update local storage products
    localStorage.setItem("products", JSON.stringify(updateCart));
    // empty innerHTMl of cart items
    document.getElementById("cart-items").innerHTML = "";
    // display cart
    displayCart();
  } catch (error) {
    // console.trace(error.message)
  }
};

//displaying to the cart-page
function displayCart() {
  try {
    const cartdisplay = document.getElementById("cart-items");
    let html = "",
      total = 0;
    let cartitem = JSON.parse(localStorage.getItem("products"));
    cartitem.forEach((item, index) => {
      total += item.price * item.quantity;
      html += `
                <div class="cart-row" id="${index}">
                    <div class="cart-item cart-column">
                        <img class="cart-item-image" src="${
                          item.image
                        }" width="100" height="100">
                        <span class="cart-item-title">${item.title}</span>
                    </div>
                    <div class="cart-price cart-column">$${item.price} </div>
                   
                    <div class="cart-qty cart-column">
                        <input class="cart-quantity-input" type="number" value="${
                          item.quantity
                        }" onchange="quantityIncrease(${index}, this.value)">
                    </div>
                        

                    <div class="cart-sub cart-column">$${
                      item.price * item.quantity
                    } </div>

                    <div>
                        <button class="btn-remove" type="button" onclick="removeCartItem(${index})">remove</button>
                    </div>
                </div>
                `;
    });
    cartdisplay.innerHTML = html;
    document.getElementsByClassName(
      "cart-total-price"
    )[0].innerHTML = `$${total}`;
  } catch (error) {
    // console.trace(error.message);
  }
}
displayCart();
