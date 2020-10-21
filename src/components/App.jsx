import React, { useEffect, useState, createRef, useRef, useReducer } from 'react';
import { Stage, Sprite, Text, Container, useTick } from '@inlet/react-pixi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import * as PIXI from 'pixi.js';

import maskTest from '../assets/masktest.svg';
import bg from '../assets/scene-1-bg.jpg';
import clouds1 from '../assets/clouds-large.png';
import girls from '../assets/Scene_SelfieGirls.png';

// The reducer
const reducer = (_, { data }) => data;

const sceneState = {
  clouds: [
    {
      x: -950,
      y: -950,
      scale: { x: 1, y: 1 },
      zIndex: 3,
      spriteImage: clouds1,
      anchor: 0.5,
      animationDirection: 'LTR'
    },
    {
      x: 150,
      y: 350,
      scale: { x: 0.5, y: 0.5 },
      zIndex: 3,
      spriteImage: clouds1,
      anchor: 0.5,
      animationDirection: 'RTL'
    },
    {
      x: -450,
      y: -550,
      scale: { x: 0.8, y: 0.8 },
      zIndex: 3,
      spriteImage: clouds1,
      anchor: 0.5,
      animationDirection: 'LTR'
    }
  ],
  girls: {
    distance: 0
  }
};

// PIXI must be exposed for PIXI devtools to work
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
  const maskRef = useRef(null);
  const bgRef = useRef(null);

  const cloudRefs = useRef([]);
  const cloud1SpriteRef = useRef(null);
  const cloud2SpriteRef = useRef(null);
  const cloud3SpriteRef = useRef(null);
  const cloud4SpriteRef = useRef(null);

  const [motion, update] = useReducer(reducer);
  const iter = useRef(0);

  // scroll animation
  useEffect(() => {
    // cloud1SpriteRef.current.blendMode = PIXI.BLEND_MODES.MULTIPLY;

    // girlSpriteRef.current.mask = bgRef.current;

    gsap.registerPlugin(ScrollTrigger);

    setTimeout(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          // trigger: listRef.current,
          // start: 'top 100%',
          // markers: true,
          toggleActions: 'play none none reset', // onEnter, onLeave, onEnterBack, onLeaveBack
          // Options: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".
          scrub: true
        }
      });

      tl.to(scrollSceneRef.current.scale, {
        x: 120,
        y: 120,
        duration: 1,
        ease: 'power2.in'
      }, 'start').to(girlSpriteRef.current, {
        x: 100,
        y: 90,
        duration: 1,
        ease: 'power2.out'
      }, '-=1')
    }, 1500);
  }, []);

  // cloud animation
  useTick((delta) => {
    const i = (iter.current += 0.1);
    // const i = 0;

    // const sprite = cloud1SpriteRef.current;
    // // console.log("ScrollScene -> sprite", sprite)
    // const currentX = sprite.transform.position._x;
    // const currentY = sprite.transform.position._y;

    let newSceneState = sceneState;
    // console.log("ScrollScene -> sceneState", sceneState)
    // console.log("ScrollScene -> cloudRefs", cloudRefs)
    // console.log("ScrollScene -> cloudRefs.length", cloudRefs.length)

    if(cloudRefs && cloudRefs.current) {

      cloudRefs.current.map((cloud, i) => {
        let animationSpeed = 1 - cloud.scale.x + 0.1;

        const sprite = cloud;
        const currentX = sprite.transform.position._x;
        const currentY = sprite.transform.position._y;

        newSceneState.clouds[i] = {
          ...sceneState.clouds[i],
          x: currentX >= w / 2 ? -w / 2 - sprite.width : currentX + animationSpeed,
        };
      });

      // console.log("ScrollScene -> newSceneState", newSceneState)

      update({
        type: 'update',
        data: { ...newSceneState }
      });
    }


    // update({
    //   type: 'update',
    //   data: {
    //     x: currentX >= w / 2 ? -w / 2 - sprite.width : currentX + animationSpeed
    //     // x: currentX + animationSpeed
    //     // x: Math.sin(i) * 10, // oscilate
    //     // y: Math.sin(i / 1.5) * 100,
    //     // rotation: Math.sin(i) * Math.PI,
    //     // anchor: Math.sin(i / 2),
    //     // scale: new PIXI.Point(currentX + i, currentY + i)
    //   }
    // });
  });

  return (
    <Container position={[0, 0]} ref={scrollSceneRef} x={w / 2} y={h / 2} sortableChildren={true}>
      {/* <Sprite ref={maskRef} image={maskTest} x={0} y={0} scale={{ x: 5.5, y: 5.5 }} anchor={0.5} /> */}
      {/* <Sprite ref={bgRef} image={bg} x={0} y={0} scale={{ x: 1.5, y: 1.5 }} anchor={0.5} zIndex={0.1} /> */}
      <Sprite ref={girlSpriteRef} image={girls} scale={{ x: 0.5, y: 0.5 }} anchor={0.5} zIndex={5} />
      {/* <Sprite ref={cloud1SpriteRef} image={clouds1} x={-950} y={-950} scale={{ x: 1, y: 1 }} zIndex={0.6} /> */}

      {sceneState.clouds.map((cloud, i) => {
        return (
          <Sprite
            key={i}
            ref={(el) => (cloudRefs.current[i] = el)}
            image={clouds1}
            x={cloud.x}
            y={cloud.y}
            scale={cloud.scale}
            zIndex={6}
            anchor={0}
          />
        );
      })}


      {/* <Sprite bgRef={maskRef} image={maskTest} x={0} y={0} scale={{ x: 5.5, y: 5.5 }} anchor={0.5} /> */}
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
          backgroundColor: 0xff0000,
          resizeTo: window,
          autoDensity: true,
          transparent: true
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
