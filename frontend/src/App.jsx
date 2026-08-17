import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Bot, 
  Coins, 
  Layers, 
  MessageSquareCode, 
  BarChart3, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Zap, 
  RefreshCw,
  PlusCircle,
  ExternalLink
} from 'lucide-react';

import PipelineWorkflow from './components/PipelineWorkflow';
import LeadTable from './components/LeadTable';
import AIConversationSimulator from './components/AIConversationSimulator';
import X402PaywallModal from './components/X402PaywallModal';
import AnalyticsView from './components/AnalyticsView';

export default function App() {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [leads, setLeads] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  
  // x402 Modal state
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [x402Challenge, setX402Challenge] = useState(null);

  // Discover Lead Modal
  const [discoverModalOpen, setDiscoverModalOpen] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    fullName: '',
    role: '',
    company: '',
    email: '',
    industry: 'Technology / SaaS',
    companySize: '50-200'
  });

  const [loading, setLoading] = useState(false);

  // Load Initial Data
  const fetchData = async () => {
    try {
      const [leadsRes, metricsRes, txRes] = await Promise.allSettled([
        axios.get('/api/v1/sdr/leads'),
        axios.get('/api/v1/sdr/analytics'),
        axios.get('/api/v1/x402/transactions')
      ]);

      if (leadsRes.status === 'fulfilled' && leadsRes.value.data.leads) {
        setLeads(leadsRes.value.data.leads);
        if (!selectedLead && leadsRes.value.data.leads.length > 0) {
          setSelectedLead(leadsRes.value.data.leads[0]);
        }
      }

      if (metricsRes.status === 'fulfilled' && metricsRes.value.data.metrics) {
        setMetrics(metricsRes.value.data.metrics);
      }

      if (txRes.status === 'fulfilled' && txRes.value.data.transactions) {
        setTransactions(txRes.value.data.transactions);
      }
    } catch (err) {
      console.warn('Backend connection note:', err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Action: Step 2 - AI Enrich (With x402 flow)
  const handleEnrich = async (leadId, txId = null) => {
    try {
      const config = txId ? { headers: { 'X-402-Payment': txId } } : {};
      const res = await axios.post(`/api/v1/sdr/enrich/${leadId}`, {}, config);
      await fetchData();
      if (selectedLead && selectedLead._id === leadId) {
        setSelectedLead(res.data.lead);
      }
    } catch (err) {
      if (err.response?.status === 402) {
        setX402Challenge(err.response.data);
        setPendingAction({ type: 'ENRICH', leadId });
        setPaywallOpen(true);
      } else {
        alert('Error: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  // Action: Step 3 - Score
  const handleScore = async (leadId) => {
    try {
      const res = await axios.post(`/api/v1/sdr/score/${leadId}`);
      await fetchData();
      if (selectedLead && selectedLead._id === leadId) {
        setSelectedLead(res.data.lead);
      }
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  // Action: Step 4 - Outreach
  const handleOutreach = async (leadId) => {
    try {
      const res = await axios.post(`/api/v1/sdr/outreach/${leadId}`);
      await fetchData();
      if (selectedLead && selectedLead._id === leadId) {
        setSelectedLead(res.data.lead);
      }
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  // Action: Step 5 - Conversation Chat
  const handleSendMessage = async (leadId, userMessage) => {
    try {
      const res = await axios.post(`/api/v1/sdr/conversation/${leadId}`, { userMessage });
      await fetchData();
      if (selectedLead && selectedLead._id === leadId) {
        setSelectedLead(res.data.lead);
      }
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  // Action: Step 7 - Schedule Meeting
  const handleSchedule = async (leadId) => {
    try {
      const res = await axios.post(`/api/v1/sdr/schedule/${leadId}`, {});
      await fetchData();
      if (selectedLead && selectedLead._id === leadId) {
        setSelectedLead(res.data.lead);
      }
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  // Action: Step 8 - CRM Sync
  const handleSyncCRM = async (leadId) => {
    try {
      const res = await axios.post(`/api/v1/sdr/crm-sync/${leadId}`);
      await fetchData();
      if (selectedLead && selectedLead._id === leadId) {
        setSelectedLead(res.data.lead);
      }
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  // Action: Step 10 - Run Full Autonomous Pipeline (x402 protected)
  const handleRunAutonomousPipeline = async (txId = null) => {
    try {
      const config = txId ? { headers: { 'X-402-Payment': txId } } : {};
      const res = await axios.post('/api/v1/sdr/autonomous-pipeline', {}, config);
      await fetchData();
      alert(' Autonomous Pipeline executed successfully and verified via Algorand x402!');
    } catch (err) {
      if (err.response?.status === 402) {
        setX402Challenge(err.response.data);
        setPendingAction({ type: 'FULL_PIPELINE' });
        setPaywallOpen(true);
      } else {
        alert('Error: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  // Handle successful x402 payment confirmation from modal
  const handleConfirmPaywallPayment = async (txId) => {
    setPaywallOpen(false);
    if (!pendingAction) return;

    if (pendingAction.type === 'ENRICH') {
      await handleEnrich(pendingAction.leadId, txId);
    } else if (pendingAction.type === 'FULL_PIPELINE') {
      await handleRunAutonomousPipeline(txId);
    }
    setPendingAction(null);
  };

  // Create new discovered lead
  const handleCreateLead = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/v1/sdr/discover', newLeadForm);
      setDiscoverModalOpen(false);
      setNewLeadForm({
        fullName: '',
        role: '',
        company: '',
        email: '',
        industry: 'Technology / SaaS',
        companySize: '50-200'
      });
      fetchData();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 20px' }}>
      
      {/* Top Navigation Bar */}
      <header className="glass-panel" style={{ padding: '16px 24px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #00f0ff 0%, #6366f1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#050a15',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)'
          }}>
            <Bot size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                BRAINOVA <span className="algo-gradient-text">AI SDR AGENT</span>
              </h1>
              <span className="badge badge-x402">Algorand x402</span>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>InnoFusion 3.0 Track: <strong>x402-Powered Applications</strong></span>
              <span>•</span>
              <span>Institute of Engineering & Management (IEM), Kolkata</span>
            </div>
          </div>
        </div>

        {/* Right Status & Wallet */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.82rem'
          }}>
            <span className="pulse-dot" />
            <span style={{ color: 'var(--text-muted)' }}>Algorand Testnet:</span>
            <strong style={{ color: '#00f0ff' }}>Node Active</strong>
          </div>

          <button
            onClick={fetchData}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#fff',
              padding: '8px 12px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem'
            }}
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </header>

      {/* 10-Step Interactive Visual Funnel */}
      <PipelineWorkflow 
        onStepClick={(stepId) => {
          if (stepId === 5) setActiveTab('chat');
          else if (stepId === 9 || stepId === 10) setActiveTab('analytics');
          else setActiveTab('pipeline');
        }}
      />

      {/* Main Tabs Navigation */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('pipeline')}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            fontSize: '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: activeTab === 'pipeline' ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'rgba(15, 23, 42, 0.6)',
            color: activeTab === 'pipeline' ? '#fff' : 'var(--text-muted)',
            border: activeTab === 'pipeline' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid var(--border-color)'
          }}
        >
          <Layers size={18} /> Active SDR Pipeline
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            fontSize: '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: activeTab === 'chat' ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'rgba(15, 23, 42, 0.6)',
            color: activeTab === 'chat' ? '#fff' : 'var(--text-muted)',
            border: activeTab === 'chat' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid var(--border-color)'
          }}
        >
          <MessageSquareCode size={18} /> NLP Chat & Objection Simulator
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            fontSize: '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: activeTab === 'analytics' ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'rgba(15, 23, 42, 0.6)',
            color: activeTab === 'analytics' ? '#fff' : 'var(--text-muted)',
            border: activeTab === 'analytics' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid var(--border-color)'
          }}
        >
          <BarChart3 size={18} /> Funnel Analytics & x402 Ledger
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'pipeline' && (
        <LeadTable 
          leads={leads}
          onEnrich={(id) => handleEnrich(id)}
          onScore={handleScore}
          onOutreach={handleOutreach}
          onSelectLeadForChat={(lead) => {
            setSelectedLead(lead);
            setActiveTab('chat');
          }}
          onSchedule={handleSchedule}
          onSyncCRM={handleSyncCRM}
          onRunAutonomousPipeline={() => handleRunAutonomousPipeline()}
          onOpenDiscoverModal={() => setDiscoverModalOpen(true)}
        />
      )}

      {activeTab === 'chat' && (
        <AIConversationSimulator 
          selectedLead={selectedLead}
          onSendMessage={handleSendMessage}
          onBack={() => setActiveTab('pipeline')}
        />
      )}

      {activeTab === 'analytics' && (
        <AnalyticsView 
          metrics={metrics}
          transactions={transactions}
        />
      )}

      {/* x402 Paywall Modal */}
      <X402PaywallModal 
        isOpen={paywallOpen}
        challenge={x402Challenge}
        onClose={() => setPaywallOpen(false)}
        onConfirmPayment={handleConfirmPaywallPayment}
      />

      {/* Discover Lead Modal */}
      {discoverModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(5, 8, 15, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div className="glass-panel" style={{ maxWidth: '500px', width: '100%', padding: '28px', background: 'rgba(15, 23, 42, 0.95)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '4px' }}>Discover New Prospect Lead</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Add a B2B target lead into BRAINOVA's autonomous SDR workflow
            </p>

            <form onSubmit={handleCreateLead} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. David Miller" 
                  value={newLeadForm.fullName}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, fullName: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Role / Job Title</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. VP of Sales" 
                    value={newLeadForm.role}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, role: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Company</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Nexus AI" 
                    value={newLeadForm.company}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Work Email</label>
                <input 
                  type="email" 
                  required 
                  placeholder="david@nexusai.io" 
                  value={newLeadForm.email}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Industry</label>
                  <select 
                    value={newLeadForm.industry}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, industry: e.target.value })}
                    style={{ width: '100%' }}
                  >
                    <option value="Technology / SaaS">Technology / SaaS</option>
                    <option value="Fintech">Fintech</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Healthcare">Healthcare</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Company Size</label>
                  <select 
                    value={newLeadForm.companySize}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, companySize: e.target.value })}
                    style={{ width: '100%' }}
                  >
                    <option value="10-50">10-50</option>
                    <option value="50-200">50-200</option>
                    <option value="200-500">200-500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setDiscoverModalOpen(false)}
                  style={{ padding: '8px 16px', background: 'transparent', color: 'var(--text-muted)', borderRadius: '6px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primary-gradient"
                  style={{ padding: '8px 20px', color: '#fff', borderRadius: '6px', fontWeight: 600 }}
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', marginTop: '48px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
        <div>
          <strong>Team BRAINOVA</strong> — Swastika Paul, Sayani Ghosal, Hritushree Mitra, Sania Kundu, Kaveri Kumari
        </div>
        <div>
          Institute of Engineering and Management (IEM), Kolkata • InnoFusion 3.0 × Algorand x402 Track
        </div>
      </footer>
    </div>
  );
}
