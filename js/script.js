document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('header nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                mobileMenuToggle.querySelector('i').classList.add('fa-bars');
                mobileMenuToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    // Animate skill bars on about page
    const skillBars = document.querySelectorAll('.skill-level');
    
    if (skillBars.length > 0) {
        // Trigger animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        const level = bar.getAttribute('data-level');
                        bar.style.width = level;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.5});

        document.querySelectorAll('.skill-bar').forEach(bar => {
            observer.observe(bar);
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send this data to a server
            console.log('Form submitted:', {name, email, subject, message});
            
            // Show success message
            alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`);
            
            // Reset form
            this.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active page highlighting based on current URL path
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('header nav ul li');
    
    navItems.forEach(item => {
        const link = item.querySelector('a');
        const href = link.getAttribute('href');
        item.classList.remove('current');
        if (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath.includes('index') && href === 'index.html')) {
            item.classList.add('current');
        }
    });
    // Add to script.js
// Project card animations
const projectCards = document.querySelectorAll('.project-card');

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {threshold: 0.1});

projectCards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    projectObserver.observe(card);
});

    // Form validation for newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email && email.includes('@') && email.includes('.')) {
                alert(`Thank you for subscribing with ${email}!`);
                this.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});