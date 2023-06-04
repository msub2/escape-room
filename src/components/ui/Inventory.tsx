import React, { useRef } from 'react'
import { Flex, Box } from '@react-three/flex'
import { Interactive, XRInteractionEvent } from '@react-three/xr'
import { MeshBasicMaterial, Color } from 'three';

const InventoryItem = () => {
  const planeMaterial = useRef<MeshBasicMaterial>(null);

  const onHover = (event: XRInteractionEvent) => {
    planeMaterial.current!.color = new Color("grey");
  }

  const onBlur = (event: XRInteractionEvent) => {
    planeMaterial.current!.color = new Color("white");
  }

  return (
    <Interactive onHover={onHover} onBlur={onBlur}>
      <Box centerAnchor margin={.1}>
        <mesh>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color={"white"} ref={planeMaterial} />
        </mesh>
      </Box>
    </Interactive>
  )
}

export default function Inventory(props: any) {
  return (
    <Flex
      position={props.position}
      scale={[.1, .1, .1]}
      flexDirection="row"
      flexWrap="wrap"
      size={[4, 1, 0]}
    >
      <InventoryItem />
      <InventoryItem />
      <InventoryItem />
      <InventoryItem />
      <InventoryItem />
      <InventoryItem />
      <InventoryItem />
      <InventoryItem />
      <InventoryItem />
    </Flex>
  )
}