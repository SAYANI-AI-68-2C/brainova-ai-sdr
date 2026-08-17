# 📋 INNOFUSION 3.0 × ALGORAND x402 SUBMISSION GUIDE
**Team BRAINOVA — Institute of Engineering and Management (IEM), Kolkata**

---

## 1. Google Form Submission Form Answers (Copy & Paste Ready)

### 🔘 Question 1: Which Algorand track are you aiming for? *
> **Answer:** `x402-Powered Applications`
> *(Note: This project also natively qualifies for `Agentic Commerce Infrastructure`)*

---

### 🔗 Question 2: GitHub Repository Link (Public) *
> **Answer:** `https://github.com/<your-username>/brainova-ai-sdr`
> *(Push this local repository to your public GitHub account using the commands below)*

---

### 🌐 Question 3: X402 Endpoint Link(s)
> **Answer:**
> - **AI Enriched Lead Intelligence (0.5 ALGO):** `POST /api/v1/sdr/enrich/:id`
> - **Autonomous End-to-End Sales Pipeline Run (2.0 ALGO):** `POST /api/v1/sdr/autonomous-pipeline`
> - **Algorand x402 Pricing & Spec Catalog:** `GET /api/v1/x402/pricing`
> - **Agent Recipient Wallet & Testnet Status:** `GET /api/v1/x402/agent-wallet`
> - **Verified Transaction Ledger:** `GET /api/v1/x402/transactions`

---

### 🎥 Question 4: Short Demo Video link explaining your project *
> **Answer:** `<Paste your YouTube/Loom/Google Drive Video Link>`

#### 🎬 2.5-Minute Demo Video Script & Flow:
* **0:00 - 0:25 (The Problem):** "Hello judges! We are Team BRAINOVA from IEM Kolkata. Today, sales reps spend 70% of their working hours on manual prospecting, cold outreach, and follow-ups. Traditional SDR tools cost $5,000/month in rigid subscriptions with low conversions."
* **0:25 - 0:55 (The Solution & MERN Architecture):** "We built BRAINOVA — an Autonomous AI SDR Agent built on the MERN stack with the Algorand x402 micropayment protocol. It automates the full 10-step outbound sales funnel."
* **0:55 - 1:30 (Live Pipeline Demo):** (Show screen) "Here in our dashboard, we discover leads, perform AI enrichment on their tech stack and pain points, score their buying intent from 0 to 100, and generate hyper-personalized email & WhatsApp messaging."
* **1:30 - 2:05 (AI NLP & Objection Handling Simulator):** (Show Chat Tab) "Watch our multi-agent NLP engine handle a real lead objection: when the lead says 'We have budget constraints', the agent automatically explains our pay-per-use Algorand model and converts them into a scheduled calendar meeting."
* **2:05 - 2:30 (Algorand x402 Protocol & Settlement):** "When an agent or user requests premium lead intelligence, our server triggers an HTTP 402 Payment Required response. Once the 0.5 ALGO transaction settles on the Algorand Testnet, the request verifies instantly and records to our on-chain ledger. Zero SaaS subscriptions, pure agentic commerce."

---

### 📝 Question 5: Briefly explain your project and how it uses Algorand *
> **Answer (Copy & Paste):**
> Sales Development Representatives (SDRs) spend over 70% of their time on manual prospecting, personalized outreach, and lead qualification. Traditional sales agencies and SaaS platforms cost $4,000–$8,000/month with rigid lock-ins and high error rates.
>
> **BRAINOVA** is an autonomous AI Sales Development Representative (SDR) Agent built using the **MERN Stack (MongoDB, Express, React, Node.js)** that automates the entire 10-step outbound sales funnel:
> `Lead Discovery → AI Enrichment → Lead Scoring → Personalized Outreach → AI Conversation → Lead Qualification → Meeting Scheduling → CRM Update → Analytics → x402 Monetization`.
>
> **How It Uses Algorand & the x402 Protocol:**
> 1. **HTTP 402 Payment Required Standard:** Our Express backend guards high-value AI SDR endpoints (lead enrichment, autonomous multi-turn pipeline runs) behind the x402 HTTP standard, returning 402 challenge responses specifying recipient wallet and microAlgo pricing.
> 2. **Algorand On-Chain Settlement:** Requesters broadcast micro-payments (0.5 to 2.0 ALGO) on Algorand Testnet and attach the transaction hash in the `X-402-Payment` header.
> 3. **Cryptographic Node Verification:** The backend uses `algosdk.Algodv2` to verify block confirmation, recipient wallet address match, and transferred amounts before delivering enriched intelligence, booking verified meetings, and syncing records to HubSpot/Salesforce CRM.
> 4. **Agentic Commerce:** This replaces bloated monthly subscriptions with trustless, machine-to-machine micropayments for autonomous AI agents.

---

### 📱 Question 6: Register for the x402 Global Challenge & attach screenshot *
1. Go to: **https://algorand.co/global-x402-challenge**
2. Register **Team BRAINOVA**, Project: **AI SDR Agent**, Track: **x402-Powered Applications**.
3. Take a screenshot of the submission confirmation screen and attach it to the form.

---

## 🛠️ Step-by-Step Instructions to Push to GitHub

```powershell
# 1. Open terminal inside the project directory
cd C:\Users\GHOSAL\.gemini\antigravity-ide\scratch\brainova-ai-sdr

# 2. Create a new repository on your GitHub account named "brainova-ai-sdr" (make it Public)

# 3. Add remote and push:
git remote add origin https://github.com/<your-github-username>/brainova-ai-sdr.git
git branch -M main
git push -u origin main
```
