


document.getElementById('loginForm').addEventListener('submit', function(event) {
    // event.preventDefault();
    // window.location.href = "../index.html";
    
    
    
    
    
    
    
    
    
    
    
    
    
});


// document.getElementById("myForm").addEventListener("submit", function(e) {

//     let email = document.getElementById("email").value;
//     let contact = document.getElementById("contact").value;
//     let password = document.getElementById("password").value;

//     // Email validation
//     let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(email)) {
//         alert("Enter valid email");
//         e.preventDefault();
//     }

//     // Contact validation (10 digit number)
//     let contactPattern = /^[0-9]{10}$/;
//     if (!contactPattern.test(contact)) {
//         alert("Enter valid 10-digit contact number");
//         e.preventDefault();
//     }

//     // Password validation (min 6 chars, 1 number, 1 uppercase)
//     let passwordPattern = /^(?=.[A-Z])(?=.\d).{6,}$/;
//     if (!passwordPattern.test(password)) {
//         alert("Password must be at least 6 characters long, include 1 uppercase letter and 1 number");
//         e.preventDefault();
//     }

// });


const childNode = document.getElementById("child");
// const parentNode = childNode.parentNode;
// console.log(parentNode);

const parent = document.querySelector("div");
const children = parent.childNode;
console.log(children)

