import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00B8D4', // Cyan
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#651FFF', // Indigo
    },
    background: {
      default: '#121212', // Deep dark
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5',
    },
    divider: '#333',
  },
  typography: {
    fontFamily: `'Orbitron', 'Poppins', 'sans-serif'`, // Tech-style font
    h6: {
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
    body1: {
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'uppercase',
          fontWeight: 600,
          letterSpacing: '1px',
        //   backgroundColor: "#2196F3",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundImage: 'none',
          boxShadow: '0 0 12px rgba(0,255,255,0.1)',
        },
      },
    },
  },
});

export default theme;
