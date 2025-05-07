{
  `path`: `C:\\MYCLAUDE_PROJECT\\anseong\\js\\main.js`,
  `content`: `/**
 * Enhanced JavaScript for Anseong Youth Entrepreneurship Platform
 * Version: 2.0
 * Last updated: May 2025
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initTooltips();
    initProgressBar();
    initContactForm();
    initPlaceholderImages();
    
    // Start animation for visible elements
    triggerAnimationsForVisibleElements();
    
    // Initialize statistics counter if the element exists
    if (document.querySelector('.stat-count')) {
        initStatisticsCounter();
    }
});

/**
 * Navigation functionality
 */
function initNavigation() {
    // Update active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        // Add \"scrolled\" class to header when page is scrolled
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Update active navigation link
        const scrollPosition = window.scrollY + 100;
        
        // Get all sections with IDs
        const sections = document.querySelectorAll('section[id]');
        
        // Loop through sections and update active navigation link
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                // Remove active class from all links
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    link.classList.remove('text-blue-600');
                    link.classList.remove('text-purple-600');
                    link.classList.remove('text-green-600');
                    link.classList.remove('font-bold');
                });
                
                // Add active class to current link
                const activeLinks = document.querySelectorAll(`nav a[href=\"#${sectionId}\"]`);
                activeLinks.forEach(link => {
                    link.classList.add('active');
                    
                    // Add color based on section
                    if (section.classList.contains('bg-blue-50') || section.classList.contains('region-west-bg')) {
                        link.classList.add('text-blue-600');
                    } else if (section.classList.contains('bg-purple-50') || section.classList.contains('region-central-bg')) {
                        link.classList.add('text-purple-600');
                    } else if (section.classList.contains('bg-green-50') || section.classList.contains('region-east-bg')) {
                        link.classList.add('text-green-600');
                    } else {
                        link.classList.add('text-blue-600');
                    }
                    
                    link.classList.add('font-bold');
                });
            }
        });
    });
}

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
    const menuButton = document.getElementById('menuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            // Toggle mobile menu
            mobileMenu.classList.toggle('hidden');
            
            // Change the icon between hamburger and X
            const icon = menuButton.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            const menuButton = document.getElementById('menuButton');
            
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = menuButton.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            
            // Get target element
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll-based animations
 */
function initScrollAnimations() {
    // Create intersection observer to detect when elements enter viewport
    const observerOptions = {
        root: null,
        rootMargin:  '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Determine animation type based on data attributes or class
            let animationType = 'fadeIn'; // Default animation
            
            if (entry.target.dataset.animation) {
                animationType = entry.target.dataset.animation;
            } else if (entry.target.classList.contains('card')) {
                animationType = 'scaleUp';
            } else if (entry.target.classList.contains('feature-icon')) {
                animationType = 'scaleUp';
            } else if (entry.target.classList.contains('timeline-item')) {
                // Alternate slide in animations for timeline items
                animationType = entry.target.dataset.index % 2 === 0 ? 'slideInLeft' : 'slideInRight';
            }
            
            // Add animation class
            entry.target.classList.add(`animate-${animationType}`);
            
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.animate-on-scroll, .card, .feature-icon, section, .timeline-item').forEach(element => {
    // Add initial state if not already present
    element.style.opacity = '0';
    
    // Set data index for timeline items
    if (element.classList.contains('timeline-item')) {
        element.dataset.index = Array.from(document.querySelectorAll('.timeline-item')).indexOf(element);
    }
    
    // Observe the element
    observer.observe(element);
});
}

/**
 * Function to trigger animations for elements that are already visible on page load
 */
function triggerAnimationsForVisibleElements() {
    // Get all animated elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .card, .feature-icon, section, .timeline-item');
    
    animatedElements.forEach((element, index) => {
        // Check if element is in viewport
        const rect = element.getBoundingClientRect();
        const isVisible = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        
        if (isVisible) {
            // Add appropriate animation with delay based on position
            let animationType = 'fadeIn';
            
            if (element.dataset.animation) {
                animationType = element.dataset.animation;
            } else if (element.classList.contains('card')) {
                animationType = 'scaleUp';
            } else if (element.classList.contains('feature-icon')) {
                animationType = 'scaleUp';
            } else if (element.classList.contains('timeline-item')) {
                animationType = index % 2 === 0 ? 'slideInLeft' : 'slideInRight';
            }
            
            // Add delay class based on index
            const delayClass = `delay-${(index % 5) * 100}`;
            element.classList.add(delayClass);
            
            // Animate the element
            element.style.opacity = '1';
            element.classList.add(`animate-${animationType}`);
        }
    });
}

/**
 * Initialize tooltips
 */
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(tooltip => {
        // Create tooltip element
        const tooltipContent = document.createElement('div');
        tooltipContent.classList.add('tooltip-content');
        tooltipContent.textContent = tooltip.getAttribute('data-tooltip');
        
        // Add tooltip element to DOM
        tooltip.classList.add('tooltip');
        tooltip.appendChild(tooltipContent);
        
        // Add event listeners
        tooltip.addEventListener('mouseenter', function() {
            tooltipContent.style.opacity = '1';
            tooltipContent.style.visibility = 'visible';
        });
        
        tooltip.addEventListener('mouseleave', function() {
            tooltipContent.style.opacity = '0';
            tooltipContent.style.visibility = 'hidden';
        });
    });
}

/**
 * Initialize progress bar
 */
