document.addEventListener("DOMContentLoaded", function () {
    // Get title elements (h1s in alt-container)
    const titles = document.querySelectorAll('.alt-container h1');
    const loginTitle = titles[0];
    const signupTitle = titles[1];

    // Get form containers
    const forms = document.querySelectorAll('.sub-container');
    const loginForm = forms[0];
    const signupForm = forms[1];

    // Get submit button
    const submitButton = document.querySelector('.alt-container button');

    loginTitle.addEventListener("click", function () {
        loginForm.classList.add("active");
        signupForm.classList.remove("active");
        loginTitle.classList.add("active");
        signupTitle.classList.remove("active");
        submitButton.textContent = "Se connecter";
    });

    signupTitle.addEventListener("click", function () {
        signupForm.classList.add("active");
        loginForm.classList.remove("active");
        signupTitle.classList.add("active");
        loginTitle.classList.remove("active");
        submitButton.textContent = "Créer un compte";
    });

    // Handle form submissions
    submitButton.addEventListener("click", function(e) {
        e.preventDefault();
        
        if (loginForm.classList.contains("active")) {
            // Handle login
            const username = loginForm.querySelector('input[type="text"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;

            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Check if user exists
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                document.cookie = `session=${user.username}; path=/; SameSite=Strict`;
                window.location.href = 'index.html';
            } else {
                alert('Nom d\'utilisateur ou mot de passe invalide');
            }
        } else {
            // Handle signup
            const username = signupForm.querySelector('input[type="text"]').value;
            const passwords = signupForm.querySelectorAll('input[type="password"]');
            const password = passwords[0].value;
            const confirmPassword = passwords[1].value;

            // Check if passwords match
            if (password !== confirmPassword) {
                alert('Les mots de passe ne correspondent pas!');
                return;
            }

            if (!RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,}$/).test(password)) {
                alert('Le mot de passe doit contenir au moins 6 caractères, un chiffre, une majuscule et un caractère spécial!');
                return;
            }

            // Get existing users or initialize empty array
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Check if username already exists
            if (users.some(user => user.username === username)) {
                alert('Ce nom d\'utilisateur existe déjà!');
                return;
            }

            // Add new user
            users.push({
                username: username,
                password: password,
                games: [
                    {
                        name: "1",
                        score: 0
                    },
                    {
                        name: "2",
                        score: 0
                    },
                    {
                        name: "3",
                        score: 0
                    }
                ]
            });

            // Save to localStorage
            localStorage.setItem('users', JSON.stringify(users));

            alert('Compte créé avec succès!');
            
            // Switch to login form
            loginForm.classList.add("active");
            signupForm.classList.remove("active");
            loginTitle.classList.add("active");
            signupTitle.classList.remove("active");
            submitButton.textContent = "Se connecter";
        }
    });
});
  
