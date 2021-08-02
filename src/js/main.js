import Swiper from 'swiper/bundle';

/*==================== MENU SHOW Y HIDDEN ====================*/
window.addEventListener('load', function () {
  this.document.getElementById('loader').style.display = 'none';
});

/*==================== MENU SHOW Y HIDDEN ====================*/
const NAV_MENU = document.getElementById('nav-menu');
const NAV_TOGGLE = document.getElementById('nav-toggle');
const NAV_CLOSE = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (NAV_TOGGLE) {
  NAV_TOGGLE.addEventListener('click', () => {
    NAV_MENU.classList.add('show-menu');
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (NAV_CLOSE) {
  NAV_CLOSE.addEventListener('click', () => {
    NAV_MENU.classList.remove('show-menu');
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const NAV_LINK = document.querySelectorAll('.nav__link');

function linkAction() {
  const NAV_MENU = document.getElementById('nav-menu');
  // When we click on each nav__link, we remove the show-menu class
  NAV_MENU.classList.remove('show-menu');
}
NAV_LINK.forEach((n) => n.addEventListener('click', linkAction));

/*==================== ACCORDION SKILLS ====================*/
const SKILLS_CONTENT = document.getElementsByClassName('skills__content');
const SKILLS_HEADER = document.querySelectorAll('.skills__header');

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (let i = 0; i < SKILLS_CONTENT.length; i++) {
    SKILLS_CONTENT[i].className = 'skills__content skills__close';
  }
  if (itemClass === 'skills__content skills__close') {
    this.parentNode.className = 'skills__content skills__open';
  }
}

SKILLS_HEADER.forEach((el) => {
  el.addEventListener('click', toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/

const TABS = document.querySelectorAll('[data-target');
const TAB_CONTENTS = document.querySelectorAll('[data-content]');

TABS.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);

    TAB_CONTENTS.forEach((tabContent) => {
      tabContent.classList.remove('qualification__active');
    });
    target.classList.add('qualification__active');

    TABS.forEach((tab) => {
      tab.classList.remove('qualification__active');
    });
    tab.classList.add('qualification__active');
  });
});

/*==================== SERVICES MODAL ====================*/

/*==================== PORTFOLIO SWIPER  ====================*/
let portfolioSwiper = new Swiper('.portfolio__container', {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  mousewheel: true,
  keyboard: true,
});

/*==================== TESTIMONIAL ====================*/

let testimonialSlider = new Swiper('.testimonial__container', {
  loop: true,
  cssMode: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  mousewheel: true,
  keyboard: true,
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const SECTIONS = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  SECTIONS.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
    } else {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const NAV = document.getElementById('header');
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 200) NAV.classList.add('scroll-header');
  else NAV.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const SCROLL_UP = document.getElementById('scroll-up');
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) SCROLL_UP.classList.add('show-scroll');
  else SCROLL_UP.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const THEME_BUTTON = document.getElementById('theme-button');
const DARK_THEME = 'dark-theme';
const ICON_THEME = 'uil-sun';

// Previously selected topic (if user selected)
const SELECTED_THEME = localStorage.getItem('selected-theme');
const SELECTED_ICON = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => (document.body.classList.contains(DARK_THEME) ? 'dark' : 'light');
const getCurrentIcon = () => (THEME_BUTTON.classList.contains(ICON_THEME) ? 'uil-moon' : 'uil-sun');

// We validate if the user previously chose a topic
if (SELECTED_THEME) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[SELECTED_THEME === 'dark' ? 'add' : 'remove'](DARK_THEME);
  THEME_BUTTON.classList[SELECTED_ICON === 'uil-moon' ? 'add' : 'remove'](ICON_THEME);
}

// Activate / deactivate the theme manually with the button
THEME_BUTTON.addEventListener('click', () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(DARK_THEME);
  THEME_BUTTON.classList.toggle(ICON_THEME);
  // We save the theme and the current icon that the user chose
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});
