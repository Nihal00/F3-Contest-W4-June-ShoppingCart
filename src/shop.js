//DOM element
const searchBar = document.getElementById("search-bar");
const productDisplay = document.getElementById("display-product");
const itemSelector = document.querySelector(".search-selector");
const itemSelectorList = document.querySelectorAll(
  ".search-selector .item-selector"
);
const ratingBar = document.getElementById('range');

let productData = [];
let cartProductData = [];

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
    let itemContainer = document.createElement("div");
    let innerItemContainer = document.createElement("div");
    let imgContainer = document.createElement("div");
    let itemDetails = document.createElement("div");
    let priceSize = document.createElement("div");
    let price = document.createElement("p");
    let size = document.createElement("p");
    let itemsColors = document.createElement("div");
    let colorCircle = document.createElement("span");
    let itemsRating = document.createElement("div");
    let star = document.createElement("span");
    let img = document.createElement("img");
    let btn = document.createElement("button");

    itemContainer.className = "item-container";
    innerItemContainer.className = "inner-item-container";
    imgContainer.className = "img-container";
    img.className = "item-img";
    img.src = product.image;
    itemDetails.className = "item-details";
    priceSize.className = "price-size";
    price.className = "item-price";
    size.className = "item-size";
    price.innerText = `$${product.price}`;
    size.innerText = product.sizes;
    itemsColors.className="items-colors";
    itemsColors.innerText = "Color :";
    colorCircle.className = 'circle';

    // circle color
    for(let i = 0; i < product.colors.length; i++){
      let colorType = document.createElement("span");
      colorType.className = "material-icons-outlined";
      colorType.innerText = "lens";
      colorType.style.color = product.colors[i];
      colorCircle.appendChild(colorType);
    }
    itemsRating.className = 'items-rating';
    itemsRating.innerText = 'Rating :';
    star.className = "star";
    
    //star coloring
    for(let i = 0; i < Math.round(product.rating.rate); i++){
      let ratingStar = document.createElement("span");
      ratingStar.className = "material-icons-outlined";
      ratingStar.innerText = "star";
      star.appendChild(ratingStar);
    }

    btn.className = 'add-to-cart';
    btn.type = 'submit';
    btn.innerText = 'Add to Cart';
    
    itemsColors.appendChild(colorCircle);
    itemsRating.appendChild(star);
    priceSize.appendChild(price);
    priceSize.appendChild(size);
    itemDetails.appendChild(priceSize);
    itemDetails.appendChild(itemsColors);
    itemDetails.appendChild(itemsRating);
    imgContainer.appendChild(img);
    innerItemContainer.appendChild(imgContainer);

    innerItemContainer.appendChild(itemDetails);
    itemContainer.appendChild(innerItemContainer);
    itemContainer.appendChild(btn);

    productDisplay.append(itemContainer)

    btn.addEventListener('click', async(e) => {
      console.log(product);
      await setCart(product)
    })
  });
}

async function setCart(product){
  let sessionStore = JSON.parse(sessionStorage.getItem("cart")) || [];
  sessionStore.push(product);
  let json = JSON.stringify(sessionStore);
  sessionStorage.setItem("cart", json);
}

function colorFill() {
  let colorsfilled = randomColor();
  console.log(colorsfilled);
  //  return `<span style='background:${colorsfilled[0]}'>${colorsfilled[1]}</
  for (let i = 0; i < colorsfilled.length; i++) {
    span.append(
      `<span class="material-symbols-outlined" style="backgorundColor: ${colorsfilled[i]}">grade</span>`
    );
  }
}

async function displaySortedProduct(list) {
  productDisplay.innerHTML = "";
  list.forEach((product) => {
    let itemContainer = document.createElement("div");
    let innerItemContainer = document.createElement("div");
    let imgContainer = document.createElement("div");
    let itemDetails = document.createElement("div");
    let priceSize = document.createElement("div");
    let price = document.createElement("p");
    let size = document.createElement("p");
    let itemsColors = document.createElement("div");
    let colorCircle = document.createElement("span");
    let itemsRating = document.createElement("div");
    let star = document.createElement("span");
    let img = document.createElement("img");
    let btn = document.createElement("button");

    itemContainer.className = "item-container";
    innerItemContainer.className = "inner-item-container";
    imgContainer.className = "img-container";
    img.className = "item-img";
    img.src = product.image;
    itemDetails.className = "item-details";
    priceSize.className = "price-size";
    price.className = "item-price";
    size.className = "item-size";
    price.innerText = `$${product.price}`;
    size.innerText = product.sizes;
    itemsColors.className="items-colors";
    itemsColors.innerText = "Color :";
    colorCircle.className = 'circle';

    // circle color
    for(let i = 0; i < product.colors.length; i++){
      let colorType = document.createElement("span");
      colorType.className = "material-icons-outlined";
      colorType.innerText = "lens";
      colorType.style.color = product.colors[i];
      colorCircle.appendChild(colorType);
    }
    itemsRating.className = 'items-rating';
    itemsRating.innerText = 'Rating :';
    star.className = "star";
    
    //star coloring
    for(let i = 0; i < Math.round(product.rating.rate); i++){
      let ratingStar = document.createElement("span");
      ratingStar.className = "material-icons-outlined";
      ratingStar.innerText = "star";
      star.appendChild(ratingStar);
    }

    btn.className = 'add-to-cart';
    btn.type = 'submit';
    btn.innerText = 'Add to Cart';
    
    itemsColors.appendChild(colorCircle);
    itemsRating.appendChild(star);
    priceSize.appendChild(price);
    priceSize.appendChild(size);
    itemDetails.appendChild(priceSize);
    itemDetails.appendChild(itemsColors);
    itemDetails.appendChild(itemsRating);
    imgContainer.appendChild(img);
    innerItemContainer.appendChild(imgContainer);

    innerItemContainer.appendChild(itemDetails);
    itemContainer.appendChild(innerItemContainer);
    itemContainer.appendChild(btn);

    productDisplay.append(itemContainer)
   
    btn.addEventListener('click', async(e) => {
      console.log(product);
      await setCart(product)
    })
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


function searchInput(inputs){
  const filterArr = [];
  for (const data of productData) {
    let lowerCase = data.title.toLowerCase();
    if (lowerCase.includes(inputs.toLowerCase())) {
      filterArr.push(data);
    }
  }
  return filterArr;
}

function ratingInput(rate){
  const ratingArr = [];
  for (const data of productData) {
    let num = Math.round(data.rating.rate)
    if(num === parseInt(rate)){
      ratingArr.push(data);
    }
  }
  return ratingArr;
}


searchBar.addEventListener('input', async (e) => {
    let searchResult = searchInput(e.target.value);
    await displaySortedProduct(searchResult);
})

itemSelectorList.forEach((selector) => {
  selector.addEventListener("click", async (e) => {
    itemSelector.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    // console.log(e.target.value);
    if (e.target.value === "all") {
      await displayProducts();
    } else {
      let selectedListItems = await sortedProduct(e.target.value);
      await displaySortedProduct(selectedListItems);
    }
  });
});


ratingBar.addEventListener('change', async(e) => {
  let rate = ratingInput(e.target.value);
  await displaySortedProduct(rate);
})

const redValue = document.getElementById('red');

redValue.addEventListener('change', (e) => {
  // console.log(redValue.checked);
})

window.addEventListener("load", async () => {
  productData = await getProductDetails();
  await addOnToData();
  await displayProducts();
  console.log(productData);
});
