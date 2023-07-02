/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: jimbogies (https://sketchfab.com/jimbogies)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/abandoned-room-interior-style-5-f958febb5d004358a0bf7144733c645e
title: Abandoned Room Interior (Style 5)
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props: any) {
  // @ts-ignore
  const { nodes, materials } = useGLTF("/res/building-transformed.glb");
  return (
    <group {...props} dispose={null} scale={props.scale}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group
          position={[-33.48, -590.92, 128.96]}
          rotation={[1.47, 0.09, 0.01]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material3.geometry}
          material={materials.Clear}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2_4.geometry}
          material={materials.Black}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2_5.geometry}
          material={materials.Glass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2_3.geometry}
          material={materials.Floor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2_2.geometry}
          material={materials.Trim}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2_1.geometry}
          material={materials.WallPaint01}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material3_1.geometry}
          material={materials.WallPaint02}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2.geometry}
          material={materials.Ceiling}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/res/building-transformed.glb");
