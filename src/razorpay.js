let productAmt = itemsDetils();
let UserEmail = userEmail();

if (
  sessionStorage.getItem("LogginUserId") === null &&
  sessionStorage.getItem("MeShopToken") === null
) {
  window.location.href = "../index.html";
}

function itemsDetils() {
  let cartProduct = JSON.parse(sessionStorage.getItem("cart"));

  let totalAmount = 0;

  for (let data of cartProduct) {
    totalAmount += parseFloat(data.price);
  }
  totalCost = totalAmount.toFixed(2) * 100;

  return totalCost.toFixed(2);
}

function userEmail() {
  let userId = JSON.parse(sessionStorage.getItem("LogginUserId"));
  return userId;
}

let key = "rzp_test_PV1oQ0oMtgXOsq";

var options = {
  key: key, // Enter the Key ID generated from the Dashboard
  amount: productAmt,
  currency: "INR", // in USD only card payment is options
  description: "MeShop",
  image: "../icon/favicon.ico",
  prefill: {
    email: UserEmail,
    contact: +919900000000,
  },
  config: {
    display: {
      blocks: {
        utib: {
          //name for Axis block
          name: "Pay using Axis Bank",
          instruments: [
            {
              method: "card",
              issuers: ["UTIB"],
            },
            {
              method: "netbanking",
              banks: ["UTIB"],
            },
          ],
        },
        other: {
          //  name for other block
          name: "Other Payment modes",
          instruments: [
            {
              method: "card",
              issuers: ["ICIC"],
            },
            {
              method: "netbanking",
            },
          ],
        },
      },
      hide: [
        {
          method: "upi",
        },
      ],
      sequence: ["block.utib", "block.other"],
      preferences: {
        show_default_blocks: false, // Should Checkout show its default blocks?
      },
    },
  },
  handler: function (response) {
    // alert(response.razorpay_payment_id);
    alert(
      "The items were purchased. \nYour Payment ID " +
        response.razorpay_payment_id
    );
    sessionStorage.removeItem("cart");
    window.location.href = "./shop.html";
  },
  modal: {
    ondismiss: function () {
      if (confirm("Are you sure, you want to close the form?")) {
        txt = "You pressed OK!";
        console.log("Checkout form closed by the user");
      } else {
        txt = "You pressed Cancel!";
        console.log("Complete the Payment");
      }
    },
  },
};

const pay = document.getElementById("pay");

var rzpay = new Razorpay(options);
pay.onclick = function (e) {
  rzpay.open();
  e.preventDefault();
};
