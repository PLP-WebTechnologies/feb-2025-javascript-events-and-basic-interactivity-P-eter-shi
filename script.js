 // Initialize AOS
 AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100
});

// DOM Elements
const header = document.getElementById('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const backToTopBtn = document.getElementById('backToTop');
const themeToggle = document.querySelector('.theme-toggle');
const taglines = document.querySelectorAll('.tagline');
const contactForm = document.getElementById('contactForm');
const searchInput = document.getElementById('universitySearch');
const filterButtons = document.querySelectorAll('.filter-btn');
const universityCards = document.querySelectorAll('.university-card');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show/Hide Back to Top Button
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (this.getAttribute('href') === '#') return;
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Dark Mode Toggle
function setDarkModePreference(isDark) {
    localStorage.setItem('darkMode', isDark ? 'true' : 'false');
}

function loadDarkModePreference() {
    const preference = localStorage.getItem('darkMode');
    if (preference === 'true') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

themeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    
    if (isDarkMode) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    setDarkModePreference(isDarkMode);
});

// Load dark mode preference on page load
loadDarkModePreference();

// Tagline Rotation
let currentTaglineIndex = 0;

function showNextTagline() {
    // Hide all taglines
    taglines.forEach(tag => {
        tag.classList.remove('visible');
        tag.style.opacity = 0;
    });
    
    // Show current tagline
    taglines[currentTaglineIndex].classList.add('visible');
    taglines[currentTaglineIndex].style.opacity = 1;
    
    // Update index for next iteration
    currentTaglineIndex = (currentTaglineIndex + 1) % taglines.length;
}

// Initial tagline
taglines[0].classList.add('visible');
taglines[0].style.opacity = 1;

// Rotate taglines every 3 seconds
setInterval(showNextTagline, 3000);

// Form Validation
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    
    // Reset all error messages
    document.querySelectorAll('.form-error').forEach(error => {
        error.style.display = 'none';
    });
    
    // Validate Name
    if (nameField.value.trim() === '') {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }
    
    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailField.value.trim())) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    
    // Validate Subject
    if (subjectField.value.trim() === '') {
        document.getElementById('subjectError').style.display = 'block';
        isValid = false;
    }
    
    // Validate Message
    if (messageField.value.trim() === '') {
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }
    
    // If form is valid, submit (or simulate submission)
    if (isValid) {
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    }
});

// Search and Filter Universities
searchInput.addEventListener('input', filterUniversities);
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        // Filter universities
        filterUniversities();
    });
});

function filterUniversities() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    
    universityCards.forEach(card => {
        const universityName = card.querySelector('h3').textContent.toLowerCase();
        const universityDescription = card.querySelector('p').textContent.toLowerCase();
        const universityCountry = card.getAttribute('data-country');
        
        const matchesSearch = universityName.includes(searchTerm) || universityDescription.includes(searchTerm);
        const matchesFilter = activeFilter === 'all' || universityCountry === activeFilter;
        
        if (matchesSearch && matchesFilter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}