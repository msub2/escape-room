import React, { useRef } from "react";
import { RigidBody, RigidBodyAutoCollider, RapierRigidBody } from "@react-three/rapier";
import { Interactive } from '@react-three/xr';
import { useFrame, Vector3 } from "@react-three/fiber";

type ItemProps = {
  model: JSX.Element;
  position: THREE.Vector3;
  collected: boolean;
  collider?: RigidBodyAutoCollider;
  onSelect: () => void;
  onHover: () => void;
  onBlur: () => void;
}


export const Item = (props: ItemProps) => {
  const { model, position, collected, onSelect, onHover, onBlur } = props;
  const rb = useRef<RapierRigidBody>(null);

  useFrame(() => {
    if (!rb.current || !collected) return;
    rb.current.setTranslation({ x: position.x, y: position.y, z: position.z }, true)
  })

  return (
    <RigidBody type="kinematicPosition" colliders={props.collider ?? "trimesh"} ref={rb}>
      <Interactive onSelect={onSelect} onHover={onHover} onBlur={onBlur}>
        {model}
      </Interactive>
    </RigidBody>
  )
}