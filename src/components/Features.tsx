import { 
  Users, UserCheck, MessageSquare, Tags, Clock, 
  BarChart3, PieChart, TrendingUp, Shield, Lock,
  Workflow, Repeat, Bell, Zap, Globe, Database, Settings, Archive
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Features() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const featureCategories = [
    {
      title: 'Collaborazione Team',
      description: 'Strumenti per lavorare insieme in modo efficiente',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      features: [
        { icon: Users, name: 'Assegnazione automatica', desc: 'Distribuisci i ticket al team giusto' },
        { icon: MessageSquare, name: 'Note interne', desc: 'Comunica con il team senza che il cliente veda' },
        { icon: UserCheck, name: 'Menzioni @team', desc: 'Coinvolgi colleghi con un semplice tag' },
        { icon: Clock, name: 'SLA tracking', desc: 'Monitora i tempi di risposta in tempo reale' },
      ]
    },
    {
      title: 'Dati Cliente',
      description: 'Tutto quello che devi sapere a portata di click',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'from-emerald-50 to-emerald-100',
      features: [
        { icon: Database, name: 'Profilo unificato', desc: 'Storico completo di ogni cliente' },
        { icon: Tags, name: 'Tag personalizzati', desc: 'Organizza e segmenta i contatti' },
        { icon: Archive, name: 'Storico conversazioni', desc: 'Accedi rapidamente alle chat passate' },
        { icon: Globe, name: 'Dati multi-canale', desc: 'Informazioni aggregate da tutti i canali' },
      ]
    },
    {
      title: 'Automazioni',
      description: 'Risparmia tempo con flussi intelligenti',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      features: [
        { icon: Workflow, name: 'Workflow builder', desc: 'Crea automazioni senza codice' },
        { icon: Repeat, name: 'Risposte rapide', desc: 'Template pronti all\'uso' },
        { icon: Bell, name: 'Trigger automatici', desc: 'Azioni basate su eventi specifici' },
        { icon: Zap, name: 'Integrazioni API', desc: 'Connetti i tuoi strumenti preferiti' },
      ]
    },
    {
      title: 'Report & Analytics',
      description: 'Dati e insight per decisioni migliori',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      features: [
        { icon: BarChart3, name: 'Dashboard real-time', desc: 'Metriche aggiornate in tempo reale' },
        { icon: PieChart, name: 'Report CSAT', desc: 'Misura la soddisfazione dei clienti' },
        { icon: TrendingUp, name: 'Performance team', desc: 'Analizza la produttività del team' },
        { icon: Settings, name: 'Report custom', desc: 'Crea i report che ti servono' },
      ]
    },
  ];

  return (
    <section ref={sectionRef} id="features" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-medium text-sm mb-6">
            <Zap className="w-4 h-4" />
            <span>Funzionalità Complete</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
            Tutto ciò di cui hai{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              bisogno
            </span>
          </h2>
          <p className="text-lg text-slate-600">
            Una suite completa di strumenti per gestire il supporto clienti in modo professionale, 
            dal primo messaggio alla risoluzione finale.
          </p>
        </motion.div>

        {/* Feature Categories Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {featureCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * categoryIndex }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl`} />
              <div className="relative bg-white rounded-2xl border border-slate-200 p-8 hover:border-slate-300 hover:shadow-xl transition-all">
                {/* Category Header */}
                <div className="mb-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${category.color} text-white text-sm font-medium mb-3`}>
                    {category.title}
                  </div>
                  <p className="text-slate-600">{category.description}</p>
                </div>

                {/* Features List */}
                <div className="grid grid-cols-2 gap-4">
                  {category.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group/feature"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.bgColor} flex items-center justify-center mb-3 group-hover/feature:scale-110 transition-transform`}>
                        <feature.icon className={`w-5 h-5`} style={{ color: category.color.includes('blue') ? '#3b82f6' : category.color.includes('emerald') ? '#10b981' : category.color.includes('purple') ? '#a855f7' : '#f97316' }} />
                      </div>
                      <h4 className="font-semibold text-slate-800 mb-1">{feature.name}</h4>
                      <p className="text-sm text-slate-500">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Sicurezza Enterprise-Grade</h4>
                <p className="text-slate-400">I tuoi dati sono protetti con i più alti standard di sicurezza</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {[
                { icon: Lock, label: 'Crittografia E2E' },
                { icon: Shield, label: 'GDPR Compliant' },
                { icon: Database, label: 'Backup Automatici' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10">
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
