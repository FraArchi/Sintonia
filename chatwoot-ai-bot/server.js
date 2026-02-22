const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const { OpenAI } = require('openai');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI client pointing to OpenRouter
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://sintonia.cloud", 
    "X-Title": "Sintonia AI Chatwoot Integration", 
  }
});

// Helper Function: Send message back to Chatwoot
async function sendToChatwoot(conversationId, accountId, message) {
  try {
    const url = `${process.env.CHATWOOT_BASE_URL}/api/v1/accounts/${accountId}/conversations/${conversationId}/messages`;
    
    await axios.post(
      url,
      {
        content: message,
        message_type: 'outgoing', // outgoing = sent by agents/admins/bots
        private: false // visible to the end user
      },
      {
        headers: {
          'api_access_token': process.env.CHATWOOT_API_TOKEN,
          'Content-Type': 'application/json'
        },
      }
    );
    console.log(`✅ Risposta inviata alla conversazione ${conversationId}`);
  } catch (error) {
    console.error(`❌ Errore durante l'invio della risposta a Chatwoot:`, error?.response?.data || error.message);
  }
}

// System prompt per dare il `ruolo` al bot
const SYSTEM_PROMPT = `
Sei l'assistente virtuale del servizio clienti di "Sintonia", 
una moderna piattaforma. Il tuo compito è rispondere agli utenti in italiano, 
in modo educato, conciso e super professionale.
Non includere mai formattazione markdown complessa (come bold/header), sii colloquiale come in una vera chat.
`;

// ============================================================================
// DASHBOARD PROXY ENDPOINTS
// ============================================================================
// Securely fetch data from Chatwoot API without exposing the Token to the React frontend

app.get('/api/stats', async (req, res) => {
  try {
    const accountId = 1; 

    // Fetch conversation statistics from Chatwoot
    const response = await axios.get(
      `${process.env.CHATWOOT_BASE_URL}/api/v1/accounts/${accountId}/conversations?status=open`,
      {
        headers: {
          'api_access_token': process.env.CHATWOOT_API_TOKEN,
        },
      }
    );

    const openConversations = response.data.data.meta.mine_count + response.data.data.meta.unassigned_count;

    // Build enhanced stat object to show AI value
    // Note: In a production db we'd query actual AI message counts. Here we proxy/estimate for the MVP dashboard.
    res.json({
      activeConversations: openConversations || 0,
      aiMessagesHandled: 342, // Mocked for Proof-of-Value
      hoursSaved: '14.5h',    // Mocked for Proof-of-Value
      satisfaction: '98%'
    });

  } catch (error) {
    console.error('Error fetching stats:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

app.get('/api/conversations', async (req, res) => {
  try {
    const accountId = 1;
    // Fetch all conversations (open and closed) to populate the AI log viewer
    const response = await axios.get(
      `${process.env.CHATWOOT_BASE_URL}/api/v1/accounts/${accountId}/conversations`,
      {
        headers: {
          'api_access_token': process.env.CHATWOOT_API_TOKEN,
        },
      }
    );

    const conversations = response.data.data.payload.map(conv => ({
      id: conv.id,
      userName: conv.meta.sender.name || 'Utente Sconosciuto',
      lastMessage: conv.messages.length > 0 ? conv.messages[conv.messages.length - 1].content : 'Nessun messaggio',
      status: conv.status,
      createdAt: conv.created_at
    }));

    res.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

// Nuovo Endpoint: Fetch messages for a specific conversation
app.get('/api/conversations/:id/messages', async (req, res) => {
  try {
    const accountId = 1;
    const conversationId = req.params.id;
    
    const response = await axios.get(
      `${process.env.CHATWOOT_BASE_URL}/api/v1/accounts/${accountId}/conversations/${conversationId}/messages`,
      {
        headers: {
          'api_access_token': process.env.CHATWOOT_API_TOKEN,
        },
      }
    );

    // Filter and map messages for the React Viewer
    // We want to distinguish between the User (incoming) and the AI (outgoing)
    const messages = response.data.payload.map(msg => ({
      id: msg.id,
      content: msg.content,
      isSender: msg.message_type === 0, // 0 = incoming (User), 1 = outgoing (Agent/AI)
      createdAt: msg.created_at,
      senderName: msg.message_type === 0 ? (msg.sender?.name || 'Utente') : 'Sintonia AI'
    })).reverse(); // Reverse to show oldest first, typical chat flow

    res.json(messages);
  } catch (error) {
    console.error(`Error fetching messages for conv ${req.params.id}:`, error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// ============================================================================
// CHATWOOT WEBHOOK ENDPOINT
// ============================================================================

// A simple GET endpoint to verify the server is running when opened in a browser
app.get('/', (req, res) => {
  res.send('✅ Sintonia AI Bot is running. Please configure Chatwoot to send POST webhooks to /webhook/chatwoot');
});

// A simple GET endpoint for the webhook URL to prevent browser "Cannot GET" errors
app.get('/webhook/chatwoot', (req, res) => {
  res.send('✅ Webhook endpoint is active. Chatwoot will use POST requests here.');
});

// The actual POST endpoint that Chatwoot calls when a message is sent
app.post('/webhook/chatwoot', async (req, res) => {
  try {
    const payload = req.body;
    
    // 1️⃣ Verifichiamo che sia un messaggio *in arrivo* (incoming) da un utente reale
    // Ignoriamo i messaggi creati dal bot stesso (outgoing) o eventi diversi (come un agente che entra in chat)
    if (payload.event !== 'message_created') {
      return res.status(200).send('Non è un nuovo messaggio.');
    }

    if (payload.message_type !== 'incoming') {
      return res.status(200).send('Messaggio non processato (è outgoing o di sistema).');
    }

    // 2️⃣ Estraiamo i dati della conversazione
    const conversationId = payload.conversation.id;
    const accountId = payload.account.id;
    const userMessage = payload.content;
    const senderName = payload.sender?.name || 'Utente';

    console.log(`📩 Nuovo messaggio da ${senderName} [Conv: ${conversationId}]: ${userMessage}`);

    // Rispondi a Chatwoot subito per non far fare timeout al Webhook (Chatwoot richiede risposta al webhook entropochi secondi)
    res.status(200).send('Webhook ricevuto, elaborazione in corso...');

    // 3️⃣ Facciamo la richiesta al LLM via OpenRouter
    const response = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || 'meta-llama/llama-3-8b-instruct:free',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    const aiReply = response.choices[0].message.content;
    console.log(`🤖 Risposta AI generata per [Conv: ${conversationId}]`);

    // 4️⃣ Ritorna il messaggio dentro la chat su Chatwoot
    await sendToChatwoot(conversationId, accountId, aiReply);

  } catch (error) {
    console.error('❌ Errore generale nel Webhook:', error.message);
    if (!res.headersSent) {
      res.status(500).send('Internal Server Error');
    }
  }
});

// Porta del server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Chatwoot AI Bot in esecuzione sulla porta ${PORT}`);
  console.log(`🌐 Endpoint Webhook: http://localhost:${PORT}/webhook/chatwoot`);
  console.log(`🧠 LLM Provider: OpenRouter (${process.env.OPENROUTER_MODEL})`);
});
