import React, { useEffect, useState, createRef, useRef, useReducer } from 'react';
import { Stage, Sprite, Text, Container, useTick } from '@inlet/react-pixi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import * as PIXI from 'pixi.js';

import maskTest from '../assets/masktest.svg';
import mask from '../assets/mask.png';

import tbg from '../assets/tbg.png';
// import tgirls from '../assets/tgirls.png';
import threeGirlsFile from '../assets/Scene_3Girls.webp';
import tmask from '../assets/tmask.png';
import invertedMask from '../assets/invertedMask.webp';



import phoneMask from '../assets/selfieGirlsPhoneMask.webp';

import bg from '../assets/scene-1-bg.jpg';
import clouds1 from '../assets/clouds-large.png';
import selfieGirls from '../assets/Scene_SelfieGirls.png';

import sceneImage1Path from '../assets/testscene1.png';
import sceneImage2Path from '../assets/testscene2.png';
import sceneImage3Path from '../assets/testscene3.png';

const sceneImageArray = [sceneImage1Path,sceneImage2Path,sceneImage3Path];



// The reducer
const reducer = (_, { data }) => data;

window.PIXI = PIXI;


const ScrollScene = ({ w, h }) => {
  const subSceneRef = useRef(null);


  const [pageProgress, setPageProgress] = useState(0); //continuous between 0-3
  const [curProgress, setCurProgress] = useState(0); //continuous between 0-1
  const [curPage, setCurPage] = useState(0); //integral between 0-3
  const [nextPage, setNextPage] = useState(1);
  

  // scroll animation
  useEffect(() => {
    // cloud1SpriteRef.current.blendMode = PIXI.BLEND_MODES.MULTIPLY;

    

    gsap.registerPlugin(ScrollTrigger);


    //is this to beat the race condition so that all the references are set before the timeline is made?
    setTimeout(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          // trigger: listRef.current,
          // start: 'top 100%',
          // markers: true,
          toggleActions: 'play none none reset', // onEnter, onLeave, onEnterBack, onLeaveBack
          // Options: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".
          scrub: true,
          onUpdate: ({progress,direction,isActive})=>{
            console.log( "onUpdate:", progress, direction, isActive);
            var tempPageProgress = progress * 4;
            setPageProgress( tempPageProgress );
            setCurProgress( tempPageProgress % 1);
            var tempCurPage = Math.floor( progress*4);
            setCurPage( tempCurPage % 3 );
            setNextPage( ( tempCurPage+1) %3 ); //in case the cur page is 3 and the next page is 0

          }
        }
        
      });

      // tl.to(
      //   subSceneRef.current.scale,
      //   {
      //     x: 120,
      //     y: 120,
      //     duration: 1,
      //     ease: 'power2.in'
      //   },
      //   'start'
      // ).to(
      //   subSceneRef.current,
      //   {
      //     x: 8000, //the reason this value is so high is because it is being scaled to 120,
      //     y: 12000, // so to zoom in on some point x and y, you have to set the x to 120*x, 120*y
      //     duration: 1,
      //     ease: 'power2.in' //and it has to have the same easing curve for both so they align
      //   },
      //   '-=1'
      // );
    }, 1500);
  }, []);


  useEffect( ()=>{

  }, [pageProgress]);


  

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
      <Sprite //can be swapped out with the normal sprite at normal scale if they use a non-webp capable browser  
              image={sceneImageArray[curPage]}
              
          
              anchor={0.5}
              zIndex={2}
              scale={1+(curProgress *5)}
            />
        <Sprite //can be swapped out with the normal sprite at normal scale if they use a non-webp capable browser  
          image={sceneImageArray[nextPage]}
          
          
          anchor={0.5}
          zIndex={1}
          // position={[-21, -80]}
        />
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
      <div ref={scrollArea} >
        <div style={{ height: `${3 * 500}vh` }} />
      </div>
    </>
  );
};
