const hre = require("hardhat");

async function main() {

  const HotelBooking = await hre.ethers.getContractFactory("HotelBooking");
  const hotelBooking = await HotelBooking.deploy();

  await hotelBooking.deployed();

  console.log("contract deployed at : "+ hotelBooking.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
