//DOM Element
const fName = document.querySelector(".fname");
const lName = document.querySelector(".lname");
const saveInfo = document.querySelector(".save-info");

const oldPassword = document.getElementById("old-password");
const newPassword = document.getElementById("new-password");
const cnfPassword = document.getElementById("cnf-password");
const changePassword = document.querySelector(".change-password");
const logout = document.querySelector(".logout");

async function LoggedInUserEmail() {
  let userEmail = JSON.parse(sessionStorage.getItem("LogginUserId"));
  return userEmail;
}

async function LoggedInUserDetails(userEmail) {
  let userDataBase = JSON.parse(localStorage.getItem("userData"));

  let userInfo = userDataBase.find((user) => user.emailId === userEmail);

  return userInfo;
}

async function addUpdatedUserDetails(userData) {
  let userDataBase = JSON.parse(localStorage.getItem("userData"));

  let updatedUserDetails = userDataBase.filter(
    (data) => data.emailId !== userData.emailId
  );

  localStorage.setItem(
    "userData",
    JSON.stringify([...updatedUserDetails, userData])
  );
}

async function goToShoppingPage() {
  setTimeout(() => {
    window.location.href = "./shop.html";
  }, 1000);
}

async function logginOut(){
  sessionStorage.clear();
  setTimeout(() => {
    window.location.href = '../index.html';
  })
}


saveInfo.addEventListener("click", async (e) => {
  e.preventDefault();

  let userEmail = await LoggedInUserEmail();
  let userData = await LoggedInUserDetails(userEmail);
  console.log(userData);

  if (fName.value.trim() !== "") {
    userData.firstName = fName.value.trim();
  }

  if (lName.value.trim() !== "") {
    userData.lastName = lName.value.trim();
  }

  fName.value = "";
  lName.value = "";

  await addUpdatedUserDetails(userData, userEmail);
});



changePassword.addEventListener("click", async (e) => {
  e.preventDefault();

  let userEmail = await LoggedInUserEmail();
  let userData = await LoggedInUserDetails(userEmail);

  if (userData.password !== oldPassword.value) {
    alert("Old password is incorrect");
    return;
  }

  if (newPassword.value !== cnfPassword.value) {
    alert("Password not matching");
    return;
  }

  userData.password = newPassword.value;
  oldPassword.value = "";
  newPassword.value = "";
  cnfPassword.value = "";

  await addUpdatedUserDetails(userData);

  await goToShoppingPage();
});

logout.addEventListener('click', async() => {
  await logginOut();
});