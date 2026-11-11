const productParams = new URLSearchParams(window.location.search);

const productName = productParams.get("name") || "Discover Your Style";
const productImage = productParams.get("image") || "assets/hero/hero-image.jpg";
const productPrice = productParams.get("price") || "Sample price";

const productDescription = productParams.get("description") ||
    "A distinctive expression of elegance and personal style.";

document.getElementById("productName").textContent = productName;
document.getElementById("productDescription").textContent = productDescription;
document.getElementById("productPrice").textContent = productPrice;

const imageElement = document.getElementById("productImage");
imageElement.src = productImage;
imageElement.alt = productName;

document.title = `${productName} | FEZ Fae'ezha`;

const orderForm = document.getElementById("orderForm");

orderForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const size = document.getElementById("productSize").value;
    const quantity = Number(document.getElementById("productQuantity").value);
    const notes = document.getElementById("orderNotes").value.trim();

    if (!size || !Number.isInteger(quantity) || quantity < 1) {
        alert("Please select a size and enter a valid quantity.");
        return;
    }

    const reference = "FEZ-" + Date.now().toString().slice(-8);

    const order = {
        reference,
        design: productName,
        image: productImage,
        price: productPrice,
        size,
        quantity,
        notes,
        date: new Date().toISOString()
    };

    try {
        const savedOrders = JSON.parse(localStorage.getItem("fezOrders") || "[]");
        savedOrders.push(order);
        localStorage.setItem("fezOrders", JSON.stringify(savedOrders));
    } catch (error) {
        console.warn("This order could not be saved locally.", error);
    }

    const confirmation = document.createElement("div");
    confirmation.className = "order-success";
    confirmation.id = "orderSuccess";
    confirmation.setAttribute("role", "dialog");
    confirmation.setAttribute("aria-modal", "true");

    confirmation.innerHTML = `
        <div class="order-success-card">
            <span class="success-mark">✓</span>
            <span class="eyebrow">FEZ FAE'EZHA</span>
            <h2>YOUR ORDER REQUEST<br><em>IS IN!</em></h2>
            <p>Thank you for choosing FEZ Fae'ezha. Your style journey starts here.</p>
            <div class="success-reference">
                <span>YOUR REFERENCE</span>
                <strong>${reference}</strong>
            </div>
            <p class="success-note">This is a sample order confirmation for the website preview.</p>
            <button type="button" class="success-button" id="continueShopping">
                CONTINUE SHOPPING <span>↗</span>
            </button>
            <small>Returning to homepage in <span id="redirectCountdown">8</span> seconds...</small>
        </div>
    `;

    document.body.appendChild(confirmation);
    document.body.classList.add("order-confirmed");

    let seconds = 8;
    const countdown = document.getElementById("redirectCountdown");

    const redirectTimer = setInterval(() => {
        seconds--;
        countdown.textContent = seconds;

        if (seconds <= 0) {
            clearInterval(redirectTimer);
            window.location.href = "index.html";
        }
    }, 1000);

    document.getElementById("continueShopping").addEventListener("click", () => {
        clearInterval(redirectTimer);
        window.location.href = "index.html";
    });
});
