/**
 * Testimonials Carousel - Pure JavaScript Implementation
 * Features: Auto-scroll, pause on hover, seamless looping, responsive
 */ class TestimonialsCarousel {
    constructor(){
        // DOM elements
        this.carouselTrack = document.getElementById('carouselTrack');
        this.carouselContainer = document.getElementById('carouselContainer');
        this.pauseIndicator = document.getElementById('pauseIndicator');
        // Animation state
        this.translateX = 0;
        this.isAutoPlaying = true;
        this.animationId = null;
        this.speed = 1; // pixels per frame
        // Card properties
        this.cardWidth = 384; // Default card width in pixels
        this.originalCardsCount = 0;
        // Initialize carousel
        this.init();
    }
    /**
     * Initialize the carousel
     */ init() {
        if (!this.carouselTrack || !this.carouselContainer) {
            console.error('Testimonials carousel elements not found');
            return;
        }
        // Set up responsive card width
        this.updateCardWidth();
        // Duplicate testimonials for seamless loop
        this.duplicateTestimonials();
        // Add event listeners
        this.bindEvents();
        // Start animation
        this.startAnimation();
        // Handle window resize
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    /**
     * Update card width based on screen size
     */ updateCardWidth() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 480) this.cardWidth = 288; // 18rem
        else if (screenWidth <= 768) this.cardWidth = 320; // 20rem
        else this.cardWidth = 384; // 24rem
    }
    /**
     * Get all testimonial cards
     */ getTestimonialCards() {
        return this.carouselTrack.querySelectorAll('.testimonial-card');
    }
    /**
     * Duplicate testimonials for seamless loop
     */ duplicateTestimonials() {
        const originalCards = Array.from(this.getTestimonialCards());
        this.originalCardsCount = originalCards.length;
        if (this.originalCardsCount === 0) {
            console.warn('No testimonial cards found');
            return;
        }
        // Clone all cards and append them for seamless loop
        originalCards.forEach((card)=>{
            const clone = card.cloneNode(true);
            this.carouselTrack.appendChild(clone);
        });
        // Clone again for extra smoothness if needed
        originalCards.forEach((card)=>{
            const clone = card.cloneNode(true);
            this.carouselTrack.appendChild(clone);
        });
    }
    /**
     * Auto-scroll animation with seamless looping
     */ animate() {
        if (!this.isAutoPlaying) {
            this.animationId = requestAnimationFrame(this.animate.bind(this));
            return;
        }
        // Calculate the total width of original cards
        const maxTranslate = this.cardWidth * this.originalCardsCount;
        // Reset to beginning when we've scrolled through all original items
        if (Math.abs(this.translateX) >= maxTranslate) this.translateX = 0; // Seamless reset
        else this.translateX -= this.speed; // Smooth pixel-by-pixel movement
        // Apply transform
        this.carouselTrack.style.transform = `translateX(${this.translateX}px)`;
        // Continue animation
        this.animationId = requestAnimationFrame(this.animate.bind(this));
    }
    /**
     * Start the animation
     */ startAnimation() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.animate();
    }
    /**
     * Pause animation on mouse enter
     */ handleMouseEnter() {
        this.isAutoPlaying = false;
        if (this.pauseIndicator) this.pauseIndicator.textContent = 'Paused - move cursor away to resume';
    }
    /**
     * Resume animation on mouse leave
     */ handleMouseLeave() {
        this.isAutoPlaying = true;
        if (this.pauseIndicator) this.pauseIndicator.textContent = 'Hover to pause';
    }
    /**
     * Handle window resize
     */ handleResize() {
        // Debounce resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(()=>{
            this.updateCardWidth();
            // Reset animation to prevent jumps
            this.translateX = 0;
            this.carouselTrack.style.transform = `translateX(${this.translateX}px)`;
        }, 100);
    }
    /**
     * Bind event listeners
     */ bindEvents() {
        // Mouse events for pause/resume
        this.carouselContainer.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        this.carouselContainer.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        // Touch events for mobile
        this.carouselContainer.addEventListener('touchstart', this.handleMouseEnter.bind(this));
        this.carouselContainer.addEventListener('touchend', this.handleMouseLeave.bind(this));
        // Focus events for accessibility
        this.carouselContainer.addEventListener('focusin', this.handleMouseEnter.bind(this));
        this.carouselContainer.addEventListener('focusout', this.handleMouseLeave.bind(this));
        // Page visibility API to pause when tab is not active
        document.addEventListener('visibilitychange', ()=>{
            if (document.hidden) this.isAutoPlaying = false;
            else this.isAutoPlaying = true;
        });
    }
    /**
     * Cleanup method
     */ destroy() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        // Remove event listeners
        this.carouselContainer.removeEventListener('mouseenter', this.handleMouseEnter.bind(this));
        this.carouselContainer.removeEventListener('mouseleave', this.handleMouseLeave.bind(this));
        this.carouselContainer.removeEventListener('touchstart', this.handleMouseEnter.bind(this));
        this.carouselContainer.removeEventListener('touchend', this.handleMouseLeave.bind(this));
        this.carouselContainer.removeEventListener('focusin', this.handleMouseEnter.bind(this));
        this.carouselContainer.removeEventListener('focusout', this.handleMouseLeave.bind(this));
        window.removeEventListener('resize', this.handleResize.bind(this));
    }
}
/**
 * Utility functions for adding testimonials dynamically
 */ const TestimonialUtils = {
    /**
     * Create a new testimonial card element
     * @param {Object} testimonial - Testimonial data object
     * @returns {HTMLElement} - Created testimonial card element
     */ createTestimonialCard (testimonial) {
        const { name = 'Anonymous', institute = 'Unknown Institute', rating = 5, content = 'No testimonial provided', initials = 'AA' } = testimonial;
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="card-content">
                <div class="stars-container">
                    ${this.generateStars(rating)}
                </div>
                <p class="testimonial-content">${content}</p>
            </div>
            <div class="student-info">
                <div class="avatar">${initials}</div>
                <div class="student-details">
                    <h4 class="student-name">${name}</h4>
                    <p class="student-institute">${institute}</p>
                </div>
            </div>
        `;
        return card;
    },
    /**
     * Generate star rating HTML
     * @param {number} rating - Rating from 1 to 5
     * @returns {string} - HTML string for stars
     */ generateStars (rating) {
        const starPath = 'm11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z';
        let stars = '';
        for(let i = 1; i <= 5; i++)if (i <= rating) stars += `<svg class="star star-filled" viewBox="0 0 24 24" fill="currentColor"><path d="${starPath}"/></svg>`;
        else stars += `<svg class="star star-empty" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="${starPath}"/></svg>`;
        return stars;
    },
    /**
     * Add new testimonials to the carousel
     * @param {Array} testimonials - Array of testimonial objects
     */ addTestimonials (testimonials, carousel) {
        const track = document.getElementById('carouselTrack');
        if (!track) return;
        // Clear existing cards
        track.innerHTML = '';
        // Add new testimonials
        testimonials.forEach((testimonial)=>{
            const card = this.createTestimonialCard(testimonial);
            track.appendChild(card);
        });
        // Re-initialize carousel
        if (carousel) {
            carousel.originalCardsCount = testimonials.length;
            carousel.duplicateTestimonials();
        }
    }
};
// Initialize carousel when DOM is loaded
let testimonialsCarousel;
document.addEventListener('DOMContentLoaded', ()=>{
    testimonialsCarousel = new TestimonialsCarousel();
});
// Cleanup on page unload
window.addEventListener('beforeunload', ()=>{
    if (testimonialsCarousel) testimonialsCarousel.destroy();
});
// Export for external use
if (typeof module !== 'undefined' && module.exports) module.exports = {
    TestimonialsCarousel,
    TestimonialUtils
};
// Global access
window.TestimonialsCarousel = TestimonialsCarousel;
window.TestimonialUtils = TestimonialUtils;

//# sourceMappingURL=scv2.891b004a.js.map
