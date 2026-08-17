const algorandService = require('../services/algorandService');
const Transaction = require('../models/Transaction');

/**
 * Middleware that enforces Algorand x402 HTTP Payment Required
 * @param {string} serviceName - Name of the protected SDR agent feature
 * @param {number} defaultPriceMicroAlgos - Cost in microAlgos
 */
const requireX402Payment = (serviceName, defaultPriceMicroAlgos) => {
  return async (req, res, next) => {
    const paymentTxId = req.header('X-402-Payment') || req.header('x-402-payment') || req.query.txId || req.body.paymentTxId;
    const requiredPrice = defaultPriceMicroAlgos || 1000000; // 1 ALGO default

    if (!paymentTxId) {
      // Set x402 Response Headers
      res.setHeader('X-402-Recipient', algorandService.agentWalletAddress);
      res.setHeader('X-402-Amount', requiredPrice.toString());
      res.setHeader('X-402-Network', 'Algorand-Testnet');

      return res.status(402).json(
        algorandService.generateX402PaymentChallenge(req.originalUrl, serviceName, requiredPrice)
      );
    }

    try {
      const verification = await algorandService.verifyPayment(paymentTxId, requiredPrice);

      if (!verification.valid) {
        return res.status(402).json({
          status: 402,
          error: 'Payment Verification Failed',
          reason: verification.reason,
          challenge: algorandService.generateX402PaymentChallenge(req.originalUrl, serviceName, requiredPrice)
        });
      }

      // Record transaction to database (avoid duplicate key crash)
      try {
        await Transaction.findOneAndUpdate(
          { txId: paymentTxId },
          {
            txId: paymentTxId,
            senderAddress: verification.sender,
            receiverAddress: verification.receiver,
            amountMicroAlgos: verification.amountMicroAlgos,
            amountAlgos: verification.amountAlgos,
            endpointUnlocked: req.originalUrl,
            serviceType: serviceName,
            confirmedRound: verification.confirmedRound,
            blockTime: verification.timestamp,
            status: 'CONFIRMED'
          },
          { upsert: true, new: true }
        );
      } catch (dbErr) {
        console.warn('Transaction record warning:', dbErr.message);
      }

      req.x402Payment = verification;
      next();
    } catch (err) {
      console.error('x402 Middleware exception:', err);
      return res.status(500).json({ error: 'Internal Server Error during x402 validation' });
    }
  };
};

module.exports = { requireX402Payment };
