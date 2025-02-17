import { ethers } from "hardhat";

async function main() {
  console.log("Starting EnhancedTodoList contract deployment....");

  const todoListFactory = await ethers.getContractFactory("EnhancedTodoList");
  const todoList = await todoListFactory.deploy();

  await todoList.waitForDeployment();
  
  const deployedAddress = await todoList.getAddress();
  console.log(`EnhancedTodoList deployed to: ${deployedAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
