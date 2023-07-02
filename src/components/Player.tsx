import React, { useEffect, useRef, useState } from 'react';
import { Group } from 'three';
import { createPortal, useFrame } from '@react-three/fiber';
import { Controllers, Hands, useController, useXR } from '@react-three/xr';
import { PointerLockControls } from '@react-three/drei';
import { RigidBody, CapsuleCollider, RapierRigidBody } from "@react-three/rapier";
import { create } from 'zustand';
import MovementControls from './MovementControls';
import { Inventory } from "../components/ui/Inventory";
import { useGamestate } from './Gamestate';

interface PlayerState {
  hoveringInteractable: boolean;
  setHoveringInteractable: (hover: boolean) => void;
}

export const usePlayerStore = create<PlayerState>()((set) => ({
  hoveringInteractable: false,
  setHoveringInteractable: (hover: boolean) => set({ hoveringInteractable: hover }),
}));

const LeftController = () => {
  const left = useController('left');
  if (!left) return <></>;

  return createPortal(<Inventory position={[0, .3, 0]} />, left.controller);
}

const RightController = () => {
  const right = useController('right');
  if (!right) return <></>;

  // TODO: Something?
  return createPortal(<></>, right);
}

const Player = (props: any) => {
  const { position } = props;
  const { player, isPresenting } = useXR();
  const right = useController('right');
  const activeItem = useGamestate(state => state.activeItem);
  const hoveringInteractable = usePlayerStore(state => state.hoveringInteractable)
  const camera = player.children[0];
  const origin = useRef<RapierRigidBody>(null);
  const [height, setHeight] = useState(1.6);

  useEffect(() => {
    if (isPresenting) camera.position.set(0, 0, 0);
    else camera.position.set(0, height, 0);
  }, [isPresenting]);

  useEffect(() => {
    // Delay letting forces act on the player until other static meshes have loaded
    setTimeout(() => {
      origin.current?.lockTranslations(false, true);
    }, 1000);
  }, []);

  useFrame(() => {
    if (!origin.current) return;

    const { x, y, z } = origin.current.translation();
    player.position.set(x, y - .8, z);

    if (right && (right.grip.visible && activeItem)) {
      right.grip.visible = !!!activeItem;
      right.controller.children[0].visible = !!!activeItem;
    }
  });

  return (
    <group position={position}>
      <RigidBody lockRotations={true} ref={origin} lockTranslations={true}>
        <CapsuleCollider args={[.8, .2]} />
      </RigidBody>
      <Controllers rayMaterial={{ color: hoveringInteractable ? 0x0000ff : 0xffffff }} />
      {/* <Hands /> */}
      <PointerLockControls />
      <MovementControls origin={origin} physics={true} speed={100} />
      <LeftController />
      <RightController />
    </group>
  )
}

export default Player;