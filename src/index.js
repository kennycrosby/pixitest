import './styles.css';
import * as PIXI from 'pixi.js';
import data from './bm/data.json';
import lottie from 'lottie-web';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

let sceneWidth = 1160;
let sceneHeight = 681;

let w = window.innerWidth;
let h = window.innerHeight;

const sceneAspect = sceneWidth / sceneHeight;

// lottie.loadAnimation({
//   container: document.querySelector('#app'), // the dom element that will contain the animation
//   renderer: 'html',
//   loop: true,
//   autoplay: true,
//   animationData: data // the path to the animation json
// });

const ScrollLottie = (obj) => {
  let anim = lottie.loadAnimation({
    container: document.querySelector(obj.target),
    renderer: 'html',
    loop: false,
    autoplay: false,
    animationData: data,
    rendererSettings: {
      // context: canvasContext, // the canvas context, only support "2d" context
      preserveAspectRatio: 'xMinYMin slice', // Supports the same options as the svg element's preserveAspectRatio property
      clearCanvas: false,
      progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
      hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
      className: 'scene1bodymovin',
      id: 'scene1bodymovinId'
    },
    onComplete: () => {
      console.log(' this works');
    }
  });

  let timeObj = { currentFrame: 0 };
  let endString =
    obj.speed === 'slow' ? '+=2000' : obj.speed === 'medium' ? '+=1000' : obj.speed === undefined ? '+=1250' : '+=500';
  ScrollTrigger.create({
    trigger: obj.target,
    scrub: true,
    pin: true,
    start: 'top top',
    end: endString,
    onUpdate: (self) => {
      if (obj.duration) {
        gsap.to(timeObj, {
          duration: obj.duration,
          currentFrame: Math.floor(self.progress * (anim.totalFrames - 1)),
          onUpdate: () => {
            anim.goToAndStop(timeObj.currentFrame, true);
          },
          ease: 'expo'
        });
      } else {
        anim.goToAndStop(self.progress * (anim.totalFrames - 1), true);
      }
    }
  });

  anim.addEventListener('DOMLoaded', () => {
    console.log('TEST');
    resizeAnimation();
  });

  window.addEventListener('resize', () => {
    anim.resize();
    resizeAnimation();
  });
};

gsap.registerPlugin(ScrollTrigger);

ScrollLottie({
  target: '#app',
  path: '',
  duration: 4,
  speed: 'slow'
});

const resizeAnimation = () => {
  let animContainer = document.querySelector('.scene1bodymovin');
  animContainer.style.transform = `scale(${w / h > sceneAspect ? w / sceneWidth : h / sceneHeight}) translateX(-50%)`;
};

// import React from 'react';
// import ReactDOM from 'react-dom';

// import { App } from './components/App';

// import * as PIXI from 'pixi.js';
// import bunny from '../bunny.png';
// import guy from '../sprite.png';
// import bg from '../sprite2.png';

// const canvas = document.getElementById('mycanvas');

// let _w = window.innerWidth;
// let _h = window.innerHeight;

// ReactDOM.render(<App />, document.getElementById('app'));
