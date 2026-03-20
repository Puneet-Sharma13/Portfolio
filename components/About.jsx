import { useState } from 'react';
import { Box, Typography, Grid, Tab, Tabs, List, ListItem } from '@mui/material';
import { COLORS } from '../theme';
import { useReveal, useCounter } from '../hooks/useReveal';
import SectionHeader from './SectionHeader';
import { keyframes } from '@mui/system';
import myPhoto from '../data/myphoto.png';


const spinBorder = keyframes`to { transform: rotate(360deg); }`;
const tabFade = keyframes`
  from { opacity:0; transform:translateY(8px); }
  to   { opacity:1; transform:translateY(0); }
`;

const TABS = [
  {
    label: 'Skills',
    id: 'skills',
    items: [
      { title: 'AI / LLM Engineering',   desc: 'LangChain, LangGraph, Agentic AI, MCP Server, LLM Integration' },
      { title: 'Backend Development',     desc: 'FastAPI, Python, REST APIs, SQL, OOPS, C++' },
      { title: 'Frontend Development',    desc: 'React.JS, Redux, HTML5, CSS3, JavaScript' },
      { title: 'Tools & Workflow',        desc: 'n8n, GitHub, Postman, Jira, SDLC' },
      { title: 'Cloud',                  desc: 'Azure Fundamentals' },
    ],
  },
  {
    label: 'Experience',
    id: 'experience',
    items: [{ title: 'Oct 2025 - Present', desc: 'Brillio — Data Science Intern' },
            { title: 'July 2025 - Sep 2025', desc: 'JVC Solutions — Software Engineer Intern' }],
    
  },
  {
    label: 'Education',
    id: 'education',
    items: [
      { title: '2021 — 2025',       desc: 'B.Tech-CSE — Chandigarh Group of College' },
      { title: '2021 — 12th Grade', desc: 'S.D. Adarsh Public School' },
      { title: '2019 — 10th Grade', desc: 'S.D. Adarsh Public School' },
    ],
  },
];

function StatCounter({ target, label }) {
  const { ref, count } = useCounter(target);
  return (
    <Box ref={ref} sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
      <Typography
        sx={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '2.4rem',
          fontWeight: 800,
          color: COLORS.accent,
          lineHeight: 1,
        }}
      >
        {count}+
      </Typography>
      <Typography sx={{ fontSize: '0.8rem', color: COLORS.textMuted }}>{label}</Typography>
    </Box>
  );
}

