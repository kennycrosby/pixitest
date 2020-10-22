import React, { useEffect, useState, createRef, useRef, useReducer } from 'react';
import { Stage, Sprite, Text, Container, useTick } from '@inlet/react-pixi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import * as PIXI from 'pixi.js';

// sprites
import tbg from '../assets/tbg.png';
import tgirls from '../assets/tgirls.png';
import tmask from '../assets/tmask.png';
import clouds1 from '../assets/clouds-large.png';

let loader = PIXI.Loader.shared;

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
      x: -1000,
      y: -50,
      scale: { x: 0.8, y: 0.8 },
      zIndex: 3,
      spriteImage: clouds1,
      anchor: 0.5,
      animationDirection: 'LTR'
    },
    {
      x: 0,
      y: 0,
      scale: { x: 0.5, y: 0.5 },
      zIndex: 3,
      spriteImage: clouds1,
      anchor: 0.5,
      animationDirection: 'RTL'
    },
    {
      x: -600,
      y: -100,
      scale: { x: 0.3, y: 0.3 },
      zIndex: 2,
      spriteImage: clouds1,
      anchor: 0.5,
      animationDirection: 'RTL'
    },
    {
      x: -450,
      y: -650,
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
  const [isLoading, setIsLoading] = useState(true);
  const iter = useRef(0);

  useEffect(() => {

    loader.add('tbgLoad', tbg);
    loader.add('tgirlsLoad', tgirls);
    loader.add('tmaskLoad', tmask);
    loader.add('clouds1Load', clouds1);
    loader.onProgress.add(handleLoadProgress);
    loader.onLoad.add(handleLoadAsset);
    loader.onError.add(handleLoadError);
    loader.load(handleLoadComplete);
  }, []);

  function handleLoadProgress(loader, resource) {
    console.log(loader.progress + '% loaded');
  }

  function handleLoadAsset(loader, resource) {
    console.log('asset loaded ' + resource.name);
  }

  function handleLoadError(loader, resource) {
    console.error('load error', loader);
    console.error('load error resource', resource);
  }

  function handleLoadComplete(loader, resources) {
    console.log('handleLoadComplete -> resources', resources.guy);
    setIsLoading(false);
  }

  // scroll animation
  useEffect(() => {
    if (isLoading) return;

    // cloud1SpriteRef.current.blendMode = PIXI.BLEND_MODES.MULTIPLY;
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

      tl.to(
        mainScrollSceneRef.current.scale,
        {
          x: 120,
          y: 120,
          duration: 1,
          ease: 'power2.in'
        },
        'start'
      )
        .to(
          subSceneRef.current,
          {
            x: 64,
            y: 115,
            duration: 1,
            ease: 'power4.out'
          },
          '-=.85'
        )
        .to(
          bgRef.current.scale,
          {
            x: 0.5,
            y: 0.5,
            duration: 1,
            ease: 'power4.out'
          },
          '-=0.85'
        );
    }, 1500);
  }, [isLoading]);

  // cloud animation
  useTick((delta) => {
    if(isLoading) return;

    const i = (iter.current += 0.1);
    let newSceneState = sceneState;
    if (cloudRefs && cloudRefs.current) {
      cloudRefs.current.map((cloud, i) => {
        let animationSpeed = 1.15 - cloud.scale.x;

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
    <>
      {isLoading ? (
        <Text
        text={'LOADING'}
        style={{
          align: "center",
          fontWeight: 900,
          dropShadow: false,
          dropShadowAlpha: 0.6,
          dropShadowAngle: 1,
          dropShadowBlur: 5,
          wordWrap: true,
          fill: ["white", "#cccccc"]
        }}
        anchor={0.5}
        x={w / 2}
        y={w / 2}
      />
      ) : (
        <Container
          position={[w / 2, h / 2]}
          scale={
            w / h > sceneAspect ? { x: w / sceneWidth, y: w / sceneWidth } : { x: h / sceneHeight, y: h / sceneHeight }
          }
          sortableChildren={true}
        >
          <Container sortableChildren={true} ref={mainScrollSceneRef}>
            <Container ref={subSceneRef} sortableChildren={true} zIndex={3}>
              <Sprite ref={bgMaskRef} image={tmask} scale={{ x: 1, y: 1 }} anchor={0.5} zIndex={2} />
              <Sprite
                ref={girlSpriteRef}
                image={tgirls}
                mask={maskRef.current}
                scale={{ x: 1, y: 1 }}
                anchor={0.5}
                zIndex={5}
              />
              <Sprite ref={maskRef} image={tmask} scale={{ x: 1, y: 1 }} anchor={0.5} zIndex={3} />
            </Container>

            <Sprite ref={bgRef} mask={bgMaskRef.current} image={tbg} anchor={0.5} zIndex={1} />

            {sceneState.clouds.map((cloud, i) => {
              return (
                <Sprite
                  key={i}
                  ref={(el) => (cloudRefs.current[i] = el)}
                  image={clouds1}
                  x={cloud.x}
                  y={cloud.y}
                  scale={cloud.scale}
                  zIndex={cloud.zIndex}
                  anchor={0}
                  mask={bgMaskRef.current}
                />
              );
            })}
          </Container>
        </Container>
      )}
    </>
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
