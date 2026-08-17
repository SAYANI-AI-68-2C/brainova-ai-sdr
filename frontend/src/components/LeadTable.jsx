import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Sparkles, 
  Mail, 
  MessageCircle, 
  CalendarCheck, 
  ArrowUpRight, 
  ShieldCheck,
  Zap,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export default function LeadTable({ 
  leads = [], 
  onEnrich, 
  onScore, 
  onOutreach, 
  onSelectLeadForChat, 
  onSchedule, 
  onSyncCRM, 
  onRunAutonomousPipeline,
  onOpenDiscoverModal
}) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DISCOVERED':
        return <span className="badge badge-discovered">Discovered</span>;
      case 'ENRICHED':
        return <span className="badge badge-enriched">AI Enriched</span>;
      case 'SCORED':
        return <span className="badge badge-scored">Scored</span>;
      case 'OUTREACH_SENT':
        return <span className="badge badge-outreach">Outreach Sent</span>;
      case 'IN_CONVERSATION':
        return <span className="badge badge-conversation">In Conversation</span>;
      case 'QUALIFIED':
        return <span className="badge badge-qualified">BANT Qualified</span>;
      case 'MEETING_SCHEDULED':
        return <span className="badge badge-meeting">Meeting Scheduled</span>;
      default:
        return <span className="badge badge-discovered">{status}</span>;
    }
  };

  const filteredLeads = activeFilter === 'ALL' 
    ? leads 
    : leads.filter(l => l.status === activeFilter);

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      {/* Table Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Active Sales Pipeline ({leads.length})</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Autonomous agent workflow with on-demand Algorand x402 execution
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={onOpenDiscoverModal}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            <User size={16} /> + Discover Lead
          </button>

          <button 
            onClick={onRunAutonomousPipeline}
            className="algo-gradient-btn"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem'
            }}
          >
            <Zap size={16} /> Run Full x402 Pipeline (2 ALGO)
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)', marginBottom: '16px' }}>
        {['ALL', 'DISCOVERED', 'ENRICHED', 'SCORED', 'OUTREACH_SENT', 'IN_CONVERSATION', 'MEETING_SCHEDULED'].map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: activeFilter === f ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
              color: activeFilter === f ? '#fff' : 'var(--text-muted)',
              border: activeFilter === f ? '1px solid var(--primary)' : '1px solid transparent'
            }}
          >
            {f.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Leads List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredLeads.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No leads found for this filter. Click "+ Discover Lead" or run the autonomous pipeline!
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div
              key={lead._id || lead.email}
              style={{
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '18px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                
                {/* Left: Lead Profile Info */}
                <div style={{ flex: '1 1 300px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>{lead.fullName}</span>
                    {getStatusBadge(lead.status)}
                    {lead.x402?.isMonetized && (
                      <span className="badge badge-x402" title={`TxID: ${lead.x402.paymentTxId}`}>
                        <ShieldCheck size={12} /> x402 Settled
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-muted)', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Building2 size={14} /> {lead.role} @ <strong style={{ color: '#e2e8f0' }}>{lead.company}</strong>
                    </span>
                    <span>• {lead.industry}</span>
                    <span>• {lead.companySize}</span>
                    <span>• {lead.email}</span>
                  </div>

                  {/* AI Enrichment Snippet */}
                  {lead.enrichedData && (
                    <div style={{ marginTop: '10px', background: 'rgba(56, 189, 248, 0.06)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '8px', padding: '8px 12px', fontSize: '0.8rem' }}>
                      <div style={{ color: '#38bdf8', fontWeight: 600, marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Sparkles size={14} /> AI Enrichment Insights:
                      </div>
                      <div style={{ color: '#cbd5e1' }}>
                        <strong>Pain Points:</strong> {lead.enrichedData.painPoints?.join(', ') || 'N/A'}
                      </div>
                      <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>
                        <strong>Tech Stack:</strong> {lead.enrichedData.techStack?.join(', ') || 'N/A'} | <strong>Funding:</strong> {lead.enrichedData.fundingStage || 'N/A'}
                      </div>
                    </div>
                  )}

                  {/* Meeting Booking Alert */}
                  {lead.meeting?.isBooked && (
                    <div style={{ marginTop: '8px', background: 'rgba(236, 72, 153, 0.08)', border: '1px solid rgba(236, 72, 153, 0.3)', borderRadius: '8px', padding: '6px 12px', fontSize: '0.8rem', color: '#f472b6', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CalendarCheck size={14} />
                      <span>Meeting Confirmed: <strong>{new Date(lead.meeting.scheduledAt).toLocaleDateString()}</strong> via {lead.meeting.meetingUrl}</span>
                    </div>
                  )}
                </div>

                {/* Middle: Scoring */}
                <div style={{ textAlign: 'center', padding: '0 16px', borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Lead Score</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: lead.score >= 80 ? '#10b981' : lead.score >= 60 ? '#f59e0b' : '#94a3b8' }}>
                    {lead.score || '--'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Intent: <strong>{lead.buyingIntent || 'Pending'}</strong>
                  </div>
                </div>

                {/* Right: Step Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '160px' }}>
                  {lead.status === 'DISCOVERED' && (
                    <button
                      onClick={() => onEnrich(lead._id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: 'rgba(56, 189, 248, 0.2)',
                        color: '#38bdf8',
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Sparkles size={14} /> AI Enrich (0.5 ALGO)
                    </button>
                  )}

                  {lead.status === 'ENRICHED' && (
                    <button
                      onClick={() => onScore(lead._id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: 'rgba(168, 85, 247, 0.2)',
                        color: '#c084fc',
                        border: '1px solid rgba(168, 85, 247, 0.4)',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}
                    >
                      Score Lead
                    </button>
                  )}

                  {(lead.status === 'SCORED' || lead.status === 'DISCOVERED') && (
                    <button
                      onClick={() => onOutreach(lead._id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: 'rgba(245, 158, 11, 0.2)',
                        color: '#fbbf24',
                        border: '1px solid rgba(245, 158, 11, 0.4)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Mail size={14} /> Gen Outreach
                    </button>
                  )}

                  <button
                    onClick={() => onSelectLeadForChat(lead)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      background: 'rgba(99, 102, 241, 0.2)',
                      color: '#818cf8',
                      border: '1px solid rgba(99, 102, 241, 0.4)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <MessageCircle size={14} /> Chat Simulator
                  </button>

                  {!lead.meeting?.isBooked && (
                    <button
                      onClick={() => onSchedule(lead._id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: 'rgba(236, 72, 153, 0.15)',
                        color: '#f472b6',
                        border: '1px solid rgba(236, 72, 153, 0.3)',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}
                    >
                      Book Meeting
                    </button>
                  )}

                  {!lead.crmStatus?.hubspotSynced && (
                    <button
                      onClick={() => onSyncCRM(lead._id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: 'rgba(96, 165, 250, 0.15)',
                        color: '#60a5fa',
                        border: '1px solid rgba(96, 165, 250, 0.3)',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}
                    >
                      Sync CRM
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
