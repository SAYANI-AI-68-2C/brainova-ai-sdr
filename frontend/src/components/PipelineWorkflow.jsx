import React from 'react';
import { 
  Compass, 
  Cpu, 
  Target, 
  Send, 
  MessageSquareCode, 
  CheckCircle2, 
  Calendar, 
  Database, 
  BarChart3, 
  Coins,
  ChevronRight
} from 'lucide-react';

const steps = [
  { id: 1, title: 'Lead Discovery', icon: Compass, desc: 'Scrapes & normalizes high-intent B2B target profiles', tag: 'Data Ingestion', color: '#94a3b8' },
  { id: 2, title: 'AI Enrichment', icon: Cpu, desc: 'Extracts tech stacks, pain points & ICP rating', tag: 'x402: 0.5 ALGO', color: '#38bdf8' },
  { id: 3, title: 'Lead Scoring', icon: Target, desc: 'ML-weighted intent score & decision-maker ranking', tag: 'Predictive ML', color: '#c084fc' },
  { id: 4, title: 'Personalized Outreach', icon: Send, desc: 'Context-tailored cold email & WhatsApp generation', tag: 'LLM Synthesis', color: '#fbbf24' },
  { id: 5, title: 'AI Conversation', icon: MessageSquareCode, desc: 'Autonomous multi-turn NLP & objection handling', tag: 'Active NLP', color: '#818cf8' },
  { id: 6, title: 'Lead Qualification', icon: CheckCircle2, desc: 'BANT criteria scoring & buying readiness validation', tag: 'Funnel Filter', color: '#34d399' },
  { id: 7, title: 'Meeting Scheduling', icon: Calendar, desc: 'Autonomous calendar booking via Calendly/Google Meet', tag: 'Conversion', color: '#f472b6' },
  { id: 8, title: 'CRM Update', icon: Database, desc: 'Real-time sync to HubSpot, Salesforce & DB', tag: 'Sync Loop', color: '#60a5fa' },
  { id: 9, title: 'Analytics', icon: BarChart3, desc: 'Pipeline performance tracking & ROI analytics', tag: 'Intelligence', color: '#e879f9' },
  { id: 10, title: 'x402 Monetization', icon: Coins, desc: 'Instant HTTP 402 micro-settlement on Algorand', tag: 'On-Chain Web3', color: '#00f0ff' }
];

export default function PipelineWorkflow({ activeStep = 10, onStepClick }) {
  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="algo-gradient-text">Autonomous 10-Step SDR Agent Pipeline</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            End-to-end sales automation orchestrated by BRAINOVA AI and settled over Algorand x402
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="badge badge-x402">
            <Coins size={14} /> Algorand x402 Enabled
          </span>
        </div>
      </div>

      {/* 10-Step Horizontal Scrollable / Responsive Pipeline Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
        gap: '12px' 
      }}>
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isHighlight = step.id === 10 || step.id === 2;
          return (
            <div 
              key={step.id}
              onClick={() => onStepClick && onStepClick(step.id)}
              style={{
                background: isHighlight ? 'rgba(0, 240, 255, 0.05)' : 'rgba(15, 23, 42, 0.5)',
                border: isHighlight ? '1px solid rgba(0, 240, 255, 0.35)' : '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = step.color;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isHighlight ? 'rgba(0, 240, 255, 0.35)' : 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: `${step.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: step.color
                }}>
                  <Icon size={18} />
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-dim)' }}>
                  0{step.id}
                </span>
              </div>

              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>
                {step.title}
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.3', marginBottom: '10px', minHeight: '32px' }}>
                {step.desc}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ 
                  fontSize: '0.7rem', 
                  fontWeight: 600, 
                  color: step.color,
                  background: `${step.color}15`,
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}>
                  {step.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
