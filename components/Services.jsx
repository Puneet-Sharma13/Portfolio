import { Box, Grid, Typography } from '@mui/material';
import { COLORS } from '../theme';
import { useReveal } from '../hooks/useReveal';
import SectionHeader from './SectionHeader';
import { SERVICES } from '../data';

function ServiceCard({ service, delay }) {
  const { ref, visible } = useReveal(0.1, delay);

  return (
    <Box
      ref={ref}
      className="tilt-card"
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.75s ease, transform 0.75s ease',
        background: COLORS.bg3,
        border: `1px solid ${COLORS.border}`,
        borderRadius: '14px',
        p: '2.2rem',
        position: 'relative', overflow: 'hidden',
        height: '100%',
        '&::before': {
          content: '""',
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: COLORS.accent, transform: 'scaleX(0)', transformOrigin: 'left',
          transition: 'transform 0.5s',
        },
        '&:hover': {
          transform: 'translateY(-7px)',
          borderColor: COLORS.borderAccent,
          boxShadow: '0 22px 55px rgba(255,0,79,.09)',
        },
        '&:hover::before': { transform: 'scaleX(1)' },
      }}
    >
      <Box
        sx={{
          width: 50, height: 50,
          background: 'rgba(255,0,79,.1)',
          borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem', color: COLORS.accent,
          mb: 2.5,
          transition: 'background 0.3s, transform 0.4s',
          '.tilt-card:hover &': {
            background: 'rgba(255,0,79,.18)',
            transform: 'rotate(8deg) scale(1.12)',
          },
        }}
      >
        <i className={service.icon} />
      </Box>
      <Typography variant="h3" sx={{ fontSize: '1.15rem', mb: 1 }}>
        {service.title}
      </Typography>
      <Typography sx={{ fontSize: '0.88rem', color: COLORS.textMuted, lineHeight: 1.75 }}>
        {service.desc}
      </Typography>
    </Box>
  );
}

export default function Services() {
  const { ref, visible } = useReveal();

  return (
    <Box
      id="services"
      component="section"
      sx={{
        px: { xs: '5%', md: '6%' },
        py: { xs: '80px', md: '110px' },
        background: COLORS.bg2,
        position: 'relative', zIndex: 1,
        '&::before': {
          content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg,transparent,#06060a,transparent)`,
        },
      }}
    >
      <Box
        ref={ref}
        sx={{
          textAlign: 'center', mb: 5,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'all 0.75s',
        }}
      >
        <SectionHeader center label="What I do" title="My Services" />
      </Box>
      <Grid container spacing={2}>
        {SERVICES.map((s, i) => (
          <Grid item xs={12} sm={6} md={4} key={s.title}>
            <ServiceCard service={s} delay={i * 100} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
