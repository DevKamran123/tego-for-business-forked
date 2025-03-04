import {
  ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface SidenavContextInterface {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SidenavContext = createContext<SidenavContextInterface>({
  open: false,
  setOpen: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export function useSidenavContext() {
  return useContext(SidenavContext);
}

export default function SidenavProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <SidenavContext.Provider value={{ open, setOpen }}>
      {children}
    </SidenavContext.Provider>
  );
}
