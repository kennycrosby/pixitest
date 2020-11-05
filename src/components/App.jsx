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
import { DepthContainer } from './DepthContainer';
import { ZoomScene } from './ZoomScene';


// import sceneImage1Path from '../assets/testdistance1.png';
// import sceneImage2Path from '../assets/testdistance2.png';
// import sceneImage3Path from '../assets/testdistance3.png';

const tiatest = '../assets/tia/Tia_MASTER_v3_0000.png';
import tiaPath1 from '../assets/tia/Tia_MASTER_v3_0000.png';
import tiaPath2 from '../assets/tia/Tia_MASTER_v3_0000s_0000.png';
import tiaPath3 from '../assets/tia/Tia_MASTER_v3_0000s_0001.png';
import tiaPath4 from '../assets/tia/Tia_MASTER_v3_0000s_0002.png';
import tiaPath5 from '../assets/tia/Tia_MASTER_v3_0000s_0003.png';
import tiaPath6 from '../assets/tia/Tia_MASTER_v3_0000s_0004.png';
import tiaPath7 from '../assets/tia/Tia_MASTER_v3_0001.png';
import tiaPath8 from '../assets/tia/Tia_MASTER_v3_0002.png';
import tiaPath9 from '../assets/tia/Tia_MASTER_v3_0003.png';
import tiaPath10 from '../assets/tia/Tia_MASTER_v3_0004.png';
import tiaPath11 from '../assets/tia/Tia_MASTER_v3_0005.png';
import tiaPath12 from '../assets/tia/Tia_MASTER_v3_0006.png';
import tiaPath13 from '../assets/tia/Tia_MASTER_v3_0007.png';
import tiaPath14 from '../assets/tia/Tia_MASTER_v3_0008.png';
import tiaPath15 from '../assets/tia/Tia_MASTER_v3_0009.png';
import tiaPath16 from '../assets/tia/Tia_MASTER_v3_0010.png';
import tiaPath17 from '../assets/tia/Tia_MASTER_v3_0011.png';
import tiaPath18 from '../assets/tia/Tia_MASTER_v3_0012.png';
import tiaPath19 from '../assets/tia/Tia_MASTER_v3_0013.png';
import tiaPath20 from '../assets/tia/Tia_MASTER_v3_0014.png';
import tiaPath21 from '../assets/tia/Tia_MASTER_v3_0015.png';
import tiaPath22 from '../assets/tia/Tia_MASTER_v3_0016.png';
import tiaPath23 from '../assets/tia/Tia_MASTER_v3_0017.png';
import tiaPath24 from '../assets/tia/Tia_MASTER_v3_0018.png';
import tiaPath25 from '../assets/tia/Tia_MASTER_v3_0019.png';
import tiaPath26 from '../assets/tia/Tia_MASTER_v3_0020.png';
import tiaPath27 from '../assets/tia/Tia_MASTER_v3_0021.png';


import richaudManifest from '../../public/Richaud_LAYERED/manifest.json';
var quarterManifest = richaudManifest.filter((x) => x.profile === "quarter")[0]
//quartermanifest now is {profile:'quarter', images:{'0':{}, '1':{} }} etc
console.log(quarterManifest)

//convert a numerical key dictionary to an array
quarterManifest['images'] = Object.values( quarterManifest['images']);

// quarterManifest['images'].map( (imageData, index) =>{
//   console.log("map manifest", imageData.path);
//   const imagePath = imageData.path;
  
  
//   require(`../assets/${imagePath}`).then(image => {
//     console.log("image:", image);
//     imageData.path = image.default;
//   }).catch( e=>{
//     console.log( "error:", e);
//   });
// });


const tiaPaths = [
  tiaPath1,
  /*
  tiaPath2,
  tiaPath3,
  tiaPath4,
  tiaPath5,
  tiaPath6,
  tiaPath7,*/
  tiaPath8,
  tiaPath9,
  tiaPath10,
  tiaPath11,
  tiaPath12,
  tiaPath13,
  tiaPath14,
  tiaPath15,
  tiaPath16,
  tiaPath17,
  tiaPath18,
  tiaPath19,
  tiaPath20,
  tiaPath21,
  tiaPath22,
  tiaPath23,
  tiaPath24,
  tiaPath25,
  tiaPath26,
  tiaPath27,
];
console.log( "tiapath1:", tiaPath1);
// const sceneDataArray = [
//   {
//     image: sceneImage1Path,
//     endPoint: [100, 200]
//   },
//   {
//     image: sceneImage2Path,
//     endPoint: [100, 200]
//   },
//   {
//     image: sceneImage3Path,
//     endPoint: [100, 200]
//   }
// ];



// The reducer
const reducer = (_, { data }) => data;

window.PIXI = PIXI;


const ScrollScene = ({ w, h }) => {
  const subSceneRef = useRef(null);


  const [pageProgress, setPageProgress] = useState(0); //continuous between 0-3
  const [curProgress, setCurProgress] = useState(0); //continuous between 0-1
  const [curPage, setCurPage] = useState(0); //integral between 0-3
  const [nextPage, setNextPage] = useState(1);
  const [nextNextPage, setNextNextPage] = useState(2);


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
          onUpdate: ({ progress, direction, isActive }) => {
            console.log("onUpdate:", progress, direction, isActive);
            var tempPageProgress = progress * 2;
            setPageProgress(tempPageProgress);
            setCurProgress(tempPageProgress % 1);
            var tempCurPage = Math.floor(progress * 2);
            setCurPage(tempCurPage % 2);
            setNextPage((tempCurPage + 1) % 2); //in case the cur page is 3 and the next page is 0
            setNextNextPage((tempCurPage + 2) % 2); //in case the cur page is 3 and the next page is 0
            // if curProgress < .3 then outProgress = 0;
            // if curProgress >=.3 then outProgress = .7*curProgress-.3;

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


  useEffect(() => {

  }, [pageProgress]);




  const sceneWidth = 1440;
  const sceneHeight = 1440;

  const sceneAspect = sceneWidth / sceneHeight;

  return (
    <Container
      position={[w / 2, h / 2]}
      scale={
        w / h > sceneAspect ? { x: w / sceneWidth, y: w / sceneWidth } : { x: h / sceneHeight, y: h / sceneHeight }
      }
      sortableChildren={true}
    >


      <ZoomScene id={'richaud'} manifestData={quarterManifest} closestDistance={10} layerDistanceDelta={5} curProgress={curProgress}/>
      {/* <Container sortableChildren={true}>
      { tiaPaths.map((item, index) => {
        const baseDistance = 10 + index * 5;
        const camDistance = baseDistance - (curProgress * (tiaPaths.length * 5 + 10));
        if (camDistance > 0) {
          return (
            <DepthContainer key={index} baseDistance={baseDistance} distance={camDistance} zIndex={tiaPaths.length - index}>
              <Sprite image={item} anchor={0.5} />
            </DepthContainer>
          );
        }
        else {
          return null;
        }
      })}
      </Container> */}

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
          backgroundColor: 0x000000,
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
