let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick =()=>{
    search.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick =()=>{
    navbar.classList.toggle('active');
    search.classList.remove('active');
}

window.onscroll =()=>{
    search.classList.remove('active');
    navbar.classList.remove('active');
}

//search box

let searchInput = document.getElementById('searchInput');
let productBoxes = document.querySelectorAll('.product-container .box');

searchInput.addEventListener('input', function () {
    let searchQuery = searchInput.value.toLowerCase();
    let firstMatch = null;
    let hasMatch = false; 

    productBoxes.forEach(box => {
        let productName = box.querySelector('h3').textContent.toLowerCase();

        if (productName.includes(searchQuery)) {
            box.style.display = 'block'; 
            if (!firstMatch) firstMatch = box; 
            hasMatch = true;
        } else {
            box.style.display = 'none'; 
        }
    });

    if (!hasMatch && searchQuery !== "") {
        alert("No products found matching your search.");
    }

    if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});



// cart
const cart = document.querySelector(".cart");
const cartIcon = document.querySelector("#cart-icon");
const closeCart = document.querySelector("#close-cart");
const addToCartButtons = document.querySelectorAll(".product-container .box a");

// Open & Close Cart
cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});
closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

// Function to Add Items to Cart
addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const productBox = button.parentElement.parentElement;
    const title = productBox.querySelector("h3").innerText;
    const price = productBox.querySelector("span").innerText;
    const imgSrc = productBox.querySelector("img").src;
    
    addItemToCart(title, price, imgSrc);
    updateTotal();
  });
});

// Add Item to Cart
function addItemToCart(title, price, imgSrc) {
  const cartContent = document.querySelector(".cart-content");
  const cartItems = cartContent.getElementsByClassName("cart-box");

  // Check if Item is Already in Cart
  for (let item of cartItems) {
    if (item.querySelector(".cart-product-title").innerText === title) {
      alert("Item is already in the cart!");
      return;
    }
  }

  // Create Cart Box
  const cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");
  cartBox.innerHTML = `
    <img src="${imgSrc}" class="cart-img">
    <div class="cart-product-title">${title}</div>
    <span class="cart-price">${price}</span>
    <input type="number" value="1" class="cart-quantity">
    <i class='bx bx-trash cart-remove'></i>
  `;

  cartContent.appendChild(cartBox);

  // Add Event Listeners
  cartBox.querySelector(".cart-remove").addEventListener("click", removeCartItem);
  cartBox.querySelector(".cart-quantity").addEventListener("change", updateTotal);
}

// Remove Item from Cart
function removeCartItem(event) {
  event.target.parentElement.remove();
  updateTotal();
}

// Update Cart Total
function updateTotal() {
  let total = 0;
  document.querySelectorAll(".cart-box").forEach((cartBox) => {
    const price = parseFloat(cartBox.querySelector(".cart-price").innerText.replace("Rs.", ""));
    const quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });
  
  document.querySelector(".total-price").innerText = "Rs." + total;
}



