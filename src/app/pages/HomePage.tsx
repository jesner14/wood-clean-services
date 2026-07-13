import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Utensils, ChefHat, Snowflake, Sparkles, SprayCan, Wrench, Building2 } from 'lucide-react';
import { HeroHome } from '../components/HeroHome';
import { PartnerSlider } from '../components/PartnerSlider';
import { FlyerBanner } from '../components/FlyerBanner';

const quickServices = [
  { icon: Utensils, title: 'Nettoyage de hottes de cuisine', desc: 'Dégraissage, filtres, conduits et systèmes d\'extraction', color: '#52337C', to: '/services#service-01' },
  { icon: ChefHat, title: 'Grand ménage de cuisine', desc: 'Hôtels & restaurants — dégraissage intensif et désinfection', color: '#EB8E8C', to: '/services#service-04' },
  { icon: Snowflake, title: 'Chambres froides', desc: 'Nettoyage & désinfection conformes aux normes HACCP', color: '#785A8F', to: '/services#service-08' },
];

const stats = [
  { end: 50, suffix: '+', label: 'Clients satisfaits' },
  { end: 10, suffix: '+', label: 'Années d\'expérience' },
  { end: 9, suffix: '', label: 'Types de services' },
  { end: 24, suffix: '/7', label: 'Disponibilité urgences' },
];

