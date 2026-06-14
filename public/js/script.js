// ===============================
// Doctor Search
// ===============================

const searchInput = document.getElementById("doctorSearch");
const doctorCards = document.querySelectorAll(".doctor-card");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();

    doctorCards.forEach((card) => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(value) ? "block" : "none";
    });
  });
}

// ===============================
// Dark Mode
// ===============================

const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  if (themeToggle) themeToggle.innerHTML = "☀️";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeToggle.innerHTML = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.innerHTML = "🌙";
    }
  });
}

// ===============================
// Register Form Validation
// ===============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const passwordStrength = document.getElementById("passwordStrength");
  const clientError = document.getElementById("clientError");

  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;

    if (password.length === 0) {
      passwordStrength.textContent = "";
    } else if (password.length < 6) {
      passwordStrength.textContent = "Weak password";
      passwordStrength.style.color = "#dc2626";
    } else if (password.length < 10) {
      passwordStrength.textContent = "Medium password";
      passwordStrength.style.color = "#f97316";
    } else {
      passwordStrength.textContent = "Strong password";
      passwordStrength.style.color = "#16a34a";
    }
  });

  registerForm.addEventListener("submit", (e) => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 3) {
      e.preventDefault();
      clientError.textContent = "Name must be at least 3 characters.";
      return;
    }

    if (!emailPattern.test(email)) {
      e.preventDefault();
      clientError.textContent = "Please enter a valid email address.";
      return;
    }

    if (password.length < 6) {
      e.preventDefault();
      clientError.textContent = "Password must be at least 6 characters.";
      return;
    }

    if (password !== confirmPassword) {
      e.preventDefault();
      clientError.textContent = "Passwords do not match.";
      return;
    }

    clientError.textContent = "";
  });
}

// ===============================
// Login Form Validation
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const loginError = document.getElementById("loginError");

  loginForm.addEventListener("submit", (e) => {
    const email = loginEmail.value.trim();
    const password = loginPassword.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      e.preventDefault();
      loginError.textContent = "Please enter a valid email address.";
      return;
    }

    if (password.length < 6) {
      e.preventDefault();
      loginError.textContent = "Password must be at least 6 characters.";
      return;
    }

    loginError.textContent = "";
  });
}

// ===============================
// Book Appointment Validation
// ===============================

const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {
  const appointmentDate = document.getElementById("appointmentDate");
  const appointmentTime = document.getElementById("appointmentTime");
  const appointmentReason = document.getElementById("appointmentReason");
  const appointmentError = document.getElementById("appointmentError");

  appointmentForm.addEventListener("submit", (e) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(appointmentDate.value);

    if (!appointmentDate.value || selectedDate < today) {
      e.preventDefault();
      appointmentError.textContent = "Please select today or a future date.";
      return;
    }

    if (!appointmentTime.value) {
      e.preventDefault();
      appointmentError.textContent = "Please select appointment time.";
      return;
    }

    if (appointmentReason.value.trim().length < 5) {
      e.preventDefault();
      appointmentError.textContent = "Reason must be at least 5 characters.";
      return;
    }

    appointmentError.textContent = "";
  });
}

// ===============================
// Prescription Upload Validation
// ===============================

const prescriptionForm = document.getElementById("prescriptionForm");

if (prescriptionForm) {
  const title = document.getElementById("prescriptionTitle");
  const doctor = document.getElementById("prescriptionDoctor");
  const file = document.getElementById("prescriptionFile");
  const error = document.getElementById("prescriptionError");

  prescriptionForm.addEventListener("submit", (e) => {
    const allowedExtensions = ["pdf", "jpg", "jpeg", "png"];

    if (title.value.trim().length < 3) {
      e.preventDefault();
      error.textContent = "Prescription title must be at least 3 characters.";
      return;
    }

    if (doctor.value.trim().length < 3) {
      e.preventDefault();
      error.textContent = "Doctor name must be at least 3 characters.";
      return;
    }

    if (!file.files.length) {
      e.preventDefault();
      error.textContent = "Please select a prescription file.";
      return;
    }

    const selectedFile = file.files[0];
    const extension = selectedFile.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      e.preventDefault();
      error.textContent = "Only PDF, JPG, JPEG and PNG files are allowed.";
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      e.preventDefault();
      error.textContent = "File size must be less than 5 MB.";
      return;
    }

    error.textContent = "";
  });
}

// ===============================
// Admin Add Doctor Validation
// ===============================

const doctorForm = document.getElementById("doctorForm");

if (doctorForm) {
  const doctorName = document.getElementById("doctorName");
  const doctorSpecialization = document.getElementById("doctorSpecialization");
  const doctorExperience = document.getElementById("doctorExperience");
  const doctorFees = document.getElementById("doctorFees");
  const doctorAvailableDays = document.getElementById("doctorAvailableDays");
  const doctorError = document.getElementById("doctorError");

  doctorForm.addEventListener("submit", (e) => {
    if (doctorName.value.trim().length < 3) {
      e.preventDefault();
      doctorError.textContent = "Doctor name must be at least 3 characters.";
      return;
    }

    if (doctorSpecialization.value.trim().length < 3) {
      e.preventDefault();
      doctorError.textContent = "Specialization must be at least 3 characters.";
      return;
    }

    if (Number(doctorExperience.value) <= 0) {
      e.preventDefault();
      doctorError.textContent = "Experience must be greater than 0.";
      return;
    }

    if (Number(doctorFees.value) <= 0) {
      e.preventDefault();
      doctorError.textContent = "Fees must be greater than 0.";
      return;
    }

    if (doctorAvailableDays.value.trim().length < 3) {
      e.preventDefault();
      doctorError.textContent = "Available days field is required.";
      return;
    }

    doctorError.textContent = "";
  });
}