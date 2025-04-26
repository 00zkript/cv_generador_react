import { ChangeEvent, useState } from 'react';

interface UseCollectInputInterface {
  [key: string]: string | number | null;
}

export function useCollectInput(initObject : UseCollectInputInterface) {
  const [collect, setCollect] = useState(initObject);

  function handleChange(e : ChangeEvent<HTMLInputElement>) {
    // setCollect(e.target.value);
    setCollect({...collect, [e.target.name]: e.target.value}); 
  }

  return {
    value: collect,
    onChange: handleChange
  };

}
