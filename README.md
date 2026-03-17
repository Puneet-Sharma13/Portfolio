# Puneet Sharma — Portfolio (React + MUI)

A fully modular React.js + Material UI conversion of the original single-file HTML portfolio.

## Project Structure

```
portfolio/
├── index.html                  # Vite entry (loads fonts, FA icons, Three.js)
├── main.jsx                    # React DOM root
├── vite.config.js
├── package.json
├── App.jsx                     # Root component — composes all sections
├── theme.js                    # MUI theme + COLORS tokens
├── context/
│   └── PortfolioContext.jsx    # Global state (popup open/close)
├── data/
│   └── index.js                # All static data (techs, projects, globe nodes…)
├── hooks/
│   └── useReveal.js            # useReveal + useCounter scroll-animation hooks
└── components/
    ├── SectionHeader.jsx       # Reusable label / title / divider block
    ├── ScrollProgressBar.jsx   # Fixed top progress bar
    ├── ParticleCanvas.jsx      # Full-screen reactive particle field
    ├── CustomCursor.jsx        # Custom dot + ring cursor (desktop)
    ├── Navbar.jsx              # Sticky nav + MUI Drawer mobile menu
    ├── Hero.jsx                # Animated hero with char-by-char title
    ├── About.jsx               # Photo, tabs (Skills/Experience/Education), counters
    ├── TechStack.jsx           # Dual marquee + 4 category cards
    ├── Services.jsx            # 3-column service cards
    ├── SkillGlobe.jsx          # Interactive Three.js 3D skill globe
    ├── Portfolio.jsx           # Project cards grid
    ├── Contact.jsx             # MUI form + Google Sheets + Telegram notify
    ├── Footer.jsx
    └── SuccessPopup.jsx        # MUI Modal with SVG check animation
```

## Setup

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run preview
```

## Notes

- **Three.js** is loaded via CDN in `index.html` (accessed as `window.THREE` inside SkillGlobe)
- **Font Awesome** icons are used via CDN class strings (`fa-solid fa-brain` etc.)
- **Google Fonts** (Syne + DM Sans) loaded in `index.html`
- Replace `myphoto.png`, `work-1.png`, `work-2.png`, `work-3.png` in `/public` with your own images
- Update `SCRIPT_URL`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` in `components/Contact.jsx` as needed
- The `Puneet.resume.pdf` download link in Contact points to `/public/Puneet.resume.pdf`
