import React, { useRef, useState } from 'react'
import { Flex, Box } from '@react-three/flex'
import { Interactive, XRInteractionEvent } from '@react-three/xr'
import { MeshBasicMaterial, Color } from 'three';
import { useGamestate } from '../Gamestate';

type InventoryItemProps = {
  slot: number;
}

const InventoryItem = (props: InventoryItemProps) => {
  const item = useGamestate((state) => state.items[props.slot])
  const planeMaterial = useRef<MeshBasicMaterial>(null);

  const onHover = (event: XRInteractionEvent) => {
    planeMaterial.current!.color = new Color("grey");
  }

  const onBlur = (event: XRInteractionEvent) => {
    planeMaterial.current!.color = new Color("black");
  }

  const onSelect = (event: XRInteractionEvent) => {
    if (!item) return;

    // Set item active
    // TODO: FIX
  }

  return (
    <Interactive onHover={onHover} onBlur={onBlur} onSelect={onSelect}>
      <Box centerAnchor margin={.1}>
        <mesh>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color={"black"} opacity={.75} transparent ref={planeMaterial} />
        </mesh>
      </Box>
    </Interactive>
  )
}

export function Inventory(props: any) {
  return (
    <Flex
      position={props.position}
      scale={[.05, .05, .05]}
      flexDirection="row"
      flexWrap="wrap"
      size={[3.6, 1, 0]}
    >
      <InventoryItem slot={0} />
      <InventoryItem slot={1} />
      <InventoryItem slot={2} />
      <InventoryItem slot={3} />
      <InventoryItem slot={4} />
      <InventoryItem slot={5} />
      <InventoryItem slot={6} />
      <InventoryItem slot={7} />
      <InventoryItem slot={8} />
    </Flex>
  )
}