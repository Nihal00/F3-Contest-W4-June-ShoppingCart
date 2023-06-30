//DOM element
const searchBar = document.getElementById("search-bar");
const productDisplay = document.getElementById("display-product");
const itemSelector = document.querySelector(".search-selector");
const itemSelectorList = document.querySelectorAll(
  ".search-selector .item-selector"
);
const ratingBar = document.getElementById("range");
const reloder = window.location;

//-----------Color Filter------------
const redValue = document.getElementById("red");
const blueValue = document.getElementById("blue");
const greenValue = document.getElementById("green");
const blackValue = document.getElementById("black");
const whiteValue = document.getElementById("white");

//-----------Size Filter------------
const sValue = document.getElementById('s');
const mValue = document.getElementById('m');
const lValue = document.getElementById('l');
const xlValue = document.getElementById('xl');

//-----------Price Filter------------
const rangeOne = document.getElementById('0To25');
const rangeTwo = document.getElementById('25To50');
const rangeThree = document.getElementById('50To100');
const rangeFour = document.getElementById('100on');

let productData = [];
let cartProductData = [];


// ---------------------Get Data from API----------------------
async function getProductDetails() {
  try {
    const respone = await fetch("https://fakestoreapi.com/products");
    let data = await respone.json();
    return data;
  } catch (err) {
    console.log("Error: ", err);
  }
}

//--------------------Display product to the User--------------------
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
    itemsColors.className = "items-colors";
    itemsColors.innerText = "Color :";
    colorCircle.className = "circle";

    // circle color
    for (let i = 0; i < product.colors.length; i++) {
      let colorType = document.createElement("span");
      colorType.className = "material-icons-outlined";
      colorType.innerText = "lens";
      colorType.style.color = product.colors[i];
      colorCircle.appendChild(colorType);
    }
    itemsRating.className = "items-rating";
    itemsRating.innerText = "Rating :";
    star.className = "star";

    //star coloring
    for (let i = 0; i < Math.round(product.rating.rate); i++) {
      let ratingStar = document.createElement("span");
      ratingStar.className = "material-icons-outlined";
      ratingStar.innerText = "star";
      star.appendChild(ratingStar);
    }

    btn.className = "add-to-cart";
    btn.type = "submit";
    btn.innerText = "Add to Cart";

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

    productDisplay.append(itemContainer);

    btn.addEventListener("click", async (e) => {
      console.log(product);
      await setCart(product);
    });
  });
}

// -------------------Once product is fetched store in sessionStorage ---------------------
async function setCart(product) {
  let sessionStore = JSON.parse(sessionStorage.getItem("cart")) || [];
  sessionStore.push(product);
  let json = JSON.stringify(sessionStore);
  sessionStorage.setItem("cart", json);
}

// ---------------------Function to display Star in the UI----------------------
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

//-----------------------Display Sorted Product list-------------------------
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
    itemsColors.className = "items-colors";
    itemsColors.innerText = "Color :";
    colorCircle.className = "circle";

    // circle color
    for (let i = 0; i < product.colors.length; i++) {
      let colorType = document.createElement("span");
      colorType.className = "material-icons-outlined";
      colorType.innerText = "lens";
      colorType.style.color = product.colors[i];
      colorCircle.appendChild(colorType);
    }
    itemsRating.className = "items-rating";
    itemsRating.innerText = "Rating :";
    star.className = "star";

    //star coloring
    for (let i = 0; i < Math.round(product.rating.rate); i++) {
      let ratingStar = document.createElement("span");
      ratingStar.className = "material-icons-outlined";
      ratingStar.innerText = "star";
      star.appendChild(ratingStar);
    }

    btn.className = "add-to-cart";
    btn.type = "submit";
    btn.innerText = "Add to Cart";

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

    productDisplay.append(itemContainer);

    btn.addEventListener("click", async (e) => {
      console.log(product);
      await setCart(product);
    });
  });
}

