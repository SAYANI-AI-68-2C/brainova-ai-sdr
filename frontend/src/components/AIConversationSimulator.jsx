import React, { useState } from 'react';
import { MessageSquareCode, Send, Bot, User, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AIConversationSimulator({ selectedLead, onSendMessage, onBack }) {
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    "We don't have the budget for an SDR software right now.",
    "Can you send more info about how Algorand x402 works?",
    "Sounds great! Can we schedule a demo for Thursday?",
    "We're currently using a traditional sales agency."
  ];

  const handleSend = async (textToSend) => {
    const msg = textToSend || inputMessage;
    if (!msg.trim() || !selectedLead) return;
    setLoading(true);
    setInputMessage('');
    try {
      await onSendMessage(selectedLead._id, msg);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedLead) {
    return (
      <div className="glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
        <MessageSquareCode size={48} style={{ color: 'var(--primary)', marginBottom: '12px' }} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Select a Lead to Test AI Conversation Handling</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>
          Choose a lead from the pipeline above to test multi-turn NLP dialogue, objection handling, and autonomous booking.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel glow-border" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '620px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <Bot size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              AI SDR NLP Live Conversation with <span style={{ color: '#00f0ff' }}>{selectedLead.fullName}</span>
            </h3>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              {selectedLead.role} @ {selectedLead.company} ({selectedLead.industry})
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="badge badge-conversation">
            <span className="pulse-dot" /> Live Multi-Agent NLP
          </span>
          <button 
            onClick={onBack}
            style={{ background: 'rgba(255, 255, 255, 0.08)', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem' }}
          >
            Close Chat
          </button>
        </div>
      </div>

      {/* Messages Thread */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '6px', marginBottom: '16px' }}>
        {selectedLead.conversations && selectedLead.conversations.length > 0 ? (
          selectedLead.conversations.map((msg, index) => {
            const isAgent = msg.sender === 'agent';
            return (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: isAgent ? 'flex-start' : 'flex-end',
                  alignItems: 'flex-start',
                  gap: '8px'
                }}
              >
                {isAgent && (
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', flexShrink: 0 }}>
                    <Bot size={16} />
                  </div>
                )}

                <div style={{
                  maxWidth: '75%',
                  background: isAgent ? 'rgba(30, 41, 59, 0.9)' : 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                  border: isAgent ? '1px solid rgba(99, 102, 241, 0.3)' : 'none',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  lineHeight: '1.4'
                }}>
                  <div>{msg.text}</div>
                  
                  {isAgent && msg.detectedObjection && (
                    <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertCircle size={12} /> Detected Objection: <strong>{msg.detectedObjection}</strong>
                    </div>
                  )}

                  {isAgent && msg.sentiment && (
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                      Sentiment: <span style={{ color: '#38bdf8' }}>{msg.sentiment}</span>
                    </div>
                  )}
                </div>

                {!isAgent && (
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', flexShrink: 0 }}>
                    <User size={16} />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', margin: 'auto' }}>
            <p>No conversation history yet. Send a simulated message below to test the AI Agent!</p>
          </div>
        )}
      </div>

      {/* Quick Objection Presets */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '8px' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', alignSelf: 'center', whiteSpace: 'nowrap' }}>
          Simulate Lead:
        </span>
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-muted)',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap'
            }}
          >
            "{q.substring(0, 32)}..."
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text"
          placeholder="Type message as lead to test SDR agent objection handling..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={loading}
          style={{ flex: 1 }}
        />
        <button
          onClick={() => handleSend()}
          disabled={loading}
          className="primary-gradient"
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {loading ? 'Analyzing...' : <><Send size={16} /> Send</>}
        </button>
      </div>
    </div>
  );
}
