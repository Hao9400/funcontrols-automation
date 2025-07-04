// Fun Controls Landing Page JavaScript

// Global variables
let currentSlide = 0;
const totalSlides = 4;
let slideInterval;
let activeTab = 'plc';

// Principles slider variables
let currentPrinciple = 0;
const totalPrinciples = 3;
let principleInterval;

// Product data
const productData = {
    plc: [
        {
            name: 'Siemens S7-1200',
            description: 'Compact and flexible automation solution for small to medium applications',
            features: ['Digital & Analog I/O', 'Ethernet Communication', 'Integrated Web Server', 'Safety Functions'],
            image: 'https://images.pexels.com/photos/356048/pexels-photo-356048.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
            name: 'Allen-Bradley CompactLogix',
            description: 'High-performance control platform for demanding applications',
            features: ['Modular Design', 'EtherNet/IP', 'Motion Control', 'Advanced Diagnostics'],
            image: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
            name: 'Schneider Electric M580',
            description: 'Future-ready automation platform with cybersecurity features',
            features: ['Hot Standby', 'Cyber Security', 'OPC UA Server', 'Process Safety'],
            image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
    ],
    inverter: [
        {
            name: 'ABB ACS880',
            description: 'Industrial drive for demanding applications with advanced control',
            features: ['Direct Torque Control', 'Safety Functions', 'Energy Efficiency', 'Predictive Maintenance'],
            image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
            name: 'Siemens SINAMICS G120',
            description: 'Modular frequency converter for industrial applications',
            features: ['Modular Design', 'Safety Integrated', 'Energy Saving', 'Easy Commissioning'],
            image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
            name: 'Schneider Altivar Process',
            description: 'Variable speed drives for process industries',
            features: ['Process Control', 'Harsh Environment', 'Advanced Diagnostics', 'Cybersecurity'],
            image: 'https://images.pexels.com/photos/159224/office-laptops-technology-computer-159224.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
    ],
    servo: [
        {
            name: 'Mitsubishi MR-J4',
            description: 'High-performance servo amplifier with advanced motion control',
            features: ['High Speed Response', 'Vibration Suppression', 'Safety Functions', 'Network Connectivity'],
            image: 'https://images.pexels.com/photos/356048/pexels-photo-356048.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
            name: 'Yaskawa Sigma-7',
            description: 'Rotary servo motor with exceptional performance',
            features: ['High Torque Density', 'Low Inertia', 'Smooth Operation', 'Long Life'],
            image: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
            name: 'Panasonic MINAS A6',
            description: 'Compact servo system for precision applications',
            features: ['Real-time Auto Tuning', 'Vibration Suppression', 'High Resolution', 'Easy Setup'],
            image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
    ],
    monitor: [
        {
            name: 'Industrial Touch Panels',
            description: 'Ruggedized touch screen interfaces for harsh environments',
            features: ['IP65 Rating', 'Multi-touch Support', 'Wide Temperature Range', 'Anti-glare Display'],
            image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
            name: 'SCADA Workstations',
            description: 'High-performance workstations for critical monitoring applications',
            features: ['Dual Monitor Support', '24/7 Operation', 'Redundant Systems', 'Remote Access'],
            image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
            name: 'Panel Mount Displays',
            description: 'Compact displays designed for control panel integration',
            features: ['LED Backlight', 'Resistive Touch', 'DIN Rail Mount', 'Multiple Interfaces'],
            image: 'https://images.pexels.com/photos/159224/office-laptops-technology-computer-159224.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();
    initializePrinciplesSlider();
    initializeMobileMenu();
    initializeProductTabs();
    initializeSmoothScrolling();
    initializeProgressBar();
    initializeNavAnimations();
    // Load default PLC products
    loadDefaultProducts();
});

// Load default PLC products on page load
function loadDefaultProducts() {
    // The PLC products are already loaded in the HTML, so we just need to ensure the tab state is correct
    activeTab = 'plc';
}

// Navigation animations
function initializeNavAnimations() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const underline = this.querySelector('.nav-underline');
            if (underline) {
                underline.style.transform = 'scaleX(1)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const underline = this.querySelector('.nav-underline');
            if (underline) {
                underline.style.transform = 'scaleX(0)';
            }
        });
    });
}

