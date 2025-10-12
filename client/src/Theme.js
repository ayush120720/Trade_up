export const tokensDark = {
  black: {
    0: "#ffffff",
    100: "#e5e7eb",
    200: "#d1d5db",
    300: "#9ca3af",
    400: "#6b7280",
    500: "#4b5563",
    600: "#374151",
    700: "#1f2937",
    800: "#111827",
    900: "#0a0f1f",
    1000: "#000000",
  },
  green: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
  accent: {
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  gold: {
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
};

function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}

export const tokensLight = reverseTokens(tokensDark);

export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              ...tokensDark.green,
              main: tokensDark.green[500],
              light: tokensDark.green[300],
            },
            secondary: {
              ...tokensDark.red,
              main: tokensDark.red[500],
              light: tokensDark.red[300],
            },
            neutral: {
              ...tokensDark.accent,
              main: tokensDark.accent[500],
              light: tokensDark.accent[300],
            },
            accent: {
              main: tokensDark.gold[500],
              light: tokensDark.gold[300],
            },
            background: {
              default: tokensDark.black[900],
              alt: tokensDark.black[800],
            },
          }
        : {
            primary: {
              ...tokensLight.green,
              main: tokensDark.green[600],
              light: tokensDark.green[400],
            },
            secondary: {
              ...tokensLight.red,
              main: tokensDark.red[600],
              light: tokensDark.red[400],
            },
            neutral: {
              ...tokensLight.accent,
              main: tokensDark.accent[500],
              light: tokensDark.accent[300],
            },
            accent: {
              main: tokensDark.gold[500],
              light: tokensDark.gold[300],
            },
            background: {
              default: tokensDark.black[0],
              alt: tokensDark.black[100],
            },
          }),
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 12,
      h1: { fontFamily: ["Poppins", "sans-serif"].join(","), fontSize: 40 },
      h2: { fontFamily: ["Poppins", "sans-serif"].join(","), fontSize: 32 },
      h3: { fontFamily: ["Poppins", "sans-serif"].join(","), fontSize: 24 },
      h4: { fontFamily: ["Poppins", "sans-serif"].join(","), fontSize: 20 },
      h5: { fontFamily: ["Poppins", "sans-serif"].join(","), fontSize: 16 },
      h6: { fontFamily: ["Poppins", "sans-serif"].join(","), fontSize: 14 },
    },
  };
};
