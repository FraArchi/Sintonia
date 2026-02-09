import { Puzzle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Integrations() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Integration logos represented with styled text/icons
  const integrations = [
    { name: 'Slack', color: '#4A154B', icon: '💬' },
    { name: 'Shopify', color: '#95BF47', icon: '🛒' },
    { name: 'Dialogflow', color: '#FF9800', icon: '🤖' },
    { name: 'Google Translate', color: '#4285F4', icon: '🌐' },
    { name: 'Linear', color: '#5E6AD2', icon: '📋' },
    { name: 'Stripe', color: '#635BFF', icon: '💳' },
    { name: 'HubSpot', color: '#FF7A59', icon: '🎯' },
    { name: 'Salesforce', color: '#00A1E0', icon: '☁️' },
    { name: 'Zendesk', color: '#03363D', icon: '🎧' },
    { name: 'Zapier', color: '#FF4A00', icon: '⚡' },
    { name: 'Mailchimp', color: '#FFE01B', icon: '📧' },
    { name: 'Intercom', color: '#1F8DED', icon: '💭' },
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-6">
            <Puzzle className="w-4 h-4" />
            <span>Integrazioni</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
            Si integra con i{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              tuoi strumenti
            </span>
          </h2>
          <p className="text-lg text-slate-600">
            Connetti Sintonia con le app che già utilizzi. Sincronizza dati, automatizza workflow 
            e mantieni tutto il tuo ecosistema connesso.
          </p>
        </motion.div>

        {/* Integrations Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12"
        >
          {integrations.map((integration, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.03 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className="flex flex-col items-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all cursor-pointer">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${integration.color}15` }}
                >
                  {integration.icon}
                </div>
                <span className="text-sm font-medium text-slate-700 text-center">{integration.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* More Integrations Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/25">
            <span>E molte altre integrazioni...</span>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-sm">50+</span>
          </div>
        </motion.div>

        {/* API Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 p-8 rounded-2xl bg-white border border-slate-200 shadow-xl"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                API Developer-Friendly
              </h3>
              <p className="text-slate-600 mb-6">
                Non trovi l'integrazione che cerchi? Le nostre API RESTful ti permettono di 
                costruire qualsiasi integrazione custom. Documentazione completa e SDK per 
                i principali linguaggi.
              </p>
              <a
                href="#docs"
                className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors group"
              >
                Esplora la documentazione
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <pre className="text-green-400 overflow-x-auto">
{`// Crea un ticket via API
const response = await fetch(
  'https://api.sintonia.io/v1/tickets',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      subject: 'Nuovo ticket',
      customer_id: 'cust_123',
      channel: 'api',
      priority: 'normal'
    })
  }
);`}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