// Slider functionality
function initializeSlider() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.slide-indicator');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');

    // Set up slide indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Navigation buttons
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Auto-slide functionality
    startAutoSlide();

    // Pause auto-slide on hover
    const heroSection = document.getElementById('home');
    heroSection.addEventListener('mouseenter', stopAutoSlide);
    heroSection.addEventListener('mouseleave', startAutoSlide);
}

// Principles slider functionality
function initializePrinciplesSlider() {
    const principleSlides = document.querySelectorAll('.principle-slide');
    const principleIndicators = document.querySelectorAll('.principle-indicator');
    const prevPrincipleButton = document.getElementById('prev-principle');
    const nextPrincipleButton = document.getElementById('next-principle');

    // Set up principle indicators
    principleIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToPrinciple(index));
    });

    // Navigation buttons
    prevPrincipleButton.addEventListener('click', prevPrinciple);
    nextPrincipleButton.addEventListener('click', nextPrinciple);

    // Auto-slide functionality
    startPrincipleAutoSlide();

    // Pause auto-slide on hover
    const principlesSection = document.getElementById('principles');
    principlesSection.addEventListener('mouseenter', stopPrincipleAutoSlide);
    principlesSection.addEventListener('mouseleave', startPrincipleAutoSlide);
}

function goToPrinciple(slideIndex) {
    const slides = document.querySelectorAll('.principle-slide');
    const indicators = document.querySelectorAll('.principle-indicator');

    // Update current slide
    currentPrinciple = slideIndex;

    // Update slide positions
    slides.forEach((slide, index) => {
        if (index === currentPrinciple) {
            slide.style.transform = 'translateX(0)';
        } else if (index < currentPrinciple) {
            slide.style.transform = 'translateX(-100%)';
        } else {
            slide.style.transform = 'translateX(100%)';
        }
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentPrinciple) {
            indicator.classList.add('bg-white', 'scale-125');
            indicator.classList.remove('bg-white/50');
        } else {
            indicator.classList.remove('bg-white', 'scale-125');
            indicator.classList.add('bg-white/50');
        }
    });

    // Update progress bar
    updatePrincipleProgressBar();
}

function nextPrinciple() {
    const nextIndex = (currentPrinciple + 1) % totalPrinciples;
    goToPrinciple(nextIndex);
}

function prevPrinciple() {
    const prevIndex = (currentPrinciple - 1 + totalPrinciples) % totalPrinciples;
    goToPrinciple(prevIndex);
}

function startPrincipleAutoSlide() {
    stopPrincipleAutoSlide(); // Clear any existing interval
    principleInterval = setInterval(nextPrinciple, 4000); // Faster auto-slide
}

function stopPrincipleAutoSlide() {
    if (principleInterval) {
        clearInterval(principleInterval);
        principleInterval = null;
    }
}

function updatePrincipleProgressBar() {
    const progressBar = document.getElementById('principles-progress-bar');
    const progressWidth = ((currentPrinciple + 1) / totalPrinciples) * 100;
    progressBar.style.width = progressWidth + '%';
}

function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.slide-indicator');

    // Update current slide
    currentSlide = slideIndex;

    // Update slide positions
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.style.transform = 'translateX(0)';
        } else if (index < currentSlide) {
            slide.style.transform = 'translateX(-100%)';
        } else {
            slide.style.transform = 'translateX(100%)';
        }
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('bg-white', 'scale-125');
            indicator.classList.remove('bg-white/50');
        } else {
            indicator.classList.remove('bg-white', 'scale-125');
            indicator.classList.add('bg-white/50');
        }
    });

    // Update progress bar
    updateProgressBar();
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    goToSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prevIndex);
}

