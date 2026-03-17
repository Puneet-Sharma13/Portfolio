import { createTheme } from '@mui/material';

export const COLORS = {
  accent: '#ff004f',
  accentDark: '#c0003c',
  accent2: '#7c3aed',
  bg: '#rgba(6,6,10, 0.82)',
  bg2: '#rgba(13,13,22, 0.88)',
  bg3: '#rgba(19,19,32, 0.90)',
  bgSolid:  '#06060a',
  bg2Solid: '#0d0d16',
  bg3Solid: '#131320',
  text: '#f0f0f4',
  textMuted: '#7878a0',
  border: 'rgba(255,255,255,0.06)',
  borderAccent: 'rgba(255,0,79,0.25)',
  glow: 'rgba(255,0,79,0.2)',
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: COLORS.accent },
    secondary: { main: COLORS.accent2 },
    background: { default: '#06060a', paper: 'rgba(19,19,32,0.90)' },
    text: { primary: COLORS.text, secondary: COLORS.textMuted },
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h1: { fontFamily: "'Syne', sans-serif", fontWeight: 800 },
    h2: { fontFamily: "'Syne', sans-serif", fontWeight: 800 },
    h3: { fontFamily: "'Syne', sans-serif", fontWeight: 700 },
    h4: { fontFamily: "'Syne', sans-serif", fontWeight: 700 },
    h5: { fontFamily: "'Syne', sans-serif", fontWeight: 600 },
    h6: { fontFamily: "'Syne', sans-serif", fontWeight: 600 },
    button: { fontFamily: "'Syne', sans-serif" },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 600,
          letterSpacing: '0.05em',
          borderRadius: '10px',
        },
      },
    },
  },
});
