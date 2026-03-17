import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { COLORS } from '../theme';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: COLORS.bg,
        borderTop: `1px solid ${COLORS.border}`,
        px: { xs: '5%', md: '6%' },
        py: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 1.5,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Typography sx={{ fontSize: '0.8rem', color: COLORS.textMuted }}>
        © 2025 Puneet Sharma — AI & Full Stack Developer
      </Typography>
      <Typography sx={{ fontSize: '0.8rem', color: COLORS.textMuted, display: 'flex', alignItems: 'center', gap: 0.5 }}>
        Made with <FavoriteIcon sx={{ color: COLORS.accent, fontSize: '0.85rem' }} /> in India
      </Typography>
    </Box>
  );
}
