
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Active Navigation Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.sidebar nav a');

    const updateActiveLink = () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Set the section as active if it's in the upper half of the viewport
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href matches the current section's id
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    // Add event listener for scroll events
    window.addEventListener('scroll', updateActiveLink);
    // Call it once on load to set the initial state
    updateActiveLink();

    // --- 2. Smooth Scrolling for Navigation Links ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link is an internal anchor link
            if (this.hash !== "") {
                e.preventDefault(); // Prevent default anchor click behavior
                const hash = this.hash;
                const targetElement = document.querySelector(hash);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    // --- 3. Dynamic Typing Effect for Title ---
    const titleElement = document.querySelector('.sidebar p.title');
    const originalText = titleElement.textContent;
    titleElement.textContent = ''; // Clear the text content initially
    let charIndex = 0;

    const typeWriter = () => {
        if (charIndex < originalText.length) {
            titleElement.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100); // Adjust typing speed (in ms)
        }
    };
    // Start the typing effect after a short delay
    setTimeout(typeWriter, 500);


    // --- 4. Contact Form Submission Handling ---
    const contactForm = document.querySelector('#contact form');
    const formContainer = document.querySelector('#contact');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission (page reload)

        // Create a FormData object to access form values
        const formData = new FormData(contactForm);
        const name = formData.get('name');

        // You can add an AJAX call here to send the data to a server.
        // For this example, we'll just simulate a successful submission.
        console.log('Form Submitted!');
        console.log(`Name: ${name}`);
        console.log(`Email: ${formData.get('email')}`);
        console.log(`Message: ${formData.get('message')}`);

        // Provide feedback to the user
        // Hide the form
        contactForm.style.display = 'none';

        // Create and display a success message
        const successMessage = document.createElement('p');
        successMessage.innerHTML = `Thank you for your message, <strong>${name}</strong>! I will get back to you shortly.`;
        successMessage.style.padding = '20px';
        successMessage.style.backgroundColor = 'var(--dark-blue)';
        successMessage.style.border = '1px solid var(--accent-cyan)';
        successMessage.style.borderRadius = '8px';
        successMessage.style.textAlign = 'center';

        // Insert the success message after the "Get In Touch" heading
        const contactHeading = formContainer.querySelector('h2');
        contactHeading.insertAdjacentElement('afterend', successMessage);

        // Optional: Reset the form after a few seconds if you want the user to be able to send another message
        setTimeout(() => {
             successMessage.remove();
             contactForm.reset();
             contactForm.style.display = 'flex';
        }, 8000); // Revert back after 8 seconds
    });

});