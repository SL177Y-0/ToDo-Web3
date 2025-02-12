const {Web3}= require("web3");
const ABI = require("../ABI.json");
const web3 = new Web3("https://eth-sepolia.g.alchemy.com/v2/b20Yg4jZMHRLeuzNknS1pSAgta1Plerw")
const contractAddress = "0x8521b0f0a4cad862745000fc415c9007f53337ee";
const contract = new web3.eth.Contract(ABI,contractAddress);

module.exports={contract}
