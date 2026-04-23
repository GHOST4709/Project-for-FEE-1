// Function to flip between Login and Signup forms
function toggleAuth() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    // Clear error messages when toggling
    document.getElementById('login-error').innerText = '';
    document.getElementById('signup-error').innerText = '';

    loginForm.classList.toggle('active');
    signupForm.classList.toggle('active');
}

// Handle Creating a New Account
function handleSignup(event) {
    event.preventDefault(); // Prevent page refresh

    const email = document.getElementById('signup-email').value.trim();
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const errorDiv = document.getElementById('signup-error');

    // Retrieve existing users from local storage, or create an empty object if none exist
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

// Handle Logging In to an Existing Account
function handleLogin(event) {
    event.preventDefault(); // Prevent page refresh

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const errorDiv = document.getElementById('login-error');

    // Retrieve existing users
    let users = JSON.parse(localStorage.getItem('arcadeUsers')) || {};

    // Validate credentials
    if (!users[username]) {
        errorDiv.innerText = "Account not found. Please sign up!";
    } else if (users[username].password !== password) {
        errorDiv.innerText = "Incorrect password. Try again.";
    } else {
        // Success! Set current user and redirect
        localStorage.setItem('currentUser', username);
        window.location.href = '../DashBoard/dashboard.html';
    }
}

// Optional: Auto-redirect if already logged in
window.onload = function() {
    if (localStorage.getItem('currentUser')) {
        // Uncomment the line below if you want them to skip login if they are already logged in
        window.location.href = '../DashBoard/dashboard.html'; 
    }
}