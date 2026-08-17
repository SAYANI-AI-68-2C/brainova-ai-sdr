const express = require('express');
const router = express.Router();
const sdrController = require('../controllers/sdrController');
const { requireX402Payment } = require('../middleware/x402Auth');

// 1. Pipeline Overview & Lead List
router.get('/leads', sdrController.getAllLeads);

// 2. Step 1: Lead Discovery
router.post('/discover', sdrController.discoverLead);

// 3. Step 2: AI Enrichment (x402 Monetized Endpoint - 0.5 ALGO / 500,000 microAlgos)
router.post(
  '/enrich/:id',
  requireX402Payment('LEAD_ENRICHMENT', 500000),
  sdrController.enrichLead
);

// 4. Step 3: Lead Scoring
router.post('/score/:id', sdrController.scoreLead);

// 5. Step 4: Hyper-Personalized Outreach
router.post('/outreach/:id', sdrController.generateOutreach);

// 6. Step 5: AI Conversation & Objection Handling
router.post('/conversation/:id', sdrController.handleConversation);

// 7. Step 6 & 7: Meeting Scheduling
router.post('/schedule/:id', sdrController.scheduleMeeting);

// 8. Step 8: CRM Update
router.post('/crm-sync/:id', sdrController.syncCRM);

// 9. Step 9: Analytics & Funnel Dashboard
router.get('/analytics', sdrController.getAnalytics);

// 10. Step 10: Complete Autonomous Pipeline Run (x402 Monetized - 2.0 ALGO / 2,000,000 microAlgos)
router.post(
  '/autonomous-pipeline',
  requireX402Payment('AUTONOMOUS_PIPELINE_RUN', 2000000),
  sdrController.runAutonomousPipeline
);

module.exports = router;
