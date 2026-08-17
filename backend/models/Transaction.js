const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  txId: {
    type: String,
    required: true,
    unique: true
  },
  senderAddress: {
    type: String,
    required: true
  },
  receiverAddress: {
    type: String,
    required: true
  },
  amountMicroAlgos: {
    type: Number,
    required: true
  },
  amountAlgos: {
    type: Number,
    required: true
  },
  endpointUnlocked: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    enum: ['LEAD_ENRICHMENT', 'QUALIFIED_LEAD_EXPORT', 'AUTONOMOUS_PIPELINE_RUN', 'MEETING_DISCOVERY'],
    required: true
  },
  confirmedRound: Number,
  blockTime: Date,
  status: {
    type: String,
    enum: ['CONFIRMED', 'FAILED', 'PENDING'],
    default: 'CONFIRMED'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);
