type Props = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

const CheckBox = ({ label, checked, onChange }: Props) => {
  return (
    <div>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <label>{label}</label>
    </div>
  );
};

export default CheckBox;
