import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, User as UserIcon, MessageSquare, Bot, AlertCircle } from 'lucide-react';

interface Conversation {
  id: number;
  userName: string;
  lastMessage: string;
  status: string;
  createdAt: number;
}

interface Message {
  id: number;
  content: string;
  isSender: boolean;
  createdAt: number;
  senderName: string;
}

export default function ConversationsViewer() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  
  const [activeConv, setActiveConv] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState('');

  // 1. Fetch the list of conversations when component mounts
  useEffect(() => {
    async function fetchList() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/conversations`);
        if (res.ok) {
          const data = await res.json();
          setConversations(data);
        } else {
          setError('Impossibile caricare le conversazioni.');
        }
      } catch (e) {
        setError('Errore di connessione al server Proxy.');
      } finally {
        setLoadingList(false);
      }
    }
    fetchList();
  }, []);

  // 2. Fetch specific messages when a conversation is clicked
  useEffect(() => {
    if (!activeConv) return;
    
    async function fetchMessages() {
      setLoadingMessages(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/conversations/${activeConv}/messages`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (e) {
        console.error("Errore fetch messaggi:", e);
      } finally {
        setLoadingMessages(false);
      }
    }
    
    fetchMessages();
  }, [activeConv]);

  return (
    <div className="flex h-full w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      
      {/* LEFT PANE: Conversation List */}
      <div className="w-1/3 border-r border-slate-200 bg-slate-50 flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h2 className="font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            Utenti e Sessioni
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {loadingList ? (
            <div className="p-8 flex justify-center text-slate-400">
               <Activity className="w-6 h-6 animate-pulse" />
            </div>
          ) : error ? (
            <div className="p-8 flex flex-col items-center text-slate-400 text-center text-sm">
               <AlertCircle className="w-8 h-8 text-red-400 mb-2" />
               <p>{error}</p>
            </div>
          ) : conversations.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              Nessuna conversazione trovata.
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {conversations.map(conv => (
                <button 
                  key={conv.id}
                  onClick={() => setActiveConv(conv.id)}
                  className={`w-full text-left p-4 hover:bg-white transition-colors focus:outline-none flex flex-col gap-1
                    ${activeConv === conv.id ? 'bg-white border-l-4 border-blue-500 pl-3' : ''}
                  `}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-semibold text-slate-900 truncate">
                      {conv.userName}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${conv.status === 'open' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'}`}>
                      {conv.status.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 truncate w-full">
                    {conv.lastMessage}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANE: Messages Viewer */}
      <div className="flex-1 flex flex-col bg-white">
        {!activeConv ? (
           <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
             <Bot className="w-12 h-12 mb-4 text-slate-200" />
             <p className="max-w-xs">Seleziona una conversazione dalla lista per leggere il log del bot AI.</p>
           </div>
        ) : (
          <>
            <div className="p-4 border-b border-slate-200 flex justify-between items-center shadow-sm z-10">
               <span className="font-semibold text-slate-900">
                 Log AI - Ticket #{activeConv}
               </span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
               {loadingMessages ? (
                 <div className="w-full flex justify-center py-8">
                   <Activity className="w-6 h-6 animate-pulse text-slate-400" />
                 </div>
               ) : messages.length === 0 ? (
                 <div className="text-center text-slate-400 py-8">Nessun messaggio presente nel log.</div>
               ) : (
                 <AnimatePresence>
                   {messages.map((msg, idx) => {
                      const isAI = msg.isSender; // outgoing means sent by Agent/AI
                      
                      return (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={msg.id || idx}
                          className={`flex gap-3 w-full ${isAI ? 'justify-end' : 'justify-start'}`}
                        >
                          {!isAI && (
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                               <UserIcon className="w-4 h-4 text-slate-500" />
                            </div>
                          )}
                          
                          <div className={`flex flex-col max-w-[70%] ${isAI ? 'items-end' : 'items-start'}`}>
                            <span className="text-xs text-slate-400 mb-1 px-1 font-medium">
                              {msg.senderName}
                            </span>
                            <div className={`p-3 sm:p-4 rounded-2xl text-[15px] shadow-sm whitespace-pre-wrap
                              ${isAI 
                                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-tr-none' 
                                : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'}
                            `}>
                              {msg.content}
                            </div>
                          </div>

                          {isAI && (
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                               <Bot className="w-4 h-4 text-blue-600" />
                            </div>
                          )}
                        </motion.div>
                      );
                   })}
                 </AnimatePresence>
               )}
            </div>
          </>
        )}
      </div>

    </div>
  );
}
