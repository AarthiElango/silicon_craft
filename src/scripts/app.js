
// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('show');
  });
}

// Tabs
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const id = btn.dataset.tab;
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('show'));
    document.getElementById(id).classList.add('show');
  });
});

// Theme toggle with localStorage
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const saved = localStorage.getItem('scvlsi-theme');
if (saved === 'dark') body.classList.add('dark');
themeToggle?.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('scvlsi-theme', body.classList.contains('dark') ? 'dark' : 'light');
});

// Animate on scroll (simple fade-up)
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  })
},{threshold:.12});
document.querySelectorAll('section, .card, .why-grid li').forEach(el=>{
  el.classList.add('pre');
  observer.observe(el);
});


// --- Courses Catalog Builder & Router (robust) ---
(function(){
  const listContainer = document.querySelector('.course-list.container');
  if(!listContainer) return;

  // Build catalog dynamically if missing
  let catalog = document.querySelector('.course-catalog');
  if(!catalog){
    const sec = document.createElement('section');
    sec.className = 'container course-catalog';
    sec.setAttribute('aria-labelledby','all-courses');
    sec.innerHTML = '<h2 id="all-courses">All Courses</h2><div class="catalog-grid"></div>';
    listContainer.parentNode.insertBefore(sec, listContainer);
    catalog = sec;
    const grid = sec.querySelector('.catalog-grid');
    document.querySelectorAll('.course-list .course').forEach(article => {
      const id = article.id;
      const title = article.querySelector('h2')?.textContent?.trim() || id;
      const blurb = article.querySelector('.summary')?.textContent?.trim() || 'View details';
      const btn = document.createElement('button');
      btn.className = 'catalog-card';
      btn.dataset.course = id;
      btn.innerHTML = `<h3>${title}</h3><p>${blurb.slice(0,100)}</p><span>View Details →</span>`;
      grid.appendChild(btn);
    });
  }

  const catalogGrid = catalog.querySelector('.catalog-grid');

  function setMode(mode){
    listContainer.setAttribute('data-mode', mode);
    if(mode === 'list'){
      catalog.style.display = '';
      // Hide all details
      document.querySelectorAll('.course-list .course').forEach(a => a.classList.remove('is-active'));
    }else{
      catalog.style.display = 'none';
    }
  }

  function showCourse(id, scroll=true){
    const target = document.getElementById(id);
    if(!target){ setMode('list'); return; }
    setMode('detail');
    document.querySelectorAll('.course-list .course').forEach(a => a.classList.remove('is-active'));
    target.classList.add('is-active');
    if(scroll){ target.scrollIntoView({behavior:'smooth', block:'start'}); }
  }

  function parseHash(){
    const h = location.hash || '';
    if(h.startsWith('#course=')){
      showCourse(h.replace('#course=',''));
    }else{
      setMode('list');
    }
  }

  // Bind clicks
  catalogGrid.addEventListener('click', (e)=>{
    const btn = e.target.closest('.catalog-card');
    if(!btn) return;
    const id = btn.getAttribute('data-course');
    history.replaceState(null,'', `#course=${id}`);
    showCourse(id);
  });

  // Back links (if present statically)
  document.querySelectorAll('.back-link').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      history.replaceState(null,'', '#all');
      setMode('list');
      catalog.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // Default to list until hash says otherwise
  setMode('list');
  window.addEventListener('hashchange', parseHash);
  parseHash();
})();


// Highlight active nav based on body[data-page]
(function(){
  const page = document.body.getAttribute('data-page');
  const links = document.querySelectorAll('.nav a');
  links.forEach(a => {
    const href = a.getAttribute('href') || '';
    if ((page === 'home' && href.includes('index.html')) ||
        (page === 'courses' && href.includes('courses.html')) ||
        (page === 'about' && href.includes('about.html')) ||
        (page === 'placement' && href.includes('placement.html')) ||
        (page === 'admissions' && href.includes('admissions.html')) ||
        (page === 'contact' && href.includes('contact.html'))) {
      a.classList.add('active');
    }
  });
})();


