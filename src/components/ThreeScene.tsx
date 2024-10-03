"use client";

import React, {Suspense} from 'react';
import { Canvas } from "@react-three/fiber";


import { OrbitControls, Preload, useGLTF } from "@react-three/drei";


const ModelObj = () => {

    const dmodelme = useGLTF("./rjmodel.gltf")
      return (
        <mesh>
          <hemisphereLight intensity={0.15} groundColor ="yellow"/>
          <pointLight intensity={0.8}/>
          <directionalLight intensity={0.5} color="white" position={[0, 0, 10]} />
          <spotLight
            position={[-10, 50, 10]}
            angle={0.1}
            penumbra={1}
            intensity={0.2}
            castShadow
            shadow-mapSize={1024}
          />
          <primitive 
          object={dmodelme.scene} 
          scale={2}
          position= {[-0.1,-1.4, -1.5]}
          rotation= {[0, 0.5 ,0]}
          />
        </mesh>
      )
    }
    

const ThreeScene: React.FC = () => {
    return(
        <div className='fixed h-screen w-screen -z-50 blur-xl'>
        <Canvas
        frameloop='demand'
        shadows
        camera= {{position: [20, 3, 5], fov: 20}}
        gl={{preserveDrawingBuffer: true}}

        >
          <Suspense fallback="">
            <OrbitControls 
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            />
            <ModelObj/>
          </Suspense>
          <Preload all/>
    
        </Canvas>
        </div>
      )
    }
export default ThreeScene;