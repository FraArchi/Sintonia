import Header from './components/Header'
import Hero from './components/Hero'
import PilotaAI from './components/PilotaAI'
import OmnichannelHub from './components/OmnichannelHub'
import Encyclopedia from './components/Encyclopedia'
import Features from './components/Features'
import Integrations from './components/Integrations'
import Pricing from './components/Pricing'
import SocialProof from './components/SocialProof'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

function App() {
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
    </div>
  )
}

export default App
