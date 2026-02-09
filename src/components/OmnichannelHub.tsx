import { Mail, MessageCircle, MessageSquare, Phone, Send, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function OmnichannelHub() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const channels = [
    { icon: MessageCircle, name: 'Live Chat', color: 'from-blue-500 to-blue-600' },
    { icon: Mail, name: 'Email', color: 'from-red-400 to-red-500' },
    { icon: () => (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ), name: 'WhatsApp', color: 'from-green-500 to-green-600' },
    { icon: Send, name: 'Telegram', color: 'from-sky-400 to-sky-500' },
    { icon: Facebook, name: 'Facebook', color: 'from-blue-600 to-blue-700' },
    { icon: Instagram, name: 'Instagram', color: 'from-pink-500 to-purple-600' },
    { icon: Twitter, name: 'Twitter/X', color: 'from-slate-700 to-slate-800' },
    { icon: Phone, name: 'SMS', color: 'from-amber-500 to-orange-500' },
    { icon: MessageSquare, name: 'Line', color: 'from-green-400 to-green-500' },
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6">
            <MessageSquare className="w-4 h-4" />
            <span>Hub Omnicanale</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
            Tutte le conversazioni in{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              un'unica inbox
            </span>
          </h2>
          <p className="text-lg text-slate-600">
            Gestisci tutti i canali di comunicazione da una sola piattaforma intelligente. 
            Mai più conversazioni perse o clienti che aspettano.
          </p>
        </motion.div>

        {/* Channels Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 mb-16"
        >
          {channels.map((channel, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.05 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="group"
            >
              <div className="flex flex-col items-center p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${channel.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                  <channel.icon className="w-7 h-7" />
                </div>
                <span className="text-sm font-medium text-slate-700 text-center">{channel.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Inbox Visual */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden">
            {/* Window Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-100 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-sm font-medium text-slate-600">Inbox Unificata</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                  5 nuovi messaggi
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 grid md:grid-cols-3 gap-6">
              {/* Channels Sidebar */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Canali</div>
                {[
                  { name: 'WhatsApp', count: 12, color: 'bg-green-500' },
                  { name: 'Email', count: 8, color: 'bg-red-400' },
                  { name: 'Live Chat', count: 5, color: 'bg-blue-500' },
                  { name: 'Instagram', count: 3, color: 'bg-pink-500' },
                ].map((ch, i) => (
                  <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${i === 0 ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50'} cursor-pointer transition-colors`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${ch.color}`} />
                      <span className="text-sm font-medium text-slate-700">{ch.name}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 text-xs font-medium">
                      {ch.count}
                    </span>
                  </div>
                ))}
              </div>

              {/* Messages List */}
              <div className="md:col-span-2 space-y-3">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Conversazioni Recenti</div>
                {[
                  { name: 'Marco Rossi', message: 'Grazie per la risposta veloce!', time: '2 min', channel: 'WhatsApp', avatar: 'M', unread: true },
                  { name: 'Laura Bianchi', message: 'Quando sarà disponibile il prodotto?', time: '5 min', channel: 'Email', avatar: 'L', unread: true },
                  { name: 'Giovanni Verdi', message: 'Ho ricevuto il rimborso, perfetto!', time: '15 min', channel: 'Chat', avatar: 'G', unread: false },
                ].map((msg, i) => (
                  <div key={i} className={`flex items-center gap-4 p-4 rounded-xl ${msg.unread ? 'bg-blue-50 border border-blue-100' : 'bg-slate-50'} cursor-pointer hover:shadow-md transition-all`}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                      {msg.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800">{msg.name}</span>
                        <span className="text-xs text-slate-500">{msg.time}</span>
                      </div>
                      <p className="text-sm text-slate-600 truncate">{msg.message}</p>
                    </div>
                    <span className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded-full">{msg.channel}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
