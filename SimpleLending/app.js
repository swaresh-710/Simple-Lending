const express = require('express');
const app = express();
const ethers = require('ethers');


const providerUrl = 'https://rpc-fullnodes-testnet.glitch.finance/';
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

// Replace with your private key or wallet mnemonic
const privateKey = 'YOUR_PRIVATE_KEY_OR_MNEMONIC';

const wallet = new ethers.Wallet(privateKey, provider);

// Replace with the contract address and ABI of your deployed contract
const contractAddress = '0xB7E5482Ded616fE8f8Cb1d6BDEb1E8Aa39c3B4C8';
const contractABI = [[
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Deposited",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawn",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalDeposits",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalDeposits",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]];

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function deposit(amount) {
    const depositAmount = ethers.utils.parseEther(amount);
    const tx = await contract.deposit({ value: depositAmount });
    await tx.wait();
    console.log(`Deposited ${amount} ETH`);
}

async function withdraw(amount) {
    const withdrawAmount = ethers.utils.parseEther(amount);
    const tx = await contract.withdraw(withdrawAmount);
    await tx.wait();
    console.log(`Withdrawn ${amount} ETH`);
}

async function getBalance(userAddress) {
    const balance = await contract.getBalance(userAddress);
    console.log(`Balance of ${userAddress}: ${ethers.utils.formatEther(balance)} ETH`);
}

async function getTotalDeposits() {
    const totalDeposits = await contract.getTotalDeposits();
    console.log(`Total deposits: ${ethers.utils.formatEther(totalDeposits)} ETH`);
}

// Replace with your desired actions
deposit('0.1'); // Deposit 0.1 ETH
withdraw('0.05'); // Withdraw 0.05 ETH
getBalance('YOUR_USER_ADDRESS'); // Get balance of a specific address
getTotalDeposits(); // Get total deposits

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});