import { Box, Typography } from '@mui/material';
import { COLORS } from '../theme';

export default function SectionHeader({ label, title, subtitle, center = false }) {
  return (
    <Box sx={{ textAlign: center ? 'center' : 'left', mb: center ? 5 : 4 }}>
      <Typography
        sx={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: COLORS.accent,
          mb: 0.9,
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '1.9rem', sm: '2.4rem', md: '3.5rem' },
          letterSpacing: '-0.03em',
          lineHeight: 1,
          mb: 1.5,
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          width: 50,
          height: 3,
          background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2})`,
          borderRadius: 2,
          mb: subtitle ? 2 : 0,
          mx: center ? 'auto' : 0,
        }}
      />
      {subtitle && (
        <Typography
          sx={{
            color: COLORS.textMuted,
            fontSize: '0.92rem',
            maxWidth: 500,
            lineHeight: 1.8,
            mx: center ? 'auto' : 0,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
