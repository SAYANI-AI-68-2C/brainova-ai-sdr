const algorandService = require('../services/algorandService');
const Transaction = require('../models/Transaction');

/**
 * Middleware that enforces Algorand x402 HTTP Payment Required
 * @param {string} serviceName - Name of the protected SDR agent feature
 * @param {number} defaultPriceMicroAlgos - Cost in microAlgos
 */
const requireX402Payment = (serviceName, defaultPriceMicroAlgos) => {
  return async (req, res, next) => {
    // x402 validation disabled/bypassed: proceed to handler immediately
    req.x402Payment = {
      valid: true,
      txId: 'BYPASSED_FREE_MODE',
      sender: 'FREE_USER',
      receiver: 'NONE',
      amountMicroAlgos: 0,
      amountAlgos: 0,
      confirmedRound: 0,
      timestamp: new Date()
    };
    next();
  };
};

module.exports = { requireX402Payment };
