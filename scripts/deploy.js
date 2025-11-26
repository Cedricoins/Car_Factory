async function main() {
const CarFactory = await ethers.getContractFactory("CarFactory");
const factory = await CarFactory.deploy();
await factory.deployed();
console.log("CarFactory deployed to:", factory.address);
}


main().catch((error) => {
console.error(error);
process.exitCode = 1;
});
