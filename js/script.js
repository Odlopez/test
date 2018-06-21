'use strict';

var container = document.querySelector('.container');
var video = document.querySelector('.video');
var audio = document.querySelector('.audio');
var button = document.querySelector('.main__button');
var mainTitle = document.querySelector('.main__title');
var svg = document.querySelector('.main__svg');
var firstCircle = document.querySelector('.main__first-circle');
var secondCircle = document.querySelector('.main__second-circle');
var thirdCircle = document.querySelector('.main__third-circle');
var slider = document.querySelector('.main__slider');
var pageTwoTitle = document.querySelector('.page-two__title');
var pageTwoButtonInner = document.querySelector('.page-two__button-inner');
var pageTwoText = document.querySelector('.page-two__text');
var pageButton = document.querySelector('.page-two__button');
var shadow = document.querySelector('.shadow');

var rewindsMedia = function (sec) {
  video.currentTime = sec;
  audio.currentTime= sec;
}

var onPageButtonClick = function () {
  mainTitle.classList.remove('js-title-closed');
  slider.classList.remove('js-slider-closed');
  button.classList.remove('js-button-closed');
  svg.classList.remove('js-svg-closed');
  container.classList.remove('js-container-closed');
  firstCircle.classList.remove('js-first-circle-moved');
  secondCircle.classList.remove('js-second-circle-moved');
  thirdCircle.classList.remove('js-third-circle-moved');
  pageTwoTitle.classList.remove('js-page-title-rotate');
  pageTwoText.classList.remove('js-page-text-rotate');
  pageTwoButtonInner.classList.remove('js-page-button-rotate');
  shadow.classList.remove('js-shadow-closed');

  setTimeout( function () {
    mainTitle.style.display = 'block';
    button.style.display = 'block';
  }, 510);
}

var onButtonClick = function () {
  mainTitle.classList.add('js-title-closed');
  slider.classList.add('js-slider-closed');
  button.classList.add('js-button-closed');
  svg.classList.add('js-svg-closed');
  container.classList.add('js-container-closed');
  firstCircle.classList.add('js-first-circle-moved');
  secondCircle.classList.add('js-second-circle-moved');
  thirdCircle.classList.add('js-third-circle-moved');
  pageTwoTitle.classList.add('js-page-title-rotate');
  pageTwoText.classList.add('js-page-text-rotate');
  pageTwoButtonInner.classList.add('js-page-button-rotate');
  shadow.classList.add('js-shadow-closed');

  setTimeout( function () {
    mainTitle.style.display = 'none';
    button.style.display = 'none';
  }, 510);
}

var onThirdCircleAnimationstart = function () {
  rewindsMedia(28);
};

var onDocumentLoaded = function () {
  rewindsMedia(5);
}

var onDocumentClick = function () {
  if (audio.paused) {
    var sec = video.currentTime;
    console.log(video.currentTime);
    rewindsMedia(sec);
  }
};

pageButton.addEventListener('click', onPageButtonClick);
thirdCircle.addEventListener('animationstart', onThirdCircleAnimationstart);
button.addEventListener('click', onButtonClick);
document.addEventListener('DOMContentLoaded', onDocumentLoaded);
document.addEventListener('click', onDocumentClick);
