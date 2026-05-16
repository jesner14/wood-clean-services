import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router';
import { Menu, X, FileText, LogIn, ChevronDown } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { brand } from '../brand/colors';

const P = brand.primary;
const PD = brand.primaryDark;

const navItems = [
  { label: 'Accueil', to: '/' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Services', to: '/services' },
  { label: 'Réalisations', to: '/realisations' },
  { label: 'Contact', to: '/contact' },
];

const etablissementsLinks = [
  { label: 'Restaurant', to: '/etablissements/restaurant' },
  { label: 'Hôtel', to: '/etablissements/hotel' },
  { label: 'Autres établissements', to: '/etablissements/autres' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { pathname } = useLocation();

  const transparent = !scrolled;
  const isEtablissement = pathname.startsWith('/etablissements');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    setScrolled(window.scrollY > 60);
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const navColor = transparent ? 'rgba(255,255,255,0.88)' : '#475569';
  const activeColor = transparent ? '#fff' : P;

  const navLinkStyle = (isActive: boolean): React.CSSProperties => ({
    fontSize: '17px',
    fontWeight: isActive ? 700 : 500,
    color: isActive ? activeColor : navColor,
    textDecoration: 'none',
    transition: 'color 0.2s, transform 0.2s',
    textShadow: transparent ? '0 1px 4px rgba(0,0,0,0.3)' : 'none',
    paddingBottom: '4px',
    borderBottom: isActive ? `2px solid ${transparent ? '#fff' : P}` : '2px solid transparent',
  });

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: transparent ? 'transparent' : 'rgba(255,255,255,0.97)',
        backdropFilter: transparent ? 'none' : 'blur(14px)',
        borderBottom: transparent ? '1px solid rgba(255,255,255,0.12)' : '1px solid #e2e8f0',
        boxShadow: transparent ? 'none' : '0 1px 16px rgba(82,51,124,0.08)',
        transition: 'background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
      }}
    >
      <nav
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '96px',
        }}
      >
        <BrandLogo variant={transparent ? 'accent' : 'default'} height={60} />

        <div className="hdr-desktop" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              style={({ isActive }) => navLinkStyle(isActive)}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = transparent ? '#fff' : P;
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.fontWeight = '700';
              }}
              onMouseLeave={(e) => {
                const isActive = e.currentTarget.getAttribute('aria-current') === 'page';
                e.currentTarget.style.color = isActive ? activeColor : navColor;
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.fontWeight = isActive ? '700' : '500';
              }}
            >
              {item.label}
            </NavLink>
          ))}

          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              style={{
                ...navLinkStyle(isEtablissement),
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = transparent ? '#fff' : P;
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.fontWeight = '700';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isEtablissement ? activeColor : navColor;
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.fontWeight = isEtablissement ? '700' : '500';
              }}
            >
              Établissements certifiés
              <ChevronDown
                size={16}
                style={{ transition: 'transform 0.2s', transform: dropdownOpen ? 'rotate(180deg)' : 'none' }}
              />
            </button>
            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: '8px',
                  background: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 12px 40px rgba(82,51,124,0.18)',
                  border: '1px solid #e2e8f0',
                  minWidth: '240px',
                  overflow: 'hidden',
                  zIndex: 200,
                }}
              >
                {etablissementsLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    style={{
                      display: 'block',
                      padding: '14px 20px',
                      fontSize: '15px',
                      fontWeight: 500,
                      color: '#475569',
                      textDecoration: 'none',
                      transition: 'background 0.15s, color 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#F4F1F6';
                      e.currentTarget.style.color = P;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#475569';
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hdr-desktop" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            to="/connexion"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '12px 20px',
              background: 'transparent',
              border: transparent ? '1.5px solid rgba(255,255,255,0.40)' : `1.5px solid ${P}`,
              color: transparent ? '#fff' : P,
              fontWeight: 700,
              fontSize: '15px',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = transparent ? 'rgba(255,255,255,0.15)' : '#F4F1F6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <LogIn size={16} /> Connexion
          </Link>
          <Link
            to="/contact#devis"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '12px 24px',
              background: transparent ? 'rgba(255,255,255,0.15)' : P,
              border: transparent ? '1.5px solid rgba(255,255,255,0.40)' : '1.5px solid transparent',
              color: '#fff',
              fontWeight: 700,
              fontSize: '15px',
              borderRadius: '10px',
              textDecoration: 'none',
              backdropFilter: transparent ? 'blur(8px)' : 'none',
              boxShadow: transparent ? '0 4px 16px rgba(0,0,0,0.15)' : '0 4px 14px rgba(82,51,124,0.35)',
              transition: 'all 0.35s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = PD;
              e.currentTarget.style.border = '1.5px solid transparent';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = transparent ? 'rgba(255,255,255,0.15)' : P;
              e.currentTarget.style.border = transparent ? '1.5px solid rgba(255,255,255,0.40)' : '1.5px solid transparent';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <FileText size={16} /> Obtenir un devis
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="hdr-mobile"
          aria-label="Menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: transparent ? '#fff' : '#0f172a',
            padding: '8px',
            display: 'none',
          }}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div style={{ background: '#fff', borderTop: '1px solid #f1f5f9', padding: '12px 24px 24px' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                display: 'block',
                padding: '14px 0',
                fontSize: '17px',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? P : '#475569',
                borderBottom: '1px solid #f8fafc',
                textDecoration: 'none',
              })}
            >
              {item.label}
            </NavLink>
          ))}
          <p style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', margin: '16px 0 8px' }}>
            Établissements certifiés
          </p>
          {etablissementsLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '12px 0 12px 16px', fontSize: '16px', color: '#475569', textDecoration: 'none' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/connexion"
            onClick={() => setOpen(false)}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '7px',
              marginTop: '14px',
              padding: '14px',
              border: `1.5px solid ${P}`,
              color: P,
              fontWeight: 700,
              fontSize: '15px',
              borderRadius: '10px',
              textDecoration: 'none',
            }}
          >
            <LogIn size={16} /> Connexion
          </Link>
          <Link
            to="/contact#devis"
            onClick={() => setOpen(false)}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '7px',
              marginTop: '10px',
              padding: '14px',
              background: P,
              color: '#fff',
              fontWeight: 700,
              fontSize: '15px',
              borderRadius: '10px',
              textDecoration: 'none',
            }}
          >
            <FileText size={16} /> Obtenir un devis
          </Link>
        </div>
      )}
      <style>{`
        @media (max-width: 1100px) {
          .hdr-desktop { display: none !important; }
          .hdr-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
