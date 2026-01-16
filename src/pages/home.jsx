import HeroSection from '@/components/landing/hero-section';
import AboutSection from '@/components/landing/about-section';
import SkillSection from '@/components/landing/skill-section';
import ProjectsSection from '@/components/landing/projects-section';
import ContactSection from '@/components/landing/contact-section';

/**
 * Home 페이지 컴포넌트
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <Home />
 */
function Home() {
  return (
    <div className="container mx-auto px-4">
      <HeroSection />
      <AboutSection />
      <SkillSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}

export default Home;
