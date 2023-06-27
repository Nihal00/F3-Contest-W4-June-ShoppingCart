//DOM Element
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const loginBtn = document.querySelector(".login-btn");
const myCart = document.getElementById("my-cart");
const profile = document.getElementById("profile");
const homePage = document.getElementById("home");

if (
  sessionStorage.getItem("LogginUserId") &&
  sessionStorage.getItem("MeShopToken")
) {
  myCart.setAttribute("href", "../src/cart.html");
  profile.setAttribute("href", "../src/profile.html");
  homePage.setAttribute("href", "../src/shop.html");
}

function uniqueNum() {
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let unique = "";

  for (let i = 0; i < 16; i++) {
    let randomNum = Math.floor(Math.random() * str.length);
    unique += str[randomNum];
  }

  return unique;
}

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let emailValue = email.value.trim();

  let userData = JSON.parse(localStorage.getItem("userData"));

  const userExist = userData.find((data) => data.emailId === emailValue)
    ? true
    : false;

  if (userExist) {
    let LogginUserEmail = JSON.stringify(emailValue);
    sessionStorage.setItem("LogginUserId", LogginUserEmail);
    sessionStorage.setItem("MeShopToken", uniqueNum());
    setTimeout(() => {
      window.location.href = "../src/shop.html";
    }, 1000);
  } else {
    alert("User not existing kindly signup");
  }
});
