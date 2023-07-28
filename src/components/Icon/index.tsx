import Image from "next/image";
import { CSSProperties } from "react";
type Props = {
  src: any;
  width?: number;
  height?: number;
  style?: CSSProperties;
  className?: string;
};
const Icon = ({ src, width, height, style, className }: Props) => {
  return (
    <Image
      className={className}
      src={src}
      alt="icon"
      style={{ width: width, height: height, ...style }}
    />
  );
};

export default Icon;
