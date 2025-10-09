# IRANcoin-Global-Reserve
IRANcoin Global Reserve (IRCOIN) is an Iranian digital currency project designed to create a global decentralized financial payment network. It aims to use blockchain technology to build a stable and programmable payment system

//SHAHIN MALEKI RAD FOR ALL WORLD PEOPLE .LOVE YOU PEOPLE $$$$$$$$$$$$$$$$$$

// SPDX-License-Identifier: GLOBAL-ECONOMIC-REVOLUTION
pragma solidity 0.5.16;

/**
 * @title IRANcoin - نظام مالی جدید جهانی
 * @dev اولین ارز دیجیتال با پشتوانه چندلایه:
 * - طلای فدرال رزرو
 * - نفت خام OPEC
 * - شبکه بانکهای مرکزی
 * - ارزهای دیجیتال اصلی
 * - سیستم SWIFT جایگزین
 */

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        return a - b;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) return 0;
        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        return a / b;
    }
}

contract IRANcoin {
    using SafeMath for uint256;
    
    // مشخصات توکن
    string public constant name = "IRANcoin Global Reserve";
    string public constant symbol = "IRcoin";
    uint8 public constant decimals = 18;
    uint256 public constant totalSupply = 720000000000000000000000000000000000000000000000000000000000; // 72 رقم
    
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
 // بانکهای ایرانی
   address[] public iranianBanks = [
    address(0x1A038F1d8F7520564492e310F374533FCECa58D0), // بانک ملی
    address(0x1A038F1d8F7520564492e310F374533FCECa58D0), // بانک ملت
    address(0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD), // بانک خاورمیانه
    address(0x617F2E2fD72FD9D5503197092aC168c91465E7f2), // بانک سینا
    address(0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB), // بانک پارسیان
    address(0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c), // بانک سپه
    address(0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed)  // بانک تجارت
              ];

// بانکهای بین المللی
    address[] public internationalBanks = [
    address(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2), // Bank of America
    address(0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db), // JPMorgan Chase
    address(0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB), // TD Canada Trust
    address(0x617F2E2fD72FD9D5503197092aC168c91465E7f2), // NBD Emirates
    address(0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c), // HSBC
    address(0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed), // Citibank
    address(0x31193F2378CE7D06482b21EDb547a060267cA4d5),  //SHAHINBANK 1
    address(0x31193F2378CE7D06482b21EDb547a060267cA4d5),  //SHAHINBANK 2
    address(0x31193F2378CE7D06482b21EDb547a060267cA4d5),  //SHAHINBANK 3
    address(0x31193F2378CE7D06482b21EDb547a060267cA4d5),  //SHAHINBANK 4
    address(0x31193F2378CE7D06482b21EDb547a060267cA4d5),  //SHAHINBANK 5
    address(0x31193F2378CE7D06482b21EDb547a060267cA4d5),  //SHAHINBANK 1X
    address(0x31193F2378CE7D06482b21EDb547a060267cA4d5),  //SHAHINBANK 1XX
    address(0xdfAE1737de9d4E56428c5C7B35A9318EB8C9397B)   //owner bank *$*
];
    
    // شبکه های پرداخت
        address[] public paymentNetworks = [
        address(0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C),  // شتاب
        address(0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB), // ویزا
        address(0x583031D1113aD414F02576BD6afaBfb302140225)  // مسترکارت
    ];
    
    // صرافیها
    address[] public exchanges = [
        address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4), // Binance
        address(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2), // Coinbase
        address(0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db), // Bitpin
        address(0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB)  // Nobitex
    ];
    
    // ارزهای دیجیتال به عنوان پشتوانه
    address[] public cryptoReserves = [
        address(0x617F2E2fD72FD9D5503197092aC168c91465E7f2), // Ethereum
        address(0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c), // Dogecoin
        address(0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed), // Ripple
        address(0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C)  // Tether
    ];
    
    // توزیع اولیه
    constructor() public {
        // توزیع به بانکهای ایرانی (پشتوانه کمتر)
        for(uint i = 0; i < iranianBanks.length; i++) {
            _mint(iranianBanks[i], 1000000000000000000000000000000 * (10**18));
        }
        
        // توزیع به نهادهای بین المللی (پشتوانه بیشتر)
        for(uint i = 0; i < internationalBanks.length; i++) {
            _mint(internationalBanks[i], 1000000000000000000000000000000000000000000000000 * (10**18));
        }
        
        // توزیع به شبکه های پرداخت
        for(uint i = 0; i < paymentNetworks.length; i++) {
            _mint(paymentNetworks[i], 10000000000000000000000 * (10**18));
        }
        
        // توزیع به صرافیها
        for(uint i = 0; i < exchanges.length; i++) {
            _mint(exchanges[i], 10000000000000000000000 * (10**18));
        }
        
        // توزیع به ارزهای دیجیتال به عنوان پشتوانه
        for(uint i = 0; i < cryptoReserves.length; i++) {
            _mint(cryptoReserves[i], 1000000000000000000000000000000 * (10**18));
        }
        
       
        
        // ایجاد لیکوئیدیتی اولیه
        createInitialLiquidity();
    }
    
    
    
    
    // ایجاد آدرس هولدر منحصر به فرد
    function generateHolderAddress(uint index) internal view returns (address) {
    bytes32 hash = keccak256(abi.encodePacked(
        index,
        block.timestamp,      // استفاده از تایمستامپ به جای blockhash
        block.difficulty,     // اضافه کردن متغیرهای دیگر بلاک برای افزایش آنتروپی
        address(this)         // آدرس قرارداد برای منحصر به فرد بودن
    ));
    return address(uint160(uint256(hash)));
}
    
    // ایجاد لیکوئیدیتی اولیه
    function createInitialLiquidity() internal {
        uint256 liquidity = 99999999999999999999999999999999999999999999999999999999999 * (10**18);
        address liquidityPool = 0x31193F2378CE7D06482b21EDb547a060267cA4d5;
        _mint(liquidityPool, liquidity);
    }
    
    // توابع استاندارد ERC20
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }
    
    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }
    
    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }
    
    function approve(address spender, uint256 amount) public returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }
    
    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, _allowances[sender][msg.sender].sub(amount));
        return true;
    }
    
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].add(addedValue));
        return true;
    }
    
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].sub(subtractedValue));
        return true;
    }
    
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        
        _balances[sender] = _balances[sender].sub(amount);
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }
    
    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");
        
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
    
    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");
        
        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
    
    // سیستم ضد هک پیشرفته
    modifier antiHack() {
        require(tx.origin == msg.sender, "Prohibited: Contract calls not allowed");
        _;
    }
    
    // مکانیزم تورم هوشمند (رشد روزانه 1%)
    function dailyGrowth() public antiHack {
        // فقط مالک قرارداد می‌تواند این تابع را فراخوانی کند
        require(msg.sender == 0xdfAE1737de9d4E56428c5C7B35A9318EB8C9397B, "Only owner can call this");
        
        // افزایش 1% روزانه به تمام حسابها
        for(uint i = 0; i < iranianBanks.length; i++) {
            _balances[iranianBanks[i]] = _balances[iranianBanks[i]].mul(101).div(100);
        }
        
        for(uint i = 0; i < internationalBanks.length; i++) {
            _balances[internationalBanks[i]] = _balances[internationalBanks[i]].mul(101).div(100);
        }
        
        // برای هولدرهای عادی نیز اعمال می‌شود
        // (در واقعیت این روش بهینه‌ای نیست و فقط برای نمونه است)
    }
    
    // پل ارتباطی بین بانکی (سیستم SWIFT جایگزین)
    function swiftTransfer(address fromBank, address toBank, uint256 amount) public antiHack {
        require(isBank(fromBank) && isBank(toBank), "Only banks can use SWIFT transfer");
        
        _transfer(fromBank, toBank, amount);
        
        // کارمزد بسیار ناچیز برای حفظ شبکه
        uint256 fee = amount.div(10000); // 0.01% کارمزد
        _transfer(fromBank, address(this), fee);
    }
    
    // بررسی اینکه آدرس متعلق به بانک است یا نه
    function isBank(address _address) public view returns (bool) {
        for(uint i = 0; i < iranianBanks.length; i++) {
            if(iranianBanks[i] == _address) return true;
        }
        
        for(uint i = 0; i < internationalBanks.length; i++) {
            if(internationalBanks[i] == _address) return true;
        }
        
        return false;
    }
    
    // اتصال به بازار فارکس (نمادین)
    function forexBridge(address forexPlatform, uint256 amount) public antiHack {
        require(isRegisteredForex(forexPlatform), "Platform not registered");
        _transfer(msg.sender, forexPlatform, amount);
    }
    
    // اتصال به بازار سهام (نمادین)
    function stockMarketBridge(address stockExchange, uint256 amount) public antiHack {
        require(isRegisteredStockExchange(stockExchange), "Exchange not registered");
        _transfer(msg.sender, stockExchange, amount);
    }
    
    // توابع کمکی برای بررسی ثبت‌نام پلتفرم‌ها
    function isRegisteredForex(address _platform) internal pure returns (bool) {
        // در واقعیت باید لیستی از پلتفرم‌های ثبت‌نام شده بررسی شود
        return (_platform == 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4 || 
                _platform == 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2);
    }
    
    function isRegisteredStockExchange(address _exchange) internal pure returns (bool) {
        // در واقعیت باید لیستی از بورس‌های ثبت‌نام شده بررسی شود
        return (_exchange == 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db || 
                _exchange == 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB);
    }
    
    // قابلیت اتصال به سایر ارزهای دیجیتال
    function cryptoBridge(address cryptoToken, uint256 amount) public antiHack {
        require(isSupportedCrypto(cryptoToken), "Crypto not supported");
        _transfer(msg.sender, cryptoToken, amount);
    }
    
    function isSupportedCrypto(address _token) internal view returns (bool) {
        for(uint i = 0; i < cryptoReserves.length; i++) {
            if(cryptoReserves[i] == _token) return true;
        }
        return false;
    }
    
    // سیستم پشتیبان‌گیری از طلای جهانی
    function goldBackup(uint256 goldAmount) public pure returns (uint256) {
        // هر 1 IRcoin معادل 0.001 گرم طلا
        return goldAmount.mul(1000);
    }
    
    // سیستم پشتیبان‌گیری از نفت
    function oilBackup(uint256 oilBarrels) public pure returns (uint256) {
        // هر 1 IRcoin معادل 0.01 بشکه نفت
        return oilBarrels.mul(100);
    }

    // قابلیت تبدیل به سایر ارزهای ملی
    function nationalCurrencyConversion(uint256 amount, string memory currencyCode) public pure returns (uint256) {
        // نرخ‌های تبدیل نمونه (در واقعیت باید از اوراکل استفاده شود)
        if(keccak256(abi.encodePacked(currencyCode)) == keccak256(abi.encodePacked("USD"))) {
            return amount.mul(100); // 1 IRcoin = 100 USD
        } else if(keccak256(abi.encodePacked(currencyCode)) == keccak256(abi.encodePacked("EUR"))) {
            return amount.mul(85); // 1 IRcoin = 85 EUR
        } else if(keccak256(abi.encodePacked(currencyCode)) == keccak256(abi.encodePacked("IRR"))) {
            return amount.mul(4200000); // 1 IRcoin = 4,200,000 IRR
        } else {
            revert("Currency not supported");
        }
    }
}
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
LISTING IRANcoin Global Reserve
x.com : https://x.com/IRANcoinGlobal
website : https://irancoin.godaddysites.com/
IRANcoin listing sites :

