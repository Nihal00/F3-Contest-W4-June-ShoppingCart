const reloder = window.location;
const cartInnerContainer = document.querySelector(".cart-inner-container");
const bills = document.querySelector(".bills");
const total = document.querySelector(".total");
const billingSection = document.querySelector(".billing-section");
const cartEmpty = document.querySelector('.cart-empty');
const checkout = document.getElementById('checkout');


async function getCartDetails() {
  try {
    const cartData = JSON.parse(sessionStorage.getItem("cart"));
    return cartData;
  } catch (err) {
    console.log(err);
  }
}

async function updateCart(cart){
  sessionStorage.setItem('cart',JSON.stringify(cart));
}



async function displayPrice(cartProduct) {
  bills.innerHTML = "";

  cartProduct.forEach((product) => {
    bills.innerHTML += `
        <div class="billing">
            <span class="qty">1.</span>
            <span class="bill-title">${product.title}</span>
            <span class="amount">$${product.price}</span>
        </div>
        `;
  });
}

async function displayTotal(cartProduct) {
  let totalAmount = 0;

  for (let data of cartProduct) {
    totalAmount += parseFloat(data.price);
  }

  total.innerHTML = "";

  total.innerHTML = `
        <span class="bold">Total</span><span>$${totalAmount.toFixed(2)}</span>
    `;
}

async function displayCart(cartProduct) {
  cartInnerContainer.innerHTML = "";

  cartProduct.forEach((product) => {
    cartInnerContainer.innerHTML += 
    `
        <div class="item-container" >
            <div class="inner-item-container">
            <div class="img-container">
                <img class="item-img" src="${product.image}" alt="${product.description}" />
            </div>
            <div class="item-details">
                <div class="item-title">
                <h3 class="title">
                    Title:
                    <h3>
                    <p class="fullTitle">${product.title}</p>
                </div>
                <div class="price-size">
                <p class="item-price">Price : $${product.price}
                </div>

            </div>
            </div>
            <button class="remove-from-cart" type="submit" id="${product.id}">Remove From Cart</button>
        </div>
    `;

    let removeProduct = document.querySelectorAll('.remove-from-cart');

    for (let i=0;i<removeProduct.length;++i){
        removeProduct[i].addEventListener('click', async(e) => {
            let div = e.target;
            let id = div.getAttribute('id');
            console.log(id);
            let cartItems = await getCartDetails();
            cartItems = cartItems.filter(cart => cart.id !== parseInt(id));
            await updateCart(cartItems);
            let cartData = await getCartDetails();
            await displayTotal(cartData);
            reloder.reload();
        })
    }   
  });
}




//-----------------Razor Pay ------------------------------

const razorPay = document.getElementById('checkout');
var options = {
  "key": "", // Enter the Key ID generated from the Dashboard
  "amount": "1000",
  "currency": "INR",
  "description": "Acme Corp",
  "image": "https://s3.amazonaws.com/rzp-mobile/images/rzp.jpg",
  "prefill":
  {
    "email": "gaurav.kumar@example.com",
    "contact": +919900000000,
  },
  config: {
    display: {
      blocks: {
        utib: { //name for Axis block
          name: "Pay using Axis Bank",
          instruments: [
            {
              method: "card",
              issuers: ["UTIB"]
            },
            {
              method: "netbanking",
              banks: ["UTIB"]
            },
          ]
        },
        other: { //  name for other block
          name: "Other Payment modes",
          instruments: [
            {
              method: "card",
              issuers: ["ICIC"]
            },
            {
              method: 'netbanking',
            }
          ]
        }
      },
      hide: [
        {
        method: "upi"
        }
      ],
      sequence: ["block.utib", "block.other"],
      preferences: {
        show_default_blocks: false // Should Checkout show its default blocks?
      }
    }
  },
  "handler": function (response) {
    alert(response.razorpay_payment_id);
  },
  "modal": {
    "ondismiss": function () {
      if (confirm("Are you sure, you want to close the form?")) {
        txt = "You pressed OK!";
        console.log("Checkout form closed by the user");
      } else {
        txt = "You pressed Cancel!";
        console.log("Complete the Payment")
      }
    }
  }
};

var rzp1 = new Razorpay(options);

razorPay.addEventListener('click', (e) => {
  rzp1.open();
    e.preventDefault();

  sessionStorage.removeItem('cart');
  reloder.reload();
  

})


window.addEventListener("load", async () => {
  cartProduct = await getCartDetails() || [];
  console.log(cartProduct);

  if(cartProduct.length === 0){
    billingSection.classList.add('hidden');
    cartEmpty.removeAttribute('hidden');
  } else {
    cartEmpty.classList.add('hidden');
    billingSection.removeAttribute('hidden');
  }
  await displayCart(cartProduct);
  await displayPrice(cartProduct);
  await displayTotal(cartProduct);
});
