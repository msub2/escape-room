/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 screwdriver.glb --transform
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props: any) {
  // @ts-ignore
  const { nodes, materials } = useGLTF('/res/screwdriver-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.flathead_screwdriver.geometry} material={materials.flathead_screwdriver} />
    </group>
  )
}

useGLTF.preload('/res/screwdriver-transformed.glb')