// --------------------------FilterList the product based on Catogary--------------
async function filterList(typeOfProduct) {
  const itemsList = [];
  for (const data of productData) {
    if (data.category.includes(typeOfProduct)) {
      itemsList.push(data);
    }
  }
  return itemsList;
}

// ------------------------Random Color Generator-----------------------------
function randomColor() {
  let color = ["red", "blue", "green", "black", "white"];
  let colorOpt = [];
  let index = Math.floor(Math.random() * color.length);
  for (let i = index; i < color.length; i++) {
    colorOpt.push(color[i]);
  }
  return colorOpt;
}

//-------------------------Random Size Generator---------------------------
function randomSize() {
  let size = ["S", "M", "L", "XL"];
  let sizeOpt = [];
  let index = Math.floor(Math.random() * size.length);
  for (let i = index; i < size.length; i++) {
    sizeOpt.push(size[i]);
  }
  return sizeOpt;
}

//-------------------------Adding Random Color and size to product list----------
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

//--------------------------Sorted the product based on Catogary--------------
async function sortedProduct(typeOfProduct) {
  try {
    let sortedProductList = await filterList(typeOfProduct);
    return sortedProductList;
  } catch (err) {
    console.log("Error: ", err);
  }
}

//--------------------------Sort the product on search-----------------------
function searchInput(inputs) {
  const filterArr = [];
  for (const data of productData) {
    let lowerCase = data.title.toLowerCase();
    if (lowerCase.includes(inputs.toLowerCase())) {
      filterArr.push(data);
    }
  }
  return filterArr;
}

//--------------------------Display Rating in UI-----------------------------
function ratingInput(rate) {
  const ratingArr = [];
  for (const data of productData) {
    let num = Math.round(data.rating.rate);
    if (num === parseInt(rate)) {
      ratingArr.push(data);
    }
  }
  return ratingArr;
}

//---------------------Store product in session storage for easyyy-----------
async function setProductAtFirst() {
  let pro = JSON.stringify(productData);
  sessionStorage.setItem("productData", pro);
}

//--------------------Get product from session storage for usessss---------
async function getSessionProduct() {
  let cartProduct = JSON.parse(sessionStorage.getItem("productData"));
  return cartProduct;
}

//----------------------Sort the Items on Color-----------------------
// function sortColorVise(colorvise) {
//   for (const data of productData) {
//     if (data.colors.includes(colorvise)) {
//       colorSortedProduct.push(data);
//     }
//   }
// }


// function filterColorVise(){
//   let set = new Set();
//   colorSortedProduct.forEach((color) => {
//     set.add(color);
//   });
//   let unquieColor = Array.from(set);
//   colorSortedProduct = unquieColor;
//   return unquieColor;
// }








//-----------------------Display in UI as per search result-------------------------
searchBar.addEventListener("input", async (e) => {
  let searchResult = searchInput(e.target.value);
  await displaySortedProduct(searchResult);
});


//----------------------Display in UI as per catogory result-----------------------
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




//----------------------------Sort as per rating in UI----------------------------
ratingBar.addEventListener("change", async (e) => {
  let rate = ratingInput(e.target.value);
  await displaySortedProduct(rate);
});



//----------------------------Filter by Color range in UI----------------------------
let colorFilter = [];
let isColorFlag = new Array(5).fill(true);

function colorFinder(value, index){
  if(isColorFlag[index]){
    colorFilter.push(value);
    isColorFlag[index] = false;
  }else {
    let tempFilter = colorFilter.filter(ele => ele !== value);
    colorFilter = tempFilter;
    isColorFlag[index] = true;
  }
  console.log(colorFilter);
}

redValue.addEventListener("change", (e) => {
    let value = e.target.value;
    colorFinder(value, 0);
});

blueValue.addEventListener("change", (e) => {
    let value = e.target.value;
    colorFinder(value, 1);
});

greenValue.addEventListener("change", (e) => {
    let value = e.target.value;
    colorFinder(value, 2);
});

blackValue.addEventListener("change", (e) => {
    let value = e.target.value;
    colorFinder(value, 3);
});

whiteValue.addEventListener("change", (e) => {
    let value = e.target.value;
    colorFinder(value, 4);
});

