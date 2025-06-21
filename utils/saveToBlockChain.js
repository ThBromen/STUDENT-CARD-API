import { ethers } from "ethers";
import dotenv from "dotenv";
import QRCode from "qrcode";
import fs from "fs";
dotenv.config();

const abi = [
  "function storeID(uint256 _id, string memory _data) public",
  "function getID(uint256 _id) public view returns (string memory)"
];

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

export default async function saveToBlockChainAndGetQRFileLocation(regNumber, yearOfStudy, name, department, school, program) {
  const data = `${regNumber}-${yearOfStudy}-${name}-${department}-${school}`;
  const id = `${regNumber}${Math.floor(Math.random() * 100)}`;
  

  const tx = await contract.storeID(id, data);
  await tx.wait();
  console.log("Transaction hash:", tx.hash);
  console.log("✅ ID stored on-chain!");


  // Prepare QR file path
  const qrDir = "./qrcodes";
  if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir);
  }
  const qrFileLocation = `${qrDir}/${id}.png`;

  const qrLink = `https://sepolia.etherscan.io/tx/${tx.hash}`;
  await QRCode.toFile(qrFileLocation, qrLink);
  console.log("✅ QR code saved to:", qrFileLocation);

  return {qrFileLocation, hash: tx.hash};

}
