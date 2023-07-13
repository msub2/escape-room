import React, { useEffect, useRef } from 'react';
import { Model } from '../../../models/CombinationPadlock';
import { Group } from 'three';

export const CombinationPadlock = () => {
  const model = useRef<Group>(null);

  useEffect(() => {
    if (!model.current) return;
    console.log(model.current.getObjectByName("Root_7"));
  }, [model]);

  return (
    <Model ref={model} />
  )
}