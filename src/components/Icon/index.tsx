import Image from "next/image";
import { CSSProperties } from "react";
type Props = {
  src: any;
  width?: number;
  height?: number;
  style?: CSSProperties;
};
const Icon = ({ src, width, height, style }: Props) => {
  return (
    <div style={style}>
      <Image src={src} alt="icon" style={{ width: width, height: height }} />
    </div>
  );
};

export default Icon;
