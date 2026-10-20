import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { RoomLookbookTeaser } from '../components/home/RoomLookbookTeaser';
import { CraftsmanshipSpotlight } from '../components/home/CraftsmanshipSpotlight';
import { TelegramPromoBanner } from '../components/home/TelegramPromoBanner';

export const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <RoomLookbookTeaser />
      <CraftsmanshipSpotlight />
      <TelegramPromoBanner />
    </main>
  );
};
