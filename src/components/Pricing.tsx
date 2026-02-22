import { useState, useRef } from 'react';
import { Check, X, Sparkles, HelpCircle, ChevronDown, Bot, Zap, Users, Building2, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const navigate = useNavigate();

  interface Feature {
    name: string;
    included: boolean;
    highlight?: boolean;
  }

  interface Plan {
    name: string;
    subtitle: string;
    icon: any;
    price: { monthly: number | null; annual: number | null };
    agents: string;
    color: string;
    bgColor: string;
    borderColor: string;
    popular: boolean;
    features: Feature[];
    cta: string;
    ctaStyle: string;
  }

  const plans: Plan[] = [
    {
      name: 'Starter',
      subtitle: 'Per piccoli team',
      icon: Users,
      price: { monthly: 39, annual: 29 },
      agents: '1-5 agenti',
      color: 'from-slate-500 to-slate-600',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      popular: false,
      features: [
        { name: '1 inbox', included: true },
        { name: 'Live chat + Email', included: true },
        { name: 'Risposte rapide base', included: true },
        { name: 'Report base', included: true },
        { name: 'Pilota AI', included: false },
        { name: 'Integrazioni avanzate', included: false },
        { name: 'SLA garantiti', included: false },
        { name: 'Account manager', included: false },
      ],
      cta: 'Inizia Gratis',
      ctaStyle: 'bg-slate-800 hover:bg-slate-900 text-white',
    },
    {
      name: 'Professional',
      subtitle: 'Per team in crescita',
      icon: Bot,
      price: { monthly: 89, annual: 69 },
      agents: '5-15 agenti',
      color: 'from-blue-600 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
      popular: true,
      features: [
        { name: 'Inbox illimitate', included: true },
        { name: 'Tutti i canali', included: true },
        { name: 'Risposte rapide avanzate', included: true },
        { name: 'Report completi', included: true },
        { name: 'Pilota AI incluso', included: true, highlight: true },
        { name: 'Integrazioni avanzate', included: true },
        { name: 'SLA garantiti', included: false },
        { name: 'Account manager', included: false },
      ],
      cta: 'Inizia Gratis',
      ctaStyle: 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25',
    },
    {
      name: 'Business',
      subtitle: 'Per aziende',
      icon: Building2,
      price: { monthly: 169, annual: 129 },
      agents: '15-50 agenti',
      color: 'from-purple-600 to-indigo-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      popular: false,
      features: [
        { name: 'Tutto di Professional', included: true },
        { name: 'Pilota AI avanzato', included: true, highlight: true },
        { name: 'Automazioni personalizzate', included: true },
        { name: 'Report personalizzati', included: true },
        { name: 'SLA 99.9%', included: true },
        { name: 'Supporto prioritario', included: true },
        { name: 'Account manager', included: true },
        { name: 'Onboarding guidato', included: true },
      ],
      cta: 'Contattaci',
      ctaStyle: 'bg-purple-600 hover:bg-purple-700 text-white',
    },
    {
      name: 'Enterprise',
      subtitle: 'Soluzioni custom',
      icon: Crown,
      price: { monthly: null, annual: null },
      agents: 'Agenti illimitati',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      popular: false,
      features: [
        { name: 'Tutto di Business', included: true },
        { name: 'Infrastruttura dedicata', included: true },
        { name: 'Contratto personalizzato', included: true },
        { name: 'Onboarding dedicato', included: true },
        { name: 'SLA personalizzato', included: true },
        { name: 'Integrazioni custom', included: true },
        { name: 'Formazione team', included: true },
        { name: 'Supporto 24/7', included: true },
      ],
      cta: 'Parla con noi',
      ctaStyle: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white',
    },
  ];

  const faqs = [
    {
      question: 'Posso cambiare piano in qualsiasi momento?',
      answer: 'Sì, puoi fare upgrade o downgrade del tuo piano in qualsiasi momento. Se fai upgrade, pagherai la differenza pro-rata. Se fai downgrade, riceverai un credito per il periodo rimanente.',
    },
    {
      question: 'Cosa succede se supero il limite di agenti?',
      answer: 'Ti contatteremo per discutere un upgrade al piano successivo. Non bloccheremo mai il tuo servizio, ma è importante rimanere entro i limiti del tuo piano per garantire le migliori performance.',
    },
    {
      question: 'C\'è un periodo di prova gratuito?',
      answer: 'Sì! Offriamo 14 giorni di prova gratuita su tutti i piani, senza carta di credito richiesta. Avrai accesso completo a tutte le funzionalità del piano scelto.',
    },
    {
      question: 'Come funziona Pilota AI nei diversi piani?',
      answer: 'Pilota AI è incluso dal piano Professional in su. Nel piano Professional hai accesso alle funzionalità base, mentre nei piani Business ed Enterprise hai accesso a funzionalità avanzate come training personalizzato e analisi sentiment.',
    },
    {
      question: 'Quali metodi di pagamento accettate?',
      answer: 'Accettiamo tutte le principali carte di credito (Visa, Mastercard, American Express), PayPal, e bonifico bancario per i piani annuali Enterprise.',
    },
  ];

  return (
    <section ref={sectionRef} id="pricing" className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium text-sm mb-6">
            <Zap className="w-4 h-4" />
            <span>Prezzi Trasparenti</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
            Scegli il piano{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              perfetto per te
            </span>
          </h2>
          <p className="text-lg text-slate-600">
            Nessun costo nascosto. Inizia gratis, scala quando cresci. 
            Tutti i piani includono 14 giorni di prova gratuita.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
            Mensile
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-16 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 p-1 transition-all"
          >
            <div
              className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                isAnnual ? 'translate-x-8' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
            Annuale
          </span>
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
            Risparmia 20%
          </span>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 mb-20">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              className={`relative rounded-2xl ${plan.bgColor} border-2 ${plan.borderColor} p-6 ${
                plan.popular ? 'ring-2 ring-blue-500 ring-offset-2 scale-[1.02] lg:scale-105 shadow-xl' : 'shadow-lg'
              } transition-all hover:shadow-xl`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    Più Popolare
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6 pt-2">
                <div className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} items-center justify-center text-white mb-4`}>
                  <plan.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="text-sm text-slate-500">{plan.subtitle}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                {plan.price.monthly ? (
                  <>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-extrabold text-slate-900">
                        €{isAnnual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className="text-slate-500">/mese</span>
                    </div>
                    <div className="text-sm text-slate-500 mt-1">per agente</div>
                    {isAnnual && plan.price.monthly !== plan.price.annual && (
                      <div className="text-xs text-green-600 mt-1">
                        Risparmi €{((plan.price.monthly || 0) - (plan.price.annual || 0)) * 12}/anno per agente
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-3xl font-extrabold text-slate-900">Custom</div>
                )}
                <div className="text-sm text-slate-600 mt-2 font-medium">{plan.agents}</div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className={`w-5 h-5 flex-shrink-0 ${feature.highlight ? 'text-blue-600' : 'text-green-500'}`} />
                    ) : (
                      <X className="w-5 h-5 text-slate-300 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${feature.included ? (feature.highlight ? 'text-blue-700 font-semibold' : 'text-slate-700') : 'text-slate-400'}`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button 
                onClick={() => navigate('/signup')}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.ctaStyle}`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-medium text-sm mb-4">
              <HelpCircle className="w-4 h-4" />
              <span>FAQ Pricing</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Domande Frequenti</h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-800">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-slate-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
