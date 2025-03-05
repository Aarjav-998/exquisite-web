document.addEventListener("DOMContentLoaded", function () { 
    
    // 🎯 Toggle Service Details
    function toggleDetails(serviceId) {
        let allDetails = document.querySelectorAll(".service-details");

        // Close all open details except the clicked one
        allDetails.forEach((detail) => {
            if (detail.id !== serviceId) {
                detail.classList.add("hidden"); // Ensure others are hidden
                detail.classList.remove("show");
            }
        });

        // Toggle the clicked one
        let details = document.getElementById(serviceId);
        details.classList.toggle("hidden");
        details.classList.toggle("show");

        console.log("Toggled:", serviceId, "Class:", details.classList);
    }

    // Make function globally accessible
    window.toggleDetails = toggleDetails;

    // 📩 Contact Form Handling
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent page reload

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // 🎯 Basic Validation
        if (name === "" || email === "" || message === "") {
            showStatus("⚠️ Please fill out all fields.", "error");
            return;
        }

        if (!validateEmail(email)) {
            showStatus("⚠️ Please enter a valid email address.", "error");
            return;
        }

        // 🚀 Show "Sending..." Message
        showStatus("⏳ Sending message...", "loading");

        // 📩 Send Form Data to Formspree
        let formData = new FormData(form);
        try {
            let response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                showStatus("✅ Message Sent Successfully!", "success");
                form.reset(); // Clear form after submission
            } else {
                showStatus("❌ Something went wrong. Try again!", "error");
            }
        } catch (error) {
            showStatus("❌ Error sending message.", "error");
        }
    });

    // 🎯 Validate Email Format
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // 🎨 Function to Show Status Messages
    function showStatus(message, type) {
        status.innerHTML = message;

        if (type === "error") {
            status.style.color = "red";
        } else if (type === "success") {
            status.style.color = "green";
        } else {
            status.style.color = "orange";
        }
    }
});
