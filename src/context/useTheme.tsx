import React, { createContext, useState, useContext, ReactNode } from "react";

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = (): ThemeContextProps => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return themeContext;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState("light-theme");

  const toggleTheme = (): void => {
    setTheme((prevTheme) =>
      prevTheme === "light-theme" ? "dark-theme" : "light-theme"
    );
  };

  const value: ThemeContextProps = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
