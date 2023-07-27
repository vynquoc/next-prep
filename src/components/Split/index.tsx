"use client";
import Split from "react-split";
type Props = {
  className?: string;
  sizes?: number[];
  direction?: "horizontal" | "vertical";
  children: React.ReactNode;
  minSize?: number | number[];
  style?: React.CSSProperties;
};
const CustomSplit = ({
  className,
  sizes,
  direction = "horizontal",
  minSize,
  style,
  children,
}: Props) => {
  return (
    <Split
      className={className}
      sizes={sizes}
      direction={direction}
      minSize={minSize}
      style={style}
    >
      {children}
    </Split>
  );
};

export default CustomSplit;
