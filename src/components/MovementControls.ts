import { Vector3, Euler, Group } from 'three';
import { RefObject } from 'react';
import { useFrame } from "@react-three/fiber";
import { useXR, useController } from '@react-three/xr';
import { RapierRigidBody } from '@react-three/rapier';

type MovementControlsProps = {
  origin: RefObject<RapierRigidBody>;
  physics: boolean;
  speed: number;
}

const MovementControls = (props: MovementControlsProps) => {
  const { player, isPresenting } = useXR();
  const leftController = useController('left');
  const camera = player.children[0];
  const speed = props.speed;
  const pressedKeys = {
    w: false,
    s: false,
    a: false,
    d: false,
    allowed: 'wasd',
    none: () => { return !pressedKeys.w && !pressedKeys.s && !pressedKeys.a && !pressedKeys.d }
  };
  const localVector3 = new Vector3();
  const localEuler = new Euler();

  document.addEventListener('keydown', e => {
    if (!pressedKeys.allowed.includes(e.key)) return;
    pressedKeys[e.key as 'w' | 'a' | 's' | 'd'] = true;
  });

  document.addEventListener('keyup', e => {
    if (!pressedKeys.allowed.includes(e.key)) return;
    pressedKeys[e.key as 'w' | 'a' | 's' | 'd'] = false;
  });

  const move = (delta: number) => {
    let moveX, moveY;

    if (isPresenting) {
      if (leftController?.inputSource?.gamepad?.axes) {
        const gamepad = leftController.inputSource.gamepad;
        moveX = gamepad.axes[2] || gamepad.axes[0];
        moveY = gamepad.axes[3] || gamepad.axes[1];
      }
      else {
        moveX = 0;
        moveY = 0;
      }
    }
    else if (!pressedKeys.none()) {
      moveX = pressedKeys.a ? -1 : pressedKeys.d ? 1 : 0;
      moveY = pressedKeys.w ? -1 : pressedKeys.s ? 1 : 0;
    }
    else {
      return;
    }

    localVector3.set(moveX, 0, moveY);
    const moveLength = localVector3.length();
    if (moveLength > 1) {
      localVector3.divideScalar(moveLength);
    }
    const headEuler = localEuler.setFromQuaternion(camera.quaternion, 'YXZ');
    localEuler.x = 0;
    localEuler.z = 0;
    const { x, y, z } = localVector3.multiplyScalar(speed * delta).applyEuler(headEuler);

    props.origin.current?.setLinvel({ x, y, z }, true);
  }

  const handleHeight = () => {
    const camera = player.children[0];
    const height = Math.min(Math.max(camera.position.y, 0.5), 2);
    props.origin.current?.collider(0).setHalfHeight(height / 2);
  }

  const handleHead = () => {
    const { x, z } = player.children[0].position;
    const y = props.origin.current?.collider(0).translation().y!;
    props.origin.current?.collider(0).setTranslationWrtParent({x, y, z})
  }

  useFrame((state, delta) => {
    if (!props.origin.current) return;

    if (isPresenting) {
      handleHead();
      handleHeight();
    }

    move(delta);
  })

  return null;
}

export default MovementControls;