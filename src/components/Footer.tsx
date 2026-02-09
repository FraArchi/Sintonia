import { Zap, Twitter, Linkedin, Github, Youtube, Globe, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    Prodotto: [
      { name: 'Funzionalità', href: '#features' },
      { name: 'Pilota AI', href: '#pilota' },
      { name: 'Integrazioni', href: '#integrations' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Changelog', href: '#changelog' },
    ],
    Risorse: [
      { name: 'Documentazione', href: '#docs' },
      { name: 'API Reference', href: '#api' },
      { name: 'Guide', href: '#guides' },
      { name: 'Blog', href: '#blog' },
      { name: 'Webinar', href: '#webinar' },
    ],
    Azienda: [
      { name: 'Chi siamo', href: '#about' },
      { name: 'Carriere', href: '#careers' },
      { name: 'Partner', href: '#partners' },
      { name: 'Contatti', href: '#contact' },
      { name: 'Stampa', href: '#press' },
    ],
    Legale: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' },
      { name: 'Sicurezza', href: '#security' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#twitter', label: 'Twitter' },
    { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
    { icon: Github, href: '#github', label: 'GitHub' },
    { icon: Youtube, href: '#youtube', label: 'YouTube' },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Sintonia</span>
            </a>
            <p className="text-slate-400 mb-6 max-w-sm">
              La piattaforma cloud AI-powered per il supporto clienti evoluto. 
              Gestisci tutte le conversazioni da un'unica inbox intelligente.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>hello@sintonia.io</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span>+39 02 1234 5678</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>Milano, Italia</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Sintonia. Tutti i diritti riservati.
            </div>
            <div className="flex items-center gap-6">
              {/* Language Selector */}
              <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
                <Globe className="w-4 h-4" />
                <span>Italiano</span>
              </button>
              {/* Status */}
              <a href="#status" className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-slate-400 hover:text-white transition-colors">
                  Tutti i sistemi operativi
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
