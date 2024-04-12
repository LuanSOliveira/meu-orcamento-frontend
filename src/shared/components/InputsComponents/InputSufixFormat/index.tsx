/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

interface Props {
  label: string;
  sufix: string;
  registerName: string;
  errors: string;
  setFormValue: UseFormSetValue<any>;
  setStateValue?: (value: string) => void;
  initialValue?: string;
}

const InputSufixFormat = ({
  label,
  sufix,
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

  const [sufixInputValue, setSufixInputValue] = useState<string>(initialValue);

  useEffect(() => {
    if (initialValue !== '') {
      setSufixInputValue(initialValue);
      setFormValue(registerName, initialValue);
    }
  }, [initialValue]);

  function OnChangeValue(value: string) {
    const valueOnlyNumber = value.slice(0, -2);
    setSufixInputValue(valueOnlyNumber);
    setFormValue(registerName, valueOnlyNumber);
    if (setStateValue) {
      setStateValue(valueOnlyNumber);
    }
  }

  return (
    <div className="w-full">
      <NumericFormat
        value={sufixInputValue}
        customInput={TextField}
        {...inputProps}
        allowNegative={false}
        suffix={` ${sufix}`}
        onChange={(e) => OnChangeValue(e.target.value)}
      />
      {errors && sufixInputValue.length < 1 && (
        <span style={{ color: 'red' }}>{errors}</span>
      )}
    </div>
  );
};

export default InputSufixFormat;
