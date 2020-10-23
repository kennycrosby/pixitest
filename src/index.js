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

let target = '#app';
let duration = 4;
let speed = 'slow';

const ScrollLottie = () => {
  let anim = lottie.loadAnimation({
    container: document.querySelector(target),
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
    onComplete: () => {}
  });

  let timeObj = { currentFrame: 0 };
  let endString =
    speed === 'slow' ? '+=2000' : speed === 'medium' ? '+=1000' : speed === undefined ? '+=1250' : '+=500';

  ScrollTrigger.create({
    trigger: target,
    scrub: true,
    pin: true,
    start: 'top top',
    end: endString,
    onUpdate: (self) => {
      if (duration) {
        gsap.to(timeObj, {
          duration: duration,
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
    resizeAnimation();
  });

  window.addEventListener('resize', () => {
    anim.resize();
    resizeAnimation();
    setTimeout(() => {
      resizeAnimation();
    }, 150);
  });
};

gsap.registerPlugin(ScrollTrigger);

ScrollLottie();

const resizeAnimation = () => {
  let animContainer = document.querySelector('.scene1bodymovin');
  animContainer.style.transform = `scale(${
    w / h > sceneAspect ? w / sceneWidth + 0.05 : h / sceneHeight + 0.05
  }) translate(-50%, -50%)`;
};
