// app/page.tsx
import { Hero } from './components/Hero'
import { ServicesSection } from './components/ServicesSection'
import { AboutSection } from './components/AboutSection'
import { ProcessSection } from './components/ProcessSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { FAQSection } from './components/FAQSection'
import { ContactSection } from './components/ContactSection'


export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <AboutSection />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </main>
  )
}