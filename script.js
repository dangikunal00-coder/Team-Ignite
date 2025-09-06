// Load cart from localStorage or start with empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fetch products from products.json
fetch("products.json")
  .then(res => res.json())
  .then(products => {
    let productDiv = document.getElementById("products");
    if (productDiv) {
      products.forEach(p => {
        let item = document.createElement("div");
        item.classList.add("product");

        item.innerHTML = `
          <h3>${p.name}</h3>
          <img src="${p.image}" alt="${p.name}" width="200">
          <p>₹${p.price}</p>
          <button onclick="addToCart(${p.id}, '${p.name}', ${p.price}, '${p.image}')">
            Add to Cart
          </button>
        `;

        productDiv.appendChild(item);
      });
    }
  });

// Add item to cart
function addToCart(id, name, price, image) {
  cart.push({ id, name, price, image });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

// Load cart items on cart.html
function loadCart() {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let cartDiv = document.getElementById("cart");

  if (cartDiv) {
    cartDiv.innerHTML = "";
    let total = 0;

    cartItems.forEach((item, index) => {
      total += item.price;

      cartDiv.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" width="100">
         
            
          <p>${item.name} - ₹${item.price}</p>
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;
    });

    cartDiv.innerHTML += `<h3>Total: ₹${total}</h3>`;
    cartDiv.innerHTML += `<button onclick="checkout()">Checkout</button>`;
  }
}

// Remove item from cart
function removeFromCart(index) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  loadCart();
}

// Checkout function
function checkout() {
  alert("Redirecting to payment...");
  window.location.href = "https://rzp.io/l/Demo"; // Example Razorpay checkout link
}

// Auto-load cart when cart.html is opened
if (document.getElementById("cart")) {
  loadCart();
}
