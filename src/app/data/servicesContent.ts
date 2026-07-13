import {
  Utensils,
  Hammer,
  Wrench,
  ChefHat,
  Users,
  Sofa,
  Layers,
  Snowflake,
  Home,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceItem {
  icon: LucideIcon;
  number: string;
  title: string;
  tagline: string;
  color: string;
  sections: { title: string; description: string; why?: string }[];
}

/** Services du trifold Wood Clean Services 2026 — 9 offres */
export const servicesContent: ServiceItem[] = [
  {
    icon: Utensils,
    number: '01',
    title: 'Nettoyage de hottes de cuisine',
    tagline: 'Protégez votre établissement contre les incendies et les risques sanitaires',
    color: '#52337C',
    sections: [
      {
        title: 'Dégraissage complet',
        description: 'Élimination en profondeur des graisses accumulées dans vos hottes.',
        why: 'Les dépôts de graisse sont hautement inflammables. Un entretien régulier protège votre personnel, vos clients et votre investissement.',
      },
      {
        title: 'Nettoyage des filtres',
        description: 'Nettoyage et remise en état des filtres pour une aspiration optimale.',
        why: 'Des filtres encrassés réduisent l\'aspiration, augmentent vos coûts énergétiques et favorisent les mauvaises odeurs.',
      },
      {
        title: 'Nettoyage des conduits',
        description: 'Intervention complète sur les conduits d\'évacuation d\'air.',
        why: 'Des conduits sales peuvent bloquer la ventilation et devenir un danger invisible.',
      },
      {
        title: 'Entretien des systèmes d\'extraction',
        description: 'Contrôle et entretien de l\'ensemble du système d\'extraction.',
        why: 'Une meilleure circulation de l\'air et un environnement de travail plus sain.',
      },
    ],
  },
  {
    icon: Hammer,
    number: '02',
    title: 'Conception & Installation',
    tagline: 'Des installations performantes, conformes et durables',
    color: '#EB8E8C',
    sections: [
      {
        title: 'Hottes sur mesure',
        description: 'Conception et fabrication de hottes adaptées à votre cuisine.',
        why: 'Une solution parfaitement dimensionnée pour votre établissement.',
      },
      {
        title: 'Réseaux d\'extraction',
        description: 'Installation complète des réseaux d\'extraction d\'air.',
        why: 'Performance maximale et conformité aux normes de sécurité.',
      },
      {
        title: 'Ventilation professionnelle',
        description: 'Mise en place de systèmes de ventilation pour cuisines pro.',
        why: 'Un air plus sain pour votre équipe et vos clients.',
      },
      {
        title: 'Mise aux normes',
        description: 'Adaptation de vos installations aux standards en vigueur.',
        why: 'Éviter les sanctions et garantir la sécurité de tous.',
      },
    ],
  },
  {
    icon: Wrench,
    number: '03',
    title: 'Maintenance Technique',
    tagline: 'Montage, réparation et maintenance préventive',
    color: '#785A8F',
    sections: [
      {
        title: 'Montage & démontage',
        description: 'Intervention technique pour monter ou démonter vos équipements.',
      },
      {
        title: 'Réparation de tourelles',
        description: 'Dépannage et réparation des tourelles d\'extraction.',
      },
      {
        title: 'Contrôle des installations',
        description: 'Vérification complète du bon fonctionnement de vos équipements.',
      },
      {
        title: 'Maintenance préventive',
        description: 'Anticipation des pannes avant qu\'elles n\'arrivent.',
        why: 'Moins de pannes, moins de coûts, plus de tranquillité.',
      },
    ],
  },
  {
    icon: ChefHat,
    number: '04',
    title: 'Grand ménage de cuisine',
    tagline: 'Pour hôtels et restaurants — une propreté irréprochable',
    color: '#3F275F',
    sections: [
      {
        title: 'Sols et carrelages',
        description: 'Nettoyage en profondeur des sols et carrelages de cuisine.',
      },
      {
        title: 'Murs et plafonds',
        description: 'Élimination des graisses et salissures sur murs et plafonds.',
      },
      {
        title: 'Plans de travail',
        description: 'Dégraissage et désinfection des surfaces de préparation.',
        why: 'Éviter les contaminations croisées et protéger la santé de vos clients.',
      },
      {
        title: 'Équipements de cuisine',
        description: 'Nettoyage et dégraissage de tous vos équipements.',
      },
      {
        title: 'Chambres froides & zones plonge',
        description: 'Entretien des espaces de stockage et de lavage.',
      },
      {
        title: 'Désinfection professionnelle',
        description: 'Traitement antiseptique complet après dégraissage intensif.',
        why: 'Un environnement conforme aux exigences sanitaires.',
      },
    ],
  },
  {
    icon: Users,
    number: '05',
    title: 'Agents & Dames de ménage permanents',
    tagline: 'Personnel qualifié à disposition',
    color: '#52337C',
    sections: [
      {
        title: 'Agents d\'entretien',
        description: 'Mise à disposition d\'agents formés pour l\'entretien courant.',
      },
      {
        title: 'Dames de ménage',
        description: 'Personnel expérimenté pour le nettoyage domestique et professionnel.',
      },
      {
        title: 'Gouvernantes',
        description: 'Supervision et organisation de l\'entretien de vos espaces.',
      },
      {
        title: 'Agents polyvalents',
        description: 'Profils flexibles adaptés à plusieurs types de missions.',
      },
      {
        title: 'Remplacement temporaire ou permanent',
        description: 'Solutions ponctuelles ou contrats de mise à disposition longue durée.',
        why: 'Suivi qualité et encadrement professionnel garantis.',
      },
    ],
  },
  {
    icon: Sofa,
    number: '06',
    title: 'Nettoyage de canapés',
    tagline: 'Nettoyage en profondeur — tissus et cuir',
    color: '#EB8E8C',
    sections: [
      {
        title: 'Nettoyage en profondeur',
        description: 'Traitement complet pour éliminer saleté et acariens.',
      },
      {
        title: 'Détachage',
        description: 'Élimination des taches difficiles sur tissus et cuir.',
      },
      {
        title: 'Désinfection & désodorisation',
        description: 'Assainissement et neutralisation des mauvaises odeurs.',
      },
      {
        title: 'Tissus et cuir',
        description: 'Techniques adaptées à chaque type de revêtement.',
      },
    ],
  },
  {
    icon: Layers,
    number: '07',
    title: 'Entretien de parquets',
    tagline: 'Ravivage, protection et entretien préventif du bois',
    color: '#785A8F',
    sections: [
      {
        title: 'Nettoyage spécialisé',
        description: 'Entretien adapté aux sols en bois et parquets.',
      },
      {
        title: 'Ravivage',
        description: 'Redonnez éclat et profondeur à vos parquets fatigués.',
      },
      {
        title: 'Protection du bois',
        description: 'Traitement protecteur pour prolonger la durée de vie du parquet.',
      },
      {
        title: 'Traitement nourrissant',
        description: 'Nourriture du bois pour un aspect sain et durable.',
      },
      {
        title: 'Entretien préventif',
        description: 'Maintenance régulière pour éviter l\'usure prématurée.',
      },
    ],
  },
  {
    icon: Snowflake,
    number: '08',
    title: 'Nettoyage & désinfection de chambres froides',
    tagline: 'Sécurité alimentaire et respect des normes HACCP',
    color: '#3F275F',
    sections: [
      {
        title: 'Dégraissage',
        description: 'Élimination des résidus et dépôts dans les chambres froides.',
      },
      {
        title: 'Désinfection alimentaire',
        description: 'Traitement antiseptique conforme aux normes alimentaires.',
        why: 'Élimination des bactéries pour une conservation optimale.',
      },
      {
        title: 'Nettoyage des évaporateurs',
        description: 'Entretien des équipements frigorifiques internes.',
      },
      {
        title: 'Respect des normes HACCP',
        description: 'Intervention alignée sur les exigences sanitaires en vigueur.',
        why: 'Conformité et sécurité de la chaîne du froid garanties.',
      },
    ],
  },
  {
    icon: Home,
    number: '09',
    title: 'Nettoyage appartements',
    tagline: 'Service de proximité & interventions rapides',
    color: '#52337C',
    sections: [
      {
        title: 'Nettoyage d\'appartements',
        description: 'Entretien complet de votre logement, pièce par pièce.',
      },
      {
        title: 'Grand ménage',
        description: 'Nettoyage en profondeur pour un intérieur impeccable.',
      },
      {
        title: 'Après déménagement',
        description: 'Remise à neuf après le départ ou à l\'arrivée dans un logement.',
      },
      {
        title: 'Avant aménagement',
        description: 'Préparation soignée avant d\'emménager.',
      },
      {
        title: 'Nettoyage après chantier',
        description: 'Élimination des poussières et résidus de travaux.',
      },
      {
        title: 'Remise en état & urgence',
        description: 'Intervention rapide pour une remise en état efficace.',
        why: 'Service de proximité, réactif et adapté à vos délais.',
      },
    ],
  },
];

export const promoSlides = [
  { title: 'Spécialiste du nettoyage des hottes de cuisine', subtitle: 'Protection incendie & conformité sanitaire', color: '#52337C' },
  { title: 'Grand ménage de cuisine — Hôtels & Restaurants', subtitle: 'Désinfection professionnelle et dégraissage intensif', color: '#EB8E8C' },
  { title: 'Chambres froides & normes HACCP', subtitle: 'Sécurité alimentaire garantie', color: '#785A8F' },
  { title: 'Espace partenaire sécurisé', subtitle: 'Devis, factures, certificats en ligne', color: '#3F275F' },
];
