import { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, Box, Typography, IconButton,
  Drawer, List, ListItem, ListItemButton, Link,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { COLORS } from '../theme';

const NAV_LINKS = [
  { label: 'Home',      href: '#header' },
  { label: 'About',     href: '#about' },
  { label: 'Stack',     href: '#techstack' },
  { label: 'Services',  href: '#services' },
  { label: 'Globe',     href: '#skillglobe' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact',   href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled ? 'rgba(6,6,10,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: `1px solid ${scrolled ? COLORS.border : 'transparent'}`,
          transition: 'background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
          zIndex: 1000,
        }}
      >
        <Toolbar sx={{ px: { xs: '5%', md: '6%' }, justifyContent: 'space-between', minHeight: 72 }}>
          {/* Logo */}
          <Link href="#header" underline="none">
            <Typography
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1.4rem',
                fontWeight: 800,
                color: COLORS.text,
                letterSpacing: '-0.02em',
              }}
            >
              P<span style={{ color: COLORS.accent }}>.</span>Sharma
            </Typography>
          </Link>

          {/* Desktop links */}
          <Box component="ul" sx={{ display: { xs: 'none', md: 'flex' }, gap: '2.2rem', listStyle: 'none', m: 0, p: 0 }}>
            {NAV_LINKS.map(link => (
              <Box component="li" key={link.href}>
                <Link
                  href={link.href}
                  underline="none"
                  sx={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: COLORS.textMuted,
                    position: 'relative',
                    transition: 'color 0.3s',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: 0, bottom: -4,
                      width: 0, height: 2,
                      background: COLORS.accent,
                      transition: 'width 0.3s',
                    },
                    '&:hover': { color: COLORS.text },
                    '&:hover::after': { width: '100%' },
                  }}
                >
                  {link.label}
                </Link>
              </Box>
            ))}
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            sx={{ display: { md: 'none' }, color: COLORS.text }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: '100vw',
            background: 'rgba(6,6,10,0.97)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <IconButton
          onClick={() => setDrawerOpen(false)}
          sx={{ position: 'absolute', top: 20, right: 20, color: COLORS.text }}
        >
          <CloseIcon />
        </IconButton>
        <List sx={{ width: '100%' }}>
          {NAV_LINKS.map((link, i) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton
                component="a"
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  justifyContent: 'center',
                  py: 1.5,
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(2rem,10vw,2.8rem)',
                  fontWeight: 800,
                  color: 'rgba(255,255,255,0.15)',
                  animation: drawerOpen ? `mobIn 0.4s ease ${i * 0.06 + 0.04}s forwards` : 'none',
                  '@keyframes mobIn': {
                    to: { color: COLORS.text },
                  },
                  '&:hover': { color: `${COLORS.accent} !important`, background: 'none' },
                }}
              >
                {link.label}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
