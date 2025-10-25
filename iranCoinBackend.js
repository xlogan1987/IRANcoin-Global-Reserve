const express = require('express');
const { ethers } = require('ethers');
const stripe = require('stripe')('sk_test_...'); // یا Mastercard API key

const app = express();
app.use(express.json());

const CONTRACT_ADDRESS = "0xYourIRANcoinAddress";
const ABI = [ /* ABI */ ];
const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com'); // Polygon RPC
const wallet = new ethers.Wallet('private_key', provider); // Backend wallet (owner)
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

// Charge endpoint
app.post('/api/charge', async (req, res) => {
    try {
        const { sessionId, amount, currency, recipient, userAddress } = req.body;
        // Mastercard/Stripe charge (use stripe.charges.create or Mastercard API)
        const charge = await stripe.charges.create({
            amount: amount * 100, // cents
            currency: currency.toLowerCase(),
            source: sessionId, // Mastercard session
            description: 'IRANcoin Payment'
        });
        if (charge.status === 'succeeded') {
            // Mint IRCOIN
            const coinAmount = ethers.utils.parseUnits(amount.toString(), 18);
            const tx = await contract.mintForMastercardPayment(userAddress, coinAmount);
            await tx.wait();
            res.json({ success: true, transactionId: charge.id, coinTx: tx.hash });
        } else {
            res.json({ success: false, error: 'Charge failed' });
        }
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

app.listen(3000, () => console.log('Backend on port 3000'));
