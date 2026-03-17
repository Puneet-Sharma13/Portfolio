import { Box, Grid, Typography, Link } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { COLORS } from '../theme';
import { useReveal } from '../hooks/useReveal';
import SectionHeader from './SectionHeader';
import { PROJECTS } from '../data';

function ProjectCard({ project, delay }) {
  const { ref, visible } = useReveal(0.1, delay);

  return (
    <Box
      ref={ref}
      className="tilt-card"
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.75s ease, transform 0.75s ease',
        borderRadius: '14px', overflow: 'hidden',
        background: COLORS.bg3, border: `1px solid ${COLORS.border}`,
        '&:hover': {
          transform: 'translateY(-8px) rotate(0.4deg)',
          boxShadow: '0 28px 65px rgba(0,0,0,.55)',
        },
        transition: 'all 0.5s cubic-bezier(.23,1,.32,1)',
      }}
    >
      <Box sx={{ overflow: 'hidden' }}>
        <Box
          component="img"
          src={project.img}
          alt={project.title}
          onError={e => { e.target.src = project.fallback; }}
          sx={{
            width: '100%',
            aspectRatio: '16/9',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.7s cubic-bezier(.23,1,.32,1)',
            '.tilt-card:hover &': { transform: 'scale(1.08)' },
          }}
        />
      </Box>
      <Box sx={{ p: '1.4rem' }}>
        <Typography variant="h3" sx={{ fontSize: '1.05rem', mb: 0.5 }}>
          {project.title}
        </Typography>
        <Typography sx={{ fontSize: '0.85rem', color: COLORS.textMuted, lineHeight: 1.6, mb: 1.25 }}>
          {project.desc}
        </Typography>
        <Link
          href={project.link}
          underline="none"
          sx={{
            display: 'inline-flex', alignItems: 'center', gap: 0.75,
            fontSize: '0.75rem', fontWeight: 600,
            fontFamily: "'Syne', sans-serif",
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: COLORS.accent,
            transition: 'gap 0.3s',
            '&:hover': { gap: '12px' },
          }}
        >
          View Project <ArrowForwardIcon sx={{ fontSize: '0.9rem' }} />
        </Link>
      </Box>
    </Box>
  );
}

export default function Portfolio() {
  const { ref, visible } = useReveal();

  return (
    <Box
      id="portfolio"
      component="section"
      sx={{
        px: { xs: '5%', md: '6%' },
        py: { xs: '80px', md: '110px' },
        background: COLORS.bg, position: 'relative', zIndex: 1,
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
        <SectionHeader center label="Recent Projects" title="My Work" />
      </Box>
      <Grid container spacing={2}>
        {PROJECTS.map((p, i) => (
          <Grid item xs={12} sm={6} md={4} key={p.title}>
            <ProjectCard project={p} delay={i * 100} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
