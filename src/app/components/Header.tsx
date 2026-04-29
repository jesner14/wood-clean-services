import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router';
import { Menu, X, FileText } from 'lucide-react';

const navItems = [
  { label: 'Accueil', to: '/' },
  { label: 'À Propos', to: '/a-propos' },
  { label: 'Services', to: '/services' },
  { label: 'Réalisations', to: '/realisations' },
  { label: 'Contact', to: '/contact' },
];

const P = '#4A3272';
const PD = '#362458';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  const transparent = !scrolled;

  import('react').then(({ useEffect }) => {});

  return <HeaderInner open={open} setOpen={setOpen} scrolled={scrolled} setScrolled={setScrolled} pathname={pathname} transparent={transparent} />;
}

import { useEffect } from 'react';

function HeaderInner({ open, setOpen, scrolled, setScrolled, pathname, transparent }: any) {
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    setScrolled(window.scrollY > 60);
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => { setOpen(false); }, [pathname]);

  const navColor = transparent ? 'rgba(255,255,255,0.88)' : '#475569';
  const activeColor = transparent ? '#fff' : P;

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: transparent ? 'transparent' : 'rgba(255,255,255,0.97)',
      backdropFilter: transparent ? 'none' : 'blur(14px)',
      borderBottom: transparent ? '1px solid rgba(255,255,255,0.12)' : '1px solid #e2e8f0',
      boxShadow: transparent ? 'none' : '0 1px 16px rgba(74,50,114,0.08)',
      transition: 'background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
    }}>
      <nav style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img src="/assets/logo.png" alt="Wood Clean Services Logo" style={{ height: '42px', transition: 'all 0.35s', filter: transparent ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' : 'drop-shadow(0 2px 8px rgba(90,42,109,0.15))' }} />
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="hdr-desktop">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}
              style={({ isActive }) => ({
                fontSize: '14px', fontWeight: isActive ? 700 : 500,
                color: isActive ? activeColor : navColor,
                textDecoration: 'none', transition: 'color 0.2s',
                textShadow: transparent ? '0 1px 4px rgba(0,0,0,0.3)' : 'none',
                paddingBottom: '2px',
                borderBottom: isActive ? `2px solid ${transparent ? '#fff' : P}` : '2px solid transparent',
              })}
              onMouseEnter={e => (e.currentTarget.style.color = transparent ? '#fff' : P)}
              onMouseLeave={e => {
                const isActive = e.currentTarget.getAttribute('aria-current') === 'page';
                e.currentTarget.style.color = isActive ? activeColor : navColor;
              }}>{item.label}</NavLink>
          ))}
        </div>

        <div className="hdr-desktop">
          <Link to="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '10px 22px',
            background: transparent ? 'rgba(255,255,255,0.15)' : P,
            border: transparent ? '1.5px solid rgba(255,255,255,0.40)' : '1.5px solid transparent',
            color: '#fff', fontWeight: 700, fontSize: '13px', borderRadius: '10px', textDecoration: 'none',
            backdropFilter: transparent ? 'blur(8px)' : 'none',
            boxShadow: transparent ? '0 4px 16px rgba(0,0,0,0.15)' : `0 4px 14px rgba(74,50,114,0.35)`,
            transition: 'all 0.35s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = PD; e.currentTarget.style.border = '1.5px solid transparent'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = transparent ? 'rgba(255,255,255,0.15)' : P; e.currentTarget.style.border = transparent ? '1.5px solid rgba(255,255,255,0.40)' : '1.5px solid transparent'; e.currentTarget.style.transform = 'none'; }}>
            <FileText size={14} /> Obtenir un Devis
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="hdr-mobile"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: transparent ? '#fff' : '#0f172a', padding: '8px', display: 'none', transition: 'color 0.35s' }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div style={{ background: '#fff', borderTop: '1px solid #f1f5f9', padding: '12px 24px 20px' }}>
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setOpen(false)}
              style={({ isActive }) => ({ display: 'block', padding: '13px 0', fontSize: '15px', fontWeight: isActive ? 700 : 500, color: isActive ? P : '#475569', borderBottom: '1px solid #f8fafc', textDecoration: 'none' })}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '7px', marginTop: '14px', padding: '12px', background: P, color: '#fff', fontWeight: 700, fontSize: '14px', borderRadius: '10px', textDecoration: 'none' }}>
            <FileText size={14} /> Obtenir un Devis
          </Link>
        </div>
      )}
      <style>{`@media (max-width: 900px) { .hdr-desktop { display: none !important; } .hdr-mobile { display: flex !important; } }`}</style>
    </header>
  );
}
