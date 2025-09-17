document.addEventListener('DOMContentLoaded', function() {
    
    // --- ACTIVE NAV LINK HIGHLIGHTING ---
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // --- STICKY HEADER ---
    const header = document.getElementById('main-header');
    // The home page doesn't start with a scrolled header
    const isHomePage = currentPage === 'index.html';
    
    if (!isHomePage) {
        header.classList.add('header-scrolled');
    }

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else if (isHomePage) {
            header.classList.remove('header-scrolled');
        }
    });

    // --- MOBILE MENU ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenu = document.getElementById('close-mobile-menu');

    if(mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
        });
    }
    if(closeMobileMenu) {
        closeMobileMenu.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
    }
    // Close mobile menu on clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
    });


    // --- VIDEO MODAL (Only on Home Page) ---
    const playVideoButton = document.getElementById('play-video-button');
    if (playVideoButton) {
        const videoModal = document.getElementById('video-modal');
        const closeVideoModal = document.getElementById('close-video-modal');
        const videoIframe = document.getElementById('video-iframe');
        const originalVideoSrc = videoIframe.src;

        playVideoButton.addEventListener('click', () => {
            videoModal.classList.remove('hidden');
            videoIframe.src = originalVideoSrc + "?autoplay=1"; // Autoplay
        });

        closeVideoModal.addEventListener('click', () => {
            videoModal.classList.add('hidden');
            videoIframe.src = originalVideoSrc; // Stop video
        });
    }

    // --- ON-SCROLL FADE-IN ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // --- ACADEMICS PAGE TABS ---
    const tabButtons = document.querySelectorAll('.academic-tab-button');
    const tabPanes = document.querySelectorAll('.academic-tab-pane');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => {
                    btn.classList.remove('active-tab', 'text-gold', 'border-gold');
                    btn.classList.add('text-gray-500');
                });
                tabPanes.forEach(pane => pane.classList.add('hidden'));

                button.classList.add('active-tab', 'text-gold', 'border-gold');
                button.classList.remove('text-gray-500');
                document.getElementById(button.dataset.target).classList.remove('hidden');
            });
        });
    }

    // --- FAQ ACCORDION (Admissions Page) ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = question.querySelector('i');

            question.addEventListener('click', () => {
                const isVisible = !answer.classList.contains('hidden');
                answer.classList.toggle('hidden');
                icon.classList.toggle('rotate-180', !isVisible);
            });
        });
    }

    // --- GALLERY FILTERING & LIGHTBOX (Gallery Page) ---
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        const filterBtns = document.querySelectorAll('.gallery-filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.getElementById('lightbox-close');
        const lightboxNext = document.getElementById('lightbox-next');
        const lightboxPrev = document.getElementById('lightbox-prev');
        let currentImageIndex;
        let visibleImages = [];

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('active', 'bg-navy', 'text-white');
                    b.classList.add('bg-white', 'text-navy');
                });
                btn.classList.add('active', 'bg-navy', 'text-white');
                btn.classList.remove('bg-white', 'text-navy');
                
                const filter = btn.dataset.filter;
                
                galleryItems.forEach(item => {
                    if (!filter || item.dataset.category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                visibleImages = Array.from(document.querySelectorAll('.gallery-item[style*="block"] img'));
                const clickedImgSrc = e.target.src;
                currentImageIndex = visibleImages.findIndex(img => img.src === clickedImgSrc);
                
                if (currentImageIndex !== -1) {
                    lightboxImg.src = clickedImgSrc;
                    lightbox.classList.remove('hidden');
                }
            });
        });

        function showImage(index) {
            if (index >= visibleImages.length) {
                index = 0; // Loop to the first image
            } else if (index < 0) {
                index = visibleImages.length - 1; // Loop to the last image
            }
            lightboxImg.src = visibleImages[index].src;
            currentImageIndex = index;
        }

        lightboxClose.addEventListener('click', () => lightbox.classList.add('hidden'));
        lightboxNext.addEventListener('click', () => showImage(currentImageIndex + 1));
        lightboxPrev.addEventListener('click', () => showImage(currentImageIndex - 1));
    }

    // --- FOOTER CURRENT YEAR ---
    const yearSpan = document.getElementById('current-year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
