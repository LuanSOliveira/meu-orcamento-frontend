import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

interface Props {
  label: string;
  registerName: string;
  errors: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFormValue: UseFormSetValue<any>;
  setStateValue?: (value: string) => void;
  initialValue?: string;
}

const InputMonetaryFormat = ({
  label,
  registerName,
  errors,
  setFormValue,
  setStateValue,
  initialValue = '',
}: Props) => {
  const inputProps = {
    label: label,
    fullWidth: true,
  };

  const [monetaryValue, setMonetaryValue] = useState<string>(initialValue);

  useEffect(() => {
    if (initialValue !== '') {
      setMonetaryValue(initialValue);
    }
  }, [initialValue]);

  function OnChangeValue(value: string) {
    const valueOnlyNumber = value.slice(3);
    setMonetaryValue(valueOnlyNumber);
    setFormValue(registerName, valueOnlyNumber);
    if (setStateValue) {
      setStateValue(valueOnlyNumber);
    }
  }

  return (
    <div className="w-full">
      <NumericFormat
        value={monetaryValue}
        customInput={TextField}
        {...inputProps}
        allowNegative={false}
        fixedDecimalScale
        thousandSeparator={'.'}
        decimalSeparator={','}
        decimalScale={2}
        prefix={'R$ '}
        onChange={(e) => OnChangeValue(e.target.value)}
      />
      {errors && monetaryValue.length < 1 && (
        <span style={{ color: 'red' }}>{errors}</span>
      )}
    </div>
  );
};

export default InputMonetaryFormat;