function startAutoSlide() {
    stopAutoSlide(); // Clear any existing interval
    slideInterval = setInterval(nextSlide, 3000); // Much faster auto-slide
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progressWidth = ((currentSlide + 1) / totalSlides) * 100;
    progressBar.style.width = progressWidth + '%';
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    let isMenuOpen = false;

    mobileMenuButton.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('mobile-menu-enter');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('mobile-menu-exit');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('mobile-menu-enter', 'mobile-menu-exit');
            }, 300);
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    });

    // Close mobile menu when clicking on links
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            isMenuOpen = false;
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });
}

// Product tabs functionality
function initializeProductTabs() {
    // Unified tabs
    const plcTab = document.getElementById('plc-tab');
    const inverterTab = document.getElementById('inverter-tab');
    const servoTab = document.getElementById('servo-tab');
    const monitorTab = document.getElementById('monitor-tab');

    // Unified tab event listeners
    plcTab.addEventListener('click', () => switchProductTab('plc'));
    inverterTab.addEventListener('click', () => switchProductTab('inverter'));
    servoTab.addEventListener('click', () => switchProductTab('servo'));
    monitorTab.addEventListener('click', () => switchProductTab('monitor'));
}

function switchProductTab(tab) {
    activeTab = tab;
    
    // Update unified tab buttons - using only the unified style
    const unifiedTabs = ['plc', 'inverter', 'servo', 'monitor'];
    unifiedTabs.forEach(tabName => {
        const tabElement = document.getElementById(`${tabName}-tab`);
        if (tabElement) {
            if (tabName === tab) {
                // Active state - use the unified active style
                tabElement.className = 'flex flex-col items-center p-4 rounded-lg transition-all duration-200 bg-blue-600 text-white shadow-lg transform scale-105';
            } else {
                // Inactive state - use the unified inactive style
                tabElement.className = 'flex flex-col items-center p-4 rounded-lg transition-all duration-200 bg-blue-100 text-blue-600 border border-blue-200 hover:bg-blue-200 hover:scale-105';
            }
        }
    });
    
    // Update product content
    updateProductContent(tab);
}

function updateProductContent(tab) {
    const productContent = document.getElementById('product-content');
    const products = productData[tab];
    
    // Fade out current content
    productContent.style.opacity = '0';
    
    setTimeout(() => {
        // Clear current content
        productContent.innerHTML = '';
        
        // Generate new product cards
        products.forEach(product => {
            const productCard = createProductCard(product);
            productContent.appendChild(productCard);
        });
        
        // Fade in new content
        productContent.style.opacity = '1';
    }, 150);
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2';
    
    card.innerHTML = `
        <div class="relative overflow-hidden">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-3">${product.name}</h3>
            <p class="text-gray-600 mb-4">${product.description}</p>
            <div class="space-y-2">
                ${product.features.map(feature => `
                    <div class="flex items-center text-sm text-gray-600">
                        <svg class="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        ${feature}
                    </div>
                `).join('')}
            </div>
            <button class="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center group-hover:shadow-lg transform hover:scale-105">
                Learn More
                <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
    `;
    
    return card;
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Progress bar initialization
function initializeProgressBar() {
    updateProgressBar();
    updatePrincipleProgressBar();
}

// Intersection Observer for animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.expertise-card, .product-card');
    animateElements.forEach(el => observer.observe(el));
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate any position-dependent elements
    updateProgressBar();
    updatePrincipleProgressBar();
}, 250));

// Handle visibility change (pause/resume auto-slide)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAutoSlide();
        stopPrincipleAutoSlide();
    } else {
        startAutoSlide();
        startPrincipleAutoSlide();
    }
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.target.closest('#home')) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                prevSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextSlide();
                break;
            case ' ':
                e.preventDefault();
                if (slideInterval) {
                    stopAutoSlide();
                } else {
                    startAutoSlide();
                }
                break;
        }
    }
    
    if (e.target.closest('#principles')) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                prevPrinciple();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextPrinciple();
                break;
            case ' ':
                e.preventDefault();
                if (principleInterval) {
                    stopPrincipleAutoSlide();
                } else {
                    startPrincipleAutoSlide();
                }
                break;
        }
    }
});

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeScrollAnimations);