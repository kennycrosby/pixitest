import React, { useEffect, useState, createRef, useRef, useReducer } from 'react';
import { Stage, Sprite, Text, Container, useTick } from '@inlet/react-pixi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import * as PIXI from 'pixi.js';

import maskTest from '../assets/masktest.svg';
import mask from '../assets/mask.png';

import tbg from '../assets/tbg.png';
// import tgirls from '../assets/tgirls.png';
import tgirls from '../assets/scene_selfiegirls.webp';
import tmask from '../assets/tmask.png';

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
  const mainScrollSceneRef = useRef(null);
  const subSceneRef = useRef(null);
  const girlSpriteRef = useRef(null);
  const maskRef = useRef(null);
  const bgMaskRef = useRef(null);
  const bgRef = useRef(null);

  const cloudRefs = useRef([]);
  const [motion, update] = useReducer(reducer);
  const iter = useRef(0);

  // scroll animation
  useEffect(() => {
    // cloud1SpriteRef.current.blendMode = PIXI.BLEND_MODES.MULTIPLY;

    subSceneRef.current.pivot.set();

    console.log('ScrollScene -> mainScrollSceneRef WIDTH', mainScrollSceneRef.current.width);
    console.log('ScrollScene -> mainScrollSceneRef HEIGHT', mainScrollSceneRef.current.height);
    console.log('ScrollScene -> subSceneRef WIDTH', subSceneRef.current.width);
    console.log('ScrollScene -> subSceneRef HEIGHT', subSceneRef.current.height);

    // maskRef.current.mask = girlSpriteRef.current;
    // maskRef.current.mask = bgRef.current;
    bgRef.current.mask = bgMaskRef.current;

    gsap.registerPlugin(ScrollTrigger);

    // setTimeout(() => {
    //   const tl = gsap.timeline({
    //     scrollTrigger: {
    //       // trigger: listRef.current,
    //       // start: 'top 100%',
    //       // markers: true,
    //       toggleActions: 'play none none reset', // onEnter, onLeave, onEnterBack, onLeaveBack
    //       // Options: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".
    //       scrub: true
    //     }
    //   });

    //   tl.to(
    //     mainScrollSceneRef.current.scale,
    //     {
    //       x: 120,
    //       y: 120,
    //       duration: 1,
    //       ease: 'power2.in'
    //     },
    //     'start'
    //   ).to(
    //     mainScrollSceneRef.current,
    //     {
    //       x: 600,
    //       y: 690,
    //       duration: 1,
    //       ease: 'power2.out'
    //     },
    //     '-=1'
    //   );
    // }, 1500);
  }, []);

  // cloud animation
  useTick((delta) => {
    const i = (iter.current += 0.1);
    let newSceneState = sceneState;
    if (cloudRefs && cloudRefs.current) {
      cloudRefs.current.map((cloud, i) => {
        let animationSpeed = 1 - cloud.scale.x + 0.1;

        const sprite = cloud;
        const currentX = sprite.transform.position._x;
        const currentY = sprite.transform.position._y;

        newSceneState.clouds[i] = {
          ...sceneState.clouds[i],
          x: currentX >= w / 2 ? -w / 2 - sprite.width : currentX + animationSpeed
        };
      });
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

  const sceneWidth = 1440;
  const sceneHeight = 1024;

  const sceneAspect = sceneWidth / sceneHeight;

  return (
    <Container
      position={[w / 2, h / 2]}
      scale={
        w / h > sceneAspect ? { x: w / sceneWidth, y: w / sceneWidth } : { x: h / sceneHeight, y: h / sceneHeight }
      }
      sortableChildren={true}
    >
      {/* <Sprite ref={maskRef} image={mask} scale={{ x: 1, y: 1 }} anchor={0.5} zIndex={6} />
      <Sprite ref={girlSpriteRef} image={girls} mask={maskRef.current} scale={{ x: 0.5, y: 0.5 }} anchor={0.5} zIndex={5} /> */}
      {/* <Sprite ref={bgRef} image={bg} x={0} y={0} scale={{ x: 1.5, y: 1.5 }} anchor={0.5} zIndex={0.1} /> */}

      <Container sortableChildren={true} ref={mainScrollSceneRef}>
        <Container ref={subSceneRef} sortableChildren={true}>
          <Sprite ref={bgRef} image={tbg} scale={{ x: 1, y: 1 }} anchor={0.5} zIndex={0.1} />
          <Sprite ref={bgMaskRef} image={tmask} scale={{ x: 1, y: 1 }} anchor={0.5} zIndex={0.2} />
          <Container ref={girlSpriteRef} sortableChildren={true}>
            <Sprite
              image={tgirls}
              mask={maskRef.current}
              scale={{ x: 1440 / 7262, y: 1440 / 7262 }}
              anchor={0.5}
              zIndex={0.5}
            />
          </Container>
          <Sprite ref={maskRef} image={tmask} scale={{ x: 1, y: 1 }} anchor={0.5} zIndex={0.6} />
          {/* <Sprite ref={maskRef} image={maskTest} scale={{ x: 1, y: 1 }} anchor={0.5} zIndex={6} /> */}
        </Container>

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
      </Container>
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
