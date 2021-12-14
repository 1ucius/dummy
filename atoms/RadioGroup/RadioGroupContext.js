import { createContext, useContext } from 'react';

const RadioGroupContext = createContext();

export function useRadioGroup() {
  return useContext(RadioGroupContext);
}

export default RadioGroupContext;
