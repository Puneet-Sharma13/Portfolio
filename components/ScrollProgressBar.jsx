import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { COLORS } from '../theme';

export default function ScrollProgressBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      setPct((scrolled / total) * 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0, left: 0,
        height: 3,
        width: `${pct}%`,
        background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2})`,
        zIndex: 9999,
        transition: 'width 0.1s linear',
        pointerEvents: 'none',
      }}
    />
  );
}
