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

async function getLocalStorageData() {
  try {
    let userData = JSON.parse(localStorage.getItem("userData"));
    return userData;
  } catch (err) {
    console.log(err);
  }
}

async function findEmail(userData, emailValue) {
  try {
    let emailFinder = userData.find((user) => user.emailId === emailValue);
    return emailFinder;
  } catch (err) {
    console.log(err);
  }
}

async function updateSessionStorage(emailValue) {
  let LogginUserEmail = JSON.stringify(emailValue);
  sessionStorage.setItem("LogginUserId", LogginUserEmail);
  sessionStorage.setItem("MeShopToken", uniqueNum());
}

async function goToShoppingPage(){
  setTimeout(() => {
    window.location.href="../src/shop.html";
  }, 1000)
}

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  let emailValue = email.value.trim();
  let emailPassword = password.value;

  let userData = await getLocalStorageData();

  console.log(userData);

  if (emailValue === "" || emailPassword === "") {
    alert("All field are required");
    return;
  }
  // when local storeage is empty at biggning
  if (userData === null) {
    alert("User not existing kindly signup");
    return;
  }

  const userExist = await findEmail(userData, emailValue);

  console.log(userExist);

  if (!userExist) {
    alert("User not existing kindly signup");
    return;
  }

  const userPassword = userExist["password"];

  console.log(userPassword);

  if (userExist && userPassword === emailPassword) {
    await updateSessionStorage(emailValue);
    await goToShoppingPage()
  } else {
    alert("Wrong Password Kindly check your password");
  }
});
