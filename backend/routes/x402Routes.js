const express = require('express');
const router = express.Router();
const algorandService = require('../services/algorandService');
const Transaction = require('../models/Transaction');

/**
 * Get Agent Public Wallet and Algorand Testnet status
 */
router.get('/agent-wallet', async (req, res) => {
  try {
    const netStatus = await algorandService.getNetworkStatus();
    res.json({
      success: true,
      agentWalletAddress: algorandService.agentWalletAddress,
      network: 'Algorand Testnet',
      algodServer: algorandService.algodServer,
      networkStatus: netStatus
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Get Pricing Tiers for x402 Agent Services
 */
router.get('/pricing', (req, res) => {
  res.json({
    protocol: 'x402-v1-algorand',
    currency: 'ALGO',
    tiers: [
      {
        service: 'LEAD_ENRICHMENT',
        endpoint: '/api/v1/sdr/enrich/:id',
        priceMicroAlgos: 500000,
        priceAlgos: 0.5,
        description: 'AI-driven tech stack, funding, pain point extraction and ICP matching'
      },
      {
        service: 'QUALIFIED_LEAD_EXPORT',
        endpoint: '/api/v1/sdr/qualified-leads',
        priceMicroAlgos: 1000000,
        priceAlgos: 1.0,
        description: 'Instant export of verified BANT-qualified decision makers'
      },
      {
        service: 'AUTONOMOUS_PIPELINE_RUN',
        endpoint: '/api/v1/sdr/autonomous-pipeline',
        priceMicroAlgos: 2000000,
        priceAlgos: 2.0,
        description: 'End-to-end execution: Discovery → Enrichment → Scoring → Outreach → NLP Objections → Meeting Booking → CRM Update'
      }
    ]
  });
});

/**
 * Get Recent Algorand x402 Transactions
 */
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, count: transactions.length, transactions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Verify Transaction on Algorand
 */
router.post('/verify', async (req, res) => {
  try {
    const { txId, requiredMicroAlgos = 500000 } = req.body;
    const result = await algorandService.verifyPayment(txId, requiredMicroAlgos);
    res.json({ success: result.valid, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
