let productContainerEl = document.getElementById("productContainer");

let menTabEl = document.getElementById("menTab");
let womenTabEl = document.getElementById("womenTab");
let kidsTabEl = document.getElementById("kidsTab");

function createAndAppendProductCard(product) {
    // console.log(product);
    let {id, image, title, vendor, price, compare_at_price, badge_text, second_image } = product;

    let productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.id = id;
    productContainerEl.appendChild(productCard);

    let imageEl = document.createElement("img");
    imageEl.classList.add("product-image");
    imageEl.src = image;
    imageEl.alt = second_image;
    productCard.append(imageEl);

    if (badge_text !== null) {
        let badgeTextEl = document.createElement("span");
        badgeTextEl.classList.add("badge-text", "shadow");
        badgeTextEl.textContent = badge_text;
        productCard.appendChild(badgeTextEl);
    }

    let headersEl = document.createElement("div");
    headersEl.classList.add("headers-container");
    productCard.appendChild(headersEl);

    let titleEl = document.createElement("h1");
    titleEl.classList.add("product-title");
    titleEl.textContent = title;
    headersEl.appendChild(titleEl);

    let vendorEl = document.createElement("li");
    vendorEl.classList.add("product-vendor"); 
    vendorEl.textContent = vendor;
    headersEl.appendChild(vendorEl);

    let priceDetailsContainerEl = document.createElement("div");
    priceDetailsContainerEl.classList.add("price-details-container");
    productCard.appendChild(priceDetailsContainerEl);

    let priceEl = document.createElement("p");
    priceEl.classList.add("product-price");
    priceEl.textContent = "Rs " + price + ".00";
    priceDetailsContainerEl.appendChild(priceEl);

    let compareAtPriceEl = document.createElement("p");
    compareAtPriceEl.classList.add("product-compared-price");
    compareAtPriceEl.textContent = compare_at_price + ".00";
    priceDetailsContainerEl.appendChild(compareAtPriceEl);

    let discountEl = document.createElement("p");
    discountEl.classList.add("product-discount");
    let discount = ((compare_at_price - price) / (compare_at_price)) * 100;
    discountEl.textContent = discount.toFixed(2) + "% Off";
    priceDetailsContainerEl.appendChild(discountEl);

    let buttonEl = document.createElement("button");
    buttonEl.classList.add("add-to-cart-button");
    buttonEl.textContent = "Add to Cart";
    productCard.appendChild(buttonEl);

    return productCard
}

function displayProducts(categoryName, categories) {
    productContainerEl.innerHTML = "";
    
    const category = categories.find(category => category.category_name === categoryName);
    // console.log(category);
    if (category) {
        category.category_products.forEach(product => {
            const productCard = createAndAppendProductCard(product);
            productContainerEl.appendChild(productCard);
        });
        if (categoryName === "Men") {
            menTabEl.style.backgroundColor = "#000000";
            menTabEl.style.color = "#ffffff";

            womenTabEl.style.backgroundColor = "#e0e0e0";
            womenTabEl.style.color = "#000000";

            kidsTabEl.style.backgroundColor = "#e0e0e0";
            kidsTabEl.style.color = "#000000";
        }
        else if (categoryName === "Women") {
            menTabEl.style.backgroundColor = "#e0e0e0";
            menTabEl.style.color = "#000000";

            womenTabEl.style.backgroundColor = "#000000";
            womenTabEl.style.color = "#ffffff";

            kidsTabEl.style.backgroundColor = "#e0e0e0";
            kidsTabEl.style.color = "#000000";
        }
        else if (categoryName === "Kids") {
            menTabEl.style.backgroundColor = "#e0e0e0";
            menTabEl.style.color = "#000000";

            womenTabEl.style.backgroundColor = "#e0e0e0";
            womenTabEl.style.color = "#000000";

            kidsTabEl.style.backgroundColor = "#000000";
            kidsTabEl.style.color = "#ffffff";
        }
    }
}

function showCategory(categoryName) {
    // console.log(categoryName);
    let productDataAPI = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
    let options = {
        method: "GET"
    };
    fetch(productDataAPI, options)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        // console.log(jsonData);
        let { categories } = jsonData;
        displayProducts(categoryName, categories);
    });
}

// By default shown women category products
showCategory('Women');