//---------------------------Filter by Size range in UI----------------------------------


let sizeFilter = [];
let isSizeFlag = new Array(4).fill(true);

function sizeFinder(value, index){
  if(isSizeFlag[index]){
    sizeFilter.push(value);
    isSizeFlag[index] = false;
  }else {
    let tempFilter = sizeFilter.filter(ele => ele != value);
    sizeFilter = tempFilter;
    isSizeFlag[index] = true;
  }
  console.log(sizeFilter); 
}

sValue.addEventListener("change", (e) => {
    let value = e.target.value;
    sizeFinder(value, 0);
});

mValue.addEventListener("change", (e) => {
    let value = e.target.value;
    sizeFinder(value, 1);
});

lValue.addEventListener("change", (e) => {
    let value = e.target.value;
    sizeFinder(value, 2);
});

xlValue.addEventListener("change", (e) => {
    let value = e.target.value;
    sizeFinder(value, 3);
});


//---------------------------Filter by Price range in UI----------------------------------


let priceFilter = [];
let isPriceFlag = new Array(4).fill(true);

function priceFinder(value, index){
  if(isPriceFlag[index]){
    priceFilter.push(parseInt(value));
    isPriceFlag[index] = false;
  }else {
    let tempFilter = priceFilter.filter(ele => ele != parseInt(value));
    priceFilter = tempFilter;
    isPriceFlag[index] = true;
  }
  console.log(priceFilter); 
}

rangeOne.addEventListener("change", (e) => {
    let value = e.target.value;
    priceFinder(value, 0);
});

rangeTwo.addEventListener("change", (e) => {
    let value = e.target.value;
    priceFinder(value, 1);
});

rangeThree.addEventListener("change", (e) => {
    let value = e.target.value;
    priceFinder(value, 2);
});

rangeFour.addEventListener("change", (e) => {
    let value = e.target.value;
    priceFinder(value, 3);
});



//-------------------Display Base on User Choice -------------------------
const filterBtn = document.getElementById('filter');

filterBtn.addEventListener('click', async () => {

  if(colorFilter.length === 0 && sizeFilter.length === 0 && priceFilter.length === 0){
    await displayProducts();
    return;
  }


  let userSortedProduct = [];
  for(let data of productData){
    for(let i = 0; i < colorFilter.length; i++){
      if(data.colors.includes(colorFilter[i])){
        userSortedProduct.push(data);
      }
    }
  }

  for(let data of productData){
    for(let i = 0; i < sizeFilter.length; i++){
      if(data.sizes.includes(sizeFilter[i]) && data.sizes !== "Standed"){
        userSortedProduct.push(data);
      }
    }
  }

  for(let data of productData){
    for(let i = 0; i < priceFilter; i++){
      if(priceFilter[i] === 25){
        if(data.price < priceFilter[i]) {
          userSortedProduct.push(data);
        }
      }

      if(priceFilter[i] === 50){
        if(data.price >= 25 && data.price < priceFilter[i]){
          userSortedProduct.push(data);
        }
      }

      if(priceFilter[i] === 100){
        if(data.price >= 50 && data.price < priceFilter[i]){
          userSortedProduct.push(data);
        }
      }

      if(priceFilter[i] === 101){
        if(data.price >= priceFilter[i]){
          userSortedProduct.push(data);
        }
      }
    }
  }

  let set = new Set();

  for(let i = 0; i < userSortedProduct.length; i++){
    set.add(userSortedProduct[i]);
  }

  const unquie = Array.from(set);

  userSortedProduct = unquie;
  console.log(userSortedProduct);
  await displaySortedProduct(userSortedProduct);
  
})





//------------------------Display UI on Window loading---------------
async function reload(){
  if (sessionStorage.getItem("productData")) {
    productData = await getSessionProduct();
    await displayProducts();
  } else {
    productData = await getProductDetails();
    await addOnToData();
    await displayProducts();
    await setProductAtFirst();
    console.log(productData);
  }
}

window.addEventListener("load", reload);
