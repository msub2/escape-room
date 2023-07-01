import React, { useEffect } from 'react';
import { create } from 'zustand';
import itemList from './items.json';
import flagList from './flags.json';

export type ItemEntity = {
  name: string;
  collected: boolean;
  model: () => JSX.Element;
  used: boolean;
}

type Flag = {
  name: string;
  set: boolean;
}

interface Gamestate {
  items: ItemEntity[];
  flags: Flag[];
  activeItem: ItemEntity | null;
  hoveredItem: string;
  setItems: (items: ItemEntity[]) => void;
  setFlags: (flags: Flag[]) => void;
  setActiveItem: (item: ItemEntity) => void;
  setHoveredItem: (item: string) => void;
  collectItem: (item: ItemEntity) => void;
}

export const useGamestate = create<Gamestate>()((set) => ({
  items: [],
  flags: [],
  activeItem: null,
  hoveredItem: "",
  setItems: (allItems: ItemEntity[]) => set((state) => ({ items: allItems })),
  setFlags: (allFlags: Flag[]) => set((state) => ({ flags: allFlags })),
  setActiveItem: (item: ItemEntity | null) => set((state) => ({ activeItem: item })),
  setHoveredItem: (item: string) => set((state) => ({ hoveredItem: item })),
  collectItem: (newItem: ItemEntity) => set((state) => {
    const item = state.items.find(item => item == newItem);
    if (!item) return ({});
    const item2 = state.items.splice(state.items.indexOf(item), 1)[0]
    item2.collected = true;
    return ({ items: [...state.items, item2] })
  })
}));

export const Gamestate = () => {
  const loadedItems = useGamestate((state) => state.items);
  const setItems = useGamestate((state) => state.setItems);
  const setFlags = useGamestate((state) => state.setFlags);
  useEffect(() => {
    const initialize = async () => {
      if (loadedItems.length > 0) return;

      const items: ItemEntity[] = [];
      for await (const item of itemList) {
        const { Model } = await import(`../models/${item}.tsx`);
        items.push({
          name: item,
          collected: false,
          model: Model,
          used: false
        });
      }
      setItems(items);

      const flags: Flag[] = [];
      flagList.forEach(flag => {
        flags.push({
          name: flag,
          set: false
        });
      });
      setFlags(flags);
    }
    initialize();
  }), [];

  return null;
}