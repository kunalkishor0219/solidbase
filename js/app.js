/* 
================================================================
  BUILDERS TEMPLATE - CORE GLOBAL JAVASCRIPT (app.js)
================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initStickyNavbar();
  initMobileMenu();
  initBackToTop();
  initAnimatedCounters();
  initWorkingHoursStatus();
});

/* -----------------------------------------
   1. Preloader Fade Out
   ----------------------------------------- */
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });
  }
}

/* -----------------------------------------
   2. Sticky Navbar
   ----------------------------------------- */
function initStickyNavbar() {
  const header = document.querySelector('header');
  if (header) {
    const scrollThreshold = 100;
    
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check in case of page refresh
  }
}

/* -----------------------------------------
   3. Mobile Menu Toggle
   ----------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const header = document.querySelector('header');
  
  if (toggleBtn && navMenu) {
    // Create menu overlay dynamically if it doesn't exist
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'menu-overlay';
      document.body.appendChild(overlay);
    }

    const toggleMenu = () => {
      const isActive = navMenu.classList.toggle('active');
      overlay.classList.toggle('active', isActive);
      
      // Update toggle icon
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        if (isActive) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    };

    const closeMenu = () => {
      navMenu.classList.remove('active');
      overlay.classList.remove('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    };

    toggleBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    // Close mobile menu when clicking any nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }
}

/* -----------------------------------------
   4. Back to Top Button
   ----------------------------------------- */
function initBackToTop() {
  let backBtn = document.querySelector('.back-to-top');
  
  if (!backBtn) {
    // Dynamically insert back to top button if missing
    backBtn = document.createElement('div');
    backBtn.className = 'back-to-top';
    backBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(backBtn);
  }

  const toggleBackToTop = () => {
    if (window.scrollY > 500) {
      backBtn.classList.add('active');
    } else {
      backBtn.classList.remove('active');
    }
  };

  window.addEventListener('scroll', toggleBackToTop);
  
  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  toggleBackToTop();
}

/* -----------------------------------------
   5. Animated Counters
   ----------------------------------------- */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (counters.length === 0) return;

  const countUp = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const duration = 2000; // Animation duration in milliseconds
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      // Easing out quadratic
      const value = Math.round(target * progress * (2 - progress));
      
      counter.innerText = value;

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        counter.innerText = target + (counter.getAttribute('data-suffix') || '');
      }
    };

    animate();
  };

  // Intersection Observer to start counters when visible
  const observerOptions = {
    root: null,
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        countUp(counter);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    // Add raw count value inside attribute if it's set as text
    if (!counter.getAttribute('data-target')) {
      const num = parseInt(counter.innerText.replace(/[^0-9]/g, ''), 10);
      counter.setAttribute('data-target', num);
      if (counter.innerText.includes('+')) counter.setAttribute('data-suffix', '+');
      counter.innerText = '0';
    }
    observer.observe(counter);
  });
}

/* -----------------------------------------
   6. Working Hours live status
   ----------------------------------------- */
function initWorkingHoursStatus() {
  const statusIndicator = document.getElementById('office-status');
  if (!statusIndicator) return;

  // Working Hours definition (Office time in local hours, 0-23)
  // Monday to Saturday: 9:00 AM - 7:00 PM (9:00 to 19:00)
  // Sunday: Closed
  
  const checkStatus = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ... 6 = Saturday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeValue = hours + minutes / 60;

    let isOpen = false;

    if (day >= 1 && day <= 6) { // Monday to Saturday
      if (timeValue >= 9 && timeValue < 19) {
        isOpen = true;
      }
    }

    if (isOpen) {
      statusIndicator.className = 'status-indicator open';
      statusIndicator.innerHTML = '<i class="fa-solid fa-circle"></i> Open Now';
    } else {
      statusIndicator.className = 'status-indicator closed';
      statusIndicator.innerHTML = '<i class="fa-solid fa-circle"></i> Closed Now';
    }

    // Highlight current day in table schedule if it exists
    const dayClasses = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDayClass = dayClasses[day];
    const row = document.querySelector(`.hours-list-item.${currentDayClass}`);
    if (row) {
      row.classList.add('today');
      // Add a small badge "Today"
      const label = row.querySelector('span');
      if (label && !label.innerHTML.includes('(Today)')) {
        label.innerHTML += ' <span style="font-size:0.75rem; color:var(--color-primary); font-weight:bold;">(Today)</span>';
      }
    }
  };

  checkStatus();
  // Check status updates every 60 seconds
  setInterval(checkStatus, 60000);
}
