import { motion } from 'framer-motion';
import { useAuth } from '../lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  MessageSquare, 
  LogOut, 
  Zap,
  Users,
  Activity
} from 'lucide-react';
import ConversationsViewer from '../components/dashboard/ConversationsViewer';

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

  const [activeTab, setActiveTab] = useState<'overview' | 'conversations'>('overview');
  
  const [serverStats, setServerStats] = useState({
    activeConversations: '-',
    supportedUsers: '-',
    responseTime: '-',
    satisfaction: '-',
    aiMessagesHandled: '-',
    hoursSaved: '-'
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/stats`);
        if (res.ok) {
          const data = await res.json();
          setServerStats(data);
        }
      } catch (error) {
        console.error("Errore fetch stats:", error);
      }
    }
    fetchStats();
  }, []);

  const stats = [
    { label: 'Conversazioni Attive', value: serverStats.activeConversations, icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Msgs Gestiti (AI)', value: serverStats.aiMessagesHandled, icon: Zap, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { label: 'Ore Risparmiate', value: serverStats.hoursSaved, icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Soddisfazione', value: serverStats.satisfaction, icon: Users, color: 'text-amber-500', bg: 'bg-amber-50' }
  ];

  const renderOverview = () => (
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
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-transparent">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Sintonia AI in Azione</h2>
            <p className="text-sm text-slate-500">Il tuo assistente sta gestendo i volumi per te.</p>
          </div>
          <Zap className="w-6 h-6 text-blue-500" />
        </div>
        <div className="p-6 text-center text-slate-600">
          <p>L'Intelligenza Artificiale risponde immediatamente alle domande frequenti, riducendo il tempo di attesa a 0 secondi.</p>
        </div>
      </motion.div>
    </div>
  );

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
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <BarChart3 className="w-5 h-5" />
            Panoramica
          </button>
          <button 
            onClick={() => setActiveTab('conversations')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'conversations' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <MessageSquare className="w-5 h-5" />
            Log Intelligenza Artificiale
          </button>
          <button 
            onClick={openChatwoot}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors"
          >
            <Zap className="w-5 h-5" />
            Apri Inbox Supporto
          </button>
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
      <main className="flex-1 overflow-y-auto flex flex-col">
        <header className="bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between shrink-0">
          <h1 className="text-2xl font-bold text-slate-900">
            {activeTab === 'overview' ? 'Panoramica Sintonia AI' : 'Log Conversazioni AI'}
          </h1>
          
          <div className="flex items-center gap-4">
             <button onClick={openChatwoot} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2">
               <MessageSquare className="w-4 h-4" />
               Rispondi Manualmente
             </button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
           {activeTab === 'overview' && renderOverview()}
           {activeTab === 'conversations' && (
              <div className="w-full h-full p-6 bg-slate-100">
                <ConversationsViewer />
              </div>
           )}
        </div>
      </main>
    </div>
  );
}
