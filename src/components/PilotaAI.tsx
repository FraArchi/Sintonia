import { Bot, Zap, Clock, TrendingDown, MessageCircle, Brain, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function PilotaAI() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const stats = [
    { icon: TrendingDown, value: 60, suffix: '%', label: 'Riduzione ticket manuali' },
    { icon: Clock, value: 2, suffix: 's', label: 'Tempo medio di risposta' },
    { icon: Zap, value: 24, suffix: '/7', label: 'Disponibilità continua' },
  ];

  const benefits = [
    { icon: Brain, title: 'Apprende continuamente', desc: 'Si migliora con ogni interazione, imparando dal tuo knowledge base' },
    { icon: MessageCircle, title: 'Risposte naturali', desc: 'Conversazioni fluide che i clienti non distinguono da un operatore umano' },
    { icon: Sparkles, title: 'Escalation intelligente', desc: 'Sa quando passare la conversazione a un operatore umano' },
  ];

  const chatMessages = [
    { type: 'user', text: 'Ciao, non riesco a tracciare il mio ordine #12345' },
    { type: 'ai', text: 'Ciao! Ho verificato il tuo ordine #12345. Il pacco è in consegna e arriverà oggi entro le 18:00. Ecco il link di tracciamento: track.it/12345' },
    { type: 'user', text: 'Grazie mille! E posso modificare l\'indirizzo?' },
    { type: 'ai', text: 'Purtroppo il pacco è già in consegna quindi non è più possibile modificare l\'indirizzo. Posso però verificare le opzioni per un eventuale ritiro. Vuoi che proceda?' },
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium text-sm mb-6">
            <Bot className="w-4 h-4" />
            <span>Incontra Pilota</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
            Il tuo agente AI che{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              rivoluziona
            </span>{' '}
            il supporto
          </h2>
          <p className="text-lg text-slate-600">
            Pilota utilizza intelligenza artificiale avanzata per rispondere istantaneamente alle domande dei clienti, 
            riducendo drasticamente il carico di lavoro del tuo team e migliorando la soddisfazione.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50 text-center group-hover:border-blue-300 transition-colors">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-blue-600" />
                </div>
                <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Chat Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Pilota AI</div>
                    <div className="text-xs text-white/80 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Sempre online
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium">
                  Risposta: &lt;2s
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-6 space-y-4 bg-slate-50 min-h-[320px]">
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.2 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.type === 'user'
                          ? 'bg-slate-200 text-slate-800'
                          : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                      }`}
                    >
                      {msg.type === 'ai' && (
                        <div className="flex items-center gap-1 text-xs text-white/80 mb-1">
                          <Bot className="w-3 h-3" />
                          Pilota AI
                        </div>
                      )}
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="px-6 py-4 bg-white border-t border-slate-200">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Scrivi un messaggio..."
                    className="flex-1 px-4 py-2.5 rounded-full bg-slate-100 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                  <button className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {benefits.map((benefit, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.desc}</p>
                </div>
              </div>
            ))}

            {/* Feature List */}
            <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
              <h4 className="font-semibold text-slate-900 mb-4">Cosa può fare Pilota:</h4>
              <ul className="space-y-3">
                {[
                  'Rispondere a domande frequenti istantaneamente',
                  'Tracciare ordini e spedizioni',
                  'Gestire richieste di rimborso semplici',
                  'Prenotare appuntamenti e demo',
                  'Raccogliere informazioni prima dell\'escalation',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
