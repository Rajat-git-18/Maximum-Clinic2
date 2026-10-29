import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { GallerySection } from "@/components/home/GallerySection";
import { Hero } from "@/components/home/Hero";
import { PatientJourney } from "@/components/home/PatientJourney";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { WhySection } from "@/components/home/WhySection";
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
      <DoctorsSection />
      <AboutSection />
      <TestimonialsSection />
      <WhySection />
      <GallerySection />
      <PatientJourney />
      <FaqSection />
      <ContactSection />
      <FinalCta />
    </>
  );
}
