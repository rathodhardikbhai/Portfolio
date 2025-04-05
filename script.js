const typingText = document.getElementById('typingText');
        const texts = ["Hardik Rathod", "MCA Student", "AI Enthusiast", "Web Developer"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at the end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before typing next
            }

            setTimeout(typeText, typingSpeed);
        }

        // Start typing animation
        window.addEventListener('load', typeText);

        // Back to Top Button
        const backToTopButton = document.querySelector('.back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Mobile Navigation
        const mobileToggle = document.querySelector('.mobile-toggle');
        const nav = document.querySelector('nav');

        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });

        // Close mobile nav when clicking a link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileToggle.textContent = '☰';
            });
        });

        // Smooth scrolling for all anchors
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Form submission
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server
            // For now, let's just show a success message
            
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            console.log('Form submitted:', formValues);
            
            // Show success message
            contactForm.innerHTML = `
                <div style="text-align: center; padding: 30px 0;">
                    <h3 style="color: var(--primary); margin-bottom: 15px;">Message Sent Successfully!</h3>
                    <p style="color: var(--secondary); margin-bottom: 20px;">Thank you for reaching out. I'll get back to you soon.</p>
                    <button onclick="location.reload()" class="btn btn-secondary">Send Another Message</button>
                </div>
            `;
        });