import { TextField } from '@mui/material';
import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

interface Props {
  label: string;
  registerName: string;
  errors: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFormValue: UseFormSetValue<any>;
  setStateValue?: (value: string) => void;
}

const InputPercentFormat = ({
  label,
  errors,
  registerName,
  setFormValue,
  setStateValue,
}: Props) => {
  const inputProps = {
    label: label,
    fullWidth: true,
  };

  const [percentValue, setPercentValue] = useState<string>('');

  function OnChangeValue(value: string) {
    const valueOnlyNumber = value.slice(0, -2);
    setPercentValue(valueOnlyNumber);
    setFormValue(registerName, valueOnlyNumber);
    if (setStateValue) {
      setStateValue(valueOnlyNumber);
    }
  }

  return (
    <div className="w-full">
      <NumericFormat
        value={percentValue}
        customInput={TextField}
        {...inputProps}
        allowNegative={false}
        suffix={' %'}
        onChange={(e) => OnChangeValue(e.target.value)}
      />
      {errors && percentValue.length < 1 && (
        <span style={{ color: 'red' }}>{errors}</span>
      )}
    </div>
  );
};

export default InputPercentFormat;
