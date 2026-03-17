import { Box, Typography, Button, Modal, Backdrop } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { COLORS } from '../theme';
import { usePortfolio } from '../context/PortfolioContext';
import { keyframes } from '@mui/system';

const drawCircle = keyframes`to { stroke-dashoffset: 0; }`;
const drawTick   = keyframes`to { stroke-dashoffset: 0; }`;
const popGlow    = keyframes`
  0%,100% { transform:translateX(-50%) scale(1); opacity:.5; }
  50%      { transform:translateX(-50%) scale(1.3); opacity:1; }
`;
const fadeUp = keyframes`
  from { opacity:0; transform:translateY(12px); }
  to   { opacity:1; transform:translateY(0); }
`;
const shimmer = keyframes`
  from { transform:translateX(-100%); }
  to   { transform:translateX(100%); }
`;

export default function SuccessPopup() {
  const { popup, hidePopup } = usePortfolio();
  const { open, name, email, message } = popup;

  return (
    <Modal
      open={open}
      onClose={hidePopup}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { sx: { backdropFilter: 'blur(16px)', background: 'rgba(6,6,10,.82)' } } }}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, zIndex: 99990 }}
    >
      <Box
        sx={{
          background: COLORS.bg3,
          border: '1px solid rgba(255,0,79,.22)',
          borderRadius: '26px',
          p: { xs: '2rem 1.3rem', md: '3rem 2.5rem' },
          maxWidth: 460, width: '100%',
          textAlign: 'center',
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 0 100px rgba(255,0,79,.1), 0 40px 100px rgba(0,0,0,.7)',
          outline: 'none',
        }}
      >
        {/* Decorative dots */}
        <Box sx={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,0,79,.08),transparent)', top: -40, right: -40 }} />
        <Box sx={{ position: 'absolute', width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,.08),transparent)', bottom: -20, left: -20 }} />

        {/* Glow behind check */}
        <Box
          sx={{
            position: 'absolute', top: -80, left: '50%',
            width: 260, height: 260, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,0,79,.15), transparent 70%)',
            animation: `${popGlow} 2.8s ease-in-out infinite`,
            pointerEvents: 'none',
          }}
        />

        {/* Animated check */}
        <Box sx={{ width: 88, height: 88, mx: 'auto', mb: 2.5, position: 'relative', zIndex: 1 }}>
          <svg viewBox="0 0 88 88" width="88" height="88">
            <circle
              cx="44" cy="44" r="40"
              fill="none" stroke={COLORS.accent} strokeWidth="2.5"
              strokeDasharray="251" strokeDashoffset="251"
              style={{ animation: open ? `${drawCircle} 0.7s 0.1s cubic-bezier(.65,0,.35,1) forwards` : 'none' }}
            />
            <path
              d="M26 44 l14 14 l22-26"
              fill="none" stroke={COLORS.accent} strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="60" strokeDashoffset="60"
              style={{ animation: open ? `${drawTick} 0.4s 0.75s ease forwards` : 'none' }}
            />
          </svg>
        </Box>

        <Typography
          sx={{
            fontFamily: "'Syne', sans-serif", fontSize: { xs: '1.3rem', md: '1.7rem' },
            fontWeight: 800, letterSpacing: '-0.03em', mb: 0.75,
            position: 'relative', zIndex: 1,
            opacity: 0, animation: open ? `${fadeUp} 0.5s 0.35s ease forwards` : 'none',
          }}
        >
          Message <span style={{ color: COLORS.accent }}>Sent!</span> 🎉
        </Typography>

        <Typography
          sx={{
            fontSize: '0.9rem', color: COLORS.textMuted, lineHeight: 1.75, mb: 2.5,
            position: 'relative', zIndex: 1,
            opacity: 0, animation: open ? `${fadeUp} 0.5s 0.45s ease forwards` : 'none',
          }}
        >
          Thanks for reaching out. I've received your message and will get back to you soon.
        </Typography>

        {/* Summary card */}
        <Box
          sx={{
            background: 'rgba(255,0,79,.05)', border: '1px solid rgba(255,0,79,.14)',
            borderRadius: '14px', p: '1rem 1.3rem', mb: 2.5, textAlign: 'left',
            position: 'relative', zIndex: 1,
            opacity: 0, animation: open ? `${fadeUp} 0.5s 0.55s ease forwards` : 'none',
          }}
        >
          {[
            { icon: 'fa-solid fa-user',    label: 'Name',    value: name },
            { icon: 'fa-solid fa-envelope', label: 'Email',  value: email },
            { icon: 'fa-solid fa-message',  label: 'Message', value: message?.length > 90 ? message.slice(0, 90) + '…' : message },
          ].map((row, i, arr) => (
            <Box
              key={row.label}
              sx={{
                display: 'flex', alignItems: 'flex-start', gap: 1.25,
                py: 0.75, fontSize: '0.82rem', color: COLORS.textMuted,
                borderBottom: i < arr.length - 1 ? `1px solid ${COLORS.border}` : 'none',
              }}
            >
              <i className={row.icon} style={{ color: COLORS.accent, width: 14, flexShrink: 0, marginTop: 2 }} />
              <span><strong style={{ color: COLORS.text }}>{row.label}: </strong>{row.value || '—'}</span>
            </Box>
          ))}
        </Box>

        <Button
          onClick={hidePopup}
          variant="contained"
          startIcon={<CheckIcon />}
          sx={{
            background: COLORS.accent,
            fontFamily: "'Syne', sans-serif", fontSize: '0.9rem', fontWeight: 700,
            letterSpacing: '0.05em', px: 5, py: 1.75, borderRadius: '11px',
            position: 'relative', zIndex: 1, overflow: 'hidden',
            opacity: 0, animation: open ? `${fadeUp} 0.5s 0.65s ease forwards` : 'none',
            '&:hover': { background: COLORS.accentDark, transform: 'translateY(-2px)', boxShadow: `0 12px 32px ${COLORS.glow}` },
            '&::after': {
              content: '""', position: 'absolute', inset: 0,
              background: 'linear-gradient(110deg,transparent 35%,rgba(255,255,255,.18) 50%,transparent 65%)',
              transform: 'translateX(-100%)', transition: 'transform 0.5s',
            },
            '&:hover::after': { transform: 'translateX(100%)' },
            transition: 'background 0.3s, transform 0.3s, box-shadow 0.3s',
          }}
        >
          Awesome, got it!
        </Button>
      </Box>
    </Modal>
  );
}
