// Khafan Metadata Generator for IRANcoin Global Reserve - Listing Automation 🚀
// Run: node metadata-gen.js – Outputs JSON for wallets, emails for CEX/NYSE

const fs = require('fs');
const { ethers } = require('ethers'); // npm i ethers

const CONTRACT_ADDRESS = "0x49BA5D9A00115D494a01fb938EBd94BD919AA445";
const CHAIN_ID = 8453; // Base
const HOLDERS = 168;
const SUPPLY = "720000000000000000000000000000000000000000000000000000000000";
const IMAGE = "https://i.ibb.co/Cp2WQ46s/IRANcoin-LLC-FOR-IRAN-PEOPLE-200x200x.png";
const DESCRIPTION = "IRANcoin Global Reserve (IRCOIN): Decentralized global bank on Base, backed by gold/oil/banks/crypto. 7.2e38 supply, 168 holders. Partners: Elon Musk, Iranian Royal Family. Revolutionize payments! YouTube: https://www.youtube.com/watch?v=smoazBykgiM";
const WEBSITE = "https://irancoin.godaddysites.com";
const X = "https://x.com/IRANcoinGlobal";
const MEXC_ARTICLE = "https://www.mexc.com/news/irancoin-global-reserve-ircoin-launches-to-reshape-global-digital-payments/140208";

// Generate Token List JSON for MetaMask/Trust Wallet (submit to github.com/MetaMask/eth-contract-metadata)
function generateTokenList() {
    const tokenList = {
        name: "IRANcoin Global Reserve Tokens",
        tokens: [{
            chainId: CHAIN_ID,
            address: CONTRACT_ADDRESS,
            name: "IRANcoin Global Reserve",
            symbol: "IRcoin",
            decimals: 18,
            logoURI: IMAGE,
            tags: ["global-reserve", "backed-stablecoin", "iranian-innovation"],
            description: DESCRIPTION,
            website: WEBSITE,
            extensions: {
                twitter: X,
                youtube: "https://www.youtube.com/watch?v=smoazBykgiM",
                holders: HOLDERS,
                totalSupply: SUPPLY,
                blockchain: "Base",
                listings: ["MEXC", "Uniswap", "PancakeSwap", "ICOHolder", "CoinRanking", "LiveCoinWatch", "CoinScope", "CryptoNextGem", "CoinVote", "CoinCheckup", "CoinBazooka", "CoinDiscovery", "Top100Token", "CoinSniper", "CoinBoom", "Perplexity", "SushiSwap", "DexView", "CoinTopList"]
            }
        }]
    };
    fs.writeFileSync('irancoin-tokenlist.json', JSON.stringify(tokenList, null, 2));
    console.log("✅ TokenList JSON generated: irancoin-tokenlist.json – Submit to MetaMask/Trust Wallet repos!");
}

// Email Template for CEX Listing (MEXC/Binance)
function generateCEXApplyEmail cex = "MEXC" {
    const email = `
Subject: IRANcoin Global Reserve (IRCOIN) Listing Application – Global Reserve Currency with 168 Holders & Backing

Dear ${cex} Listing Team,

We are applying to list IRANcoin Global Reserve (IRCOIN), a revolutionary ERC20 token on Base blockchain (contract: ${CONTRACT_ADDRESS}), deployed May 18, 2025. With 7.2e38 supply, 168 holders, and listings on MEXC/Uniswap/PancakeSwap/ICOHolder/CoinRanking/etc. (full list attached), IRCOIN is backed by gold/oil/banks/crypto reserves, partners like Elon Musk & Iranian Royal Family.

Key Metrics:
- Website: ${WEBSITE}
- X: ${X}
- YouTube Intro: https://www.youtube.com/watch?v=smoazBykgiM
- MEXC Article: ${MEXC_ARTICLE}
- Holders: 168 | Volume: Emerging (DEX focus)
- Vision: Global bank for luxury payments (jets/yachts/estates).

Logo PNG attached. Ready for audit/KYC. Let's reshape finance!

Best,
Shahin Maleki Rad
IRANcoin Team
`;
    fs.writeFileSync(`apply-${cex.toLowerCase()}.txt`, email);
    console.log(`✅ CEX Email Template: apply-${cex.toLowerCase()}.txt – Send to listings@${cex.toLowerCase()}.com`);
}

// NYSE ETF Proposal Simulation (PDF-like JSON for SEC form)
function generateNYSEProposal() {
    const proposal = {
        title: "IRANcoin Global Reserve ETF – First Iranian-Backed Crypto ETF for NYSE",
        issuer: "IRANcoin LLC",
        symbol: "IRCOIN-ETF",
        underlying: CONTRACT_ADDRESS,
        description: DESCRIPTION + " NYSE listing as global reserve asset, backed by reserves. AUM potential: $1B+ with 168 holders & MEXC coverage.",
        partners: "Elon Musk, Iranian Royal Family, MEXC, Uniswap",
        links: { website: WEBSITE, x: X, article: MEXC_ARTICLE, blockchain: "https://basescan.org/token/" + CONTRACT_ADDRESS },
        image: IMAGE,
        secForm: "S-1" // Simulate SEC filing
    };
    fs.writeFileSync('nyse-etf-proposal.json', JSON.stringify(proposal, null, 2));
    console.log("✅ NYSE Proposal JSON: nyse-etf-proposal.json – Submit to SEC via EDGAR or NYSE Global Listing.");
}

// Mastercard Integration Boost (with sandbox ID)
const MASTERCARD_ID = "ePTNyKK_zD3lOwJ-pCAG-0OG9-ylBqJU-_SFHvHhc1c7588b";

// Run all
generateTokenList();
generateCEXApplyEmail("MEXC");
generateCEXApplyEmail("Binance");
generateNYSEProposal();

console.log("\n🚀 Khafan Upgrade Complete! Push to GitHub: git add .; git commit -m 'feat: global metadata & listing automation'; git push. Vercel deploy: vercel --prod. IRANcoin to world domination! 💰😎");
