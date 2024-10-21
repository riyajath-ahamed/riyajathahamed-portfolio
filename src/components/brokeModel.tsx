import { useGLTF, Text, Float, MeshTransmissionMaterial } from '@react-three/drei'
import React from 'react'
import { useThree } from '@react-three/fiber'
import { GroupProps } from '@react-three/fiber'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

type GLTFResult = GLTF & {
  nodes: {
    Scene: THREE.Group
  }
}

export default function Model() {
    const { viewport } = useThree()
    const { nodes } = useGLTF('/media/shards.glb') as unknown as GLTFResult

    const textOption = {
        color: "white",
        anchorX: "center" as const,
        anchorY: "middle" as const
    }

    console.log(nodes , viewport)
    return (
        <group scale={viewport.width}>
            {nodes.Scene.children.map((mesh, i) => {
                return <Mesh data={mesh} key={i} />
            })}
            <Text  position={[0, 0, -.1]} fontSize={0.4} {...textOption}>
            Rj
            </Text>
        </group>
    )
}

interface MeshProps extends GroupProps {
    data: THREE.Object3D
}

function Mesh({ data }: MeshProps) {

    return (
        <Float>
            <mesh {...data}>
                <MeshTransmissionMaterial roughness={0} transmission={0.99} thickness={0.74} ior={2.2} chromaticAberration={0.77} resolution={300}/>
            </mesh>
        </Float>
    )
}