// Animated counters for Highlights page
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".highlights-stats .count");
  if (!counters.length) return;

  const animateCounter = (counter) => {
    const target = +counter.parentElement.getAttribute("data-target");
    const increment = target / 100;
    let count = 0;
    const update = () => {
      count += increment;
      if (count < target) {
        counter.textContent = Math.ceil(count);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };
    update();
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const countEl = entry.target.querySelector(".count");
        animateCounter(countEl);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".highlights-stats .stat")
    .forEach(stat => observer.observe(stat));
});
// Example JS for any interactive behavior
document.addEventListener("DOMContentLoaded", () => {
  console.log("About page loaded");
});
// Example: Add animation effect on scroll
document.addEventListener("scroll", function() {
    const steps = document.querySelectorAll(".process-step");
    steps.forEach(step => {
        const rect = step.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            step.style.opacity = 1;
            step.style.transform = "translateY(0)";
        }
    });
});

 const processSteps = [
            {
                title: "Training",
                description: "Comprehensive VLSI training program",
                color: "text-blue-600",
                bgColor: "bg-blue-50",
                icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                </svg>`
            },
            {
                title: "Internal Assessment",
                description: "Performance evaluation and skill testing",
                color: "text-green-600",
                bgColor: "bg-green-50",
                icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>`
            },
            {
                title: "Shortlisting",
                description: "Selection based on assessment results",
                color: "text-purple-600",
                bgColor: "bg-purple-50",
                icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>`
            },
            {
                title: "Company Drive",
                description: "Industry recruitment processes",
                color: "text-orange-600",
                bgColor: "bg-orange-50",
                icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>`
            },
            {
                title: "Selection",
                description: "Final selection by companies",
                color: "text-red-600",
                bgColor: "bg-red-50",
                icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>`
            },
            {
                title: "Placement",
                description: "Job offer and onboarding",
                color: "text-teal-600",
                bgColor: "bg-teal-50",
                icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>`
            }
        ];

        // Student data
        const placedStudents = [
            { name: 'Mownosh R.S', company: 'Aheesa' },
            { name: 'Mohamed Sharith', company: 'MaxLinear' },
            { name: 'Kavya VijayaKannan.C', company: 'Aheesa' },
            { name: 'Miruthala.E', company: 'HCL Technologies' },
            { name: 'Macklin Eniya.C', company: 'HCL Technologies' },
            { name: 'Kiran.K', company: 'HCL Technologies' },
            { name: 'Karthikeyan.K', company: 'HCL Technologies' },
            { name: 'Surendhar.G', company: 'HCL Technologies' },
            { name: 'Vignesh.D', company: 'HCL Robotics' }
        ];

        // Render desktop process flow
        function renderDesktopProcessFlow() {
            const container = document.getElementById('desktop-process-flow');
            if(!container){return;}
            container.innerHTML = processSteps.map(step => `
                <div class="process-step">
                    <div class="process-icon ${step.bgColor}">
                        <div class="${step.color}">
                            ${step.icon}
                        </div>
                    </div>
                    <div class="text-center">
                        <h3 class="font-medium text-gray-900 mb-1 text-sm">${step.title}</h3>
                        <p class="text-xs text-gray-600 leading-relaxed">${step.description}</p>
                    </div>
                </div>
            `).join('');
        }

        // Render mobile process flow
        function renderMobileProcessFlow() {
            const container = document.getElementById('mobile-process-flow');
               if(!container){return;}
            container.innerHTML = processSteps.map(step => `
                <div class="section text-center hover-transform transition-all">
                    <div class="inline-flex items-center justify-center w-16 h-16 rounded-full ${step.bgColor} mb-4">
                        <div class="${step.color}">
                            ${step.icon}
                        </div>
                    </div>
                    <h3 class="font-medium text-gray-900 mb-2">${step.title}</h3>
                    <p class="text-sm text-gray-600 leading-relaxed">${step.description}</p>
                </div>
            `).join('');
        }

        // Render students grid
        function renderStudentsGrid() {
            const container = document.getElementById('students-grid');
               if(!container){return;}
            container.innerHTML = placedStudents.map(student => `
                <div class="student-card">
                    <div class="student-avatar">
                        <div class="w-10 h-10 text-gray-400">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                        </div>
                    </div>
                    
                    <h3 class="font-medium text-gray-900 mb-3">${student.name}</h3>
                    
                    <div class="bg-gray-100 rounded-lg p-3 mx-auto w-24 h-12 flex items-center justify-center">
                        <span class="text-xs font-medium text-gray-600">${student.company}</span>
                    </div>
                </div>
            `).join('');
        }

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            renderDesktopProcessFlow();
            renderMobileProcessFlow();
            renderStudentsGrid();
        });

        // JavaScript functionality for the Silicon Craft VLSI registration form

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form functionality
    initializeForm();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeMobileMenu();
});

