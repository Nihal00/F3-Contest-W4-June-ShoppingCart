// DOM element 
const fName = document.getElementById('fname');
const lName = document.getElementById('lname'); 
const email = document.getElementById('email'); 
const password = document.getElementById('password');
const cnfPassword = document.getElementById('cnfpassword');
const signupBtn = document.getElementById('signup-btn');


//save user data to local storage
function saveUserData(fNameValue, lNameValue, emailValue, passwordValue){
    let userData = JSON.parse(localStorage.getItem("userData")) || [];

    const existEmailId = userData.find((userEmail) => userEmail.emailId === emailValue) ? true : false;

    if(existEmailId){
        alert("User existing");
        return;
    }

    let userDataObj = {
        "firstName": fNameValue,
        "lastName" :lNameValue,
        "emailId"   :emailValue,
        "password"  : passwordValue
    }

    userData.push(userDataObj);
    let data = JSON.stringify(userData)
    localStorage.setItem('userData', data);

    setTimeout(() => {
        window.location.href="./login.html";
    }, 1000)
    
}

//
signupBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let fNameValue = fName.value.trim();
    let lNameValue = lName.value.trim();
    let emailValue = email.value.trim();
    let passwordValue = password.value;
    let cnfPasswordValue = cnfPassword.value;

    if(fNameValue === "" || lNameValue === "" || emailValue === "" || passwordValue === "" || cnfPasswordValue === ""){
        alert("all field are required")
    } else {
        if(passwordValue !== cnfPasswordValue) {
            alert("worng password");
            return;
        } 
        saveUserData(fNameValue, lNameValue, emailValue, passwordValue);
    }
    
})