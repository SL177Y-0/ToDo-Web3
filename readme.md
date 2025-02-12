# NOTE - Follow The Readme Files Inside The Directory  
# ✅ Decentralized Task Management dApp 

The **Decentralized Task Management dApp** is a blockchain-powered application designed to manage tasks transparently and securely. It integrates **smart contracts** for immutable task management and leverages **AI** to optimize task prioritization.  

---

## 🚀 Project Overview  

This project consists of three core components:  

### 🔹 **Smart Contract (`/contract`)**  
- Implements task management logic on the blockchain.  
- Ensures decentralized and tamper-proof task tracking.  

### 🔹 **Backend Server (`/backend`)**  
- Built with **NestJS** for handling authentication and API interactions.  
- Uses **Cohere AI** for intelligent task prioritization.  

### 🔹 **Frontend (`/frontend`)**  
- Provides an intuitive **React-based UI** with **wallet authentication**.  
- Integrates **MetaMask** for secure blockchain interaction.  

---

## ⚡ Quick Start  

### **1️⃣ Deploy Smart Contract**  
```bash
# Navigate to contract directory
cd contract

# Compile and deploy to Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia
```
📌 **Retrieve the deployed contract address** and update your frontend/backend configuration.  

### **2️⃣ Set Up Backend Server**  
```bash
cd backend
npm install
```

#### Configure Environment Variables (`.env`):  
```plaintext
DATABASE_URL=mysql://username:password@localhost:3306/dbname
CONTRACT_ADDRESS=your-deployed-contract-address
AI_API_KEY=your-cohere-ai-key
JWT_SECRET=your-secret-key
```

#### Start Backend Server  
```bash
npm run start
```
_(Runs on `http://localhost:5000`)_

### **3️⃣ Set Up Frontend**  
```bash
cd frontend
npm install
```

#### Configure `.env` for Frontend  
```plaintext
REACT_APP_CONTRACT_ADDRESS=your-deployed-contract-address
REACT_APP_BACKEND_URL=http://localhost:5000
```

#### Start Development Server  
```bash
npm run dev
```
_(Runs on `http://localhost:5173`)_

---

## 🎯 Key Features  

✔ **Decentralized Task Management** – Tasks are stored and managed via blockchain smart contracts.  
✔ **Secure Wallet Authentication** – Users log in using **MetaMask** for a seamless Web3 experience.  
✔ **AI-Powered Task Prioritization** – **Cohere AI** analyzes tasks and suggests optimal prioritization.  
✔ **On-Chain Task Verification** – Status updates are recorded immutably on the blockchain.  

---

## 🛠️ Tech Stack  

### **Smart Contract**  
🛠 **Solidity** – Smart contract development  
🛠 **Hardhat** – Development and deployment framework  

### **Backend**  
🛠 **NestJS** – Scalable and modular backend framework  
🛠 **Prisma** – Database ORM for managing tasks  
🛠 **MySQL** – Relational database for backend storage  
🛠 **Cohere AI** – AI model for intelligent task ranking  

### **Frontend**  
🛠 **React.js** – Interactive user interface  
🛠 **TypeScript** – Type-safe frontend development  
🛠 **Tailwind CSS** – Modern UI styling  
🛠 **ethers.js** – Blockchain interaction  

---

## 📜 Deployment  

To deploy this project, use:  

- **Frontend**: Vercel, Netlify  
- **Backend**: Render, Heroku  
- **Database**: Supabase, PlanetScale  
- **Smart Contract**: Sepolia Testnet  

Ensure that **environment variables** are properly configured before deployment.  

---

## 🤝 Contributing  

We welcome contributions! Feel free to fork the repository, make improvements, and submit a pull request.  

---

## 📄 License  

This project is **open-source** and licensed under the **MIT License**.  

---

With this **Decentralized Task Management dApp**, you can securely manage tasks on the blockchain while leveraging **AI-powered prioritization** for better productivity. 🚀
