// CART DATA

let cart = [];

let orders = [];


// CHANGE PAGE

function showSection(sectionId) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(function(section) {
        section.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// OPEN RESTAURANT

function openRestaurant(restaurantName) {

    alert("Welcome to " + restaurantName + " menu!");

    showSection("restaurants");

}


// ADD TO CART

function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    updateCart();

    alert(name + " added to your cart!");

}


// UPDATE CART

function updateCart() {

    const cartItems = document.getElementById("cartItems");

    const cartCount = document.getElementById("cartCount");

    const cartTotal = document.getElementById("cartTotal");


    // UPDATE COUNT

    cartCount.textContent = cart.length;


    // EMPTY CART

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "0";

        return;
    }


    // DISPLAY ITEMS

    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach(function(item, index) {

        total += item.price;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(div);

    });


    cartTotal.textContent = total;

}


// REMOVE ITEM

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// PLACE ORDER

function placeOrder() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    let total = 0;

    let items = [];


    cart.forEach(function(item) {

        total += item.price;

        items.push(item.name);

    });


    const order = {

        items: items,

        total: total,

        date: new Date().toLocaleString(),

        status: "Order Confirmed"

    };


    orders.push(order);


    // CLEAR CART

    cart = [];

    updateCart();

    displayOrders();


    alert("Your order has been placed successfully!");


    showSection("orders");

}


// DISPLAY ORDERS

function displayOrders() {

    const orderList = document.getElementById("orderList");


    if (orders.length === 0) {

        orderList.innerHTML = `
            <p class="empty">
                No orders placed yet.
            </p>
        `;

        return;
    }


    orderList.innerHTML = "";


    orders.forEach(function(order, index) {

        const div = document.createElement("div");

        div.className = "order-card";


        div.innerHTML = `

            <h3>
                Order #${index + 1}
            </h3>

            <p>
                <strong>Items:</strong>
                ${order.items.join(", ")}
            </p>

            <p>
                <strong>Total:</strong>
                ₹${order.total}
            </p>

            <p>
                <strong>Date:</strong>
                ${order.date}
            </p>

            <span class="status">
                ${order.status}
            </span>

        `;


        orderList.appendChild(div);

    });

}


// INITIAL CART UPDATE

updateCart();

displayOrders();