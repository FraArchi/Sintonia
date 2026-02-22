import { motion } from 'framer-motion';
import { useAuth } from '../lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { 
  BarChart3, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Zap,
  Users,
  Activity,
  User as UserIcon
} from 'lucide-react';

declare global {
  interface Window {
    $chatwoot?: {
      toggleOpened: () => void;
    };
  }
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error("Errore durante il logout", error);
    }
  };

  const openChatwoot = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.$chatwoot) {
      window.$chatwoot.toggleOpened();
    }
  };

  const [serverStats, setServerStats] = useState({
    activeConversations: '-',
    supportedUsers: '-',
    responseTime: '-',
    satisfaction: '-'
  });
  
  const [conversations, setConversations] = useState<Array<{
    id: number;
    userName: string;
    lastMessage: string;
    status: string;
    createdAt: number;
  }>>([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [statsRes, convsRes] = await Promise.all([
          fetch('http://localhost:3000/api/stats'),
          fetch('http://localhost:3000/api/conversations')
        ]);
        
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setServerStats(statsData);
        }
        
        if (convsRes.ok) {
          const convsData = await convsRes.json();
          setConversations(convsData);
        }
      } catch (error) {
        console.error("Errore connessione server backend:", error);
      } finally {
        setLoadingStats(false);
      }
    }

    fetchDashboardData();
  }, []);

  const stats = [
    { label: 'Conversazioni Attive', value: serverStats.activeConversations, icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Utenti Supportati', value: serverStats.supportedUsers, icon: Users, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { label: 'Tempo Medio Risp.', value: serverStats.responseTime, icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Soddisfazione', value: serverStats.satisfaction, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-md">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">Sintonia</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-medium transition-colors">
            <BarChart3 className="w-5 h-5" />
            Panoramica
          </a>
          <a 
            href="#" 
            onClick={openChatwoot}
            className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            Apri Inbox Supporto
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" />
            Impostazioni
          </a>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="mb-4 px-4 flex flex-col">
            <span className="text-sm font-semibold text-slate-900 truncate">
              {user?.email || "Utente"}
            </span>
            <span className="text-xs text-slate-500">Admin</span>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 rounded-xl font-medium transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Panoramica</h1>
          
          <div className="flex items-center gap-4">
             <button onClick={openChatwoot} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2">
               <MessageSquare className="w-4 h-4" />
               Vedi Messaggi
             </button>
          </div>
        </header>

        <div className="p-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-sm font-medium text-slate-500 mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              </div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">Attività Recenti</h2>
            </div>
            {loadingStats ? (
              <div className="p-12 flex justify-center text-slate-400">
                <Activity className="w-8 h-8 animate-pulse" />
              </div>
            ) : conversations.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {conversations.map((conv, i) => (
                  <div key={conv.id || i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{conv.userName}</div>
                        <div className="text-sm text-slate-500 mt-1 max-w-sm truncate">{conv.lastMessage}</div>
                      </div>
                    </div>
                    <div>
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Aperta</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 flex flex-col items-center justify-center text-center py-16">
                 <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                   <Activity className="w-8 h-8 text-slate-400" />
                 </div>
                 <h3 className="text-slate-900 font-medium mb-2">Nessuna conversazione ancora.</h3>
                 <p className="text-slate-500 mb-6 max-w-sm">Quando i tuoi utenti ti scriveranno dal widget Inizia Gratis, le richieste appariranno qui tramite Chatwoot.</p>
                 <button onClick={openChatwoot} className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                   Apri Live Chat
                 </button>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
