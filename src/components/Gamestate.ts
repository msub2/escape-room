import React, { useEffect } from 'react';
import { create } from 'zustand';
import itemList from './items.json';
import flagList from './flags.json';

export type Item = {
  name: string;
  active: boolean;
  collected: boolean;
  model: JSX.Element;
  used: boolean;
}

type Flag = {
  name: string;
  set: boolean;
}

interface Gamestate {
  items: Item[];
  flags: Flag[];
  activeItem: Item | null;
  hoveredItem: string;
  setItems: (items: Item[]) => void;
  setFlags: (flags: Flag[]) => void;
  setActiveItem: (item: Item) => void;
  setHoveredItem: (item: string) => void;
}

export const useGamestate = create<Gamestate>()((set) => ({
  items: [],
  flags: [],
  activeItem: null,
  hoveredItem: "",
  setItems: (allItems: Item[]) => set((state) => ({ items: allItems })),
  setFlags: (allFlags: Flag[]) => set((state) => ({ flags: allFlags })),
  setActiveItem: (item: Item | null) => set((state) => ({ activeItem: item })),
  setHoveredItem: (item: string) => set((state) => ({ hoveredItem: item })),
}));

export const Gamestate = () => {
  const loadedItems = useGamestate((state) => state.items);
  const setItems = useGamestate((state) => state.setItems);
  const setFlags = useGamestate((state) => state.setFlags);
  useEffect(() => {
    const initialize = async () => {
      if (loadedItems.length > 0) return;

      const items: Item[] = [];
      for await (const item of itemList) {
        const { Model } = await import(`../models/${item}.tsx`);
        items.push({
          name: item,
          active: false,
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