import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import ServicesSection from '../sections/ServicesSection'
import SkillsSection from '../sections/SkillsSection'
import ProjectsSection from '../sections/ProjectsSection'
import CodingActivitySection from '../sections/CodingActivitySection'
import JourneySection from '../sections/JourneySection'
import ContactSection from '../sections/ContactSection'
import FooterSection from '../sections/FooterSection'
import usePortfolioData from '../hooks/usePortfolioData'

const TRACKED_SECTIONS = ['home', 'about', 'services', 'skills', 'projects', 'contact']

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('home')
  const { projects, services, skills, testimonials, experience, loading, errors } = usePortfolioData()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: '-20% 0px -45% 0px',
      },
    )

    TRACKED_SECTIONS.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Navbar activeSection={activeSection} />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection services={services} loading={loading} error={errors.services} />
        <SkillsSection skills={skills} loading={loading} error={errors.skills} />
        <ProjectsSection projects={projects} loading={loading} error={errors.projects} />
        <CodingActivitySection projectsCount={projects.length} />
        <JourneySection
          experience={experience}
          testimonials={testimonials}
          loading={loading}
          error={errors.experience}
        />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  )
}

export default HomePage
