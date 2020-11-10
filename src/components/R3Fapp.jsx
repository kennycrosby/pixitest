import React , {useState, useEffect} from 'react';
import { Canvas, useFrame } from 'react-three-fiber';



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

import richaudManifest from '../../public/Rose-Greenberg-RASTERIZED/manifest.json';
import { Texture } from 'three';
var quarterManifest = richaudManifest.filter((x) => x.profile === "quarter")[0]
quarterManifest['images'] = Object.values(quarterManifest['images']);
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

const Box = ({props})=> {
    console.log( "BOXXX!");
    // This reference will give us direct access to the mesh
    const mesh = useRef()
  
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
  
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
  
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={(e) => setActive(!active)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      >
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }

const ImagePlane = ({imagePath, ...restProps}) => {
    console.log( "imagePlane:", imagePath);
    return (
        <mesh>
            <planeGeometry attach="geometry" args={[500, 500]} />
            <meshBasicMaterial attach="material">
                <texture attach="map" image={imagePath} />
            </meshBasicMaterial>
        </mesh>
    )
}

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

  

export const R3Fapp = () => {
    console.log( "r3fapp");
    const [pageProgress, setPageProgress] = useState(0); //continuous between 0-3
  const [curProgress, setCurProgress] = useState(0); //continuous between 0-1
  const [curPage, setCurPage] = useState(0); //integral between 0-3
  const [nextPage, setNextPage] = useState(1);
  const [nextNextPage, setNextNextPage] = useState(2);


return (
        
  <Canvas>
    <Box/>
  </Canvas>
    )
}