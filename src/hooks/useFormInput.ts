import { ChangeEvent, useState } from 'react';

export function useFormInput(initialValue: string | number) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e : ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  const inputProps = {
    value: value,
    onChange: handleChange
  };

  return inputProps;
}