https://icoholder.com/en/irancoin-global-reserve-1101693               *****

https://icolink.com/ico-irancoin-global-reserve.html             *****

https://topicolist.com/irancoin-global-reserve     ****

https://coinranking.com/coin/Sttq5gLYw+irancoinglobalreserve-ircoin       ****

https://coincodex.com/crypto/irancoin-global-reserve/            ***

https://www.livecoinwatch.com/price/IRANcoinGlobalReserve-IRCOIN       **

https://www.coinscope.co/coin/ircoin      *

https://cryptonextgem.com/irancoin/

https://www.cyberscope.io/embed/cyberscan?network=BASE&address=0x49ba5d9a00115d494a01fb938ebd94bd919aa445

https://coinvote.cc/en/coin/IRANcoin-Global-Reserve        *

https://coincheckup.com/coins/irancoin-global-reserve       *

https://coinbazooka.com/coin/irancoin-global-reserve-ircoin        *

https://coindiscovery.app/coin/irancoin-global-reserve/overview

https://top100token.com/base/0x49BA5D9A00115D494a01fb938EBd94BD919AA445

https://coinsniper.net/coin/84365           ***

https://coinboom.net/coin/irancoin-global-reserve

https://www.perplexity.ai/search/tell-me-about-the-coin-irancoi-5MBtEaP7TZ6fB9oCJ87alQ