function initializeMobileMenu() {
    // Mobile menu functionality
    window.toggleMobileMenu = function() {
        const menu = document.getElementById('mobile-menu');
        if (menu) {
            menu.classList.toggle('hidden');
        }
    }
    
    // Close mobile menu when clicking on nav links
    const mobileNavLinks = document.querySelectorAll('#mobile-menu a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            if (menu) {
                menu.classList.add('hidden');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const menu = document.getElementById('mobile-menu');
        const menuButton = document.querySelector('button[onclick="toggleMobileMenu()"]');
        
        if (menu && menuButton && !menu.contains(e.target) && !menuButton.contains(e.target)) {
            menu.classList.add('hidden');
        }
    });
}

function initializeForm() {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
        
        // Add real-time validation
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', validateField);
            field.addEventListener('input', clearValidationErrors);
        });
        
        // Add checkbox validation for "How did you know" section
        const checkboxes = form.querySelectorAll('input[name="howDidYouKnow"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', validateCheckboxGroup);
        });
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validate form
    if (!validateForm(form)) {
        showToast('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.innerHTML = '<div class="spinner inline-block mr-2"></div>Submitting...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showToast('Registration submitted successfully! We will contact you soon.', 'success');
        
        // Log form data (for development)
        console.log('Form Data Submitted:', Object.fromEntries(formData));
        
        // Optionally reset form
        // form.reset();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
}

function validateForm(form) {
    let isValid = true;
    
    // Check required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    // Check if at least one checkbox is selected for "How did you know"
    const checkboxes = form.querySelectorAll('input[name="howDidYouKnow"]:checked');
    if (checkboxes.length === 0) {
        showToast('Please select at least one option for "How did you know about Silicon Craft VLSI?"', 'error');
        isValid = false;
    }
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing validation classes
    field.classList.remove('invalid', 'valid');
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && !value) {
        field.classList.add('invalid');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('invalid');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            field.classList.add('invalid');
            return false;
        }
    }
    
    // Number validation for percentages
    if (field.type === 'number' && value) {
        const num = parseFloat(value);
        if (num < 0 || num > 100) {
            field.classList.add('invalid');
            return false;
        }
    }
    
    // If we get here, field is valid
    if (value) {
        field.classList.add('valid');
    }
    
    return true;
}

function clearValidationErrors(e) {
    const field = e.target;
    field.classList.remove('invalid');
}

function validateCheckboxGroup() {
    const checkboxes = document.querySelectorAll('input[name="howDidYouKnow"]:checked');
    const container = document.querySelector('input[name="howDidYouKnow"]').closest('div').parentElement;
    
    if (checkboxes.length > 0) {
        container.classList.remove('invalid');
    }
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '✓' : '✕';
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

function initializeSmoothScrolling() {
    // Add smooth scrolling to navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeAnimations() {
    // Add intersection observer for fade-in animations
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
    
    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add click animations to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('animate-pulse');
            setTimeout(() => {
                this.classList.remove('animate-pulse');
            }, 300);
        });
    });
}

// Progress bar animation for seat availability
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Call progress bar animation when page loads
window.addEventListener('load', animateProgressBars);

// Add event listeners for CTA buttons
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('button');
    
    ctaButtons.forEach(button => {
        if (button.textContent.includes('Apply') || 
            button.textContent.includes('Start') || 
            button.textContent.includes('Reserve')) {
            
            button.addEventListener('click', function() {
                // Scroll to registration form
                const registrationSection = document.getElementById('registration');
                if (registrationSection) {
                    registrationSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });
});

// Form auto-save functionality (optional)
function autoSaveForm() {
    const form = document.getElementById('registrationForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    localStorage.setItem('vlsi_registration_draft', JSON.stringify(data));
}

// Load saved form data
function loadSavedFormData() {
    const savedData = localStorage.getItem('vlsi_registration_draft');
    if (!savedData) return;
    
    try {
        const data = JSON.parse(savedData);
        const form = document.getElementById('registrationForm');
        
        Object.keys(data).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field) {
                if (field.type === 'checkbox') {
                    field.checked = data[key] === field.value;
                } else {
                    field.value = data[key];
                }
            }
        });
    } catch (error) {
        console.error('Error loading saved form data:', error);
    }
}

// Auto-save form data every 30 seconds
setInterval(autoSaveForm, 30000);

// Load saved data when page loads
window.addEventListener('load', loadSavedFormData);

// Clear saved data when form is successfully submitted
function clearSavedFormData() {
    localStorage.removeItem('vlsi_registration_draft');
}

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    // ESC key to close any open modals or reset focus
    if (e.key === 'Escape') {
        document.activeElement.blur();
        // Close mobile menu
        const menu = document.getElementById('mobile-menu');
        if (menu && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
        }
    }
    
    // Enter key on buttons
    if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
        e.target.click();
    }
});

