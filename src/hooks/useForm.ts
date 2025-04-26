import { ChangeEvent, useState } from 'react';


export default function useForm<T>(initObject : T) {
  const [collect, setCollect] = useState<T>(initObject);

  function handleValues(e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setCollect({...collect, [e.target.name]: e.target.value}); 
  }

  function updateValues(fields: Partial<T>) {
    setCollect({ ...collect, ...fields });
}

  return { 
    values: collect, 
    handleValues,
    updateValues,
    setValues: setCollect,
  };
}
