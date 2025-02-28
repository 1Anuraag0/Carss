import { HeroSection } from '@/components/hero-section';
import { Navbar } from '@/components/navbar';
import { FeaturesSection } from '@/components/features-section';
import { ModelsSection } from '@/components/models-section';
import { GallerySection } from '@/components/gallery-section';
import { SpecsSection } from '@/components/specs-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { LoadingScreen } from '@/components/loading-screen';

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <LoadingScreen />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ModelsSection />
      <GallerySection />
      <SpecsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}