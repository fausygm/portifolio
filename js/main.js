
// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function () {

  /* =======================
     SETTINGS PANEL
  ======================= */
  const settingsToggle = document.getElementById('settingsToggle');
  const settingsPanel = document.getElementById('settingsPanel');

  if (settingsToggle && settingsPanel) {
    settingsToggle.addEventListener('click', () => {
      settingsPanel.classList.toggle('show');
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      if (!settingsPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
        settingsPanel.classList.remove('show');
      }
    });
  }

  /* =======================
     TYPED.JS
  ======================= */
  if (typeof Typed !== 'undefined') {
    new Typed('#typing-text', {
      strings: [
        'Flutter and Full-Stack Developer',
        'Mobile App Developer',
        'Web Applications Developer',
        'Graphic Designer'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true
    });
  }

  /* =======================
     THEME (LIGHT/DARK)
  ======================= */
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);

  const themeButtons = document.querySelectorAll('.theme-btn');

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    });
  });

  /* =======================
     COLOR SWITCHING
  ======================= */
  const colorButtons = document.querySelectorAll('.color-btn');

  colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-color');

      document.documentElement.style.setProperty('--primary', color);
      document.documentElement.style.setProperty('--primary-hover', shadeColor(color, -15));

      localStorage.setItem('primaryColor', color);
    });
  });

  // Load saved color
  const savedColor = localStorage.getItem('primaryColor');
  if (savedColor) {
    document.documentElement.style.setProperty('--primary', savedColor);
    document.documentElement.style.setProperty('--primary-hover', shadeColor(savedColor, -15));
  }

  /* =======================
     MOBILE SIDEBAR
  ======================= */
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('show');
    });

    document.addEventListener('click', function (event) {
      if (!sidebar.contains(event.target) &&
          !sidebarToggle.contains(event.target) &&
          sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
      }
    });
  }

  /* =======================
     SMOOTH SCROLL + ACTIVE LINK
  ======================= */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        });
      }

      if (window.innerWidth < 992 && sidebar) {
        sidebar.classList.remove('show');
      }
    });
  });

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;

      if (window.pageYOffset >= sectionTop &&
          window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => link.classList.remove('active'));

    if (current) {
      document
        .querySelector(`.nav-link[href="#${current}"]`)
        ?.classList.add('active');
    }
  });

  /* =======================
     BACK TO TOP
  ======================= */
  const backToTopButton = document.querySelector('.back-to-top');

  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      backToTopButton.style.display =
        window.pageYOffset > 300 ? 'flex' : 'none';
    });
  }

  /* =======================
     FADE-IN ANIMATION
  ======================= */
  const fadeElements = document.querySelectorAll('.fade-in-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = '0.6s ease';
    observer.observe(el);
  });

  /* =======================
     CONTACT FORM
  ======================= */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Your message has been sent!');
      contactForm.reset();
    });
  }

  /* =======================
     LOGO SLIDER RESUME
  ======================= */
  const logoTrack = document.querySelector('.logo-track');

  function restartLogoSlider() {
    if (!logoTrack) {
      return;
    }

    logoTrack.style.animation = 'none';
    void logoTrack.offsetWidth;
    logoTrack.style.animation = '';
  }

  if (logoTrack) {
    window.addEventListener('pageshow', restartLogoSlider);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        restartLogoSlider();
      }
    });
  }

});


/* =======================
   COLOR SHADE FUNCTION
======================= */
function shadeColor(color, percent) {
  let R = parseInt(color.substring(1,3),16);
  let G = parseInt(color.substring(3,5),16);
  let B = parseInt(color.substring(5,7),16);

  R = Math.min(255, parseInt(R * (100 + percent) / 100));
  G = Math.min(255, parseInt(G * (100 + percent) / 100));
  B = Math.min(255, parseInt(B * (100 + percent) / 100));

  return "#" +
    R.toString(16).padStart(2,'0') +
    G.toString(16).padStart(2,'0') +
    B.toString(16).padStart(2,'0');
}
