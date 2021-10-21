import Swiper from 'swiper/bundle';
import profilePic from './../assets/img/perfil.webp';
import aboutMePic from './../assets/img/about.webp';
import homeBg from './../assets/img/web-dev-04.png';
import 'regenerator-runtime/runtime'
import './data'
(async function () {


  if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (a, b) {
      var reg = new RegExp(a, 'g')
      return this.replace(reg, b);
    }
  }
  try {
    const dataStore = new DataStore();

    await dataStore.init();

    //#region ELEMENTS STORE
    const HOME_SUBTITLE = document.querySelector('.home__subtitle');
    const HOME_DESCRIPTION = document.querySelector('.home__description');
    const NAV_MENU = document.getElementById('nav-menu');
    const NAV_TOGGLE = document.getElementById('nav-toggle');
    const NAV_CLOSE = document.getElementById('nav-close');
    const NAV_LINK = document.querySelectorAll('.nav__link');
    const HOME_SOCIAL = document.querySelector(".home__social");
    const FOOTER_SOCIAL = document.querySelector(".footer__socials");


    const ABOUT_DESCRIPTION = document.querySelector('.about__description');
    const EXPERIENCE_COUNT = document.querySelector('.about__info-title.experience');
    const PROJECTS_COUNT = document.querySelector('.about__info-title.projects');
    const AWARDS_COUNT = document.querySelector('.about__info-title.awards');
    const CV_LINK = document.querySelector('.cv--link');

    const FRONTEND_SKILLS = document.querySelector('.skills__content.frontend');
    const BACKEND_SKILLS = document.querySelector('.skills__content.backend');

    const SKILLS_CONTENT = document.getElementsByClassName('skills__content');
    const SKILLS_HEADER = document.querySelectorAll('.skills__header');
    const TABS = document.querySelectorAll('[data-target');
    const TAB_CONTENTS = document.querySelectorAll('[data-content]');
    const SECTIONS = document.querySelectorAll('section[id]');
    const THEME_BUTTON = document.getElementById('theme-button');
    const DARK_THEME = 'dark-theme';
    const ICON_THEME = 'uil-sun';
    const FACEBOOK_LINK = document.querySelectorAll('.fb');
    const LINKEDIN_LINK = document.querySelectorAll('.linked-in');
    const GITHUB_LINK = document.querySelectorAll('.github');
    const INSTAGRAM_LINK = document.querySelectorAll('.ig');

    //#endregion

    document.querySelector('.home__blob-img').setAttribute('xlink:href', profilePic);
    document.querySelector('.about__img').setAttribute('src', aboutMePic);
    document.querySelector('.home__container').style.backgroundImage = `url(${homeBg})`

    //#region DATA BINDING
    HOME_SUBTITLE.textContent = dataStore.get_data('Title');
    HOME_DESCRIPTION.textContent = dataStore.get_data('Description');

    //Updateing Social Links
    const socialLinks = dataStore.get_socialLinks();
    const footerSocialHtml = `<a href="__link" target="_blank" rel="noopener noreferrer" class="footer__social"><i class="uil __icon"></i></a>`;
    const homeSocialHtml = `<a href="__link" target="_blank" rel="noopener noreferrer" class="home__social-icon"><i class="uil __icon"></i></a>`
    socialLinks.forEach(link => {
      let homeLink = homeSocialHtml.replaceAll('__link', link.url).replaceAll('__icon', link.icon);
      HOME_SOCIAL.innerHTML += homeLink;
      if (link.showInFooter) {
        let footerLink = footerSocialHtml.replaceAll('__link', link.url).replaceAll('__icon', link.icon);
        FOOTER_SOCIAL.innerHTML += footerLink;
      }
    });

    //Updating About Me Section
    ABOUT_DESCRIPTION.textContent = dataStore.get_data('AboutMe');
    EXPERIENCE_COUNT.textContent = `${dataStore.get_experience()}+`;
    PROJECTS_COUNT.textContent = `${dataStore.get_data('ProjectsCompleted')}+`;
    AWARDS_COUNT.textContent = `${dataStore.get_data('AwardsRecieved')}+`;
    CV_LINK.href = dataStore.get_cv();

    //Updating Skills Section
    const skills = dataStore.get_data('Skills');
    FRONTEND_SKILLS.querySelector('.skills__subtitle').textContent = skills.FrontEnd.caption;
    BACKEND_SKILLS.querySelector('.skills__subtitle').textContent = skills.Backend.caption;

    const skillTemplate = `<div class="skills__data"><div class="skills__title"><h3 class="skills__name">__name</h3><span class="skills__number">__confidence%</span></div><div class="skills__bar"><span class="skills__percentage" style="width: __confidence%"></span></div></div>`

    const frontEndSkillContainer = FRONTEND_SKILLS.querySelector('.skills__list');
    frontEndSkillContainer.innerHTML = '';
    skills.FrontEnd.skills.forEach(skill => {
      let html = skillTemplate.replaceAll('__name', skill.name).replaceAll('__confidence', skill.confidence);
      frontEndSkillContainer.innerHTML += html;
    });

    const backEndSkillContainer = BACKEND_SKILLS.querySelector('.skills__list');
    backEndSkillContainer.innerHTML = '';
    skills.Backend.skills.forEach(skill => {
      let html = skillTemplate.replaceAll('__name', skill.name).replaceAll('__confidence', skill.confidence);
      backEndSkillContainer.innerHTML += html;
    });

    //Updating Qualifications
    const qualificationOddTemplate = `<div class="qualification__data"><div><h3 class="qualification__title">__name</h3><span class="qualification__subtitle">__subTitle</span><div class="qualification__calendar"><i class="uil uil-calendar-alt"></i>__year</div></div><div><span class="qualification__rounder"></span><span class="qualification__line"></span></div></div>`

    const qualificationEvenTemplate = `<div class="qualification__data"><div></div><div><span class="qualification__rounder"></span><span class="qualification__line"></span></div><div><h3 class="qualification__title">__name</h3><span class="qualification__subtitle">__subTitle</span><div class="qualification__calendar"><i class="uil uil-calendar-alt"></i>__year</div></div></div>`

    const educationList = document.querySelector('.qualification__content#education');
    const education = dataStore.get_data('Education').reverse();
    educationList.innerHTML = '';
    education.forEach((course, index) => {
      let template = (index + 1) % 2 == 0 ? qualificationEvenTemplate : qualificationOddTemplate;
      let html = template.replaceAll('__name', course.title).replaceAll('__subTitle', course.caption).replaceAll('__year', course.year);
      educationList.innerHTML += html;
    });


    const workList = document.querySelector('.qualification__content#work');
    const jobs = dataStore.get_data('Jobs').reverse();
    workList.innerHTML = '';
    jobs.forEach((job, index) => {
      let template = (index + 1) % 2 == 0 ? qualificationEvenTemplate : qualificationOddTemplate;
      let html = template.replaceAll('__name', job.title).replaceAll('__subTitle', job.company).replaceAll('__year', job.year);
      workList.innerHTML += html;
    });


    //Updating portfolio
    const portfolioTemplate = `<div class="portfolio__content"><div class="portfolio__img_box"><div class="cf-inner"><div class="portfolio__img" style="background-image: url(__imgPath);"></div></div></div><div class="portfolio__data"><a class="cf-inner" href="__link" target="_blank" rel="noopener noreferrer"><div class="inner"><h2 class="portfolio__title">__name</h2></div></a></div></div>`

    const portfolio_container = document.querySelector('.portfolio__container');

    portfolio_container.innerHTML = '';
    const portfolios = dataStore.get_data('Portfolio').reverse();

    portfolios.forEach((portfolio, index) => {
      let html = portfolioTemplate.replaceAll('__imgPath', portfolio.image).replaceAll('__name', portfolio.name).replaceAll('__description', portfolio.description).replaceAll('__link', portfolio.link);
      portfolio_container.innerHTML += html;
    });


    //Updating Testimonials

    const testimonialTemplate = `<div class="testimonial__content swiper-slide"><div class="testimonial__data"><div class="testimonial__stars"><i class="uil uil-star testimonial__icon-star"></i><i class="uil uil-star testimonial__icon-star"></i><i class="uil uil-star testimonial__icon-star"></i><i class="uil uil-star testimonial__icon-star"></i><i class="uil uil-star testimonial__icon-star"></i></div><p class="testimonial__description">__testimonial</p></div></div>`

    const testimonails = dataStore.get_data('Testimonials').reverse().map(testimonial => testimonialTemplate.replaceAll('__testimonial', testimonial));

    document.querySelector('.testimonial__container .swiper-wrapper').innerHTML = '';
    document.querySelector('.testimonial__container .swiper-wrapper').innerHTML = testimonails.join('');




    //#endregion


    //#region MENU SHOW Y HIDDEN

    //#endregion  

    //#region MENU SHOW
    /* Validate if constant exists */
    if (NAV_TOGGLE) {
      NAV_TOGGLE.addEventListener('click', () => {
        NAV_MENU.classList.add('show-menu');
      });
    }
    //#endregion

    //#region MENU HIDDEN
    /* Validate if constant exists */
    if (NAV_CLOSE) {
      NAV_CLOSE.addEventListener('click', () => {
        NAV_MENU.classList.remove('show-menu');
      });
    }
    //#endregion

    //#region REMOVE MENU MOBILE
    function linkAction() {
      const NAV_MENU = document.getElementById('nav-menu');
      // When we click on each nav__link, we remove the show-menu class
      NAV_MENU.classList.remove('show-menu');
    }
    NAV_LINK.forEach((n) => n.addEventListener('click', linkAction));
    //#endregion

    //#region ACCORDION SKILLS
    function toggleSkills() {
      let itemClass = this.parentNode.className;

      /* for (let i = 0; i < SKILLS_CONTENT.length; i++) {
        SKILLS_CONTENT[i].classList.add('skills__close');
      } */
      if (this.parentNode.classList.contains('skills__open')) {
        this.parentNode.classList.remove('skills__open');
        this.parentNode.classList.add('skills__close');
      } else {
        this.parentNode.classList.add('skills__open');
        this.parentNode.classList.remove('skills__close');
      }
    }

    SKILLS_HEADER.forEach((el) => {
      el.addEventListener('click', toggleSkills);
    });
    //#endregion

    //#region QUALIFICATION TABS
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
    //#endregion

    //#region PORTFOLIO SWIPER
    /* const portfolioSwiper = new Swiper('.portfolio__container', {
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
    }); */
    //#endregion

    //#region TESTIMONIAL
    const testimonialSlider = new Swiper('.testimonial__container', {
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
    //#endregion

    //#region SCROLL SECTIONS ACTIVE LINK
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
    //#endregion

    //#region CHANGE BACKGROUND HEADER
    function scrollHeader() {
      const NAV = document.getElementById('header');
      // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
      if (this.scrollY >= 200) NAV.classList.add('scroll-header');
      else NAV.classList.remove('scroll-header');
    }
    window.addEventListener('scroll', scrollHeader);
    //#endregion

    //#region SHOW SCROLL UP
    function scrollUp() {
      const SCROLL_UP = document.getElementById('scroll-up');
      // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
      if (this.scrollY >= 560) SCROLL_UP.classList.add('show-scroll');
      else SCROLL_UP.classList.remove('show-scroll');
    }
    window.addEventListener('scroll', scrollUp);
    //#endregion

    //#region DARK LIGHT THEME
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
    //#endregion

    const CONTACT_FORM = document.getElementById('contact-text-form-form');

    CONTACT_FORM.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      let data = [];
      const inputs = document.querySelectorAll('.contact__input');
      inputs.forEach((ctrl) => {
        data.push({
          name: ctrl.getAttribute('data-field'),
          value: ctrl.value,
          name_attr: ctrl.getAttribute('name')
        });
      });

      let form = new FormData();
      form.append('data', JSON.stringify(data));
      form.append('id', 'contact-text-form-form');
      var action = CONTACT_FORM.getAttribute('action');

      var xhr = new XMLHttpRequest();
      xhr.open('POST', action, true);
      xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
          let response = JSON.parse(this.response);
          if (response.status == 200) {
            document.getElementById("contact__btn_text").textContent = "Message Sent!";
            CONTACT_FORM.reset();
          }
          else {
            document.getElementById("contact__btn_text").textContent = "Try again later..."
          }

        }

      }
      xhr.send(form);
      return false;
    });

    document.getElementById('loader').style.display = 'none';
  } catch (error) {
    console.log(error);
  }

}())