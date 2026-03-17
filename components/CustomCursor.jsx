import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { COLORS } from '../theme';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  let cx = 0, cy = 0, rx = 0, ry = 0;

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = e => { cx = e.clientX; cy = e.clientY; };
    document.addEventListener('mousemove', onMove);

    let animId;
    function move() {
      rx += (cx - rx) * 0.13;
      ry += (cy - ry) * 0.13;
      dot.style.left  = cx + 'px';
      dot.style.top   = cy + 'px';
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      animId = requestAnimationFrame(move);
    }
    move();

    const interactables = document.querySelectorAll(
      'a, button, .tilt-card, .marquee-item, .tech-chip, .hero-pill'
    );
    const onEnter = () => ring.classList.add('big');
    const onLeave = () => ring.classList.remove('big');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('mousemove', onMove);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  const base = {
    position: 'fixed',
    borderRadius: '50%',
    pointerEvents: 'none',
    transform: 'translate(-50%,-50%)',
    '@media (hover: none)': { display: 'none' },
  };

  return (
    <>
      <Box
        ref={dotRef}
        sx={{
          ...base,
          width: 8, height: 8,
          background: COLORS.accent,
          zIndex: 99999,
        }}
      />
      <Box
        ref={ringRef}
        className="cursor-ring"
        sx={{
          ...base,
          width: 36, height: 36,
          border: `1.5px solid rgba(255,0,79,0.5)`,
          zIndex: 99998,
          transition: 'width 0.25s, height 0.25s, border-color 0.25s',
          '&.big': { width: 58, height: 58, borderColor: COLORS.accent },
        }}
      />
    </>
  );
}
