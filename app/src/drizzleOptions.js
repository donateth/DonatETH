import DonatETH from "./contracts/DonatETH.json";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    },
  },
  contracts: [DonatETH],
  polls: {
    accounts: 1500,
  },
};

export default options;
