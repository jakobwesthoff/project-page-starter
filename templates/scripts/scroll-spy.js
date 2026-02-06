const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav a');
const navbar = document.querySelector('.navbar');
// Extra 16px buffer makes sections activate slightly early for snappier feel
const navOffset = navbar ? navbar.offsetHeight + 16 : 80;

function updateActiveNav() {
  const scrollPos = window.scrollY + navOffset;
  let currentSection = null;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;

    if (scrollPos >= top && scrollPos < top + height) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (currentSection && link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();
