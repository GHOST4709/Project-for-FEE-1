//Login and Signup forms flip
function toggleAuth() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    // Clear error messages
    document.getElementById('login-error').innerText = '';
    document.getElementById('signup-error').innerText = '';
    
    loginForm.classList.toggle('active');
    signupForm.classList.toggle('active');
}

// Creating new_Account
function handleSignup(event) {
    
    event.preventDefault(); // Prevent page refresh
    
    const email = document.getElementById('signup-email').value.trim();
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const errorDiv = document.getElementById('signup-error');
    
    // Retrieve existing users from local storage / create an empty object 
    let users = JSON.parse(localStorage.getItem('arcadeUsers')) || {};
    
    // Check if the username already exists
    if (users[username]) {
        errorDiv.innerText = "Username is already taken!";
        return;
    }
    
    // Save the new user details
    users[username] = {
        email: email,
        password: password
    };
    
    // Store updated data back to local storage
    localStorage.setItem('arcadeUsers', JSON.stringify(users));
    
    // Set current active user and redirect to Home Page
    localStorage.setItem('currentUser', username);
    window.location.href = '../DashBoard/dashboard.html'; 
}

// Logging Into existing_Account
function handleLogin(event) {
    event.preventDefault(); // Prevent_refresh

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const errorDiv = document.getElementById('login-error');

    // Retrieve existing users / passing an empty object
    let users = JSON.parse(localStorage.getItem('arcadeUsers')) || {};

    // Validate credentials
    if (!users[username]) {
        errorDiv.innerText = "Account not found. Please sign up!";
    } else if (users[username].password !== password) {
        errorDiv.innerText = "Incorrect password. Try again.";
    } else {
        localStorage.setItem('currentUser', username);
        window.location.href = '../DashBoard/dashboard.html';
    }
}

// Optional(Delete if Want to👍 (Not Really!!))
window.onload = function() {
    if (localStorage.getItem('currentUser')) {
        window.location.href = '../DashBoard/dashboard.html'; 
    }
}
