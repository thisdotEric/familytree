import { createContext } from 'react';

export interface HeaderContextValue {
  familyName: string;
}

interface HeaderContextProps {
  header: HeaderContextValue;
  setHeader: React.Dispatch<React.SetStateAction<HeaderContextValue>>;
}

export const HeaderContext = createContext<HeaderContextProps>({
  header: { familyName: '' },
  setHeader: () => {},
});
