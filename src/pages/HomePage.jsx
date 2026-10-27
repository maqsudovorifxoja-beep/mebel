import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ShowroomStories } from '../components/home/ShowroomStories';
import { InteractiveConfigurator } from '../components/home/InteractiveConfigurator';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { BeforeAfterSlider } from '../components/home/BeforeAfterSlider';
import { RoomLookbookTeaser } from '../components/home/RoomLookbookTeaser';
import { RoomStyleQuiz } from '../components/home/RoomStyleQuiz';
import { CraftsmanshipSpotlight } from '../components/home/CraftsmanshipSpotlight';
import { TelegramPromoBanner } from '../components/home/TelegramPromoBanner';

export const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <ShowroomStories />
      <InteractiveConfigurator />
      <CategoryGrid />
      <FeaturedProducts />
      <BeforeAfterSlider />
      <RoomLookbookTeaser />
      <RoomStyleQuiz />
      <CraftsmanshipSpotlight />
      <TelegramPromoBanner />
    </main>
  );
};

export default HomePage;
