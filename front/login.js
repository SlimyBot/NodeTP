document.addEventListener("DOMContentLoaded", function () {
  const loginTitle = document.getElementById("login-title");
  const signupTitle = document.getElementById("signup-title");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  loginTitle.addEventListener("click", function () {
    loginForm.classList.add("active-form");
    signupForm.classList.remove("active-form");
    loginTitle.classList.add("active-title");
    signupTitle.classList.remove("active-title");
  });

  signupTitle.addEventListener("click", function () {
    signupForm.classList.add("active-form");
    loginForm.classList.remove("active-form");
    signupTitle.classList.add("active-title");
    loginTitle.classList.remove("active-title");
  });

  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const username = loginForm.querySelector('input[type="text"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user exists
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      // Set secure cookie with username
      document.cookie = `session=${user.username}; path=/; SameSite=Strict`;
      window.location.href = 'index.html';
    } else {
      alert('Invalid username or password');
    }
  });

  signupForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const username = signupForm.querySelector('input[type="text"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;
    const email = signupForm.querySelector('input[type="email"]').value;
    const birthday = signupForm.querySelector('input[type="date"]').value;
    const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value;

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.[\W]).{8,}$/).test(password)) {
      alert('Password must be at least 8 characters long and contain at least one number, one uppercase letter, and one special character!');
      return;
    }

    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if username already exists
    if (users.some(user => user.username === username)) {
      alert('Username already exists!');
      return;
    }

    // Add new user
    users.push({
      username: username,
      password: password,
      email: email,
      birthday: birthday
    });

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert('Account created successfully!');
    
    // Switch to login form
    loginForm.classList.add("active-form");
    signupForm.classList.remove("active-form");
    loginTitle.classList.add("active-title");
    signupTitle.classList.remove("active-title");
  });
});

