/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 .\door.glb --transform
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props: any) {
  // @ts-ignore
  const { nodes, materials } = useGLTF('/res/door-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_10.geometry} material={materials.Wooden_part_top} position={[0, 0, 1.476]} rotation={[-Math.PI / 2, 0, 0]} scale={0.025} />
      <mesh geometry={nodes.Object_11.geometry} material={materials.Door_Rama} position={[0, 0, 1.476]} rotation={[-Math.PI / 2, 0, 0]} scale={0.025} />
      <mesh geometry={nodes.Object_12.geometry} material={materials.Rama} position={[0, 0, 1.476]} rotation={[-Math.PI / 2, 0, 0]} scale={0.025} />
      <mesh geometry={nodes.Object_13.geometry} material={materials.Zamok} position={[0, 0, 1.476]} rotation={[-Math.PI / 2, 0, 0]} scale={0.025} />
      <mesh geometry={nodes.Object_7.geometry} material={materials.Wooden_part_Bot} position={[0, 0, 1.476]} rotation={[-Math.PI / 2, 0, 0]} scale={0.025} />
      <mesh geometry={nodes.Object_9.geometry} material={materials.Wooden_part_Mid} position={[0, 0, 1.476]} rotation={[-Math.PI / 2, 0, 0]} scale={0.025} />
    </group>
  )
}

useGLTF.preload('/res/door-transformed.glb')
