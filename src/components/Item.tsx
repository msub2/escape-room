import React, { useRef } from "react";
import { Vector3 } from "three";
import { useFrame } from '@react-three/fiber';
import { Interactive, useController } from '@react-three/xr';
import { RigidBody, RigidBodyAutoCollider, RapierRigidBody } from "@react-three/rapier";
import { useGamestate } from "./Gamestate";

type ItemProps = {
  name: string;
  model: JSX.Element;
  collider: RigidBodyAutoCollider;
  onSelect: () => void;
  onHover: () => void;
  onBlur: () => void;
}

export const Item = (props: ItemProps) => {
  const { name, model, collider, onSelect, onHover, onBlur } = props;
  const itemEntity = useGamestate((state) => state.items.find(item => item.name === name));
  const activeItem = useGamestate((state) => state.activeItem);
  const rightController = useController('right');
  const rb = useRef<RapierRigidBody>(null);
  const worldPos = new Vector3(0, 0, 0);
  let position = new Vector3(0, 1, -1);

  useFrame(() => {
    if (itemEntity == activeItem && rightController && rb.current) {
      rightController.grip.getWorldPosition(worldPos);
      rb.current.setTranslation({ x: worldPos.x, y: worldPos.y, z: worldPos.z }, true);
    }
  });

  return (
    <group position={position}>
      <RigidBody type="kinematicPosition" colliders={collider ?? 'cuboid'} ref={rb}>
        <Interactive onSelect={onSelect} onHover={onHover} onBlur={onBlur}>
          {model}
        </Interactive>
      </RigidBody>
    </group>
  )
}