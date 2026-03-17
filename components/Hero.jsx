import { useEffect } from 'react';
import { Box, Typography, Button, Chip, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SendIcon from '@mui/icons-material/Send';
import { COLORS } from '../theme';
import { keyframes } from '@mui/system';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const charUp = keyframes`
  to { opacity: 1; transform: translateY(0); }
`;
const pulse = keyframes`
  0%,100% { opacity:1; transform:scale(1); }
  50%      { opacity:.3; transform:scale(.6); }
`;
const orbFloat = keyframes`
  0%,100% { transform:translate(0,0); }
  50%      { transform:translate(25px,-25px); }
`;
const scrollBounce = keyframes`
  0%,100% { transform:translateY(0); opacity:1; }
  50%      { transform:translateY(5px); opacity:.3; }
`;
const gl1 = keyframes`
  0%,92%,100% { transform:none;opacity:0; }
  93% { transform:translate(-4px,1px);opacity:.8; }
  95% { transform:translate(4px,-1px);opacity:.6; }
  97% { transform:translate(-2px,2px);opacity:.8; }
  99% { transform:none;opacity:0; }
`;
const gl2 = keyframes`
  0%,90%,100% { transform:none;opacity:0; }
  91% { transform:translate(4px,-1px);opacity:.7; }
  93% { transform:translate(-3px,2px);opacity:.5; }
  96% { transform:translate(2px,1px);opacity:.7; }
  98% { transform:none;opacity:0; }
`;

const HERO_PILLS = ['Agentic AI','LangChain','LangGraph','FastAPI','React.JS','n8n','MCP Server','Python'];
const LINES = [
  { text: "Hey, I'm", delay: 250, accent: false, outline: false },
  { text: 'Puneet',   delay: 480, accent: true,  glitch: true },
  { text: 'Sharma',   delay: 700, accent: false, outline: true },
];

function HeroLine({ text, delay, accent, outline, glitch }) {
  const chars = text.split('');
  return (
    <Box component="span" sx={{ display: 'block', overflow: 'hidden' }}>
      {chars.map((ch, i) => (
        <Box
          key={i}
          component="span"
          sx={{
            display: 'inline-block',
            opacity: 0,
            transform: 'translateY(110%)',
            animation: `${charUp} 0.55s ease forwards`,
            animationDelay: `${delay + i * 48}ms`,
            color: accent ? COLORS.accent : outline ? 'transparent' : 'inherit',
            WebkitTextStroke: outline ? `2px rgba(240,240,244,0.22)` : 'none',
            position: glitch ? 'relative' : 'static',
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </Box>
      ))}
    </Box>
  );
}

export default function Hero() {
  return (
    <Box
      id="header"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        px: { xs: '5%', md: '6%' },
        pt: '72px',
        zIndex: 1,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,.04) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 25%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 25%, transparent 100%)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Orbs */}
      {[
        { w: { xs: 200, md: 650 }, h: { xs: 200, md: 650 }, top: { xs: -50, md: -150 }, right: { xs: -50, md: -80 }, color: 'rgba(255,0,79,.14)', dur: '9s' },
        { w: { xs: 160, md: 450 }, h: { xs: 160, md: 450 }, bottom: 0, left: { xs: -40, md: '5%' }, color: 'rgba(124,58,237,.11)', dur: '12s', rev: true },
        { w: 300, h: 300, bottom: '20%', right: '20%', color: 'rgba(255,0,79,.07)', dur: '7s', hidden: { xs: true } },
      ].map((orb, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(90px)',
            pointerEvents: 'none',
            width: orb.w, height: orb.h,
            top: orb.top, bottom: orb.bottom,
            left: orb.left, right: orb.right,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            animation: `${orbFloat} ${orb.dur} ease-in-out infinite ${orb.rev ? 'reverse' : ''}`,
            display: orb.hidden ? orb.hidden : 'block',
          }}
        />
      ))}

      {/* Content */}
      <Box sx={{ maxWidth: 860, width: '100%', position: 'relative', zIndex: 2, pb: { xs: 8, md: 0 } }}>
        {/* Tag */}
        <Box
          sx={{
            display: 'inline-flex', alignItems: 'center', gap: 1,
            background: 'rgba(255,0,79,.08)', border: '1px solid rgba(255,0,79,.3)',
            px: 2, py: 0.75, borderRadius: '100px',
            fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: COLORS.accent, mb: 3,
            opacity: 0, animation: `${fadeUp} 0.6s 0.1s ease forwards`,
          }}
        >
          <Box sx={{ width: 6, height: 6, background: COLORS.accent, borderRadius: '50%', animation: `${pulse} 2s infinite` }} />
          Open to opportunities
        </Box>

        {/* Title */}
        <Typography
          component="h1"
          sx={{
            fontFamily: "'Syne', sans-serif",
            fontSize: { xs: 'clamp(2.6rem,12vw,3.8rem)', md: 'clamp(3.2rem,8vw,7.5rem)' },
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            mb: 2.5,
          }}
        >
          {LINES.map((line, i) => <HeroLine key={i} {...line} />)}
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            fontSize: { xs: '0.88rem', md: '1rem' },
            color: COLORS.textMuted,
            maxWidth: 560,
            lineHeight: 1.8,
            mb: 2.5,
            opacity: 0,
            animation: `${fadeUp} 0.6s 0.85s ease forwards`,
          }}
        >
          AI & Full Stack Developer from India — building intelligent systems with{' '}
          <strong style={{ color: COLORS.text }}>LangChain, LangGraph, FastAPI & React</strong>.
          From autonomous AI agents to polished web interfaces.
        </Typography>

        {/* Pills */}
        <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mb: 3.5 }}>
          {HERO_PILLS.map((pill, i) => (
            <Chip
              key={pill}
              label={pill}
              size="small"
              sx={{
                background: 'rgba(255,255,255,.04)',
                border: `1px solid ${COLORS.border}`,
                color: COLORS.textMuted,
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
                borderRadius: '100px',
                opacity: 0,
                animation: `${fadeUp} 0.5s ease forwards`,
                animationDelay: `${1.0 + i * 0.07}s`,
                transition: 'all 0.3s',
                '&:hover': {
                  borderColor: COLORS.accent,
                  color: COLORS.accent,
                  background: 'rgba(255,0,79,.06)',
                  transform: 'translateY(-2px)',
                },
              }}
            />
          ))}
        </Stack>

        {/* CTAs */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          gap={1.5}
          sx={{ opacity: 0, animation: `${fadeUp} 0.6s 1.1s ease forwards` }}
        >
          <Button
            variant="contained"
            href="#portfolio"
            startIcon={<VisibilityIcon />}
            sx={{
              background: COLORS.accent,
              px: 4, py: 1.75,
              '&:hover': {
                background: COLORS.accentDark,
                transform: 'translateY(-3px)',
                boxShadow: `0 14px 36px ${COLORS.glow}`,
              },
              transition: 'all 0.3s',
              position: 'relative', overflow: 'hidden',
            }}
          >
            View My Work
          </Button>
          <Button
            variant="outlined"
            href="#contact"
            startIcon={<SendIcon />}
            sx={{
              borderColor: COLORS.border,
              color: COLORS.text,
              px: 4, py: 1.75,
              '&:hover': {
                borderColor: 'rgba(255,255,255,.3)',
                background: 'rgba(255,255,255,.04)',
                transform: 'translateY(-3px)',
              },
              transition: 'all 0.3s',
            }}
          >
            Get In Touch
          </Button>
        </Stack>
      </Box>

      {/* Scroll indicator */}
      <Box
        sx={{
          position: 'absolute', bottom: '2.5rem', left: { xs: '5%', md: '6%' },
          display: 'flex', alignItems: 'center', gap: 1.5,
          fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          color: COLORS.textMuted, zIndex: 2,
          opacity: 0, animation: `${fadeUp} 0.6s 1.3s ease forwards`,
        }}
      >
        <Box sx={{ width: 40, height: 1, background: `linear-gradient(90deg,${COLORS.accent},transparent)` }} />
        <Box sx={{
          width: 5, height: 5, borderRadius: '50%',
          border: `1px solid ${COLORS.accent}`,
          animation: `${scrollBounce} 1.8s ease-in-out infinite`,
        }} />
        <span>Scroll</span>
      </Box>
    </Box>
  );
}
