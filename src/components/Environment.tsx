import { Color } from "three";
import { useThree } from "@react-three/fiber"

const Environment = () => {
  const { scene } = useThree();
  scene.background = new Color(0x000000)

  return null;
}

export default Environment;