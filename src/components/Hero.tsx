import { ArrowRight, Play, Sparkles, MessageSquare, Bot, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-cyan-50/30" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 font-medium text-sm mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>Potenziato da Intelligenza Artificiale</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Il futuro del{' '}
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                supporto clienti
              </span>{' '}
              è arrivato
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Piattaforma cloud AI-powered, pronta all'uso. Gestisci tutte le conversazioni 
              da un'unica inbox intelligente con <strong className="text-blue-600">Pilota</strong>, 
              il tuo agente AI che risolve fino al 60% dei ticket automaticamente.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
                >
                  Inizia Gratis
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.a
                href="#demo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-slate-200 bg-white/80 backdrop-blur text-slate-700 font-semibold text-lg hover:border-blue-300 hover:bg-blue-50/50 transition-all"
              >
                <Play className="w-5 h-5 text-blue-600" />
                Vedi Demo
              </motion.a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>14 giorni gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Nessuna carta richiesta</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Setup in 5 minuti</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main Dashboard Mockup */}
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden">
              {/* Browser Bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-md px-3 py-1.5 text-sm text-slate-400 border border-slate-200">
                    app.sintonia.io/inbox
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 space-y-4">
                {/* Header Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">Inbox Unificata</div>
                      <div className="text-xs text-slate-500">12 conversazioni attive</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      Online
                    </div>
                  </div>
                </div>

                {/* Chat List */}
                <div className="space-y-3">
                  {[
                    { name: 'Marco R.', message: 'Ho bisogno di aiuto con l\'ordine...', channel: 'WhatsApp', time: '2m', ai: true },
                    { name: 'Laura S.', message: 'Quando arriverà il mio pacco?', channel: 'Email', time: '5m', ai: false },
                    { name: 'Giovanni T.', message: 'Vorrei un rimborso per...', channel: 'Chat', time: '12m', ai: true },
                  ].map((chat, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                        i === 0 ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center font-medium text-slate-600">
                        {chat.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-800">{chat.name}</span>
                          {chat.ai && (
                            <span className="px-1.5 py-0.5 rounded bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-medium flex items-center gap-1">
                              <Bot className="w-3 h-3" />
                              AI
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 truncate">{chat.message}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">{chat.time}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1 justify-end mt-1">
                          <MessageSquare className="w-3 h-3" />
                          {chat.channel}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating AI Assistant Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-6 -left-6 z-20 bg-white rounded-xl shadow-xl border border-slate-200 p-4 max-w-xs"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800 flex items-center gap-2">
                    Pilota AI
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    Ho risposto automaticamente a 3 ticket nell'ultima ora 🚀
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute -top-4 -right-4 z-20 bg-white rounded-xl shadow-xl border border-slate-200 p-4"
            >
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  -60%
                </div>
                <div className="text-xs text-slate-500 mt-1">Ticket manuali</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
