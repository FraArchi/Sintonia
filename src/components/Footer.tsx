import { Zap, Twitter, Linkedin, Github, Youtube, Globe, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const footerLinks: Record<string, {name: string, href: string, onClick?: (e: React.MouseEvent) => void}[]> = {
    Prodotto: [
      { name: 'Funzionalità', href: '#features' },
      { name: 'Pilota AI', href: '#features' }, // Mapped correctly
      { name: 'Integrazioni', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Changelog', href: '#', onClick: (e) => { e.preventDefault(); window.$chatwoot?.toggleOpened(); } },
    ],
    Risorse: [
      { name: 'Documentazione', href: '#', onClick: (e) => { e.preventDefault(); window.$chatwoot?.toggleOpened(); } },
      { name: 'API Reference', href: '#', onClick: (e) => { e.preventDefault(); window.$chatwoot?.toggleOpened(); } },
      { name: 'Guide', href: '#', onClick: (e) => { e.preventDefault(); window.$chatwoot?.toggleOpened(); } },
      { name: 'Blog', href: '#', onClick: (e) => { e.preventDefault(); window.$chatwoot?.toggleOpened(); } },
      { name: 'Webinar', href: '#', onClick: (e) => { e.preventDefault(); window.$chatwoot?.toggleOpened(); } },
    ],
    Azienda: [
      { name: 'Chi siamo', href: '#', onClick: (e) => { e.preventDefault(); window.$chatwoot?.toggleOpened(); } },
      { name: 'Carriere', href: '#', onClick: (e) => { e.preventDefault(); window.$chatwoot?.toggleOpened(); } },
      { name: 'Partner', href: '#', onClick: (e) => { e.preventDefault(); window.$chatwoot?.toggleOpened(); } },
      { name: 'Contatti', href: '#', onClick: (e) => { e.preventDefault(); window.$chatwoot?.toggleOpened(); } },
      { name: 'Stampa', href: '#', onClick: (e) => { e.preventDefault(); window.$chatwoot?.toggleOpened(); } },
    ],
    Legale: [
      { name: 'Privacy Policy', href: '#', onClick: (e) => { e.preventDefault(); window.$chatwoot?.toggleOpened(); } },
      { name: 'Terms of Service', href: '#', onClick: (e) => { e.preventDefault(); window.$chatwoot?.toggleOpened(); } },
      { name: 'Cookie Policy', href: '#', onClick: (e) => { e.preventDefault(); window.$chatwoot?.toggleOpened(); } },
      { name: 'GDPR', href: '#', onClick: (e) => { e.preventDefault(); window.$chatwoot?.toggleOpened(); } },
      { name: 'Sicurezza', href: '#', onClick: (e) => { e.preventDefault(); window.$chatwoot?.toggleOpened(); } },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/sintonia', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/sintonia', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/sintonia', label: 'GitHub' },
    { icon: Youtube, href: 'https://youtube.com/sintonia', label: 'YouTube' },
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
                  target="_blank"
                  rel="noopener noreferrer"
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
                      onClick={link.onClick}
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
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-slate-400 transition-colors">
                  Tutti i sistemi operativi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
