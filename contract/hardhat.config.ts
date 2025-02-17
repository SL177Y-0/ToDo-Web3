import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const sepoliaRpcUrl = process.env.SEPOLIA_RPC_URL;
const privateKey = process.env.PRIVATE_KEY;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

console.log("SEPOLIA_RPC_URL:", process.env.SEPOLIA_RPC_URL);
console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY ? "Loaded" : "Missing");
console.log("ETHERSCAN_API_KEY:", process.env.ETHERSCAN_API_KEY ? "Loaded" : "Missing");

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20", // ✅ Match contract version
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    sepolia: {
      url: sepoliaRpcUrl || "",
      accounts: privateKey ? [privateKey] : [],
      chainId: 11155111,
      gas: 5000000, // Set a higher gas limit for transactions (adjust as needed)
      gasPrice: 20000000000, // Optional: Set a custom gas price if needed (e.g., 20 gwei)
    },
    hardhat: {
      chainId: 31337,
      mining: {
        auto: true,
        interval: 5000, // Ensure stable block mining
      },
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
  etherscan: {
    apiKey: etherscanApiKey,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
};

export default config;