export default function About() {
  const [activeTab, setActiveTab] = useState(0);
  const { ref: imgRef, visible: imgVis } = useReveal(0.1);
  const { ref: txtRef, visible: txtVis } = useReveal(0.1, 100);

  return (
    <Box
      id="about"
      component="section"
      sx={{
        px: { xs: '5%', md: '6%' },
        py: { xs: '80px', md: '110px' },
        background: COLORS.bg2,
        position: 'relative',
        zIndex: 1,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 1,
          background: `linear-gradient(90deg,transparent,#06060a,transparent)`,
        },
      }}
    >
      <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
        {/* Image */}
        <Grid item xs={12} md={4}>
          <Box
            ref={imgRef}
            sx={{
              opacity: imgVis ? 1 : 0,
              transform: imgVis ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.75s, transform 0.75s',
              position: 'relative',
              maxWidth: { xs: '100%', sm: 340, md: '100%' },
              mx: 'auto',
            }}
          >
            {/* Spinning border */}
            <Box
              sx={{
                position: 'absolute', inset: -3, borderRadius: '23px',
                background: `conic-gradient(from 0deg, ${COLORS.accent}, ${COLORS.accent2}, transparent, ${COLORS.accent})`,
                animation: `${spinBorder} 4s linear infinite`,
                zIndex: 0,
              }}
            />
            <Box sx={{ position: 'absolute', inset: 1, borderRadius: '20px', background: COLORS.bg2Solid, zIndex: 1 }} />
            <Box
              component="img"
              src={myPhoto}
              alt="Puneet Sharma"
              onError={e => { e.target.src = 'https://placehold.co/500x600/0d0d16/ff004f?text=PS'; }}
              sx={{
                width: '100%', borderRadius: '20px', display: 'block',
                filter: 'grayscale(15%)',
                transition: 'filter 0.5s, transform 0.5s',
                position: 'relative', zIndex: 2,
                '&:hover': { filter: 'grayscale(0%)', transform: 'scale(1.02)' },
              }}
            />
            {/* Badge */}
            <Box
              sx={{
                position: 'absolute', bottom: -16, right: -16,
                background: COLORS.bg3Solid, border: `1px solid ${COLORS.border}`,
                borderRadius: '14px', p: '14px 20px', textAlign: 'center', zIndex: 3,
              }}
            >
              <Typography sx={{ fontFamily: "'Syne', sans-serif", fontSize: '2rem', fontWeight: 700, color: COLORS.accent, lineHeight: 1, display: 'block' }}>
                1
              </Typography>
              <Typography sx={{ fontSize: '0.68rem', color: COLORS.textMuted, letterSpacing: '0.05em' }}>
                Yrs in Tech
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Text */}
        <Grid item xs={12} md={8}>
          <Box
            ref={txtRef}
            sx={{
              opacity: txtVis ? 1 : 0,
              transform: txtVis ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.75s, transform 0.75s',
            }}
          >
            <SectionHeader label="Who I am" title="About Me" />
            <Typography sx={{ fontSize: '0.95rem', color: COLORS.textMuted, lineHeight: 1.85, mb: 2 }}>
              I'm a developer at the intersection of{' '}
              <strong style={{ color: COLORS.text }}>Artificial Intelligence and Full Stack Web Development</strong>.
              I design and build AI-powered systems — from autonomous agents and LLM pipelines to clean, responsive user interfaces.
            </Typography>
            <Typography sx={{ fontSize: '0.95rem', color: COLORS.textMuted, lineHeight: 1.85, mb: 3 }}>
              Currently working as a <strong style={{ color: COLORS.text }}>Data Science Intern</strong> at <strong style={{ color: COLORS.text }}>Brillio(Bangalore – CTO Office)</strong>, I work with tools like{' '}
              <strong style={{ color: COLORS.text }}>LangChain, LangGraph, FastAPI, React & n8n</strong>{' '}
              to deliver intelligent, end-to-end applications that solve real problems.
            </Typography>

            {/* Stats */}
            <Box sx={{ display: 'flex', gap: 4, mb: 4, flexWrap: 'wrap' }}>
              <StatCounter target={5}  label="Projects Built" />
              <StatCounter target={17} label="Technologies" />
              <StatCounter target={1}  label="Internship" />
            </Box>

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              sx={{
                borderBottom: `1px solid ${COLORS.border}`, mb: 2,
                '& .MuiTabs-indicator': { background: `linear-gradient(90deg,${COLORS.accent},${COLORS.accent2})`, height: 2 },
                '& .MuiTab-root': {
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '0.8rem', fontWeight: 600,
                  letterSpacing: '0.07em', textTransform: 'uppercase',
                  color: COLORS.textMuted,
                  '&.Mui-selected': { color: COLORS.text },
                },
              }}
            >
              {TABS.map(t => <Tab key={t.id} label={t.label} />)}
            </Tabs>

            <Box sx={{ animation: `${tabFade} 0.35s ease` }}>
              <List disablePadding>
                {TABS[activeTab].items.map((item, i) => (
                  <ListItem
                    key={i}
                    disablePadding
                    sx={{
                      flexDirection: 'column', alignItems: 'flex-start', gap: 0.25,
                      py: 1.5,
                      borderBottom: i < TABS[activeTab].items.length - 1 ? `1px solid ${COLORS.border}` : 'none',
                    }}
                  >
                    <Typography sx={{ fontFamily: "'Syne', sans-serif", fontSize: '0.82rem', fontWeight: 700, color: COLORS.accent, letterSpacing: '0.04em' }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.92rem', color: COLORS.text }}>
                      {item.desc}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
