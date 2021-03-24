"use strict";
//Import jQuery module (npm i jquery)
//import $ from 'jquery'; window.jQuery = $; window.$ = $;

//Import vendor jQuery
//require('~/js/libs/jquery-1.12.4.min.js');

import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
SwiperCore.use([Navigation, Pagination]);

document.addEventListener('DOMContentLoaded', () => {

  const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    slidesPerView: 1,
    //spaceBetween: 10,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 600px
      600: {
        slidesPerView: 1,
        spaceBetween: 30
      },
      // when window width is >= 900px
      900: {
        slidesPerView: 1,
        spaceBetween: 40
      }
    }
  });
  //check mobile
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };


  //if mobile add to body class _touch else add class _pc
  if (isMobile.any()) {
    document.body.classList.add('_touch');
    let subMenus = document.querySelectorAll('.has__submenu');
    if (subMenus.length > 0){
      for (let index = 0; index < subMenus.length; index++) {
        const subMenu = subMenus[index];
        subMenu.addEventListener('click', function(e){
          subMenu.parentElement.classList.toggle('active');
        });
      }
    }
  }else{
    document.body.classList.add('_pc');
  }


  //click on burger menu
  const menuIcon = document.querySelector('.header__button');
  const menu = document.querySelector('.header__menu');
  if (menuIcon) {
    menuIcon.addEventListener('click', function (e) {
      document.body.classList.toggle('_lock');
      menuIcon.classList.toggle('active');
      menu.classList.toggle('active');
    });
  }



  //go to block
  const menuLinks = document.querySelectorAll('a[data-goto]');
  if (menuLinks.length > 0) {
    for (const menuLink of menuLinks){
      menuLink.addEventListener('click', function (event) {
        event.preventDefault();
        const menuLink = event.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
          document.querySelector(menuLink.dataset.goto).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }; 
      });
    };
  };



  //modal
  const modalBtn = document.querySelector('.call-modal');
  const modal = document.querySelector('#modal');

  const openModal = function () {
    modal.classList.add('show');
  };
  const closeModal = function () {
    modal.classList.remove('show');
  };

  modalBtn.addEventListener('click', openModal);

  modal.addEventListener('click', function(event) {
    const target = event.target;

    if(target.classList.contains('overlay') || target.classList.contains('modal__close')){
      closeModal();
    }
    
  })

})