import { useEffect, useState, type ReactNode } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { ChevronDown, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { BrandLogo } from '../BrandLogo';
import { appTheme } from '../../brand/appTheme';

export type SidebarLink = {
  label: string;
  to: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  end?: boolean;
};

export type SidebarChildLink = {
  label: string;
  to: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
};

export type SidebarDropdown = {
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  basePath: string;
  children: SidebarChildLink[];
};

type AppShellLayoutProps = {
  areaLabel: string;
  title: string;
  dashboardLink: SidebarLink;
  navLinks?: SidebarLink[];
  navDropdowns?: SidebarDropdown[];
  footerLinks?: SidebarLink[];
  children: ReactNode;
};

function linkStyle(active: boolean, nested = false): React.CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: nested ? '10px 14px' : '11px 16px',
    borderRadius: '10px',
    fontSize: nested ? '13px' : '14px',
    fontWeight: active ? 600 : 500,
    color: active ? appTheme.sidebarTextActive : appTheme.sidebarText,
    background: active ? appTheme.sidebarActive : 'transparent',
    border: active ? `1px solid ${appTheme.sidebarActiveBorder}` : '1px solid transparent',
    textDecoration: 'none',
    transition: 'background 0.15s, color 0.15s, border-color 0.15s',
    width: '100%',
    boxSizing: 'border-box',
  };
}

export function AppShellLayout({
  areaLabel,
  title,
  dashboardLink,
  navLinks = [],
  navDropdowns = [],
  footerLinks = [],
  children,
}: AppShellLayoutProps) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(navDropdowns.map((d) => [d.label, true]))
  );

  const displayName = profile?.full_name || profile?.email || 'Utilisateur';

  useEffect(() => {
    navDropdowns.forEach((d) => {
      if (pathname.startsWith(d.basePath)) {
        setOpenDropdowns((prev) => ({ ...prev, [d.label]: true }));
      }
    });
  }, [pathname, navDropdowns]);

  const handleLogout = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const renderNavLink = (item: SidebarLink, nested = false) => {
    const Icon = item.icon;
    return (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.end}
        onClick={() => setMobileOpen(false)}
        style={({ isActive }) => linkStyle(isActive, nested)}
        onMouseEnter={(e) => {
          if (e.currentTarget.getAttribute('aria-current') !== 'page') {
            e.currentTarget.style.background = appTheme.sidebarHover;
          }
        }}
        onMouseLeave={(e) => {
          if (e.currentTarget.getAttribute('aria-current') !== 'page') {
            e.currentTarget.style.background = 'transparent';
          }
        }}
      >
        <Icon size={nested ? 16 : 18} color={appTheme.sidebarTextActive} />
        {item.label}
      </NavLink>
    );
  };

  const sidebarContent = (
    <>
      <div style={{ padding: '22px 18px 18px', borderBottom: `1px solid ${appTheme.sidebarBorder}` }}>
        <BrandLogo variant="accent" height={40} />
        <p
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '1.2px',
            color: appTheme.sidebarMuted,
            margin: '14px 0 4px',
            textTransform: 'uppercase',
          }}
        >
          {areaLabel}
        </p>
        <p style={{ fontSize: '14px', fontWeight: 600, color: appTheme.sidebarTextActive, margin: 0, lineHeight: 1.35 }}>
          {displayName}
        </p>
      </div>

      <nav
        style={{
          flex: 1,
          padding: '14px 10px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        {renderNavLink(dashboardLink)}

        {navDropdowns.map((dropdown) => {
          const isOpen = openDropdowns[dropdown.label] ?? true;
          const Icon = dropdown.icon;
          const childActive = dropdown.children.some(
            (c) => pathname === c.to || pathname.startsWith(c.to + '/')
          );
          return (
            <div key={dropdown.label}>
              <button
                type="button"
                onClick={() => toggleDropdown(dropdown.label)}
                style={{
                  ...linkStyle(childActive && !isOpen, false),
                  justifyContent: 'space-between',
                  border: childActive ? `1px solid ${appTheme.sidebarActiveBorder}` : '1px solid transparent',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} color={appTheme.sidebarTextActive} />
                  {dropdown.label}
                </span>
                <ChevronDown
                  size={15}
                  style={{
                    transition: 'transform 0.2s',
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    opacity: 0.7,
                  }}
                />
              </button>
              {isOpen && (
                <div
                  style={{
                    paddingLeft: '8px',
                    marginTop: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    borderLeft: `2px solid ${appTheme.sidebarBorder}`,
                    marginLeft: '14px',
                  }}
                >
                  {dropdown.children.map((child) => {
                    const ChildIcon = child.icon;
                    return (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        end
                        onClick={() => setMobileOpen(false)}
                        style={({ isActive }) => linkStyle(isActive, true)}
                        onMouseEnter={(e) => {
                          if (e.currentTarget.getAttribute('aria-current') !== 'page') {
                            e.currentTarget.style.background = appTheme.sidebarHover;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (e.currentTarget.getAttribute('aria-current') !== 'page') {
                            e.currentTarget.style.background = 'transparent';
                          }
                        }}
                      >
                        <ChildIcon size={16} color={appTheme.sidebarTextActive} />
                        {child.label}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {navLinks.map((item) => renderNavLink(item))}
      </nav>

      <div
        style={{
          padding: '10px 10px 14px',
          borderTop: `1px solid ${appTheme.sidebarBorder}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        {footerLinks.map((item) => renderNavLink(item))}
        <button
          type="button"
          onClick={handleLogout}
          style={{
            ...linkStyle(false),
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
            marginTop: footerLinks.length ? '4px' : 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = appTheme.sidebarHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <LogOut size={18} color={appTheme.sidebarTextActive} />
          Déconnexion
        </button>
      </div>
    </>
  );

  const sidebarStyle: React.CSSProperties = {
    width: '272px',
    flexShrink: 0,
    background: appTheme.sidebarBg,
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 50,
    boxShadow: '4px 0 24px rgba(0,0,0,0.18)',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: appTheme.mainBg }}>
      <aside className="app-sidebar-desktop" style={sidebarStyle}>
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div
          role="presentation"
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(8,6,12,0.55)',
            zIndex: 60,
          }}
          className="app-sidebar-overlay"
        />
      )}

      <aside
        className={`app-sidebar-mobile ${mobileOpen ? 'open' : ''}`}
        style={{
          ...sidebarStyle,
          left: mobileOpen ? 0 : '-292px',
          transition: 'left 0.25s ease',
          zIndex: 70,
        }}
      >
        {sidebarContent}
      </aside>

      <div
        className="app-main-column"
        style={{ flex: 1, marginLeft: '272px', display: 'flex', flexDirection: 'column', minWidth: 0 }}
      >
        <header
          style={{
            background: '#fff',
            borderBottom: '1px solid #e2e8f0',
            padding: '18px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            position: 'sticky',
            top: 0,
            zIndex: 40,
            boxShadow: '0 1px 0 rgba(15,23,42,0.04)',
          }}
        >
          <button
            type="button"
            className="app-sidebar-toggle"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              color: appTheme.accent,
            }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 style={{ fontSize: '18px', fontWeight: 700, color: '#64748b', margin: 0 }}>{title}</h1>
        </header>
        <div style={{ flex: 1, padding: '28px 28px 40px' }}>{children}</div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .app-sidebar-desktop { display: none !important; }
          .app-sidebar-toggle { display: flex !important; }
          .app-main-column { margin-left: 0 !important; }
        }
        @media (min-width: 901px) {
          .app-sidebar-mobile, .app-sidebar-overlay { display: none !important; }
        }
      `}</style>
    </div>
  );
}
