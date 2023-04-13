import { Group, Vector3 } from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Controllers, Hands, useXR } from '@react-three/xr';
import { PointerLockControls } from '@react-three/drei';
import MovementControls from './MovementControls';
import { RigidBody, CapsuleCollider, RapierRigidBody } from "@react-three/rapier";

const Player = () => {
  const { player, isPresenting } = useXR();
  const camera = player.children[0];
  const origin = useRef<RapierRigidBody>(null);
  const group = useRef<Group>(null);
  const [height, setHeight] = useState(1.6);

  useEffect(() => {
    if (isPresenting) camera.position.set(0, 0, 0);
    else camera.position.set(0, height, 0);
  }, [isPresenting]);

  useFrame(() => {
    if (!origin.current) return;

    const { x, y, z } = origin.current.translation();
    player.position.set(x, y - .8, z);
  });

  return (
    <group position={[0, .8, 0]} ref={group}>
      <RigidBody lockRotations={true} ref={origin}>
        <CapsuleCollider args={[.8, .2]} />
      </RigidBody>
      <Controllers />
      <Hands />
      <PointerLockControls />
      <MovementControls origin={origin} physics={true} speed={100} />
    </group>
  )
}

export default Player;