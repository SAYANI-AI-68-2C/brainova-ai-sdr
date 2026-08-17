import React, { useState } from 'react';
import { Coins, ShieldAlert, CheckCircle2, ArrowRight, Copy, Check, ExternalLink } from 'lucide-react';

export default function X402PaywallModal({ 
  isOpen, 
  onClose, 
  challenge, 
  onConfirmPayment 
}) {
  const [customTxId, setCustomTxId] = useState('');
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen || !challenge) return null;

  const { recipientAddress, amountAlgos, amountMicroAlgos, endpoint, protocol } = challenge.x402Details || {
    recipientAddress: 'BRAINOVASDREU4QJVR5T57TKGKFXW3YFXHQXGNYEEM4M62T7TXZ2BVMQC4EU',
    amountAlgos: 0.5,
    amountMicroAlgos: 500000,
    endpoint: '/api/v1/sdr/enrich',
    protocol: 'x402-v1-algorand'
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(recipientAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePayment = async () => {
    const mockTx = 'ALGO_TX_' + Math.random().toString(36).substring(2, 12).toUpperCase() + Date.now().toString().slice(-6);
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onConfirmPayment(mockTx);
    }, 800);
  };

  const handleCustomTxSubmit = () => {
    if (!customTxId.trim()) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onConfirmPayment(customTxId.trim());
    }, 800);
  };

  return (
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
      <div className="glass-panel glow-border" style={{
        maxWidth: '560px',
        width: '100%',
        padding: '30px',
        background: 'rgba(15, 23, 42, 0.95)',
        position: 'relative'
      }}>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(0, 240, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00f0ff'
          }}>
            <Coins size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>HTTP 402: Payment Required</h3>
              <span className="badge badge-x402">Algorand x402</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Autonomous SDR Agent Endpoint Protected by On-Chain Micro-settlement
            </p>
          </div>
        </div>

        {/* Challenge Box */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Required Payment:</span>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#00f0ff' }}>
              {amountAlgos} ALGO <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>({amountMicroAlgos} μALGO)</span>
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Target Endpoint:</span>
            <code style={{ fontSize: '0.8rem', color: '#a5b4fc', background: 'rgba(99, 102, 241, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
              {endpoint}
            </code>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Agent Testnet Wallet:</span>
            <button 
              onClick={handleCopy}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                fontSize: '0.75rem',
                padding: '4px 8px',
                borderRadius: '6px'
              }}
            >
              {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
              {recipientAddress.substring(0, 8)}...{recipientAddress.substring(recipientAddress.length - 6)}
            </button>
          </div>
        </div>

        {/* Input Custom Algorand TxID */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
            Provide Algorand Testnet Transaction ID (X-402-Payment Header):
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text"
              placeholder="e.g. 5K7L2984JF0923JKLSDF98234..."
              value={customTxId}
              onChange={(e) => setCustomTxId(e.target.value)}
              style={{ flex: 1, fontSize: '0.85rem' }}
            />
            <button
              onClick={handleCustomTxSubmit}
              disabled={!customTxId.trim() || isVerifying}
              style={{
                background: 'rgba(0, 240, 255, 0.2)',
                color: '#00f0ff',
                border: '1px solid rgba(0, 240, 255, 0.4)',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.85rem'
              }}
            >
              Verify Tx
            </button>
          </div>
        </div>

        {/* One Click Simulation or Close */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              background: 'transparent',
              color: 'var(--text-muted)',
              fontSize: '0.85rem'
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSimulatePayment}
            disabled={isVerifying}
            className="algo-gradient-btn"
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem'
            }}
          >
            {isVerifying ? 'Verifying Algorand Node...' : <><Coins size={16} /> Instant Testnet Pay & Unlock</>}
          </button>
        </div>
      </div>
    </div>
  );
}
