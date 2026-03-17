import { useEffect, useRef } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { COLORS } from '../theme';
import { useReveal } from '../hooks/useReveal';
import SectionHeader from './SectionHeader';
import { TECHS, STACK_CATEGORIES } from '../data';
import { keyframes } from '@mui/system';

const mFwd = keyframes`from{transform:translateX(0)}to{transform:translateX(-50%)}`;
const mBwd = keyframes`from{transform:translateX(-50%)}to{transform:translateX(0)}`;
const shimmer = keyframes`
  from{transform:translateX(-100%)} to{transform:translateX(100%)}
`;

const CAT_COLORS = {
  red:    { bg: 'rgba(255,0,79,.12)',    color: COLORS.accent },
  purple: { bg: 'rgba(124,58,237,.12)',  color: '#a78bfa' },
  blue:   { bg: 'rgba(56,189,248,.1)',   color: '#38bdf8' },
  green:  { bg: 'rgba(52,211,153,.1)',   color: '#34d399' },
};

function MarqueeRow({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <Box
      sx={{
        overflow: 'hidden', mb: 0.75,
        WebkitMaskImage: 'linear-gradient(90deg,transparent,black 8%,black 92%,transparent)',
        maskImage: 'linear-gradient(90deg,transparent,black 8%,black 92%,transparent)',
      }}
    >
      <Box
        sx={{
          display: 'flex', width: 'max-content',
          animation: `${reverse ? mBwd : mFwd} ${reverse ? 33 : 38}s linear infinite`,
          '&:hover': { animationPlayState: 'paused' },
        }}
      >
        {doubled.map((tech, i) => (
          <Box
            key={i}
            className="marquee-item"
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 1,
              px: '22px', py: '10px', mx: '6px',
              background: COLORS.bg3, border: `1px solid ${COLORS.border}`,
              borderRadius: '100px', fontSize: '0.8rem', fontWeight: 500,
              color: COLORS.textMuted, whiteSpace: 'nowrap',
              transition: 'all 0.3s', cursor: 'default',
              '&:hover': {
                borderColor: COLORS.accent, color: COLORS.text,
                background: 'rgba(255,0,79,.06)', transform: 'scale(1.06)',
              },
            }}
          >
            <i className={tech.icon} style={{ fontSize: '0.85rem' }} />
            {tech.name}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function StackCard({ cat, delay }) {
  const { ref, visible } = useReveal(0.1, delay);
  const c = CAT_COLORS[cat.color];

  return (
    <Box
      ref={ref}
      className="tilt-card"
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.88)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        background: COLORS.bg3,
        border: `1px solid ${COLORS.border}`,
        borderRadius: '14px',
        p: '2rem',
        position: 'relative', overflow: 'hidden',
        cursor: 'default',
        '&::before': {
          content: '""',
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg,${COLORS.accent},#06060a)`,
          transform: 'scaleX(0)', transformOrigin: 'left',
          transition: 'transform 0.5s',
        },
        '&:hover': {
          transform: 'translateY(-6px)',
          borderColor: COLORS.borderAccent,
          boxShadow: '0 18px 48px rgba(0,0,0,.45)',
        },
        '&:hover::before': { transform: 'scaleX(1)' },
      }}
    >
      {/* Shimmer */}
      <Box
        sx={{
          position: 'absolute', inset: 0, overflow: 'hidden',
          '&::after': {
            content: '""', position: 'absolute', inset: 0,
            background: 'linear-gradient(105deg,transparent 40%,rgba(255,255,255,.04) 50%,transparent 60%)',
            transform: 'translateX(-100%)',
            transition: 'transform 0.6s',
          },
          '&:hover::after': { transform: 'translateX(100%)' },
        }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2 }}>
        <Box sx={{ width: 38, height: 38, borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', background: c.bg, color: c.color }}>
          <i className={cat.icon} />
        </Box>
        <Typography sx={{ fontFamily: "'Syne', sans-serif", fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: COLORS.textMuted }}>
          {cat.label}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
        {cat.chips.map(chip => (
          <Box
            key={chip.label}
            className="tech-chip"
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 0.75,
              background: 'rgba(255,255,255,.04)', border: `1px solid ${COLORS.border}`,
              px: 1.5, py: 0.75, borderRadius: '8px',
              fontSize: '0.78rem', fontWeight: 500, color: COLORS.text,
              transition: 'all 0.25s', cursor: 'default',
              '&:hover': {
                background: 'rgba(255,0,79,.08)', borderColor: COLORS.borderAccent,
                color: COLORS.accent, transform: 'translateY(-3px)',
              },
            }}
          >
            <i className={chip.icon} style={{ fontSize: '0.75rem' }} />
            {chip.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function TechStack() {
  const { ref, visible } = useReveal();

  return (
    <Box
      id="techstack"
      component="section"
      sx={{
        px: { xs: '5%', md: '6%' },
        py: { xs: '80px', md: '110px' },
        background: COLORS.bg,
        position: 'relative', zIndex: 1, overflow: 'hidden',
        '&::before': {
          content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg,transparent,#06060a,transparent)`,
        },
      }}
    >
      <Box ref={ref} sx={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: 'all 0.75s' }}>
        <SectionHeader
          center
          label="What I work with"
          title="Tech Stack"
          subtitle="A curated toolkit of technologies I use to build intelligent, scalable, production-ready applications."
        />
      </Box>

      <MarqueeRow items={TECHS.slice(0, 9)} />
      <MarqueeRow items={TECHS.slice(9)} reverse />

      <Grid container spacing={2} sx={{ mt: 4 }}>
        {STACK_CATEGORIES.map((cat, i) => (
          <Grid item xs={12} sm={6} lg={3} key={cat.id}>
            <StackCard cat={cat} delay={i * 80} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
