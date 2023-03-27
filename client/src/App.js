import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import HotelBooking from "./artifacts/contracts/HotelBooking.sol/HotelBooking.json"
import { useState, useEffect } from "react"
import AddHotel from './components/AddHotel';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import DisplayHotel from './components/DisplayHotel';


function App() {

  const [account, setAccount] = useState();
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [load, setLoad] = useState();

;

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        })
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        })

        await provider.send("eth_requestAccounts", [])

        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        // let contractAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";
        const ad = await provider.getCode(address);
        console.log(ad);
        const contract = new ethers.Contract(contractAddress, HotelBooking.abi, signer)
        console.log(contract);
        setContract(contract);
        setProvider(provider);

      } else {
        console.log("Metamask not installed");
      }
    }
    setLoad(loadProvider)
    provider && loadProvider();
  }, [])

  return (
    <>
      <div>
        <Navbar account={account} ></Navbar>
        <DisplayHotel></DisplayHotel>
        <Profile account={account} contract={contract} provider={provider}></Profile>
        <AddHotel contract={contract} provider={provider} account={account} ></AddHotel>
      </div>
    </>

  );
}

export default App;
