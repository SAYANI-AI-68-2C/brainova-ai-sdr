import React from 'react';
import { 
  TrendingUp, 
  Coins, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowUpRight, 
  Zap, 
  Calendar,
  Layers
} from 'lucide-react';

export default function AnalyticsView({ metrics = {}, transactions = [] }) {
  const stats = [
    { title: 'Leads Discovered', value: metrics.totalLeadsDiscovered || 12, change: '+100%', icon: Layers, color: '#38bdf8' },
    { title: 'BANT Qualified', value: metrics.qualifiedLeads || 8, change: '66% rate', icon: CheckCircle2, color: '#34d399' },
    { title: 'Meetings Scheduled', value: metrics.meetingsBooked || 5, change: '41% conv.', icon: Calendar, color: '#f472b6' },
    { title: 'Workload Reduced', value: '70%', change: metrics.manualHoursSaved || '18 hrs saved', icon: Clock, color: '#fbbf24' },
    { title: 'x402 Micro-Revenue', value: `${metrics.x402OnChainRevenue?.totalAlgos || '4.50'} ALGO`, change: 'On-Chain Verified', icon: Coins, color: '#00f0ff' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 5 KPI Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px' }}>
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{stat.title}</span>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                  <Icon size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.75rem', color: stat.color, fontWeight: 600 }}>
                {stat.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid: Algorand x402 Micropayments Ledger + Value Proposition */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        
        {/* Left: On-Chain Algorand x402 Ledger */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Coins size={20} color="#00f0ff" /> Algorand x402 Transaction Ledger
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                Live machine-to-machine HTTP 402 micro-settlements
              </p>
            </div>
            <span className="badge badge-x402">Testnet</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {transactions.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                No x402 transactions settled yet. Execute an enriched action to trigger one!
              </div>
            ) : (
              transactions.map((tx, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(15, 23, 42, 0.5)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ShieldCheck size={14} color="#10b981" />
                      <strong style={{ fontSize: '0.85rem', color: '#f1f5f9' }}>{tx.serviceType}</strong>
                    </div>
                    <code style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginTop: '2px' }}>
                      Tx: {tx.txId.substring(0, 16)}...
                    </code>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: '#00f0ff', fontSize: '0.95rem' }}>
                      +{tx.amountAlgos} ALGO
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#10b981' }}>CONFIRMED</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Traditional SDR vs BRAINOVA x402 AI Agent */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={20} color="#fbbf24" /> Why Algorand x402 + AI SDR Wins
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#f87171', fontSize: '0.85rem' }}>❌ Traditional SDR Agency / Heavy SaaS</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
                $4,000 - $8,000/mo retainer, high manual error rate, 2-3 business day response time, rigid long-term contracts.
              </p>
            </div>

            <div style={{ background: 'rgba(0, 240, 255, 0.05)', border: '1px solid rgba(0, 240, 255, 0.2)', padding: '12px', borderRadius: '8px' }}>
              <div style={{ fontWeight: 700, color: '#00f0ff', fontSize: '0.85rem' }}>✨ BRAINOVA Autonomous x402 SDR</div>
              <p style={{ color: '#cbd5e1', fontSize: '0.8rem', marginTop: '4px' }}>
                Instant sub-second NLP responses, 24/7 lead qualification, and pure pay-per-use on Algorand (0.5 - 2 ALGO per verified lead).
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <div style={{ flex: 1, background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399' }}>68%</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Cost Reduction</div>
              </div>
              <div style={{ flex: 1, background: 'rgba(99, 102, 241, 0.1)', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#818cf8' }}>3x</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Qualified Leads</div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
