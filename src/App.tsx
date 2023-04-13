import React, { Suspense } from "react";
import { VRButton, XR, Controllers } from '@react-three/xr';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, RigidBody, Debug } from "@react-three/rapier";
import { Model as Building } from './components/Building';
import Player from './components/Player';
import Environment from "./components/Environment";

export default () => (
  <>
    <VRButton />
    <Canvas>
      <Environment />
      <Suspense>
        <Physics>
          <Debug />
          <XR>
            <RigidBody type="fixed" colliders="trimesh">
              <Building />
            </RigidBody>
            <pointLight position={[0, 1, 0]} intensity={.1} />
            <Player />
          </XR>
        </Physics>
      </Suspense>
    </Canvas>
  </>
);