function AnimatedStat({
  end,
  suffix,
  label,
  delay = 0,
}: {
  end: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(end);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const start = () => setStarted(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);

    // Si déjà visible au chargement / HMR
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      start();
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setValue(end);
      return;
    }

    setValue(0);
    let raf = 0;
    let startTime: number | null = null;
    const duration = 1700;
    let cancelled = false;

    const timeout = window.setTimeout(() => {
      const tick = (now: number) => {
        if (cancelled) return;
        if (startTime === null) startTime = now;
        const progress = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(end * eased));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [started, end, delay]);

  return (
    <div ref={ref} className="stat-item" style={{ textAlign: 'center', animationDelay: `${delay}ms` }}>
      <div className="stat-value">
        {value}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

const specialistMentions = [
  'Spécialiste du nettoyage des hottes de cuisine',
  'Spécialiste du grand ménage des cuisines, appartements et immeubles',
  'Conception & installation de hottes sur mesure',
  'Maintenance technique & ventilation professionnelle',
  'Nettoyage & désinfection de chambres froides — normes HACCP',
  'Agents & dames de ménage permanents',
];

export function HomePage() {
  return (
    <>
      <HeroHome />

{/* ── MENTIONS SPÉCIALISTE (marquee) ── */}
      <section className="mentions-marquee" aria-label="Nos spécialités">
        <div className="mentions-marquee__track">
          {[...specialistMentions, ...specialistMentions].map((text, i) => (
            <div key={`${text}-${i}`} className="mentions-marquee__item">
              <Sparkles size={18} color="#EB8E8C" className="mentions-marquee__icon" />
              <span>{text}</span>
              <span className="mentions-marquee__dot" aria-hidden />
            </div>
          ))}
        </div>
        <style>{`
          .mentions-marquee {
            background: linear-gradient(135deg, #52337C 0%, #3F275F 100%);
            padding: 18px 0;
            overflow: hidden;
            white-space: nowrap;
            border-top: 1px solid rgba(235,142,140,0.25);
            border-bottom: 1px solid rgba(235,142,140,0.25);
          }
          .mentions-marquee__track {
            display: flex;
            width: max-content;
            animation: mentionsScroll 38s linear infinite;
          }
          .mentions-marquee:hover .mentions-marquee__track {
            animation-play-state: paused;
          }
          .mentions-marquee__item {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 0 28px;
            color: #fff;
            font-size: clamp(14px, 1.8vw, 16px);
            font-weight: 700;
            letter-spacing: 0.2px;
          }
          .mentions-marquee__icon {
            flex-shrink: 0;
            animation: mentionsSparkle 2.2s ease-in-out infinite;
          }
          .mentions-marquee__item:nth-child(odd) .mentions-marquee__icon {
            animation-delay: 0.6s;
          }
          .mentions-marquee__dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #EB8E8C;
            opacity: 0.85;
            margin-left: 16px;
            flex-shrink: 0;
          }
          @keyframes mentionsScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes mentionsSparkle {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
            50% { transform: scale(1.15) rotate(12deg); opacity: 0.85; }
          }
          @media (prefers-reduced-motion: reduce) {
            .mentions-marquee__track,
            .mentions-marquee__icon {
              animation: none !important;
            }
          }
        `}</style>
      </section>

      {/* ── QUICK SERVICES ── */}
      <section
        className="qs-section"
        style={{
          background: '#fff',
          padding: '64px 0',
          borderBottom: '1px solid #F4F1F6',
          backgroundImage: 'radial-gradient(rgba(82,51,124,0.05) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      >
        <div style={{ maxWidth: 'var(--content-max, 1280px)', margin: '0 auto', padding: '0 var(--page-pad, 32px)', width: '100%', boxSizing: 'border-box' }}>
          <div className="qs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '28px' }}>
            {quickServices.map((s, i) => {
              const Icon = s.icon;
              const accents = [
                {
                  border: '#52337C',
                  glow: 'rgba(82,51,124,0.28)',
                  soft: 'rgba(82,51,124,0.10)',
                  bar: 'linear-gradient(90deg, #52337C, #EB8E8C)',
                  iconBg: '#F4F1F6',
                  anim: 'qs-float',
                },
                {
                  border: '#EB8E8C',
                  glow: 'rgba(235,142,140,0.35)',
                  soft: 'rgba(235,142,140,0.14)',
                  bar: 'linear-gradient(90deg, #EB8E8C, #52337C)',
                  iconBg: '#FBEAE9',
                  anim: 'qs-bob',
                },
                {
                  border: '#785A8F',
                  glow: 'rgba(120,90,143,0.28)',
                  soft: 'rgba(120,90,143,0.10)',
                  bar: 'linear-gradient(90deg, #785A8F, #EB8E8C)',
                  iconBg: '#F4F1F6',
                  anim: 'qs-spin-soft',
                },
              ][i];
              return (
                <Link
                  key={i}
                  to={s.to}
                  className="qs-card"
                  style={{
                    ['--qs-glow' as string]: accents.glow,
                    ['--qs-soft' as string]: accents.soft,
                    ['--qs-border' as string]: accents.border,
                    textDecoration: 'none',
                    position: 'relative',
                    display: 'block',
                    animationDelay: `${i * 0.12}s`,
                  }}
                >
                  <span className="qs-card-shadow" aria-hidden />
                  <div
                    className="qs-card-surface"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      background: '#fff',
                      border: `2px solid ${accents.border}`,
                      borderRadius: '18px',
                      padding: '26px 24px 24px',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                      boxShadow: '0 14px 36px rgba(0,0,0,0.38), 0 6px 14px rgba(0,0,0,0.22)',
                    }}
                  >
                    <span
                      className="qs-card-bar"
                      aria-hidden
                      style={{ background: accents.bar }}
                    />
                    <div
                      className={`qs-icon-wrap ${accents.anim}`}
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '14px',
                        background: accents.iconBg,
                        border: `1.5px solid ${accents.border}55`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        animationDelay: `${i * 0.35}s`,
                      }}
                    >
                      <Icon size={22} color={accents.border} className="qs-icon" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1E1228', margin: '0 0 8px', lineHeight: 1.35 }}>
                        {s.title}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.65 }}>{s.desc}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <style>{`
          @media (max-width: 1024px) {
            .qs-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }
          @media (max-width: 640px) {
            .qs-grid {
              grid-template-columns: 1fr !important;
              gap: 18px !important;
            }
          }

          .qs-card {
            transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
            animation: qs-card-in 0.7s ease both;
          }

          .qs-card-shadow {
            position: absolute;
            inset: 14px 0 -16px 0;
            border-radius: 18px;
            background: #000;
            filter: blur(16px);
            opacity: 0.45;
            z-index: -1;
            transition: opacity 0.35s ease, transform 0.35s ease, filter 0.35s ease;
            pointer-events: none;
          }

          .qs-card-bar {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
          }

          .qs-card:hover {
            transform: translateY(-8px);
          }

          .qs-card:hover .qs-card-surface {
            border-color: #EB8E8C !important;
            box-shadow: 0 22px 48px rgba(0,0,0,0.48), 0 10px 20px rgba(0,0,0,0.28) !important;
          }

          .qs-card:hover .qs-card-shadow {
            opacity: 0.6;
            transform: translateY(6px) scale(1.02);
            filter: blur(20px);
          }

          .qs-icon-wrap {
            box-shadow: 0 4px 12px var(--qs-soft);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .qs-card:hover .qs-icon-wrap {
            transform: scale(1.08);
            box-shadow: 0 8px 20px var(--qs-glow);
          }

          .qs-float {
            animation: qs-float 2.8s ease-in-out infinite;
          }
          .qs-bob {
            animation: qs-bob 2.4s ease-in-out infinite;
          }
          .qs-spin-soft .qs-icon {
            animation: qs-spin-soft 8s linear infinite;
            display: block;
          }

          @keyframes qs-card-in {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes qs-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }

          @keyframes qs-bob {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            40% { transform: translateY(-5px) rotate(-4deg); }
            70% { transform: translateY(-2px) rotate(3deg); }
          }

          @keyframes qs-spin-soft {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @media (prefers-reduced-motion: reduce) {
            .qs-card,
            .qs-float,
            .qs-bob,
            .qs-spin-soft .qs-icon {
              animation: none !important;
            }
          }
        `}</style>
      </section>

      {/* ── STATS BANNER ── */}
      <section className="stats-banner" aria-label="Chiffres clés">
        <div className="stats-banner__glow stats-banner__glow--a" aria-hidden />
        <div className="stats-banner__glow stats-banner__glow--b" aria-hidden />
        <div className="stats-banner__shine" aria-hidden />
        <div
          className="stats-grid"
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 'var(--content-max, 1280px)',
            margin: '0 auto',
            padding: '0 var(--page-pad, 32px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '20px',
            textAlign: 'center',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {stats.map((s, i) => (
            <AnimatedStat key={s.label} end={s.end} suffix={s.suffix} label={s.label} delay={i * 120} />
          ))}
        </div>
        <style>{`
          .stats-banner {
            position: relative;
            overflow: hidden;
            padding: 56px 0;
            background: linear-gradient(120deg, #1E1228, #3F275F, #52337C, #3F275F, #1E1228);
            background-size: 300% 300%;
            animation: statsBgShift 12s ease infinite;
          }

          .stats-banner__glow {
            position: absolute;
            width: 280px;
            height: 280px;
            border-radius: 50%;
            filter: blur(60px);
            pointer-events: none;
            opacity: 0.45;
          }
          .stats-banner__glow--a {
            left: -40px;
            top: -80px;
            background: #EB8E8C;
            animation: statsOrb 8s ease-in-out infinite;
          }
          .stats-banner__glow--b {
            right: -60px;
            bottom: -100px;
            background: #785A8F;
            animation: statsOrb 10s ease-in-out infinite reverse;
          }

          .stats-banner__shine {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              105deg,
              transparent 35%,
              rgba(255,255,255,0.08) 50%,
              transparent 65%
            );
            background-size: 220% 100%;
            animation: statsShine 5.5s linear infinite;
            pointer-events: none;
          }

          @media (max-width: 900px) {
            .stats-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              gap: 28px !important;
            }
          }
          @media (max-width: 420px) {
            .stats-grid {
              grid-template-columns: 1fr !important;
            }
          }

          .stat-item {
            animation: statsFloat 3.6s ease-in-out infinite;
          }
          .stat-item:nth-child(2) { animation-delay: 0.4s; }
          .stat-item:nth-child(3) { animation-delay: 0.8s; }
          .stat-item:nth-child(4) { animation-delay: 1.2s; }

          .stat-value {
            font-size: clamp(36px, 4vw, 56px);
            font-weight: 900;
            color: #ffffff;
            line-height: 1.1;
            font-variant-numeric: tabular-nums;
            letter-spacing: -0.5px;
            min-height: 1.1em;
            text-shadow: 0 0 18px rgba(235, 142, 140, 0.35);
            animation: statsPulse 2.8s ease-in-out infinite;
          }
          .stat-item:nth-child(2) .stat-value { animation-delay: 0.35s; }
          .stat-item:nth-child(3) .stat-value { animation-delay: 0.7s; }
          .stat-item:nth-child(4) .stat-value { animation-delay: 1.05s; }

          .stat-label {
            font-size: 14px;
            color: #D4CCD9;
            margin-top: 8px;
            font-weight: 500;
            animation: statsLabelGlow 3.2s ease-in-out infinite;
          }
          .stat-item:nth-child(even) .stat-label { animation-delay: 0.6s; }

          @keyframes statsBgShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes statsShine {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          @keyframes statsOrb {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
            50% { transform: translate(30px, 18px) scale(1.15); opacity: 0.55; }
          }
          @keyframes statsFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-7px); }
          }
          @keyframes statsPulse {
            0%, 100% {
              transform: scale(1);
              text-shadow: 0 0 12px rgba(235, 142, 140, 0.25);
            }
            50% {
              transform: scale(1.06);
              text-shadow: 0 0 28px rgba(235, 142, 140, 0.65), 0 0 8px rgba(255,255,255,0.35);
            }
          }
          @keyframes statsLabelGlow {
            0%, 100% { opacity: 0.75; }
            50% { opacity: 1; }
          }

          @media (prefers-reduced-motion: reduce) {
            .stats-banner,
            .stats-banner__glow,
            .stats-banner__shine,
            .stat-item,
            .stat-value,
            .stat-label {
              animation: none !important;
            }
          }
        `}</style>
      </section>

      <PartnerSlider />

      <FlyerBanner />

      {/* ── VISION SCHEMA ── */}
      <section className="vision-section">
        <div className="vision-section__glow vision-section__glow--a" aria-hidden />
        <div className="vision-section__glow vision-section__glow--b" aria-hidden />

        <div style={{ maxWidth: 'var(--content-max, 1280px)', margin: '0 auto', padding: '0 var(--page-pad, 32px)', position: 'relative', zIndex: 1, width: '100%', boxSizing: 'border-box' }}>
          <div className="vision-header">
            <div>
              <p className="vision-eyebrow">L'avenir en perspective</p>
              <h2 className="vision-title">Notre vision</h2>
            </div>
            <div className="vision-wcs">WCS</div>
          </div>

          <p className="vision-intro">
            Devenir une référence <strong>nationale et sous-régionale</strong> en matière de :
          </p>

          <div className="vision-schema-container">
            <div className="vision-connect-line" aria-hidden>
              <span className="vision-connect-flow" />
            </div>

            <div className="vision-steps">
              {[
                { num: '1', title: 'Nettoyage\nprofessionnel', color: '#52337C', soft: '#F4F1F6', Icon: SprayCan, delay: '0s' },
                { num: '2', title: 'Maintenance\ndes cuisines', color: '#EB8E8C', soft: '#FBEAE9', Icon: Wrench, delay: '0.15s' },
                { num: '3', title: 'Et\nbâtiments', color: '#785A8F', soft: '#F4F1F6', Icon: Building2, delay: '0.3s' },
              ].map((step, i) => {
                const Icon = step.Icon;
                return (
                  <div key={i} className="vision-step" style={{ animationDelay: step.delay, ['--step-color' as string]: step.color, ['--step-soft' as string]: step.soft }}>
                    <div className="vision-step-ring">
                      <div className="vision-step-circle">
                        <span className="vision-step-num">{step.num}</span>
                        <Icon className="vision-step-icon" size={22} />
                      </div>
                    </div>
                    <h3 className="vision-step-title">
                      {step.title.split('\n').map((line, j) => (
                        <span key={j}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="vision-cols">
            {[
              {
                num: '01',
                color: '#52337C',
                soft: '#F4F1F6',
                text: 'En imposant de nouveaux standards de qualité, de rigueur et de professionnalisme dans le nettoyage professionnel',
              },
              {
                num: '02',
                color: '#EB8E8C',
                soft: '#FBEAE9',
                text: "En participant activement à l'amélioration de la santé publique et de la sécurité au travail au Sénégal",
              },
              {
                num: '03',
                color: '#785A8F',
                soft: '#F4F1F6',
                text: 'En devenant le partenaire incontournable des professionnels de la restauration et de l\'hôtellerie',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="vision-card"
                style={{
                  ['--card-color' as string]: item.color,
                  ['--card-soft' as string]: item.soft,
                  animationDelay: `${0.2 + i * 0.12}s`,
                }}
              >
                <div className="vision-card-num">{item.num}</div>
                <p className="vision-card-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .vision-section {
            position: relative;
            padding: 96px 0 88px;
            overflow: hidden;
            background:
            linear-gradient(180deg, #fff 0%, #F8F6FA 48%, #fff 100%),
            radial-gradient(ellipse at 10% 0%, rgba(82,51,124,0.06) 0%, transparent 45%),
            radial-gradient(ellipse at 90% 100%, rgba(235,142,140,0.08) 0%, transparent 40%);
          }

          .vision-section__glow {
            position: absolute;
            width: 320px;
            height: 320px;
            border-radius: 50%;
            filter: blur(70px);
            pointer-events: none;
            opacity: 0.4;
          }
          .vision-section__glow--a {
            top: -80px;
            left: -60px;
            background: #52337C;
            animation: visionOrb 9s ease-in-out infinite;
          }
          .vision-section__glow--b {
            bottom: -100px;
            right: -40px;
            background: #EB8E8C;
            animation: visionOrb 11s ease-in-out infinite reverse;
          }

          .vision-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            flex-wrap: wrap;
            gap: 16px;
          }

          .vision-eyebrow {
            margin: 0 0 8px;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: #785A8F;
            animation: visionFadeIn 0.7s ease both;
          }

          .vision-title {
            margin: 0;
            font-size: clamp(36px, 5.5vw, 60px);
            font-weight: 900;
            letter-spacing: -1.5px;
            line-height: 1;
            background: linear-gradient(110deg, #52337C 0%, #785A8F 40%, #EB8E8C 75%, #52337C 100%);
            background-size: 220% auto;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: visionTitleShine 5s linear infinite, visionFadeIn 0.8s ease both;
          }

          .vision-wcs {
            font-size: clamp(40px, 5vw, 56px);
            font-weight: 900;
            letter-spacing: -2px;
            background: linear-gradient(135deg, #52337C, #EB8E8C);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            opacity: 0.35;
            animation: visionWcsPulse 3.5s ease-in-out infinite;
          }

          .vision-intro {
            font-size: 17px;
            color: #475569;
            line-height: 1.8;
            margin: 0 0 56px;
            max-width: 540px;
            animation: visionFadeIn 0.9s ease both;
          }
          .vision-intro strong {
            color: #52337C;
          }

          .vision-schema-container {
            position: relative;
            margin: 24px 0 64px;
          }

          .vision-connect-line {
            position: absolute;
            top: 48px;
            left: 16%;
            right: 16%;
            height: 5px;
            border-radius: 999px;
            background: linear-gradient(90deg, #52337C 0%, #EB8E8C 50%, #785A8F 100%);
            opacity: 0.45;
            z-index: 0;
            overflow: hidden;
          }

          .vision-connect-flow {
            display: block;
            width: 30%;
            height: 100%;
            border-radius: inherit;
            background: linear-gradient(90deg, transparent, #fff, transparent);
            animation: visionFlow 2.4s linear infinite;
          }

          .vision-steps {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            position: relative;
            z-index: 1;
          }

          .vision-step {
            text-align: center;
            opacity: 0;
            animation: visionStepIn 0.7s ease forwards;
          }

          .vision-step-ring {
            width: 110px;
            height: 110px;
            margin: 0 auto 20px;
            border-radius: 50%;
            padding: 4px;
            background: linear-gradient(140deg, var(--step-color), #EB8E8C, var(--step-color));
            background-size: 200% 200%;
            animation: visionRingSpin 6s linear infinite, visionFloat 3.2s ease-in-out infinite;
            box-shadow: 0 12px 32px color-mix(in srgb, var(--step-color) 28%, transparent);
          }

          .vision-step:nth-child(2) .vision-step-ring { animation-delay: 0.25s, 0.4s; }
          .vision-step:nth-child(3) .vision-step-ring { animation-delay: 0.5s, 0.8s; }

          .vision-step-circle {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2px;
            transition: transform 0.3s ease;
          }

          .vision-step:hover .vision-step-circle {
            transform: scale(1.06);
          }

          .vision-step-num {
            font-size: 28px;
            font-weight: 900;
            color: var(--step-color);
            line-height: 1;
          }

          .vision-step-icon {
            color: var(--step-color);
            opacity: 0.85;
          }

          .vision-step-title {
            font-size: 14px;
            font-weight: 900;
            color: #1E1228;
            letter-spacing: 0.4px;
            margin: 0;
            line-height: 1.45;
            text-transform: uppercase;
          }

          .vision-cols {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }

          .vision-card {
            position: relative;
            padding: 28px 24px 26px;
            border-radius: 20px;
            background: #fff;
            border: 1px solid color-mix(in srgb, var(--card-color) 22%, #e2e8f0);
            box-shadow: 0 10px 30px rgba(82, 51, 124, 0.08);
            overflow: hidden;
            opacity: 0;
            animation: visionStepIn 0.7s ease forwards;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .vision-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--card-color), #EB8E8C);
          }

          .vision-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 18px 40px color-mix(in srgb, var(--card-color) 22%, transparent);
          }

          .vision-card-num {
            font-size: 42px;
            font-weight: 900;
            color: var(--card-color);
            line-height: 1;
            margin-bottom: 12px;
            opacity: 0.28;
          }

          .vision-card-text {
            margin: 0;
            font-size: 14px;
            color: #475569;
            line-height: 1.85;
            font-weight: 500;
          }

          @keyframes visionOrb {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(24px, 16px) scale(1.12); }
          }
          @keyframes visionTitleShine {
            0% { background-position: 0% center; }
            100% { background-position: 220% center; }
          }
          @keyframes visionWcsPulse {
            0%, 100% { opacity: 0.25; transform: scale(1); }
            50% { opacity: 0.45; transform: scale(1.04); }
          }
          @keyframes visionFadeIn {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes visionStepIn {
            from { opacity: 0; transform: translateY(28px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes visionFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes visionRingSpin {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
          @keyframes visionFlow {
            0% { transform: translateX(-120%); }
            100% { transform: translateX(400%); }
          }

          @media (max-width: 768px) {
            .vision-steps {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
            .vision-connect-line {
              width: 5px !important;
              height: 100% !important;
              left: 50% !important;
              top: 0 !important;
              right: auto !important;
              transform: translateX(-50%) !important;
              background: linear-gradient(180deg, #52337C 0%, #EB8E8C 50%, #785A8F 100%) !important;
            }
            .vision-connect-flow {
              width: 100%;
              height: 30%;
              animation: visionFlowY 2.4s linear infinite;
            }
            .vision-cols {
              grid-template-columns: 1fr !important;
            }
          }

          @keyframes visionFlowY {
            0% { transform: translateY(-120%); }
            100% { transform: translateY(400%); }
          }

          @media (prefers-reduced-motion: reduce) {
            .vision-section__glow,
            .vision-title,
            .vision-wcs,
            .vision-eyebrow,
            .vision-intro,
            .vision-step,
            .vision-step-ring,
            .vision-card,
            .vision-connect-flow {
              animation: none !important;
              opacity: 1 !important;
            }
          }
        `}</style>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ padding: '80px 32px', background: 'linear-gradient(135deg, #1E1228 0%, #3F275F 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: 'var(--content-max, 1280px)', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 900, color: '#fff', margin: '0 0 16px', letterSpacing: '-0.5px' }}>Prêt à démarrer votre projet ?</h2>
        <p style={{ fontSize: '16px', color: '#D4CCD9', margin: '0 0 36px' }}>Devis gratuit sous 24h — Intervention rapide dans tout Dakar</p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact#devis" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 34px', background: '#52337C', color: '#fff', fontWeight: 700, fontSize: '15px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(82,51,124, 0.4)' }}>Obtenir un Devis Gratuit <ArrowRight size={17} /></Link>
          <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', border: '2px solid rgba(255,255,255,0.35)', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none', background: 'rgba(255,255,255,0.08)' }}>Voir nos services</Link>
        </div>
        </div>
      </section>
    </>
  );
}
