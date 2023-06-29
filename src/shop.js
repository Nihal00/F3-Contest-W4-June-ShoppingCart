//DOM element
const searchBar = document.querySelector(".search-bar");
const productDisplay = document.getElementById("display-product");
const itemSelector = document.querySelector(".search-selector");
const itemSelectorList = document.querySelectorAll(
  ".search-selector .item-selector"
);
let productData = [];

async function getProductDetails() {
  try {
    const respone = await fetch("https://fakestoreapi.com/products");
    let data = await respone.json();
    return data;
  } catch (err) {
    console.log("Error: ", err);
  }
}

//Display product to the User
async function displayProducts() {
  productDisplay.innerHTML = "";
  productData.forEach((product) => {
    productDisplay.innerHTML += `
        <div class="item-container">
        <div class="inner-item-container">
        <div class="img-container">
        <img
          class="item-img"
          src="${product.image}"
          alt="${product.description}"
          
        />
      </div>
          <div class="item-details">
            <div class="price-size">
              <p class="item-price">$${product.price}</p>
              <p class="item-size">${product.sizes}</p>
            </div>
            <div class="items-colors">Colors :
              <span class="circle">
                <span class="material-symbols-outlined circles"> circle </span>
                <span class="material-symbols-outlined circles"> circle </span>
                <span class="material-symbols-outlined circles"> circle </span>
              </span>
            </div>
            <div class="items-rating">Rating :
              <span class="star">
                <span class="material-symbols-outlined"> grade </span>
                <span class="material-symbols-outlined"> grade </span>
                <span class="material-symbols-outlined"> grade </span>
                <span class="material-symbols-outlined"> grade </span>
                <span class="material-symbols-outlined"> grade </span>
              </span>
            </div>
          </div>
        </div>
        <button id="add-to-cart" type="submit">Add to Cart</button>
      </div>
        `;
  });
}

function colorFill() {
  let colorsfilled = randomColor();
  console.log(colorsfilled);
  //  return `<span style='background:${colorsfilled[0]}'>${colorsfilled[1]}</
  for (let i = 0; i < colorsfilled.length; i++) {
    span.append (`<span class="material-symbols-outlined" style="backgorundColor: ${colorsfilled[i]}">grade</span>`);
  }

}

async function displaySortedProduct(list) {
  productDisplay.innerHTML = "";
  list.forEach((product) => {
    productDisplay.innerHTML += `
        <div class="item-container">
        <div class="inner-item-container">
        <div class="img-container">
        <img
          class="item-img"
          src="${product.image}"
          alt="${product.description}"
          
        />
      </div>
          <div class="item-details">
            <div class="price-size">
              <p class="item-price">$${product.price}</p>
              <p class="item-size">${product.sizes}</p>
            </div>
            <div class="items-colors">Colors :
            <span class="circle">
              <span class="material-symbols-outlined circles"> circle </span>
              <span class="material-symbols-outlined circles"> circle </span>
              <span class="material-symbols-outlined circles"> circle </span>
            </span>
            </div>
            <div class="items-rating">Rating :
            <span class="star">
              <span class="material-symbols-outlined"> grade </span>
              <span class="material-symbols-outlined"> grade </span>
              <span class="material-symbols-outlined"> grade </span>
              <span class="material-symbols-outlined"> grade </span>
              <span class="material-symbols-outlined"> grade </span>
            </span>
            </div>
            
          </div>
        </div>
        <button id="add-to-cart" type="submit">Add to Cart</button>
      </div>
        `;
  });
}

async function filterList(typeOfProduct) {
  const itemsList = [];
  for (const data of productData) {
    if (data.category.includes(typeOfProduct)) {
      itemsList.push(data);
    }
  }
  return itemsList;
}

function randomColor() {
  let color = ["red", "blue", "green", "black", "white"];
  let colorOpt = [];
  let index = Math.floor(Math.random() * color.length);
  for (let i = index; i < color.length; i++) {
    colorOpt.push(color[i]);
  }
  return colorOpt;
}

function randomSize() {
  let size = ["S", "M", "L", "XL"];
  let sizeOpt = [];
  let index = Math.floor(Math.random() * size.length);
  for (let i = index; i < size.length; i++) {
    sizeOpt.push(size[i]);
  }
  return sizeOpt;
}

async function addOnToData() {
  for (const data of productData) {
    if (!data.category.includes("electronics")) {
      data["sizes"] = randomSize();
    } else {
      data["sizes"] = "Standed";
    }
    data["colors"] = randomColor();
  }
}

async function sortedProduct(typeOfProduct) {
  try {
    let sortedProduct = await filterList(typeOfProduct);
    return sortedProduct;
  } catch (err) {
    console.log("Error: ", err);
  }
}

itemSelectorList.forEach((selector) => {
  selector.addEventListener("click", async (e) => {
    itemSelector.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    // console.log(e.target.value);
    if (e.target.value === "all") {
      let productData = await getProductDetails();
      await displayProducts(productData);
    } else {
      let selectedListItems = await sortedProduct(e.target.value);
      await displaySortedProduct(selectedListItems);
    }
  });
});

window.addEventListener("load", async () => {
  productData = await getProductDetails();
  await addOnToData();
  await displayProducts();
  console.log(productData);
});
