import { ArrowRight, Sparkles, Zap, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const benefits = [
    '14 giorni di prova gratuita',
    'Nessuna carta di credito',
    'Setup in 5 minuti',
    'Supporto dedicato',
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white font-medium text-sm mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>Inizia oggi, gratis</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Pronto a rivoluzionare il tuo{' '}
            <span className="text-cyan-300">supporto clienti</span>?
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Unisciti a oltre 500 aziende che hanno già trasformato il modo di gestire 
            le conversazioni con i clienti. Pilota AI ti aspetta.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-blue-600 font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow"
              >
                <Zap className="w-5 h-5" />
                Inizia la Prova Gratuita
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.a
              href="#demo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 backdrop-blur-sm transition-all"
            >
              Richiedi una Demo
            </motion.a>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-2 text-white/90"
              >
                <CheckCircle className="w-5 h-5 text-cyan-300" />
                <span className="font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
