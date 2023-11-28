var email = document.getElementById("email");
const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const res = reg.test(email.value);

if(res===false){

    email.focus();
}