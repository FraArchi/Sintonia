import { Star, Shield, Award, Clock, MessageCircle, Users, Quote } from 'lucide-react';
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

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function SocialProof() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const stats = [
    { icon: MessageCircle, value: 10000, suffix: '+', label: 'Conversazioni al giorno' },
    { icon: Users, value: 500, suffix: '+', label: 'Aziende ci scelgono' },
    { icon: Star, value: 98, suffix: '%', label: 'Clienti soddisfatti' },
    { icon: Clock, value: 2, suffix: 's', label: 'Tempo medio risposta' },
  ];

  const trustBadges = [
    { icon: Shield, label: 'GDPR Compliant', color: 'from-green-500 to-emerald-500' },
    { icon: Award, label: 'ISO 27001', color: 'from-blue-500 to-cyan-500' },
    { icon: Clock, label: '99.9% Uptime', color: 'from-purple-500 to-indigo-500' },
    { icon: Shield, label: 'SOC 2 Type II', color: 'from-orange-500 to-amber-500' },
  ];

  const testimonials = [
    {
      name: 'Marco Bianchi',
      role: 'CEO, TechStore Italia',
      avatar: 'MB',
      content: 'Sintonia ha trasformato completamente il nostro supporto clienti. Pilota AI gestisce il 65% delle richieste automaticamente, permettendo al team di concentrarsi sui casi più complessi.',
      rating: 5,
    },
    {
      name: 'Laura Rossi',
      role: 'Head of Support, FastFood Delivery',
      avatar: 'LR',
      content: 'L\'integrazione omnicanale è fantastica. Gestiamo WhatsApp, Instagram e email da un\'unica dashboard. I clienti adorano le risposte rapide e il team è più produttivo.',
      rating: 5,
    },
    {
      name: 'Giovanni Verdi',
      role: 'Founder, E-Commerce Hub',
      avatar: 'GV',
      content: 'Il miglior investimento che abbiamo fatto. ROI positivo già dal secondo mese grazie alla riduzione dei ticket e alla maggiore soddisfazione dei clienti.',
      rating: 5,
    },
  ];

  const clientLogos = [
    'TechCorp', 'FastGrow', 'CloudBase', 'DataFlow', 'SmartShop', 'WebScale'
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 items-center justify-center mb-4">
                <stat.icon className="w-7 h-7 text-blue-600" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-20"
        >
          {trustBadges.map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${badge.color} flex items-center justify-center text-white`}>
                <badge.icon className="w-4 h-4" />
              </div>
              <span className="font-semibold text-slate-800">{badge.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Cosa dicono i nostri clienti
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Quote Icon */}
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white">
                  <Quote className="w-5 h-5" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-600 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-slate-500 mb-8">Usato con fiducia da aziende innovative</p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {clientLogos.map((logo, i) => (
              <div
                key={i}
                className="text-2xl font-bold text-slate-300 hover:text-slate-400 transition-colors cursor-default"
              >
                {logo}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