// Performance optimization - lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
window.addEventListener('load', lazyLoadImages);

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    console.log(`Tracking event: ${eventName}`, eventData);
    
    // Replace with actual analytics tracking
    // gtag('event', eventName, eventData);
    // or
    // analytics.track(eventName, eventData);
}

// Track form interactions
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        // Track form start
        const firstInput = form.querySelector('input');
        if (firstInput) {
            firstInput.addEventListener('focus', function() {
                trackEvent('form_start', { form_name: 'vlsi_registration' });
            }, { once: true });
        }
        
        // Track form completion
        form.addEventListener('submit', function() {
            trackEvent('form_submit', { form_name: 'vlsi_registration' });
        });
    }
    
    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('button');
    ctaButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            trackEvent('cta_click', { 
                button_text: this.textContent.trim(),
                button_position: index 
            });
        });
    });
});

//placement 
 // Enhanced JavaScript functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Enhanced fade-in animation on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.classList.add('animated');
                    }
                });
            }, observerOptions);

            // Observe all cards and sections for animation
            document.querySelectorAll('.story-card, .partner-card, .partner-card-small, .process-step').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });

            // Enhanced hover effects for interactive elements
            document.querySelectorAll('.btn').forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px)';
                    this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'none';
                });
            });

            // Add progressive loading for images
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
                
                img.addEventListener('error', function() {
                    // Fallback for broken images
                    this.style.display = 'none';
                    const parent = this.parentElement;
                    if (parent) {
                        parent.style.background = 'linear-gradient(45deg, #f0f0f0, #e0e0e0)';
                        parent.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; font-size: 12px;">Company Logo</div>';
                    }
                });
            });

            // Add scroll-based header styling
            let lastScrollTop = 0;
            window.addEventListener('scroll', function() {
                const st = window.pageYOffset || document.documentElement.scrollTop;
                const header = document.querySelector('.header');
                
                if (st > 100) {
                    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                    header.style.backdropFilter = 'blur(10px)';
                } else {
                    header.style.boxShadow = 'none';
                    header.style.backdropFilter = 'none';
                }
                
                lastScrollTop = st;
            });
        });


 const icons = {
          book: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 2H5C3.346 2 2 3.346 2 5v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3V5c0-1.654-1.346-3-3-3zm0 17H5a1 1 0 01-1-1V5c0-.551.449-1 1-1h14c.551 0 1 .449 1 1v13a1 1 0 01-1 1z"/></svg>',
          graduation: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2z"/><path d="M11 12.8l-7.9-3.59V17a5 5 0 0010 0v-4.2z"/></svg>',
          announcement: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 2H4v20l8-4 8 4V2z"/></svg>'
        };

        const banners = [
          {
            bg: "linear-gradient(to right, #6b21a8, #4c1d95)",
            icon: icons.book,
            title: "Course Alert: VLSI Design Masterclass",
            desc: "Learn from industry experts and work on real-time projects.",
            cta: "Apply Now"
          },
          {
            bg: "linear-gradient(to right, #dc2626, #991b1b)",
            icon: icons.graduation,
            title: "Placement News: 20+ Students Hired",
            desc: "Our students have been placed in top semiconductor companies.",
            cta: "View Placements"
          },
          {
            bg: "linear-gradient(to right, #15803d, #166534)",
            icon: icons.announcement,
            title: "Announcement: New Embedded Batch",
            desc: "Enroll now for the upcoming embedded systems batch.",
            cta: "Enroll Today"
          }
        ];

        let currentBanner = 0;

        function showBanner(index) {
          currentBanner = index;
          const b = banners[index];

          document.getElementById("banner").style.background = b.bg;

          const iconContainer = document.getElementById("banner-icon");
          iconContainer.innerHTML = b.icon;
          iconContainer.classList.remove("pop-animate");
          void iconContainer.offsetWidth; // reset animation
          iconContainer.classList.add("pop-animate");

          document.getElementById("banner-title").textContent = b.title;
          document.getElementById("banner-desc").textContent = b.desc;
          document.getElementById("banner-cta").textContent = b.cta;

          const bannerContent = document.getElementById("banner-content");
          bannerContent.classList.remove("fade-in");
          void bannerContent.offsetWidth;
          bannerContent.classList.add("fade-in");

          document.querySelectorAll(".banner-dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
          });
        }

        setInterval(() => {
          currentBanner = (currentBanner + 1) % banners.length;
          showBanner(currentBanner);
        }, 5000);