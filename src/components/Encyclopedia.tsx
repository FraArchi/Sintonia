import { Book, Search, FileText, HelpCircle, Lightbulb, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Encyclopedia() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const benefits = [
    { icon: Users, title: 'Self-Service 24/7', desc: 'I clienti trovano risposte autonomamente, senza aspettare' },
    { icon: FileText, title: 'Riduzione Ticket', desc: 'Fino al 40% in meno di richieste ripetitive al team' },
    { icon: Lightbulb, title: 'Knowledge Centralizzato', desc: 'Un unico posto per tutta la documentazione' },
  ];

  const articles = [
    { title: 'Come tracciare un ordine', views: 1234, category: 'Spedizioni' },
    { title: 'Politica di reso e rimborsi', views: 987, category: 'Acquisti' },
    { title: 'Metodi di pagamento accettati', views: 756, category: 'Pagamenti' },
    { title: 'Come modificare i dati account', views: 543, category: 'Account' },
    { title: 'FAQ prodotti e garanzia', views: 432, category: 'Prodotti' },
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-medium text-sm mb-6">
              <Book className="w-4 h-4" />
              <span>L'Enciclopedia</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
              Knowledge Base{' '}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                intelligente
              </span>
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Crea un portale di supporto self-service dove i tuoi clienti possono trovare 
              risposte immediate alle domande più comuni. Meno ticket, clienti più soddisfatti.
            </p>

            {/* Benefits */}
            <div className="space-y-6">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{benefit.title}</h3>
                    <p className="text-slate-600">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Portal Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden">
              {/* Header */}
              <div className="px-6 py-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Centro Assistenza</h3>
                <p className="text-white/80 mb-4">Come possiamo aiutarti oggi?</p>
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cerca articoli, guide, FAQ..."
                    className="w-full pl-12 pr-4 py-3 rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-white/30"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="px-6 py-4 border-b border-slate-200 flex gap-2 overflow-x-auto">
                {['Tutti', 'Spedizioni', 'Account', 'Pagamenti', 'Prodotti'].map((cat, i) => (
                  <button
                    key={i}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      i === 0
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Articles */}
              <div className="p-6 space-y-3">
                <div className="text-sm font-medium text-slate-500 mb-3">Articoli popolari</div>
                {articles.map((article, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-amber-50 border border-transparent hover:border-amber-200 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-amber-500" />
                      <div>
                        <div className="font-medium text-slate-800 group-hover:text-amber-700 transition-colors">
                          {article.title}
                        </div>
                        <div className="text-xs text-slate-500">{article.category}</div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">
                      {article.views.toLocaleString()} visualizzazioni
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <HelpCircle className="w-4 h-4" />
                  <span>Non trovi quello che cerchi?</span>
                </div>
                <button className="text-amber-600 font-medium text-sm hover:text-amber-700 transition-colors">
                  Contattaci
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
