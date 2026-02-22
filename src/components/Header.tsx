import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Prodotto', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Risorse', href: '#', onClick: (e: React.MouseEvent) => { e.preventDefault(); window.$chatwoot?.toggleOpened(); } },
    { name: 'Azienda', href: '#', onClick: (e: React.MouseEvent) => { e.preventDefault(); window.$chatwoot?.toggleOpened(); } },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/30 transition-shadow">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Sintonia
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={link.onClick}
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://app.sintonia.cloud/app/login"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Accedi
            </a>
            <a
              href="https://app.sintonia.cloud/app/auth/signup"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all"
            >
              Inizia Gratis
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-xl transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-slate-600 hover:text-blue-600 font-medium py-2 transition-colors"
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                if (link.onClick) link.onClick(e);
              }}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <a
              href="https://app.sintonia.cloud/app/login"
              className="block text-center text-slate-600 hover:text-blue-600 font-medium py-2 transition-colors"
            >
              Accedi
            </a>
            <a
              href="https://app.sintonia.cloud/app/auth/signup"
              className="block text-center px-5 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg"
            >
              Inizia Gratis
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
