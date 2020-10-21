import React, { useEffect, useState, createRef, useRef, useReducer } from 'react';
import { Stage, Sprite, Text, Container, useTick } from '@inlet/react-pixi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import * as PIXI from 'pixi.js';

import bunny from '../assets/bunny.png';
import guy from '../assets/sprite.png';
import bg from '../assets/sprite2.png';


import clouds1 from '../assets/clouds-large.png';
import girls from '../assets/Scene_SelfieGirls.png';

const reducer = (_, { data }) => data;

window.PIXI = PIXI;

const state = {
  sections: 3,
  pages: 3,
  zoom: 75,
  top: createRef()
};

const ScrollScene = ({ w, h }) => {
  const scrollSceneRef = useRef(null);
  const girlSpriteRef = useRef(null);
  const cloud1SpriteRef = useRef(null);
  const cloud2SpriteRef = useRef(null);
  const cloud3SpriteRef = useRef(null);
  const cloud4SpriteRef = useRef(null);

  const [motion, update] = useReducer(reducer);
  const iter = useRef(0);

  // scroll animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    setTimeout(() => {
      gsap.to(scrollSceneRef.current.scale, {
        scrollTrigger: {
          // trigger: listRef.current,
          // start: 'top 100%',
          // markers: true,
          toggleActions: 'play none none reset', // onEnter, onLeave, onEnterBack, onLeaveBack
          // Options: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".
          scrub: true
        },
        x: 6,
        y: 6,
        ease: 'power2.in'
      });
    }, 1500);
  }, []);

  // cloud animation
  useTick((delta) => {
    const i = iter.current += 0.1
    // const i = 0;

    const sprite = cloud1SpriteRef.current;
    // console.log("ScrollScene -> sprite", sprite)
    const currentX = sprite.transform.position._x;
    const currentY = sprite.transform.position._y;

    let animationSpeed = 0.9;

    // off the screen to the right
    if(currentX > w/2) {
      animationSpeed = currentX * -1;
    }
    // console.log("ScrollScene -> w", w)
    // console.log("ScrollScene -> currentX", currentX);
    // console.log("ScrollScene -> currentX + sprite.width/2", currentX + sprite.width/2)

    // console.log("ScrollScene -> currentX - sprite.width/2 ", currentX - sprite.width/2 )
    // console.log("ScrollScene -> sprite.width", sprite.width)
    // console.log("ScrollScene -> w/2", w/2)
    // console.log("ScrollScene -> animationSpeed", animationSpeed)

    const xTest = currentX - sprite.width/2;

    update({
      type: 'update',
      data: {
        x: xTest > w/2 && Math.sign(xTest) ? -4000 : currentX + animationSpeed
        // x: Math.sin(i) * 10, // oscilate
        // y: Math.sin(i / 1.5) * 100,
        // rotation: Math.sin(i) * Math.PI,
        // anchor: Math.sin(i / 2),
        // scale: new PIXI.Point(currentX + i, currentY + i)
      }
    });
  });

  return (
    <Container ref={scrollSceneRef} x={w / 2} y={h / 2}>
      <Sprite ref={girlSpriteRef} image={girls} scale={{ x: 0.5, y: 0.5 }} anchor={0.5} />
      <Sprite ref={cloud1SpriteRef} image={clouds1} x={-800} y={-500} anchor={0.5} scale={{x: 1, y: 1}} {...motion} />
      {/* <Sprite ref={cloud2SpriteRef} image={clouds1} x={-800} y={-500} scale={{x: 0.1, y: 0.1}} anchor={0.5} {...motion} />
      <Sprite ref={cloud3SpriteRef} image={clouds1} x={-800} y={-500} scale={{x: 0.6, y: 0.6}} anchor={0.5} {...motion} />
      <Sprite ref={cloud4SpriteRef} image={clouds1} x={-800} y={-500} scale={{x: 0.6, y: 0.6}} anchor={0.5} {...motion} /> */}
    </Container>
  );
};

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight
});

const Size = ({ children }) => {
  const [size, setSize] = useState(getSize);
  useEffect(() => {
    const update = () => setSize(getSize());
    window.onresize = update;
    return () => (window.onresize = null);
  }, []);
  return children(size);
};

export const App = () => {
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);

  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  useEffect(() => {
    console.log('state.top.current', state.top.current);
  }, [state.top.current]);

  return (
    <>
      <Stage
        {...getSize()}
        options={{
          backgroundColor: 0x000000,
          resizeTo: window,
          autoDensity: true,
          transparent: false
        }}
      >
        <Size>{({ width, height }) => <ScrollScene w={width} h={height} />}</Size>
      </Stage>
      <div ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  );
};
