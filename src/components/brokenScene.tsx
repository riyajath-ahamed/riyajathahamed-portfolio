'use client';
import { Canvas } from '@react-three/fiber'
import Model from './brokeModel';
import { Environment, CameraControls } from '@react-three/drei'
import React from 'react'


export default function Scene() {
    return (
        <Canvas
            className=' h-screen w-screen z-50 '
            orthographic
            camera={{ position: [0, 0, 1], zoom: 800 }}
        >
            <Model />
            <directionalLight intensity={3} position={[0, 0.1, 1]} />
            <Environment preset="city" />
        </Canvas>
    )
}
