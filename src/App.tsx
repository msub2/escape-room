import React, { Suspense } from "react";
import { VRButton, XR } from '@react-three/xr';
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from "@react-three/rapier";
import { Model as Building } from './models/Building';
import { Model as Door } from './models/Door';
import Player from './components/Player';
import Environment from "./components/Environment";
import { Gamestate } from "./components/Gamestate";
import { Screwdriver } from "./components/items/Screwdriver";
import { CombinationPadlock } from "./components/items/Puzzles/CombinationPadlock";

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
                <Building scale={[.025, .025, .025]} />
              </RigidBody>
              <pointLight position={[0, 1, 0]} intensity={.1} />
              <Player position={[1, .8, 0]} />
              <Screwdriver />
              <Door position={[-.35, 0, .05]} scale={[1, 1, 1.1]} />
              <CombinationPadlock />
            </XR>
          </Physics>
        </Suspense>
      </Canvas>
    </>
  )
};
