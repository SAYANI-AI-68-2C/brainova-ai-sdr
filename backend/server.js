require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const sdrRoutes = require('./routes/sdrRoutes');
const x402Routes = require('./routes/x402Routes');
const Lead = require('./models/Lead');
const Transaction = require('./models/Transaction');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api/v1/sdr', sdrRoutes);
app.use('/api/v1/x402', x402Routes);

// Health & Root Status
app.get('/', (req, res) => {
  res.json({
    project: 'BRAINOVA AI Sales Development Representative (SDR) Agent',
    version: '1.0.0',
    hackathon: 'InnoFusion 3.0 × Algorand x402 Track',
    institution: 'Institute of Engineering and Management (IEM), Kolkata',
    team: ['Swastika Paul', 'Sayani Ghosal', 'Hritushree Mitra', 'Sania Kundu', 'Kaveri Kumari'],
    track: 'x402-Powered Applications / Agentic Commerce Infrastructure',
    x402Protocol: 'Algorand HTTP 402 Standard Enabled',
    endpoints: {
      sdrApi: '/api/v1/sdr',
      x402Api: '/api/v1/x402',
      pricing: '/api/v1/x402/pricing',
      agentWallet: '/api/v1/x402/agent-wallet'
    }
  });
});

// Seed Initial Demo Leads if database is empty
async function seedInitialData() {
  try {
    const count = await Lead.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding initial Brainova SDR Demo Leads...');
      const sampleLeads = [
        {
          fullName: 'Arjun Mehta',
          email: 'arjun.mehta@fintechscale.com',
          role: 'VP of Growth & Strategy',
          company: 'FinTechScale',
          companyWebsite: 'https://fintechscale.com',
          linkedinUrl: 'https://linkedin.com/in/arjun-mehta-growth',
          industry: 'Fintech',
          companySize: '50-200',
          enrichedData: {
            painPoints: ['High outbound CAC', 'Inefficient manual SDR workflows', 'Delayed response times'],
            techStack: ['React', 'Node.js', 'PostgreSQL', 'Algorand SDK'],
            fundingStage: 'Series A ($6M)',
            recentNews: 'FinTechScale announced launch of cross-border Web3 settlement rails.',
            icpMatchRating: 94
          },
          score: 92,
          buyingIntent: 'Ultra-High',
          scoreRationale: 'VP level buyer with active Web3 infrastructure plans and high inbound demand.',
          outreach: {
            subject: 'Scaling FinTechScale Sales Velocity with Autonomous AI SDRs',
            emailBody: 'Hi Arjun, noticed FinTechScale’s recent Web3 expansion. Our AI SDR agent automates lead discovery through meeting booking with Algorand x402 micropayments.',
            sentStatus: 'Sent',
            sentAt: new Date(Date.now() - 86400000)
          },
          conversations: [
            { sender: 'agent', text: 'Hi Arjun, noticed FinTechScale’s recent Web3 expansion. Free for a quick 10-min demo?', timestamp: new Date(Date.now() - 72000000) },
            { sender: 'lead', text: 'Sounds promising. Does this integrate with Algorand x402?', sentiment: 'Interested', timestamp: new Date(Date.now() - 36000000) },
            { sender: 'agent', text: 'Yes! We support native Algorand Testnet & Mainnet x402 HTTP micropayments with zero subscriptions.', sentiment: 'Positive', timestamp: new Date(Date.now() - 18000000) }
          ],
          qualification: {
            budget: '$10k/mo allocated',
            authority: 'Sole Decision Maker',
            need: 'Urgent',
            timeline: 'Within 2 Weeks',
            isQualified: true
          },
          meeting: {
            isBooked: true,
            scheduledAt: new Date(Date.now() + 86400000 * 2),
            meetingUrl: 'https://meet.google.com/brainova-fintechscale-demo',
            calendarEventId: 'CAL-DEMO-101'
          },
          crmStatus: {
            hubspotSynced: true,
            crmRecordId: 'HS-948102',
            lastSyncedAt: new Date()
          },
          status: 'MEETING_SCHEDULED',
          x402: {
            isMonetized: true,
            paymentTxId: 'ALGO_TX_DEMO_9482710398',
            amountMicroAlgos: 2000000,
            payerWalletAddress: 'DEMO_ALGORAND_WALLET_7X9V',
            paymentTimestamp: new Date(),
            unlockedServices: ['AUTONOMOUS_PIPELINE_RUN']
          }
        },
        {
          fullName: 'Elena Rostova',
          email: 'elena.r@cloudsaas.io',
          role: 'Head of Sales Engineering',
          company: 'CloudSaaS Hub',
          companyWebsite: 'https://cloudsaas.io',
          linkedinUrl: 'https://linkedin.com/in/elena-rostova-cloud',
          industry: 'Technology / SaaS',
          companySize: '200-500',
          enrichedData: {
            painPoints: ['Low SDR reply rates (under 2%)', 'Generic cold email fatigue'],
            techStack: ['Next.js', 'Python', 'AWS', 'MongoDB'],
            fundingStage: 'Series B ($18M)',
            recentNews: 'CloudSaaS expanded enterprise sales team by 40%.',
            icpMatchRating: 88
          },
          score: 84,
          buyingIntent: 'High',
          scoreRationale: 'Strong technical fit and active expansion in SDR headcounts.',
          status: 'SCORED'
        }
      ];

      await Lead.insertMany(sampleLeads);

      // Seed a sample Algorand transaction
      await Transaction.create({
        txId: 'ALGO_TX_DEMO_9482710398',
        senderAddress: 'DEMO_ALGORAND_WALLET_7X9V',
        receiverAddress: process.env.AGENT_ALGORAND_WALLET_ADDRESS || 'BRAINOVASDREU4QJVR5T57TKGKFXW3YFXHQXGNYEEM4M62T7TXZ2BVMQC4EU',
        amountMicroAlgos: 2000000,
        amountAlgos: 2.0,
        endpointUnlocked: '/api/v1/sdr/autonomous-pipeline',
        serviceType: 'AUTONOMOUS_PIPELINE_RUN',
        confirmedRound: 42398215,
        blockTime: new Date(),
        status: 'CONFIRMED'
      });

      console.log('✅ Demo seed data created successfully.');
    }
  } catch (seedErr) {
    console.warn('Seed data notice:', seedErr.message);
  }
}

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/brainova_ai_sdr';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(' Connected to MongoDB Database');
    seedInitialData();
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB connection warning:', err.message);
    console.log('ℹ️ Operating in demo/mock mode if database is offline.');
  });

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 BRAINOVA AI SDR Agent Backend Live on Port ${PORT}`);
  console.log(`⚡ Algorand x402 Micropayment Protocol Active`);
  console.log(`🏆 InnoFusion 3.0 × Algorand x402 Track`);
  console.log(`====================================================`);
});
