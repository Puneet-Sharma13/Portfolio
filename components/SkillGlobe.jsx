import { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { COLORS } from '../theme';
import { useReveal } from '../hooks/useReveal';
import SectionHeader from './SectionHeader';
import { GLOBE_CATS, GLOBE_NODES } from '../data';

export default function SkillGlobe() {
  const wrapRef   = useRef(null);
  const canvasRef = useRef(null);
  const { ref: headerRef, visible: headerVis } = useReveal();

  useEffect(() => {
    if (!window.THREE) return;
    const THREE   = window.THREE;
    const canvas  = canvasRef.current;
    const wrap    = wrapRef.current;
    if (!canvas || !wrap) return;

    const catMap = Object.fromEntries(GLOBE_CATS.map(c => [c.id, c]));

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 2000);
    camera.position.z = 420;

    function resize() {
      const w = wrap.clientWidth, h = wrap.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(160, 28, 28),
      new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.04 })
    ));

    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(168, 0.7, 8, 80),
      new THREE.MeshBasicMaterial({ color: 0xff004f, transparent: true, opacity: 0.1 })
    );
    ring1.rotation.x = Math.PI / 2; scene.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(175, 0.5, 8, 80),
      new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.07 })
    );
    ring2.rotation.x = Math.PI / 3; scene.add(ring2);

    const sPos = new Float32Array(900);
    for (let i = 0; i < 900; i++) sPos[i] = (Math.random() - 0.5) * 900;
    const stGeo = new THREE.BufferGeometry();
    stGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    scene.add(new THREE.Points(stGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.6, transparent: true, opacity: 0.3 })));

    function fibSphere(n, R) {
      const pts = [], g = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), t = g * i;
        pts.push(new THREE.Vector3(Math.cos(t) * r * R, y * R, Math.sin(t) * r * R));
      }
      return pts;
    }
    const positions  = fibSphere(GLOBE_NODES.length, 155);
    const nodeMeshes = [], labelSprites = [];

    function mkSprite(text, color) {
      const c2 = document.createElement('canvas'), ctx = c2.getContext('2d'), fs = 50;
      ctx.font = `bold ${fs}px Syne,sans-serif`;
      const w = ctx.measureText(text).width + 28;
      c2.width = w; c2.height = fs + 18;
      ctx.font = `bold ${fs}px Syne,sans-serif`;
      ctx.fillStyle = color; ctx.textBaseline = 'middle';
      ctx.fillText(text, 14, c2.height / 2);
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c2), transparent: true, depthTest: false }));
      sp.scale.set(c2.width / 10, c2.height / 10, 1);
      return sp;
    }

    GLOBE_NODES.forEach((node, i) => {
      const cat = catMap[node.cat], pos = positions[i], sz = node.r * 0.038;
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(sz, 16, 16),
        new THREE.MeshBasicMaterial({ color: cat.color })
      );
      mesh.position.copy(pos);
      mesh.userData = { node, index: i, baseColor: cat.color };
      mesh.add(new THREE.Mesh(
        new THREE.SphereGeometry(sz * 2, 12, 12),
        new THREE.MeshBasicMaterial({ color: cat.color, transparent: true, opacity: 0.08, side: THREE.BackSide })
      ));
      scene.add(mesh); nodeMeshes.push(mesh);
      const sp = mkSprite(node.label, cat.hex);
      sp.position.copy(pos.clone().multiplyScalar(1.13));
      scene.add(sp); labelSprites.push(sp);
    });

    const lineGroup = new THREE.Group(); scene.add(lineGroup);
    function buildLines() {
      lineGroup.clear();
      GLOBE_CATS.forEach(cat => {
        const ms = nodeMeshes.filter(m => m.userData.node.cat === cat.id);
        for (let i = 0; i < ms.length; i++) {
          for (let j = i + 1; j < ms.length; j++) {
            const d = ms[i].position.distanceTo(ms[j].position);
            if (d < 200) {
              const g = new THREE.BufferGeometry().setFromPoints([ms[i].position, ms[j].position]);
              lineGroup.add(new THREE.Line(g, new THREE.LineBasicMaterial({
                color: cat.color, transparent: true, opacity: Math.max(0.03, 0.16 - d / 800)
              })));
            }
          }
        }
      });
    }

    const raycaster = new THREE.Raycaster();
    const mouse2    = new THREE.Vector2(-99, -99);
    const tooltip   = document.getElementById('gTooltip');
    const nodeInfo  = document.getElementById('gNodeInfo');
    let hovIdx = -1;

    function updateHover(cx, cy) {
      const rect = wrap.getBoundingClientRect();
      mouse2.x =  ((cx - rect.left) / rect.width)  * 2 - 1;
      mouse2.y = -((cy - rect.top)  / rect.height)  * 2 + 1;
      raycaster.setFromCamera(mouse2, camera);
      const hits = raycaster.intersectObjects(nodeMeshes);
      if (hits.length > 0) {
        const mesh = hits[0].object, idx = mesh.userData.index;
        if (idx !== hovIdx) {
          if (hovIdx >= 0) nodeMeshes[hovIdx].material.color.setHex(nodeMeshes[hovIdx].userData.baseColor);
          hovIdx = idx;
          mesh.material.color.setHex(0xffffff);
          canvas.style.cursor = 'pointer';
          if (tooltip) {
            tooltip.textContent = GLOBE_NODES[idx].label;
            tooltip.style.left = (cx - rect.left) + 'px';
            tooltip.style.top  = (cy - rect.top)  + 'px';
            tooltip.classList.add('show');
          }
          if (nodeInfo) {
            document.getElementById('gniCat').textContent  = catMap[GLOBE_NODES[idx].cat].label;
            document.getElementById('gniName').textContent = GLOBE_NODES[idx].label;
            document.getElementById('gniDesc').textContent = GLOBE_NODES[idx].desc;
            nodeInfo.style.opacity = '1';
          }
        }
      } else {
        if (hovIdx >= 0) { nodeMeshes[hovIdx].material.color.setHex(nodeMeshes[hovIdx].userData.baseColor); hovIdx = -1; }
        canvas.style.cursor = 'grab';
        if (tooltip) tooltip.classList.remove('show');
      }
    }
    wrap.addEventListener('mousemove', e => updateHover(e.clientX, e.clientY));
    wrap.addEventListener('touchmove', e => { const t = e.touches[0]; updateHover(t.clientX, t.clientY); }, { passive: true });

    let drag = false, px = 0, py = 0, rotX = 0, rotY = 0, vx = 0, vy = 0;
    canvas.style.cursor = 'grab';
    canvas.addEventListener('mousedown', e => { drag = true; px = e.clientX; py = e.clientY; canvas.style.cursor = 'grabbing'; });
    window.addEventListener('mousemove', e => {
      if (!drag) return;
      vx = (e.clientY - py) * 0.004; vy = (e.clientX - px) * 0.004;
      rotX += vx; rotY += vy;
      px = e.clientX; py = e.clientY;
    });
    window.addEventListener('mouseup', () => { drag = false; canvas.style.cursor = 'grab'; });
    canvas.addEventListener('touchstart', e => { const t = e.touches[0]; drag = true; px = t.clientX; py = t.clientY; }, { passive: true });
    canvas.addEventListener('touchmove', e => {
      if (!drag) return;
      const t = e.touches[0];
      vx = (t.clientY - py) * 0.004; vy = (t.clientX - px) * 0.004;
      rotX += vx; rotY += vy;
      px = t.clientX; py = t.clientY;
    }, { passive: true });
    canvas.addEventListener('touchend', () => { drag = false; });
    wrap.addEventListener('wheel', e => {
      e.preventDefault();
      camera.position.z = Math.max(220, Math.min(650, camera.position.z + e.deltaY * 0.35));
    }, { passive: false });

    const clock = new THREE.Clock();
    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      if (!drag) { vx *= 0.92; vy *= 0.92; rotY += 0.0018 + vy; rotX += vx; }
      rotX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, rotX));
      const quat = new THREE.Quaternion().setFromEuler(new THREE.Euler(rotX, rotY, 0));
      nodeMeshes.forEach((m, i) => {
        m.position.copy(positions[i].clone().applyQuaternion(quat));
        m.scale.setScalar(1 + Math.sin(t * 1.8 + i * 0.4) * 0.12);
      });
      labelSprites.forEach((s, i) => {
        const pos = positions[i].clone().multiplyScalar(1.14).applyQuaternion(quat);
        s.position.copy(pos);
        s.material.opacity = Math.max(0, pos.clone().normalize().dot(new THREE.Vector3(0, 0, 1)) * 1.8 - 0.3);
      });
      buildLines();
      ring1.material.opacity = 0.07 + Math.sin(t * 0.8) * 0.05;
      ring2.material.opacity = 0.04 + Math.sin(t * 1.1 + 1) * 0.03;
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      renderer.dispose();
    };
  }, []);

  return (
    <Box
      id="skillglobe"
      component="section"
      sx={{
        px: { xs: '5%', md: '6%' },
        py: { xs: '80px', md: '100px' },
        background: COLORS.bg, position: 'relative', zIndex: 1, overflow: 'hidden',
        '&::before': {
          content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg,transparent,#06060a,transparent)`,
        },
      }}
    >
      <Box
        ref={headerRef}
        sx={{
          textAlign: 'center', mb: 3.5,
          opacity: headerVis ? 1 : 0,
          transform: headerVis ? 'translateY(0)' : 'translateY(32px)',
          transition: 'all 0.75s',
        }}
      >
        <SectionHeader
          center label="Interactive 3D" title="Skill Universe"
          subtitle="Every skill I've mastered, visualised in 3D space. Drag to explore, hover to discover."
        />
      </Box>

      {/* Globe wrapper */}
      <Box
        ref={wrapRef}
        sx={{
          position: 'relative', width: '100%', height: { xs: 400, md: 560 },
          borderRadius: '24px', overflow: 'hidden',
          border: '1px solid rgba(255,255,255,.05)',
          background: '#06060a',
          boxShadow: `0 0 80px rgba(255,0,79,.06), 0 40px 100px rgba(0,0,0,.5)`,
        }}
      >
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />

        {/* Tooltip */}
        <Box
          id="gTooltip"
          sx={{
            position: 'absolute',
            background: 'rgba(6,6,10,.92)', border: `1px solid rgba(255,0,79,.35)`,
            borderRadius: '7px', px: 1.5, py: 0.75,
            fontSize: '6.73rem', fontFamily: "'Syne', sans-serif", fontWeight: 700, color: COLORS.text,
            pointerEvents: 'none', whiteSpace: 'nowrap',
            opacity: 0, transition: 'opacity .15s',
            transform: 'translate(-50%,-130%)', zIndex: 10,
            '&.show': { opacity: 1 },
          }}
        />

        {/* HUD */}
        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: '1.2rem 1.5rem' }}>
          <Typography sx={{ alignSelf: 'flex-end', fontSize: '0.65rem', color: 'rgba(255,255,255,.2)', letterSpacing: '0.06em', lineHeight: 1.9, textAlign: 'right' }}>
            <span style={{ color: 'rgba(255,0,79,.45)' }}>Drag</span> to rotate &nbsp;·&nbsp; <span style={{ color: 'rgba(255,0,79,.45)' }}>Scroll</span> to zoom &nbsp;·&nbsp; <span style={{ color: 'rgba(255,0,79,.45)' }}>Hover</span> a node
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 1.5, flexWrap: 'wrap' }}>
            {/* Node info panel */}
            <Box
              id="gNodeInfo"
              sx={{
                background: 'rgba(6,6,10,.88)', border: `1px solid rgba(255,0,79,.2)`,
                borderRadius: '12px', p: '0.75rem 1.2rem',
                backdropFilter: 'blur(14px)', minWidth: 190,
                opacity: 0, transition: 'opacity .3s',
              }}
            >
              <Typography id="gniCat" sx={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ff004f', mb: 0.25 }}>—</Typography>
              <Typography id="gniName" sx={{ fontFamily: "'Syne', sans-serif", fontSize: '1.15rem', fontWeight: 800 }}>—</Typography>
              <Typography id="gniDesc" sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,.4)', mt: 0.25, lineHeight: 1.5 }}>—</Typography>
            </Box>
            {/* Legend */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
              {GLOBE_CATS.map(c => (
                <Box
                  key={c.id}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 0.75,
                    background: 'rgba(6,6,10,.7)', border: '1px solid rgba(255,255,255,.06)',
                    borderRadius: '100px', px: 1.25, py: 0.375,
                    fontSize: '0.65rem', color: 'rgba(255,255,255,.4)', backdropFilter: 'blur(8px)',
                  }}
                >
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: c.hex, flexShrink: 0 }} />
                  {c.label}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
