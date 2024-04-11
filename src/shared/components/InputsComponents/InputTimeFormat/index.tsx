import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

interface Props {
  label: string;
  timeTipe: string;
  registerName: string;
  errors: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFormValue: UseFormSetValue<any>;
  setStateValue?: (value: string) => void;
  initialValue?: string;
}

const InputTimeFormat = ({
  label,
  timeTipe,
  errors,
  registerName,
  setFormValue,
  setStateValue,
  initialValue = '',
}: Props) => {
  const inputProps = {
    label: label,
    fullWidth: true,
  };

  const [timeValue, setTimeValue] = useState<string>(initialValue);

  useEffect(() => {
    if (initialValue !== '') {
      setTimeValue(initialValue);
      setFormValue(registerName, initialValue);
    }
  }, [initialValue]);

  function OnChangeValue(value: string) {
    const valueOnlyNumber = value.slice(0, -2);
    setTimeValue(valueOnlyNumber);
    setFormValue(registerName, valueOnlyNumber);
    if (setStateValue) {
      setStateValue(valueOnlyNumber);
    }
  }

  return (
    <div className="w-full">
      <NumericFormat
        value={timeValue}
        customInput={TextField}
        {...inputProps}
        allowNegative={false}
        suffix={` ${timeTipe}`}
        onChange={(e) => OnChangeValue(e.target.value)}
      />
      {errors && timeValue.length < 1 && (
        <span style={{ color: 'red' }}>{errors}</span>
      )}
    </div>
  );
};

export default InputTimeFormat;
