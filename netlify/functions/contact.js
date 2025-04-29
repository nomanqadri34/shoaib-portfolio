// Initialize EmailJS
(function () {
    emailjs.init("W-1fxkwC0rOyOEvqa"); 
})();

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Clear error messages
        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";

        let isValid = true;

        // Basic Validation
        if (nameInput.value.trim() === "") {
            nameError.textContent = "Please enter your name.";
            isValid = false;
        }

        if (emailInput.value.trim() === "") {
            emailError.textContent = "Please enter your email.";
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        if (messageInput.value.trim() === "") {
            messageError.textContent = "Please enter your message.";
            isValid = false;
        }

        if (!isValid) return;

        // Disable button to prevent multiple clicks
        const submitButton = form.querySelector("button[type='submit']");
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        // EmailJS Send
        const templateParams = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
        };

        emailjs.send("service_ux2qb0c", "template_yufxy7b", templateParams)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Message Sent!",
                    text: "Thank you for contacting me. I’ll get back to you shortly.",
                    confirmButtonColor: "#4CAF50"
                });

                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = "Submit";
            })
            .catch((error) => {
                console.error("EmailJS error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong. Please try again later.",
                    confirmButtonColor: "#d33"
                });
                submitButton.disabled = false;
                submitButton.textContent = "Submit";
            });
    });
});

// Email format validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
