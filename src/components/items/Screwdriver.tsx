import React from 'react';
import { Model } from '../../models/Screwdriver';
import { Item } from '../../components/Item';
import { useGamestate } from '../../components/Gamestate';
import { usePlayerStore } from '../../components/Player';

export const Screwdriver = (props: any) => {
  const itemEntity = useGamestate((state) => state.items.find(item => item.name === "Screwdriver"));
  const activeItem = useGamestate((state) => state.activeItem);
  const collectItem = useGamestate((state) => state.collectItem);
  const setHoveringInteractable = usePlayerStore((state) => state.setHoveringInteractable);

  const onBlur = () => {
    // Un-highlight object
    setHoveringInteractable(false);
  }

  const onHover = () => {
    // Highlight object
    setHoveringInteractable(true);
  }

  const onSelect = () => {
    if (!itemEntity) return;

    collectItem(itemEntity);
    setHoveringInteractable(false);
  }

  if (itemEntity?.collected && itemEntity !== activeItem) return <></>;

  return (
    <Item
      name={'Screwdriver'}
      model={<Model />}
      collider={'cuboid'}
      onBlur={onBlur}
      onHover={onHover}
      onSelect={onSelect}
    />
  )
}
