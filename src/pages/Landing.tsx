import Header from '../components/Header.tsx'
import Hero from '../components/Hero.tsx'
import PilotaAI from '../components/PilotaAI.tsx'
import OmnichannelHub from '../components/OmnichannelHub.tsx'
import Encyclopedia from '../components/Encyclopedia.tsx'
import Features from '../components/Features.tsx'
import Integrations from '../components/Integrations.tsx'
import Pricing from '../components/Pricing.tsx'
import SocialProof from '../components/SocialProof.tsx'
import FinalCTA from '../components/FinalCTA.tsx'
import Footer from '../components/Footer.tsx'
import ChatWidget from '../components/ChatWidget.tsx'

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <PilotaAI />
        <OmnichannelHub />
        <Encyclopedia />
        <Features />
        <Integrations />
        <Pricing />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
      <ChatWidget
        websiteToken="qGPUwRXk8rjsSGCVUuKR69ot"
        baseUrl="https://app.sintonia.cloud"
      />
    </div>
  )
}
