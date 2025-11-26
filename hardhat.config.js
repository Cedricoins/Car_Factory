require("@nomiclabs/hardhat-waffle");
require("dotenv").config();


module.exports = {
solidity: "0.8.19",
networks: {
localhost: { url: "http://127.0.0.1:8545" },
// ajoute testnets/mainnet si besoin et configure PRIVATE_KEY et RPC_URL dans .env
}
};
