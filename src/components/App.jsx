import React, { useEffect, useState, createRef, useRef, useReducer } from 'react';
import { Stage, Sprite, Text, Container, useTick } from '@inlet/react-pixi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import * as PIXI from 'pixi.js';

import bunny from '../assets/bunny.png';
import guy from '../assets/sprite.png';
import bg from '../assets/sprite2.png';

import girls from '../assets/Scene_SelfieGirls.png';

const reducer = (_, { data }) => data;

const state = {
  sections: 3,
  pages: 3,
  zoom: 75,
  top: createRef()
};

// export const App = () => (
//   <Stage>
//     <Sprite image={bunny} x={100} y={100} />
//   </Stage>
// );

const Girls = ({ w, h }) => {
  // const [motion, update] = useReducer(reducer)
  // const iter = useRef(0)
  // const texture = PIXI.Texture.from(girls);
  // console.log('Girls -> texture', texture.width);
  // console.log('Girls -> texture', texture.height);

  const [motion, update] = useReducer(reducer);
  const iter = useRef(0);

  const girlSpriteRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    setTimeout(() => {
      gsap.to(girlSpriteRef.current.scale, {
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

  useTick((delta) => {
    // const i = iter.current += 0.0001
    const i = 0;

    const sprite = girlSpriteRef.current;
    const currentX = sprite.scale.scope.scale._x;
    const currentY = sprite.scale.scope.scale._y;

    update({
      type: 'update',
      data: {
        // x: Math.sin(i) * 100,
        // y: Math.sin(i / 1.5) * 100,
        // rotation: Math.sin(i) * Math.PI,
        // anchor: Math.sin(i / 2),
        scale: new PIXI.Point(currentX + i, currentY + i)
      }
    });
  });
  return (
    <Sprite ref={girlSpriteRef} image={girls} scale={{ x: 0.5, y: 0.5 }} anchor={0.5} x={w / 2} y={h / 2} {...motion} />
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
        <Size>{({ width, height }) => <Girls w={width} h={height} />}</Size>
      </Stage>
      <div ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  );
};
