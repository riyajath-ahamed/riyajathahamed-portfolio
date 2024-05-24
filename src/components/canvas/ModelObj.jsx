import React, {Suspense} from 'react';
import { Canvas } from "@react-three/fiber";

import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader"

const ModelObj = () => {

const dmodelme = useGLTF("./SelfModel/rjmodel.gltf")
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor ="yellow"/>
      <pointLight intensity={0.8}/>
      <directionalLight intensity={0.5} color="white" position={[0, 0, 10]} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={0.2}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive 
      object={dmodelme.scene} 
      scale={1.8}
      position= {[2,-1.4, -1.5]}
      rotation= {[0, 0.5 ,0]}
      />
    </mesh>
  )
}

const  ModelObjCanvas = () => {
  return(
    <Canvas
    frameloop='demand'
    shadows
    camera= {{position: [20, 3, 5], fov: 20}}
    gl={{preserveDrawingBuffer: true}}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        mixPolarAngle={Math.PI / 2}
        />
        <ModelObj/>
      </Suspense>
      <Preload all/>

    </Canvas>
  )
}

export default ModelObjCanvas ;