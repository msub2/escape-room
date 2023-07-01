import React, { Suspense } from "react";
import { VRButton, XR } from '@react-three/xr';
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from "@react-three/rapier";
import { Model as Building } from './models/Building';
import Player from './components/Player';
import Environment from "./components/Environment";
import { Gamestate } from "./components/Gamestate";
import { Screwdriver } from "./components/items/Screwdriver";

export default () => {
  return (
    <>
      <Gamestate />
      <VRButton />
      <Canvas>
        <Environment />
        <Suspense>
          <Physics debug={true}>
            <XR>
              <RigidBody type="fixed" colliders="trimesh">
                <Building />
              </RigidBody>
              <pointLight position={[0, 1, 0]} intensity={.1} />
              <Player />
              <Screwdriver />
            </XR>
          </Physics>
        </Suspense>
      </Canvas>
    </>
  )
};
