document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Crown Toggle Logic (Neon & Sidebar)
    const crown = document.getElementById('crown-toggle');
    const sideNav = document.getElementById('side-nav');
    const navLinks = document.querySelectorAll('.nav-link-item');

    if (crown && sideNav) {
        crown.addEventListener('click', () => {
            // Toggle active/neon state on button
            crown.classList.toggle('neon-active');
            // Toggle sidebar visibility
            sideNav.classList.toggle('open');
        });

        // Close sidebar when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                crown.classList.remove('neon-active');
                sideNav.classList.remove('open');
            });
        });

        // Close sidebar when clicking outside (on the main content)
        document.addEventListener('click', (e) => {
            if (sideNav.classList.contains('open') && 
                !sideNav.contains(e.target) && 
                !crown.contains(e.target)) {
                
                crown.classList.remove('neon-active');
                sideNav.classList.remove('open');
            }
        });
    }

    // 2. Hero Caption Rotator
    const captions = document.querySelectorAll('.hero-caption');
    if (captions.length > 0) {
        let currentCaption = 0;
        
        // Function to switch active caption
        const rotateCaptions = () => {
            // Remove active from current
            captions[currentCaption].classList.remove('active');
            
            // Increment
            currentCaption = (currentCaption + 1) % captions.length;
            
            // Add active to next
            captions[currentCaption].classList.add('active');
        };

        // Rotate every 4 seconds
        setInterval(rotateCaptions, 4000);
    }

    // 3. Intersection Observer for Scroll Reveals
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a number counter, start counting
                if(entry.target.querySelector('.stat-number')) {
                    startCounters(entry.target);
                }
                
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up').forEach(el => {
        observer.observe(el);
    });

    // 4. Number Counter Logic
    function startCounters(section) {
        const counters = section.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16); 
            
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current) + (target > 99 ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + (target > 99 ? '+' : '%');
                    if(target === 15) counter.innerText = '15+';
                    if(target === 100) counter.innerText = '100%';
                }
            };
            updateCounter();
        });
    }

    // 5. Magnetic Button Effect (Refined for Classic feel)
    const buttons = document.querySelectorAll('.btn-main');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const moveX = (x - rect.width / 2) / 15; // Reduced movement for subtler effect
            const moveY = (y - rect.height / 2) / 15;
            
            btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // 6. Department Carousel Logic
    const deptTrack = document.getElementById('deptTrack');
    if (deptTrack) {
        const slides = Array.from(deptTrack.children);
        const nextBtn = document.getElementById('nextDept');
        const prevBtn = document.getElementById('prevDept');
        const dots = document.querySelectorAll('.dot');
        let currentSlideIndex = 0;

        const updateSlide = (index) => {
            // Remove active class from all
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active to current
            slides[index].classList.add('active');
            if(dots[index]) dots[index].classList.add('active');
            
            currentSlideIndex = index;
        };

        nextBtn.addEventListener('click', () => {
            const nextIndex = (currentSlideIndex + 1) % slides.length;
            updateSlide(nextIndex);
        });

        prevBtn.addEventListener('click', () => {
            const prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            updateSlide(prevIndex);
        });

        // Dot navigation
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.slide);
                updateSlide(index);
            });
        });
    }

    // 7. FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            
            // Toggle Active Class on Question
            question.classList.toggle('active');

            // Toggle Max-Height for smooth slide
            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = 0;
            }

            // Optional: Close other FAQs
            faqQuestions.forEach(otherQ => {
                if(otherQ !== question && otherQ.classList.contains('active')) {
                    otherQ.classList.remove('active');
                    otherQ.nextElementSibling.style.maxHeight = 0;
                }
            });
        });
    });

});