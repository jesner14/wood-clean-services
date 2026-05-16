import { Link } from 'react-router';
import {
  ArrowRight,
  Utensils,
  Building2,
  Home,
  Wrench,
  Wind,
  Users,
  Clock,
  Shield,
  Leaf,
  CheckCircle,
  type LucideIcon,
} from 'lucide-react';

const heroServices: { icon: LucideIcon; title: string; to: string }[] = [
  { icon: Utensils, title: 'Nettoyage des hottes de cuisine', to: '/services#service-01' },
  { icon: Building2, title: 'Grand ménage restaurants & hôtels', to: '/services#service-02' },
  { icon: Home, title: 'Nettoyage particuliers & immeubles', to: '/services#service-03' },
  { icon: Wrench, title: 'Conception & maintenance', to: '/services#service-04' },
  { icon: Wind, title: 'Chambres froides & équipements', to: '/services#service-05' },
  { icon: Users, title: 'Services complémentaires', to: '/services#service-06' },
];

const features = [
  { icon: Clock, label: 'Intervention rapide' },
  { icon: Shield, label: 'Équipe qualifiée' },
  { icon: Leaf, label: 'Matériel professionnel' },
  { icon: CheckCircle, label: 'Satisfaction garantie' },
];

export function HeroHome() {
  return (
    <section className="hero-home">
      <div className="hero-home__bg" aria-hidden>
        <img src="/assets/hero1.png" alt="" />
      </div>
      <div className="hero-home__overlay" aria-hidden />

      <div className="hero-home__inner">
        {/* Colonne gauche — texte */}
        <div className="hero-home__left">
          <p className="hero-home__badge hero-fade-in" style={{ animationDelay: '0.1s' }}>
            N°1 des cuisines propres au Sénégal
          </p>
          <h1 className="hero-home__title hero-fade-in" style={{ animationDelay: '0.2s' }}>
            Nettoyage, entretien et maintenance pour tous vos espaces
          </h1>
          <p className="hero-home__subtitle hero-fade-in" style={{ animationDelay: '0.35s' }}>
            Des solutions professionnelles pour un environnement propre, sain et sécurisé.
          </p>
          <div className="hero-home__ctas hero-fade-in" style={{ animationDelay: '0.5s' }}>
            <Link to="/services" className="hero-home__btn hero-home__btn--primary">
              Découvrir nos services <ArrowRight size={18} />
            </Link>
            <Link to="/contact#devis" className="hero-home__btn hero-home__btn--outline">
              Obtenir un devis
            </Link>
          </div>
        </div>

        {/* Centre — technicien */}
        <div className="hero-home__center hero-fade-in" style={{ animationDelay: '0.25s' }}>
          <div className="hero-home__worker-wrap">
            <img
              src="/assets/hero-worker.png?v=3"
              alt="Technicien Wood Clean Services"
              className="hero-home__worker"
            />
          </div>
        </div>

        {/* Droite — grille services */}
        <div className="hero-home__right">
          <div className="hero-home__services-grid">
            {heroServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.title}
                  to={s.to}
                  className="hero-home__service-card hero-card-in"
                  style={{ animationDelay: `${0.4 + i * 0.08}s` }}
                >
                  <span className="hero-home__service-icon">
                    <Icon size={22} />
                  </span>
                  <span className="hero-home__service-title">{s.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Barre avantages */}
      <div className="hero-home__features">
        {features.map(({ icon: Icon, label }, i) => (
          <div
            key={label}
            className="hero-home__feature hero-fade-in"
            style={{ animationDelay: `${0.7 + i * 0.1}s` }}
          >
            <Icon size={20} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <style>{`
        .hero-home {
          position: relative;
          min-height: calc(100vh - 0px);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding-top: 96px;
          box-sizing: border-box;
        }

        .hero-home__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero-home__bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: heroBgZoom 20s ease-in-out infinite alternate;
        }
        @keyframes heroBgZoom {
          from { transform: scale(1); }
          to { transform: scale(1.06); }
        }

        .hero-home__overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            105deg,
            rgba(15, 8, 30, 0.92) 0%,
            rgba(26, 15, 46, 0.85) 38%,
            rgba(26, 15, 46, 0.55) 62%,
            rgba(26, 15, 46, 0.75) 100%
          );
        }

        .hero-home__inner {
          position: relative;
          z-index: 2;
          flex: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 32px 32px 24px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 16px 24px;
          align-items: start;
          box-sizing: border-box;
        }

        .hero-home__left {
          max-width: 480px;
          align-self: start;
          padding-top: 0;
        }

        .hero-home__badge {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #EB8E8C;
          margin: 0 0 16px;
        }

        .hero-home__title {
          font-size: clamp(26px, 3.2vw, 42px);
          font-weight: 900;
          color: #fff;
          line-height: 1.15;
          margin: 0 0 16px;
          letter-spacing: -0.5px;
          text-transform: uppercase;
        }

        .hero-home__subtitle {
          font-size: clamp(14px, 1.5vw, 17px);
          color: rgba(255, 255, 255, 0.82);
          line-height: 1.7;
          margin: 0 0 28px;
          max-width: 420px;
        }

        .hero-home__ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .hero-home__btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 26px;
          font-size: 14px;
          font-weight: 700;
          border-radius: 10px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .hero-home__btn:hover {
          transform: translateY(-2px);
        }
        .hero-home__btn--primary {
          background: #52337C;
          color: #fff;
          box-shadow: 0 6px 24px rgba(82,51,124, 0.45);
        }
        .hero-home__btn--primary:hover {
          background: #3F275F;
        }
        .hero-home__btn--outline {
          background: #fff;
          color: #52337C;
          border: 2px solid #fff;
        }
        .hero-home__btn--outline:hover {
          background: #F4F1F6;
        }

        .hero-home__center {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          align-self: start;
          z-index: 3;
          margin-top: 0;
        }

        .hero-home__worker-wrap {
          position: relative;
          line-height: 0;
          animation: heroFloat 5s ease-in-out infinite;
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .hero-home__worker {
          max-height: min(680px, 72vh);
          width: auto;
          max-width: 100%;
          object-fit: contain;
          object-position: top center;
          vertical-align: top;
          display: block;
          /* Ombre douce — idéal quand hero-worker.png aura un fond transparent */
          filter: drop-shadow(0 16px 32px rgba(0, 0, 0, 0.35));
        }

        .hero-home__right {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          align-self: center;
          padding-top: 24px;
        }

        .hero-home__services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          max-width: 420px;
          width: 100%;
        }

        .hero-home__service-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          background: rgba(82,51,124, 0.35);
          border: 1px solid rgba(220, 186, 221, 0.35);
          border-radius: 12px;
          text-decoration: none;
          backdrop-filter: blur(8px);
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
        }
        .hero-home__service-card:hover {
          background: rgba(82,51,124, 0.55);
          border-color: rgba(229, 123, 127, 0.6);
          transform: translateX(-4px);
        }

        .hero-home__service-icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fbe4e5;
        }

        .hero-home__service-title {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          line-height: 1.4;
        }

        .hero-home__features {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          background: rgba(26, 15, 46, 0.95);
          border-top: 1px solid rgba(220, 186, 221, 0.15);
          padding: 20px 32px;
          max-width: 100%;
        }

        .hero-home__feature {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
        }
        .hero-home__feature svg {
          color: #EB8E8C;
          flex-shrink: 0;
        }

        .hero-fade-in {
          opacity: 0;
          animation: heroFadeIn 0.8s ease forwards;
        }
        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-card-in {
          opacity: 0;
          animation: heroCardIn 0.6s ease forwards;
        }
        @keyframes heroCardIn {
          from {
            opacity: 0;
            transform: translateX(16px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 1100px) {
          .hero-home__inner {
            grid-template-columns: 1fr;
            text-align: center;
            padding-bottom: 16px;
          }
          .hero-home__left {
            max-width: 100%;
            margin: 0 auto;
          }
          .hero-home__subtitle {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-home__ctas {
            justify-content: center;
          }
          .hero-home__center {
            order: 2;
            align-self: center;
          }
          .hero-home__right {
            justify-content: center;
            align-self: center;
            padding-top: 0;
            order: 3;
          }
          .hero-home__services-grid {
            max-width: 480px;
          }
        }

        @media (max-width: 640px) {
          .hero-home__services-grid {
            grid-template-columns: 1fr;
          }
          .hero-home__features {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            padding: 16px 20px;
          }
          .hero-home__feature {
            font-size: 12px;
          }
          .hero-home {
            min-height: auto;
          }
        }
      `}</style>
    </section>
  );
}