function initProgressBar() {
    // Create progress bar container
    const progressContainer = document.createElement('div');
    progressContainer.classList.add('progress-container');
    
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    
    // Add to DOM
    progressContainer.appendChild(progressBar);
    document.body.prepend(progressContainer);
    
    // Update progress bar on scroll
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = scrolled + '%';
    });
}

/**
 * Statistics counter animation
 */
function initStatisticsCounter() {
    // Create Intersection Observer for statistics
    const statObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start counter animation for all statistics
                startCounterAnimation();
                
                // Stop observing once triggered
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe statistics section
    const statsSection = document.querySelector('.stats-section') || document.getElementById('benefits');
    if (statsSection) {
        statObserver.observe(statsSection);
    }
}

/**
 * Start counter animation for all statistics
 */
function startCounterAnimation() {
    const counters = document.querySelectorAll('.stat-count');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // Update every 16ms
        
        // Reset counter
        counter.textContent = '0';
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            counter.textContent = Math.floor(current);
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    });
}

/**
 * Contact form initialization and validation
 */
function initContactForm() {
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Initialize error flag
            let hasError = false;
            
            // Simple validation
            [name, email, subject, message].forEach(field => {
                if (field && !field.value.trim()) {
                    // Add error class
                    field.classList.add('border-red-500');
                    hasError = true;
                } else if (field) {
                    // Remove error class
                    field.classList.remove('border-red-500');
                }
            });
            
            // Email validation
            if (email && email.value.trim() && !validateEmail(email.value)) {
                email.classList.add('border-red-500');
                hasError = true;
            }
            
            // If no errors, submit form
            if (!hasError) {
                // Here you would normally send the form data to a server
                // For demo purposes, just show a success message
                showFormSuccess();
                contactForm.reset();
            }
        });
        
        // Add input event listeners to clear error state
        const formFields = contactForm.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.addEventListener('input', function() {
                field.classList.remove('border-red-500');
            });
        });
    }
}

/**
 * Show form success message
 */
function showFormSuccess() {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.classList.add('bg-green-100', 'border', 'border-green-400', 'text-green-700', 'px-4', 'py-3', 'rounded', 'relative', 'my-4');
    successMessage.innerHTML = `
        <strong class="font-bold">문의가 접수되었습니다!</strong>
        <span class="block sm:inline"> 빠른 시일 내에 답변 드리겠습니다.</span>
    `;
    
    // Add to form
    const contactForm = document.querySelector('form');
    contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

/**
 * Validate email format
 */
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Create placeholder images for demo purposes
 */
function initPlaceholderImages() {
    // Replace hero image with SVG
    replacePlaceholderImage('img[src="images/hero-image.svg"]', 'hero-image', 'fas fa-city');
    
    // Handle map/chart placeholders if any
    document.querySelectorAll('.map-placeholder, .chart-placeholder').forEach(placeholder => {
        const type = placeholder.classList.contains('map-placeholder') ? 'map' : 'chart';
        const iconClass = type === 'map' ? 'fas fa-map-marked-alt' : 'fas fa-chart-bar';
        
        // Create SVG placeholder
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', '0 0 500 300');
        
        // SVG content
        svg.innerHTML = `
            <rect width="500" height="300" fill="#f3f4f6" rx="8" ry="8" />
            <text x="250" y="150" fill="#6b7280" font-size="32" text-anchor="middle" dominant-baseline="middle">
                <tspan x="250" dy="-20">${type === 'map' ? '지도' : '차트'} 플레이스홀더</tspan>
                <tspan x="250" dy="40">실제 구현 시 ${type === 'map' ? '지도' : '차트'}가 표시됩니다</tspan>
            </text>
        `;
        
        // Replace the placeholder
        placeholder.appendChild(svg);
    });
}

/**
 * Replace image placeholder with SVG
 */
function replacePlaceholderImage(selector, id, iconClass) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
        // Get dimensions
        const width = element.width || 600;
        const height = element.height || 400;
        
        // Create SVG template
        let svgTemplate = '';
        
        if (id === 'hero-image') {
            svgTemplate = `
                <svg class="w-full max-w-lg mx-auto" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <rect width="600" height="400" fill="url(#grad1)" rx="16" ry="16" opacity="0.1"/>
                    <circle cx="480" cy="120" r="60" fill="#bfdbfe" opacity="0.8"/>
                    <circle cx="120" cy="300" r="40" fill="#93c5fd" opacity="0.6"/>
                    <path d="M100,200 Q300,100 500,200 Q350,300 100,200" fill="none" stroke="#3b82f6" stroke-width="4" stroke-linecap="round"/>
                    <text x="300" y="180" fill="#1e40af" font-size="36" text-anchor="middle" font-weight="bold">안성시 청년 창업 플랫폼</text>
                    <text x="300" y="230" fill="#1d4ed8" font-size="24" text-anchor="middle">지역 균형 발전 프로젝트</text>
                </svg>
            `;
        } else {
            svgTemplate = `
                <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
                    <rect width="${width}" height="${height}" fill="#f3f4f6" rx="8" ry="8"/>
                    <text x="${width/2}" y="${height/2}" fill="#6b7280" font-size="${width/20}" text-anchor="middle" dominant-baseline="middle">
                        이미지 플레이스홀더
                    </text>
                </svg>
            `;
        }
        
        // Replace the image
        element.outerHTML = svgTemplate;
    });
}

/**
 * Check if an element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}