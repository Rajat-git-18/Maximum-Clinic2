import { AboutSection } from "@/components/home/AboutSection";
import { Accreditations } from "@/components/home/Accreditations";
import { ContactSection } from "@/components/home/ContactSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { GallerySection } from "@/components/home/GallerySection";
import { Hero } from "@/components/home/Hero";
import { PatientJourney } from "@/components/home/PatientJourney";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { VideosSection } from "@/components/home/VideosSection";
import { clinic } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: `${clinic.name} | Patient-centred healthcare`,
  description: clinic.hero.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesSection />
      <AboutSection />
      <GallerySection />
      <Accreditations />
      <VideosSection />
      <TestimonialsSection />
      <PatientJourney />
      <FaqSection />
      <ContactSection />
      <FinalCta />
    </>
  );
}
