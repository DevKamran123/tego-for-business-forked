import { useState } from 'react';
import '../styles/components/Checkbox.scss';

interface CheckBoxProps {
  label: string;
  checked?: boolean;
  onClick?: () => void;
  ticked?: boolean;
  isAuth?: boolean;
  required?: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  checked = false,
  onClick,
  ticked = false,
  isAuth,
  required = true,
}) => {
  const defaultTicked = ticked ? ticked : false;
  const [isTicked, setIsTicked] = useState<boolean>(defaultTicked);

  const handleChange = () => {
    if (onClick) {
      onClick();
    } else {
      setIsTicked((prev) => !prev);
    }
  };

  return (
    <div className="checkboxWrapper">
      <label className="checkboxWrapper__label">
        <input
          required={required}
          type="checkbox"
          checked={checked ? checked : isTicked}
          onChange={handleChange}
          className={`${checked || isTicked ? 'checked' : ''} ${
            isAuth ? 'checkAuth' : ''
          }`}
        />
        <span
          className={`checkboxWrapper__label__text ${
            isAuth ? 'checkboxWrapper__label__text_textAuth' : ''
          }`}
        >
          {label}
        </span>
      </label>
    </div>
  );
};

export default CheckBox;