import { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Link, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { COLORS } from '../theme';
import { useReveal } from '../hooks/useReveal';
import SectionHeader from './SectionHeader';
import { usePortfolio } from '../context/PortfolioContext';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwpurLW3OSUEfXCQsK9lvKGBM9KjwRiUfV9zI3oSyQyPdGcn9bdas4fjpvkkabz0GJW/exec';

const SOCIAL = [
  { icon: 'fa-brands fa-facebook-f',  href: ' ' },
  { icon: 'fa-brands fa-x-twitter',   href: ' ' },
  { icon: 'fa-brands fa-instagram',   href: 'https://www.instagram.com/puneet_sharma_kk87/' },
  { icon: 'fa-brands fa-linkedin-in', href: 'https://www.linkedin.com/in/puneet-sharma-55a42821b/' },
  { icon: 'fa-brands fa-github',      href: 'https://github.com/' },
];

const INFO = [
  { Icon: EmailIcon,      label: 'sharmapuneet8733@gmail.com' },
  { Icon: PhoneIcon,      label: '+91 7419180696' },
  { Icon: LocationOnIcon, label: 'India' },
];

const inputSx = {
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255,255,255,.03)',
    borderRadius: '9px',
    color: COLORS.text,
    fontFamily: "'DM Sans', sans-serif",
    '& fieldset': { borderColor: COLORS.border },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,.2)' },
    '&.Mui-focused fieldset': { borderColor: COLORS.accent, borderWidth: 1 },
  },
  '& .MuiOutlinedInput-input': { color: COLORS.text },
  '& .MuiInputLabel-root': { color: COLORS.textMuted, fontFamily: "'DM Sans', sans-serif" },
  '& .MuiInputLabel-root.Mui-focused': { color: COLORS.accent },
};

export default function Contact() {
  const { showPopup } = usePortfolio();
  const [form, setForm]       = useState({ Name: '', Email: '', Message: '' });
  const [loading, setLoading] = useState(false);
  const { ref: leftRef,  visible: leftVis  } = useReveal(0.1);
  const { ref: rightRef, visible: rightVis } = useReveal(0.1, 100);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

 const handleSubmit = async e => {
  e.preventDefault();
  setLoading(true);

  // Build URL with query params (GET is most reliable with Apps Script + no-cors)
  const params = new URLSearchParams({
    Name:    form.Name,
    Email:   form.Email,
    Message: form.Message,
  });

  try {
    await fetch(`${SCRIPT_URL}?${params.toString()}`, {
      method: 'GET',
      mode: 'no-cors',
    });
  } catch (err) { console.warn('Submit failed:', err.message); }

  showPopup(form.Name, form.Email, form.Message);
  setForm({ Name: '', Email: '', Message: '' });
  setLoading(false);
};

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        px: { xs: '5%', md: '6%' },
        py: { xs: '80px', md: '110px' },
        background: COLORS.bg2, position: 'relative', zIndex: 1,
        '&::before': {
          content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg,transparent,#06060a,transparent)`,
        },
      }}
    >
      <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">

        {/* Left */}
        <Grid item xs={12} md={4}>
          <Box
            ref={leftRef}
            sx={{
              opacity: leftVis ? 1 : 0,
              transform: leftVis ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.75s',
            }}
          >
            <SectionHeader label="Let's Connect" title="Contact Me" />
            <Typography sx={{ color: COLORS.textMuted, fontSize: '0.92rem', lineHeight: 1.8, mb: 3 }}>
              Have a project in mind or want to collaborate? I'm always open to new opportunities and conversations.
            </Typography>

            {INFO.map(({ Icon, label }) => (
              <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1.75, mb: 1.5, color: COLORS.textMuted, fontSize: '0.92rem' }}>
                <Box
                  sx={{
                    width: 40, height: 40, background: 'rgba(255,0,79,.08)', borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: COLORS.accent, flexShrink: 0,
                    transition: 'background 0.3s, transform 0.3s',
                    '&:hover': { background: 'rgba(255,0,79,.16)', transform: 'scale(1.1) rotate(8deg)' },
                  }}
                >
                  <Icon fontSize="small" />
                </Box>
                {label}
              </Box>
            ))}

            {/* Social */}
            <Box sx={{ display: 'flex', gap: 1, mt: 3, flexWrap: 'wrap' }}>
              {SOCIAL.map(s => (
                <Link
                  key={s.icon} href={s.href} target="_blank"
                  sx={{
                    width: 42, height: 42, borderRadius: '10px',
                    background: COLORS.bg3, border: `1px solid ${COLORS.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: COLORS.textMuted, fontSize: '0.95rem', textDecoration: 'none',
                    transition: 'all 0.3s',
                    '&:hover': { background: COLORS.accent, borderColor: COLORS.accent, color: '#fff', transform: 'translateY(-4px) scale(1.1)' },
                  }}
                >
                  <i className={s.icon} />
                </Link>
              ))}
            </Box>

            {/* Resume */}
            <Link
              href="./data/mycv.pdf"
              download
              underline="none"
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1.25, mt: 3,
                border: `1px solid ${COLORS.border}`, color: COLORS.text,
                fontFamily: "'Syne', sans-serif", fontSize: '0.85rem', fontWeight: 600,
                px: 2.5, py: 1.5, borderRadius: '9px',
                transition: 'all 0.3s',
                '&:hover': { borderColor: COLORS.accent, background: 'rgba(255,0,79,.07)', transform: 'translateY(-2px)' },
              }}
            >
              <DownloadIcon fontSize="small" /> Download Resume
            </Link>
          </Box>
        </Grid>

        {/* Right — Form */}
        <Grid item xs={12} md={8}>
          <Box
            ref={rightRef}
            component="form"
            onSubmit={handleSubmit}
            sx={{
              opacity: rightVis ? 1 : 0,
              transform: rightVis ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.75s',
              background: COLORS.bg3, border: `1px solid ${COLORS.border}`,
              borderRadius: '20px', p: { xs: '1.4rem', md: '2.5rem' },
              position: 'relative', overflow: 'hidden',
              '&::before': {
                content: '""', position: 'absolute', inset: 0, borderRadius: '20px',
                background: `radial-gradient(circle at 50% 0%,rgba(255,0,79,.06),transparent 60%)`,
                opacity: 0, transition: 'opacity 0.5s', pointerEvents: 'none',
              },
              '&:focus-within::before': { opacity: 1 },
            }}
          >
            <TextField
              fullWidth label="Your Name" name="Name"
              value={form.Name} onChange={handleChange}
              required placeholder="e.g. John Doe"
              sx={{ ...inputSx, mb: 2 }}
            />
            <TextField
              fullWidth label="Email Address" name="Email" type="email"
              value={form.Email} onChange={handleChange}
              required placeholder="you@example.com"
              sx={{ ...inputSx, mb: 2 }}
            />
            <TextField
              fullWidth label="Message" name="Message" multiline rows={4}
              value={form.Message} onChange={handleChange}
              placeholder="Tell me about your project or idea..."
              sx={{ ...inputSx, mb: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
              sx={{
                background: COLORS.accent,
                py: 1.75,
                '&:hover': { background: COLORS.accentDark, transform: 'translateY(-2px)', boxShadow: `0 12px 32px ${COLORS.glow}` },
                '&:disabled': { background: COLORS.accent, opacity: 0.7 },
                transition: 'all 0.3s',
              }}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
}