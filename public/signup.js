// DOM element
const fName = document.getElementById("fname");
const lName = document.getElementById("lname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cnfPassword = document.getElementById("cnfpassword");
const signupBtn = document.getElementById("signup-btn");



//save user data to local storage
async function findEmail(userData, emailValue) {
  try {
    let emailFinder = userData.find((user) => user.emailId === emailValue);
    return emailFinder;
  } catch (err) {
    console.log(err);
  }
}
//Redirect to login page
async function goToLoginPage() {
  setTimeout(() => {
    window.location.href = "./login.html";
  }, 1000);
}

async function saveUserData(fNameValue, lNameValue, emailValue, passwordValue) {
  let userData = JSON.parse(localStorage.getItem("userData")) || [];
  console.log(userData);
  const existEmailId = await findEmail(userData, emailValue);

  if (existEmailId) {
    alert("User existing");
    return;
  }
  let userDataObj = {
    firstName: fNameValue,
    lastName: lNameValue,
    emailId: emailValue,
    password: passwordValue,
  };

  userData.push(userDataObj);
  let data = JSON.stringify(userData);
  localStorage.setItem("userData", data);

  await goToLoginPage();
}

signupBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  let fNameValue = fName.value.trim();
  let lNameValue = lName.value.trim();
  let emailValue = email.value.trim();
  let passwordValue = password.value;
  let cnfPasswordValue = cnfPassword.value;

  if (
    fNameValue === "" ||
    lNameValue === "" ||
    emailValue === "" ||
    passwordValue === "" ||
    cnfPasswordValue === ""
  ) {
    alert("all field are required");
    return;
  } else {
    if (passwordValue !== cnfPasswordValue) {
      alert("password not matching");
      return;
    }
    await saveUserData(fNameValue, lNameValue, emailValue, passwordValue);
  }
});
