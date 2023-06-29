//DOM element
const searchBar = document.getElementById("search-bar");
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
  });
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

function searchInput(inputs){
  const filterArr = [];
  for (const data of productData) {
    if (data.title.includes(inputs)) {
      filterArr.push(data);
    }
  }
  return filterArr;
}



searchBar.addEventListener('input', async (e) => {
    console.log(e.target.value);
    let searchResult = searchInput(e.target.value);
    await displaySortedProduct(searchResult);
})


window.addEventListener("load", async () => {
  productData = await getProductDetails();
  await addOnToData();
  await displayProducts();
  console.log(productData);
});
