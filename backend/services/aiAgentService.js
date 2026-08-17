const OpenAI = require('openai');

class AIAgentService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'mock_openai_key'
    });
  }

  /**
   * 1. AI Lead Enrichment
   */
  async enrichLead(lead) {
    // If OpenAI key is present, call LLM; otherwise use built-in intelligent heuristic engine
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'mock_openai_key') {
      try {
        const prompt = `You are an elite Sales Intelligence AI. Analyze this prospect:
Name: ${lead.fullName}
Role: ${lead.role}
Company: ${lead.company}
Industry: ${lead.industry}

Return JSON with:
{
  "painPoints": ["point1", "point2", "point3"],
  "techStack": ["tech1", "tech2", "tech3"],
  "fundingStage": "Series A / Bootstrapped / Enterprise",
  "recentNews": "1 sentence recent milestone",
  "icpMatchRating": integer between 70 and 99
}`;
        const response = await this.openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' }
        });
        return JSON.parse(response.choices[0].message.content);
      } catch (err) {
        console.warn('OpenAI fallback for enrichment:', err.message);
      }
    }

    // Heuristic Enrichment fallback
    const techStacks = {
      'Fintech': ['Algorand SDK', 'Python', 'React', 'Docker', 'AWS'],
      'E-Commerce': ['Shopify Plus', 'Node.js', 'PostgreSQL', 'Stripe'],
      'Healthcare': ['FHIR', 'HIPAA Cloud', 'Next.js', 'Kubernetes'],
      'Technology / SaaS': ['Next.js', 'LangChain', 'OpenAI API', 'MongoDB', 'AWS']
    };

    return {
      painPoints: [
        `High customer acquisition cost in ${lead.industry}`,
        `Manual pipeline management slowing down ${lead.role} teams`,
        `Need for automated web3 & AI agent transaction settlement`
      ],
      techStack: techStacks[lead.industry] || ['Node.js', 'React', 'MongoDB', 'Algorand'],
      fundingStage: lead.companySize.includes('500') ? 'Series B / Growth' : 'Series A funded ($4.5M)',
      recentNews: `${lead.company} recently expanded their engineering and sales automation initiatives.`,
      icpMatchRating: Math.floor(Math.random() * 20) + 80
    };
  }

  /**
   * 2. Lead Scoring & Intent Analysis
   */
  async scoreLead(lead, enrichedData) {
    let score = 50;

    // Role weighting
    const roleLower = (lead.role || '').toLowerCase();
    if (roleLower.includes('head') || roleLower.includes('director') || roleLower.includes('vp') || roleLower.includes('founder') || roleLower.includes('ceo')) {
      score += 25;
    } else if (roleLower.includes('lead') || roleLower.includes('manager')) {
      score += 15;
    }

    // ICP Match addition
    if (enrichedData && enrichedData.icpMatchRating) {
      score += Math.round(enrichedData.icpMatchRating * 0.2);
    }

    score = Math.min(98, Math.max(35, score));

    let intent = 'Medium';
    if (score >= 85) intent = 'Ultra-High';
    else if (score >= 70) intent = 'High';
    else if (score <= 45) intent = 'Low';

    const rationale = `Calculated high decision-making power (${lead.role}) with strong ICP alignment (${lead.industry}). High probability of conversion for autonomous sales tools.`;

    return { score, buyingIntent: intent, scoreRationale: rationale };
  }

  /**
   * 3. Hyper-Personalized Outreach Generation (Email + WhatsApp)
   */
  async generateOutreach(lead, enrichedData) {
    const painPoint = (enrichedData.painPoints && enrichedData.painPoints[0]) || 'optimizing sales efficiency';
    
    const subject = `Accelerating ${lead.company}'s sales velocity with Autonomous AI SDRs`;
    
    const emailBody = `Hi ${lead.fullName.split(' ')[0]},

I noticed ${lead.company}'s recent growth in ${lead.industry}. As ${lead.role}, you're likely tackling challenges around ${painPoint}.

At BRAINOVA, we've developed an autonomous AI SDR Agent that discovers high-intent prospects, qualifies them via intelligent multi-turn NLP, and books qualified meetings directly into your calendar — monetized on-demand via Algorand x402 microtransactions.

Would you be open to a 10-minute coffee chat this Thursday at 3 PM EST to see how we can 3x your qualified sales pipeline?

Best regards,
BRAINOVA Autonomous AI SDR`;

    const whatsappBody = `Hey ${lead.fullName.split(' ')[0]} 👋 Saw your leadership at ${lead.company}. We built an autonomous AI SDR that automates lead discovery to meeting booking. Free for a quick 5-min intro call this week?`;

    return {
      subject,
      emailBody,
      whatsappBody,
      angle: 'Value-First Problem-Solving Approach',
      sentStatus: 'Sent',
      sentAt: new Date()
    };
  }

  /**
   * 4. Intelligent NLP Conversation & Objection Handling
   */
  async handleConversation(lead, userMessage, conversationHistory = []) {
    const messageLower = userMessage.toLowerCase();
    let sentiment = 'Neutral';
    let objection = null;
    let reply = '';
    let isQualified = false;
    let bookMeeting = false;

    // Detect intent & objections
    if (messageLower.includes('pricing') || messageLower.includes('cost') || messageLower.includes('expensive') || messageLower.includes('budget')) {
      sentiment = 'Objection';
      objection = 'Budget / Pricing Inquiries';
      reply = `Totally understand budget sensitivity! That's why BRAINOVA runs on the Algorand x402 micro-payment model: you only pay micro-fractions of an ALGO per qualified lead or pipeline run with zero costly upfront SaaS subscriptions. Shall I send our 1-page breakdown or book a 10-minute demo?`;
    } else if (messageLower.includes('schedule') || messageLower.includes('calendar') || messageLower.includes('demo') || messageLower.includes('book') || messageLower.includes('yes') || messageLower.includes('interested') || messageLower.includes('thursday') || messageLower.includes('tomorrow')) {
      sentiment = 'Interested';
      isQualified = true;
      bookMeeting = true;
      reply = `Fantastic! I've reserved a slot for our deep-dive demo. You can confirm your preferred time here: https://calendly.com/brainova-ai-sdr/15min. Looking forward to meeting you!`;
    } else if (messageLower.includes('send info') || messageLower.includes('more info') || messageLower.includes('deck')) {
      sentiment = 'Interested';
      reply = `Gladly! BRAINOVA replaces manual SDR prospecting by 70% using autonomous multi-agent loops and instant Algorand x402 on-chain settlement. Would 10:00 AM or 2:30 PM tomorrow work better for a live walkthrough?`;
    } else if (messageLower.includes('not interested') || messageLower.includes('remove') || messageLower.includes('unsubscribe')) {
      sentiment = 'Negative';
      reply = `Understood, ${lead.fullName.split(' ')[0]}. Thanks for letting us know, I've updated your status. Wishing you and ${lead.company} all the best!`;
    } else {
      sentiment = 'Positive';
      reply = `Thanks for getting back, ${lead.fullName.split(' ')[0]}! Based on your role at ${lead.company}, our AI agent can take over end-to-end prospecting and deliver verified meetings directly to your team. Would you be open to seeing a 2-minute live demo?`;
    }

    return {
      agentReply: reply,
      sentiment,
      detectedObjection: objection,
      isQualified,
      bookMeeting
    };
  }
}

module.exports = new AIAgentService();