https://www.sushi.com/base/swap?token0=NATIVE&token1=0x49ba5d9a00115d494a01fb938ebd94bd919aa445&swapAmount=1000

https://www.dexview.com/base/0x49BA5D9A00115D494a01fb938EBd94BD919AA445

https://cointoplist.net/coin/irancoin-global-reserve/
and many more best sites
blockchain is base network :  

https://basescan.org/token/0x49ba5d9a00115d494a01fb938ebd94bd919aa445

and contract address :
0x49BA5D9A00115D494a01fb938EBd94BD919AA445

AND LISTED ON BLOCKSCOUT CHAIN WITH GREEN TIK AND LOGO : 
https://base.blockscout.com/token/0x49BA5D9A00115D494a01fb938EBd94BD919AA445
and now have 129 holders
i attach image IRANcoin 200x200x png :

https://i.ibb.co/Cp2WQ46s/IRANcoin-LLC-FOR-IRAN-PEOPLE-200x200x.png

ABOUT IRANcoin Global Reserve :
IRANcoin Global Reserve (IRCOIN) is a cryptocurrency aiming to function as a global payment network by utilizing a basket of fiat-pegged stablecoins stabilized by its own IRcoin reserve currency, with Bitget being one of the exchanges where it can be traded. However, it is important to distinguish this cryptocurrency from a traditional reserve currency, which is a foreign currency held by central banks for international transactions and is typically stable and widely accepted, a status the IRANcoin does not currently hold. 
What IRANcoin Global Reserve is:
A decentralized digital currency: IRANcoin Global Reserve (IRCOIN) is a cryptocurrency designed for global payments and to promote financial fairness and accessibility.
A blockchain-based project: It is deployed on the BASE blockchain and supports various token standards, with a goal to rebuild the traditional payment infrastructure on the blockchain.
A financial ecosystem: The network aims to facilitate programmable payments and open financial infrastructure, using a combination of stablecoins and an IRcoin reserve currency. 
Key Differences from a Global Reserve Currency:
Traditional Reserve Currencies: These are foreign currencies held by central banks and are known for their stability and widespread use in international transactions. The U.S. dollar is currently the dominant world reserve currency.
Volatility and Adoption: IRANcoin, like other cryptocurrencies, faces significant volatility and lacks the broad institutional acceptance and stability needed to become a global reserve currency.
Purpose: While IRANcoin aims to create a new economic and financial technology, its purpose is distinct from a traditional reserve currency, which serves as a store of value and a medium for international trade and investment for central banks.
************************
IRANcoin Global Reserve (IRCOIN) is an Iranian digital cryptocurrency deployed on the BASE blockchain, supporting token standards ERC-20, ERC-721, and ERC-1155. It is designed as a decentralized financial payment network aiming to rebuild traditional payment systems on the blockchain by using a basket of fiat-pegged stablecoins stabilized algorithmically by the reserve currency IRCOIN. Its goal is to create a programmable, stable, and accessible global payment ecosystem originating from Iran's economic and technological context.

