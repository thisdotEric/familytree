import { useContext, useEffect } from 'react';
import { HeaderContext } from '../context/header.context';

export const useSetHeader = (familyName: string = '') => {
  const { setHeader } = useContext(HeaderContext);

  useEffect(() => {
    setHeader({ familyName });
  }, []);
};
