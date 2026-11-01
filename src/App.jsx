import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ValueProps from './components/ValueProps.jsx'
import Features from './components/Features.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Showcase from './components/Showcase.jsx'
import Pricing from './components/Pricing.jsx'
import Faq from './components/Faq.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div dir="rtl" className="relative min-h-screen overflow-x-hidden bg-navy">
      <Navbar />
      <main>
        <Hero />
        <ValueProps />
        <Features />
        <HowItWorks />
        <Showcase />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