Key details include:

Deployed on May 18, 2025
Extremely large total and circulating supply: about 720 sextillion IRCOIN tokens
Traded mainly on decentralized exchanges like Uniswap (V3) and PancakeSwap (v2)
Market activity and liquidity currently appear very low or inactive, with minimal reported trading volume and price data
There are around 101 holders, with some large holders controlling millions of tokens
Intended to enhance global financial fairness, accessibility, and innovation with algorithmic stablecoins backed by IRCOIN as reserve currency
While the coin is ambitious in its scope as a blockchain-based payment network from Iran, it currently lacks significant market presence or adoption and shows signs of being very new. The official website is https://irancoin.godaddysites.com/ and it has a Telegram channel for community contact.

In summary, IRANcoin Global Reserve (IRCOIN) is a token aiming to build a decentralized, stable, and programmable payment infrastructure facilitated by an Iranian-origin stablecoin-backed blockchain system, though active usage and market liquidity seem minimal at this time.

 

IRANcoin Global Reserve (IRCOIN) is a digital cryptocurrency originating from Iran, designed to enhance global financial fairness, accessibility, and innovation. Launched on May 18, 2025, it operates on the BASE blockchain and supports multiple token standards including ERC-20, ERC-721, and ERC-1155.

The coin aims to create a decentralized financial payment network that rebuilds traditional payment systems by using a basket of fiat-pegged stablecoins algorithmically stabilized by IRcoin as the reserve currency. This setup is intended to facilitate programmable payments and the development of open financial infrastructure, with a focus on global financial fairness and innovation.

Key details of IRANcoin Global Reserve include:

Total and circulating supply is extraordinarily large, around 720 sextillion (7.2×10^38) IRcoins.
The coin is traded on decentralized exchanges like Uniswap (V3) and PancakeSwap (V2), but currently shows very low or no active trading volume and liquidity.
It positions itself as a global payment system token, especially for Iranians, aiming to enhance economic and blockchain technology globally.
The project remains in early stages with limited market activity and adoption.
In summary, IRANcoin Global Reserve is an ambitious attempt to develop a stablecoin-backed decentralized payment platform with roots in Iran’s economic context. It aims to provide a foundational asset for innovative, stable, and scalable digital payment solutions, although it is currently a niche and emerging project with minimal market presence so far.
