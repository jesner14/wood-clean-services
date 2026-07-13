/**
 * Bande publicitaire — flyers affichés en pleine largeur sur l'accueil.
 *
 * Format recommandé : 1920 × 500 px (JPG ou PNG)
 * Déposer les images dans : public/assets/flyers/
 */
export interface FlyerBannerItem {
  id: string;
  image: string;
  alt: string;
  link?: string;
  label?: string;
}

export const FLYER_BANNER_SPECS = {
  width: 1920,
  height: 680,
  ratio: '1920 / 680',
} as const;

export const flyerBanners: FlyerBannerItem[] = [
  {
    id: 'promo-victoire',
    image: '/assets/flyers/promo-victoire.png?v=2',
    alt: 'On a gagné ! Devis gratuit — Wood Clean Services',
    link: '/contact#devis',
  },
  {
    id: 'promo-bleu',
    image: '/assets/flyers/promo-bleu.png?v=2',
    alt: 'Victoire ! Intervention rapide — Wood Clean Services',
    link: '/contact#devis',
  },
];
