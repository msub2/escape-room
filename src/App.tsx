import React, { Suspense } from "react";
import { VRButton, XR } from '@react-three/xr';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, RigidBody } from "@react-three/rapier";
import { Model as Building } from './components/Building';
import Player from './components/Player';
import Environment from "./components/Environment";
import Inventory from "./components/ui/Inventory";

export default () => (
  <>
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
            <Inventory position={[0, 2, -2]}/>
          </XR>
        </Physics>
      </Suspense>
    </Canvas>
  </>
);
