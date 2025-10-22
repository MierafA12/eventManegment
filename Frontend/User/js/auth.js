document.addEventListener("DOMContentLoaded", () => {
  // Handle Registration
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const age = document.getElementById("age").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      const terms = document.getElementById("terms").checked;

      if (!terms) {
        alert("You must agree to the Terms & Conditions.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const selectedEvent = JSON.parse(localStorage.getItem("selectedEvent"));

      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        alert("Email already registered.");
        return;
      }

      const newUser = { name, age, phone, email, password,registeredEvent: selectedEvent || null };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registration successful! You can now log in.");
      window.location.href = "login.html";
    });
  }

  // Handle Login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const foundUser = users.find(user => user.email === email && user.password === password);

      if (foundUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        alert("Login successful! Redirecting...");
        window.location.href = "payment.html"; 
      } else {
        alert("Invalid email or password.");
      }
    });
  }
});
