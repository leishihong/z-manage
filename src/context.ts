import { createContext } from "react";
interface GlobalContext {
  theme: string;
  setTheme: (theme?: string) => void;
}
export const GlobalContext = createContext<GlobalContext>({
  theme: "light",
  setTheme: () => {},
});
