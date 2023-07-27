type Props = {
  children: React.ReactNode;
  gap?: number;
};
const FormGroup = ({ children, gap = 10 }: Props) => {
  return (
    <div style={{ display: "flex", gap: gap, width: "100%" }}>{children}</div>
  );
};

export default FormGroup;
