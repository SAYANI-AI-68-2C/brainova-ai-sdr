const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['agent', 'lead'],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  sentiment: {
    type: String,
    enum: ['Positive', 'Neutral', 'Negative', 'Interested', 'Objection'],
    default: 'Neutral'
  },
  detectedObjection: String
});

const leadSchema = new mongoose.Schema({
  // 1. Lead Discovery & Info
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  companyWebsite: String,
  linkedinUrl: String,
  industry: { type: String, default: 'Technology / SaaS' },
  companySize: { type: String, default: '50-200' },
  location: { type: String, default: 'Global' },

  // 2. AI Enrichment
  enrichedData: {
    painPoints: [String],
    techStack: [String],
    fundingStage: String,
    recentNews: String,
    icpMatchRating: { type: Number, min: 0, max: 100 }
  },

  // 3. Lead Scoring & Intent
  score: { type: Number, min: 0, max: 100, default: 0 },
  scoreRationale: String,
  buyingIntent: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Ultra-High'],
    default: 'Medium'
  },

  // 4. Personalized Outreach
  outreach: {
    subject: String,
    emailBody: String,
    whatsappBody: String,
    angle: String,
    sentStatus: {
      type: String,
      enum: ['Pending', 'Sent', 'Failed'],
      default: 'Pending'
    },
    sentAt: Date
  },

  // 5. AI Conversation & Objection Handling
  conversations: [messageSchema],

  // 6. Lead Qualification (BANT criteria)
  qualification: {
    budget: { type: String, default: 'Pending' },
    authority: { type: String, default: 'Decision Maker' },
    need: { type: String, default: 'High' },
    timeline: { type: String, default: '< 30 Days' },
    isQualified: { type: Boolean, default: false }
  },

  // 7. Meeting Scheduling
  meeting: {
    isBooked: { type: Boolean, default: false },
    scheduledAt: Date,
    meetingUrl: String,
    calendarEventId: String
  },

  // 8. CRM Update
  crmStatus: {
    hubspotSynced: { type: Boolean, default: false },
    crmRecordId: String,
    lastSyncedAt: Date
  },

  // Overall Sales Funnel Status
  status: {
    type: String,
    enum: [
      'DISCOVERED',
      'ENRICHED',
      'SCORED',
      'OUTREACH_SENT',
      'IN_CONVERSATION',
      'QUALIFIED',
      'MEETING_SCHEDULED',
      'CLOSED_WON',
      'DISQUALIFIED'
    ],
    default: 'DISCOVERED'
  },

  // 10. Algorand x402 Protocol Monetization Tracking
  x402: {
    isMonetized: { type: Boolean, default: false },
    paymentTxId: String,
    amountMicroAlgos: { type: Number, default: 0 },
    payerWalletAddress: String,
    paymentTimestamp: Date,
    unlockedServices: [String]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lead', leadSchema);
