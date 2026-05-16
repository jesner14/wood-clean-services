import { Utensils, Building2, Home, Wrench, Wind, Users, LucideIcon } from 'lucide-react';

export interface ServiceItem {
  icon: LucideIcon;
  number: string;
  title: string;
  tagline: string;
  color: string;
  sections: { title: string; description: string; why?: string }[];
}

export const servicesContent: ServiceItem[] = [
  {
    icon: Utensils,
    number: '01',
    title: 'Nettoyage des hottes de cuisine professionnelles',
    tagline: 'Protégez votre établissement contre les incendies et les risques sanitaires',
    color: '#52337C',
    sections: [
      {
        title: 'Nettoyage des hottes',
        description: 'Nous éliminons en profondeur les graisses accumulées dans vos hottes.',
        why: 'Les dépôts de graisse sont hautement inflammables. Un simple incident peut provoquer un incendie. Un entretien régulier protège votre personnel, vos clients et votre investissement.',
      },
      {
        title: 'Nettoyage des filtres et conduits',
        description: 'Les filtres capturent les graisses, et les conduits évacuent l\'air vers l\'extérieur.',
        why: 'Des filtres encrassés réduisent l\'aspiration, augmentent vos coûts énergétiques et favorisent les mauvaises odeurs. Des conduits sales peuvent bloquer la ventilation et devenir un danger invisible.',
      },
      {
        title: 'Dégraissage des sorties de ventilation',
        description: 'Nous assurons un nettoyage complet des sorties d\'air.',
        why: 'Une meilleure circulation de l\'air, moins de chaleur, et un environnement de travail plus sain et plus confortable.',
      },
    ],
  },
  {
    icon: Building2,
    number: '02',
    title: 'Grand ménage des restaurants et hôtels',
    tagline: 'Offrez à vos clients une propreté irréprochable et une image haut de gamme',
    color: '#EB8E8C',
    sections: [
      {
        title: 'Nettoyage des équipements et installations de cuisine',
        description: 'Nous nettoyons et dégraissons tous vos équipements en profondeur.',
        why: 'Vous garantissez une qualité alimentaire irréprochable et évitez toute contamination.',
      },
      {
        title: 'Nettoyage complet de cuisine',
        description: 'Nous intervenons dans chaque recoin, même les zones invisibles.',
        why: 'Une cuisine saine, conforme aux normes, prête pour les inspections.',
      },
      {
        title: 'Dégraissage des plans de travail',
        description: 'Des surfaces propres et désinfectées pour la préparation des aliments.',
        why: 'Éviter les contaminations croisées et protéger la santé de vos clients.',
      },
      {
        title: 'Nettoyage des murs, sols et plafonds avec désinfection',
        description: 'Nous éliminons graisses, bactéries et salissures.',
        why: 'Un environnement propre, sain et conforme aux exigences sanitaires.',
      },
      {
        title: 'Nettoyage des façades et vitres',
        description: 'Votre image commence à l\'extérieur.',
        why: 'Une façade propre attire plus de clients et inspire confiance dès le premier regard.',
      },
    ],
  },
  {
    icon: Home,
    number: '03',
    title: 'Nettoyage pour particuliers et immeubles',
    tagline: 'Un cadre de vie propre, sain et agréable au quotidien',
    color: '#785A8F',
    sections: [
      {
        title: 'Grand ménage de résidence',
        description: 'Un nettoyage en profondeur de votre habitation.',
        why: 'Élimination des poussières, bactéries et allergènes pour un air plus sain.',
      },
      {
        title: 'Nettoyage d\'immeubles',
        description: 'Entretien complet des bâtiments.',
        why: 'Valorisation de votre bien immobilier et satisfaction des occupants.',
      },
      {
        title: 'Nettoyage des espaces communs',
        description: 'Zones à forte circulation nécessitant une attention particulière.',
        why: 'Réduire la propagation des microbes et maintenir un environnement propre.',
      },
      {
        title: 'Nettoyage de vitrerie et escaliers',
        description: 'Clarté, propreté et sécurité.',
        why: 'Plus de lumière naturelle et moins de risques d\'accidents.',
      },
    ],
  },
  {
    icon: Wrench,
    number: '04',
    title: 'Conception, installation et maintenance',
    tagline: 'Des installations performantes, conformes et durables',
    color: '#3F275F',
    sections: [
      {
        title: 'Conception sur mesure',
        description: 'Des solutions adaptées à vos besoins réels.',
        why: 'Performance maximale et investissement rentable.',
      },
      {
        title: 'Systèmes de ventilation aux normes',
        description: 'Installation conforme aux standards de sécurité.',
        why: 'Éviter les sanctions et garantir la sécurité de tous.',
      },
      {
        title: 'Maintenance préventive',
        description: 'Nous anticipons les problèmes avant qu\'ils n\'arrivent.',
        why: 'Moins de pannes, moins de coûts, plus de tranquillité.',
      },
      {
        title: 'Nettoyage des extincteurs',
        description: 'Vérification et entretien de vos dispositifs de sécurité.',
        why: 'Être prêt à agir immédiatement en cas d\'incendie.',
      },
    ],
  },
  {
    icon: Wind,
    number: '05',
    title: 'Nettoyage des chambres froides et équipements frigorifiques',
    tagline: 'Garantissez la sécurité alimentaire et le respect de la chaîne du froid',
    color: '#52337C',
    sections: [
      {
        title: 'Nettoyage des frigos et congélateurs avec désinfection',
        description: 'Nettoyage en profondeur pour éliminer bactéries et odeurs.',
        why: 'Une meilleure conservation des aliments et zéro contamination.',
      },
      {
        title: 'Nettoyage des chambres froides professionnelles',
        description: 'Traitement complet des espaces de stockage.',
        why: 'Conformité sanitaire et sécurité alimentaire garantie.',
      },
      {
        title: 'Nettoyage des containers frigorifiques (Reefer)',
        description: 'Entretien spécialisé pour le transport frigorifique.',
        why: 'Assurer la qualité des produits du départ à la livraison.',
      },
    ],
  },
  {
    icon: Users,
    number: '06',
    title: 'Services complémentaires',
    tagline: 'Une solution complète pour tous vos besoins',
    color: '#EB8E8C',
    sections: [
      { title: 'Nettoyage de canapés et tapis', description: 'Redonnez vie à vos tissus et éliminez acariens et bactéries.' },
      { title: 'Travaux de peinture', description: 'Embellissez et protégez vos espaces.' },
      { title: 'Jardinage et aménagement paysager', description: 'Valorisez vos extérieurs avec des espaces verts soignés.' },
      { title: 'Soudure sous-marine', description: 'Intervention technique spécialisée pour structures immergées.' },
      { title: 'Nettoyage après construction', description: 'Un espace propre, prêt à être utilisé immédiatement après travaux.' },
      { title: 'Désinfection, désinsectisation, dératisation', description: 'Éliminez durablement microbes et nuisibles pour un environnement sain.' },
    ],
  },
];

export const promoSlides = [
  { title: 'Spécialiste du nettoyage des hottes de cuisine', subtitle: 'Protection incendie & conformité sanitaire', color: '#52337C' },
  { title: 'Spécialiste du grand ménage des cuisines', subtitle: 'Restaurants, appartements et immeubles', color: '#EB8E8C' },
  { title: 'Chambres froides & équipements frigorifiques', subtitle: 'Sécurité alimentaire garantie', color: '#785A8F' },
  { title: 'Espace partenaire sécurisé', subtitle: 'Devis, factures, certificats en ligne', color: '#3F275F' },
];
