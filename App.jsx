import { ThemeProvider, createTheme, CssBaseline, GlobalStyles } from '@mui/material';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Services from './components/Services';
import SkillGlobe from './components/SkillGlobe';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleCanvas from './components/ParticleCanvas';
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import SuccessPopup from './components/SuccessPopup';
import { PortfolioProvider } from './context/PortfolioContext';
import { theme } from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <PortfolioProvider>
        <ScrollProgressBar />
        <ParticleCanvas />
        <CustomCursor />
        <Navbar />
        <Hero />
        <About />
        <TechStack />
        <Services />
        <SkillGlobe />
        <Portfolio />
        <Contact />
        <Footer />
        <SuccessPopup />
        <SpeedInsights />
      </PortfolioProvider>
    </ThemeProvider>
  );
}

const globalStyles = {
  '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
  html: { scrollBehavior: 'smooth', overflowX: 'hidden' },
  body: { overflowX: 'hidden', width: '100%', lineHeight: 1.6 },
  '::-webkit-scrollbar': { width: '3px' },
  '::-webkit-scrollbar-track': { background: '#06060a' },
  '::-webkit-scrollbar-thumb': { background: '#ff004f', borderRadius: '2px' },
};
