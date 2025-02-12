import PropTypes from "prop-types";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import ABI from "./ABI.json";

const Wallet = ({ saveState }) => {
  const navigateTo = useNavigate();
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const contractAddress = "0x8521b0f0a4Cad862745000fc415c9007F53337Ee";
        const contract = new web3.eth.Contract(ABI, contractAddress);
        saveState({ web3: web3, contract: contract, account: accounts[0] });
        navigateTo("/view-all-tasks");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="wallet_header">
        <span>WELCOME</span> <p> USER </p>
      </div>
      <div className="connect_wallet_section todo_btn">
        <p> PLEASE CONNECT METAMASK WALLET </p>
        <button onClick={connectWallet}>KONNECT</button>
      </div>
    </>
  );
};

Wallet.propTypes = {
  saveState: PropTypes.func.isRequired,
};

export default Wallet;