import React, { Suspense, useRef } from 'react'
import { Flex, Box } from '@react-three/flex'
import { Interactive, XRInteractionEvent } from '@react-three/xr'
import { MeshBasicMaterial, Color } from 'three';
import { useGamestate } from '../Gamestate';
import { Text } from '@react-three/drei';

type InventoryItemProps = {
  slot: number;
}

const InventoryItem = (props: InventoryItemProps) => {
  const { slot } = props;
  const items = useGamestate((state) => state.items)
  const setActiveItem = useGamestate((state) => state.setActiveItem);
  const setHoveredItem = useGamestate((state) => state.setHoveredItem);
  const planeMaterial = useRef<MeshBasicMaterial>(null);

  const onHover = (event: XRInteractionEvent) => {
    planeMaterial.current!.color = new Color("grey");
    if (!items[slot].collected) return;
    setHoveredItem(items[slot].name);
  }

  const onBlur = (event: XRInteractionEvent) => {
    planeMaterial.current!.color = new Color("black");
    if (!items[slot].collected) return;
    setHoveredItem("");
  }

  const onSelect = (event: XRInteractionEvent) => {
    if (!items[slot].collected) return;

    // Set active property to true on given item slot, set all others false
    items.forEach((item, i) => item.active = i == slot ? true : false);
    setActiveItem(items[slot]);
  }

  const onSelectStart = () => {
    planeMaterial.current!.color = new Color("lightgrey");
  }

  const onSelectEnd = () => {
    planeMaterial.current!.color = new Color("grey");
  }

  return (
    <Interactive onHover={onHover} onBlur={onBlur} onSelect={onSelect} onSelectStart={onSelectStart} onSelectEnd={onSelectEnd}>
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
  const items = useGamestate(state => state.items);
  const hoveredItem = useGamestate(state => state.hoveredItem);

  return (
    <Flex
      position={props.position}
      scale={[.05, .05, .05]}
      flexDirection="row"
      flexWrap="wrap"
      size={[3.6, 1, 0]}
    >
      <Suspense>
        <Text fontSize={.5} anchorX="center" position={[1.8, .5, 0]}>
          {hoveredItem}
        </Text>
      </Suspense>
      {items.map((item, i) =>
        <InventoryItem key={item.name} slot={i} />
      )}
    </Flex>
  )
}