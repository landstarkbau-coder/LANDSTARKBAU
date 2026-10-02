// app/[locale]/cleaning/page.tsx
import { CleaningHero } from '../components/cleaning/CleaningHero'
import { CleaningServices } from '../components/cleaning/CleaningServices'
import { CleaningWhyUs } from '../components/cleaning/CleaningWhyUs'
import { CleaningProcess } from '../components/cleaning/CleaningProcess'
import { CleaningGallery } from '../components/cleaning/CleaningGallery'
import { CleaningTestimonials } from '../components/cleaning/CleaningTestimonials'
import { CleaningFAQ } from '../components/cleaning/CleaningFAQ'
import { CleaningFinalCTA } from '../components/cleaning/CleaningFinalCTA'
import { ContactSection } from '../components/ContactSection'

export default function CleaningPage() {
  return (
    <main className="min-h-screen">
      <CleaningHero />
      <CleaningServices />
      <CleaningWhyUs />
      <CleaningProcess />
      <CleaningGallery />
      <CleaningTestimonials />
      <CleaningFAQ />
      <ContactSection/>
    </main>
  )
}