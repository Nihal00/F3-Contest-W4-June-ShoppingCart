//DOM Element
const fName = document.querySelector('.fname');
const lName = document.querySelector('.lname');
const saveInfo = document.querySelector('.save-info');




let userData = JSON.parse(localStorage.getItem("userData"));
let loggedEmailId = JSON.parse(sessionStorage.getItem("LogginUserId"));

let userDetails = userData.find(data => data.emailId === loggedEmailId);

console.log(userDetails)

saveInfo.addEventListener('click', (e) => {
    e.preventDefault();

    if(fName.value.trim() !== ""){
        userDetails.firstName = fName.value.trim();  
    }

    if(lName.value.trim() !== ""){
        userDetails.lastName = lName.value.trim();
    }
    
    fName.value = '';
    lName.value = '';

    let newlocalStoreage = userData.filter(data => data.loggedEmailId !== loggedEmailId);
    newlocalStoreage.push(userDetails);
    let newLocalData = JSON.stringify(newlocalStoreage);
    localStorage.setItem("userData", newLocalData);
})


const oldPassword = document.getElementById('old-password');
const newPassword = document.getElementById('new-password');
const cnfPassword = document.getElementById('cnf-password');
const changePassword = document.querySelector('.change-password');
const logout = document.querySelector('.logout');


changePassword.addEventListener('click', (e) => {
    e.preventDefault();

    if(userDetails.password !== oldPassword.value){
        alert("Old password is incorrect");
        return;
    }

    if(newPassword.value !== cnfPassword.value){
        alert('Password not matching');
        return;
    }

    userDetails.password = newPassword.value;
    oldPassword.value = '';
    newPassword.value = '' ;
    cnfPassword.value ='';

    let newlocalStoreage = userData.filter(data => data.loggedEmailId !== loggedEmailId);
    newlocalStoreage.push(userDetails);
    let newLocalData = JSON.stringify(newlocalStoreage);
    localStorage.setItem("userData", newLocalData);


    setTimeout(() => {
        window.location.href='./shop.html';
    }, 1000);
   
})