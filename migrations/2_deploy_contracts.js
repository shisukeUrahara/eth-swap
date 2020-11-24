const Dapp = artifacts.require("Dapp");
const EthSwap = artifacts.require("EthSwap");
const abcToken=artifacts.require('Abc');

module.exports = async function(deployer) {
  // Deploy Token
  await deployer.deploy(Dapp);
  const dapp = await Dapp.deployed();
  await deployer.deploy(abcToken);
  const abc =await abcToken.deployed();

  // await token.totalSupply(1000000000000000000000000)

  // Deploy EthSwap
  await deployer.deploy(EthSwap);
  const ethSwap = await EthSwap.deployed();

  let DAPP=web3.utils.fromAscii('DAPP');
  await ethSwap.addToken(DAPP,dapp.address);

  let ABC=web3.utils.fromAscii('ABC');
  await ethSwap.addToken(ABC,abc.address);

  // Transfer all tokens to EthSwap (1 million)
  // await token.transfer(ethSwap.address, '1000000000000000000000000');
  const amount=web3.utils.toWei('1000000');
  await dapp.faucet(ethSwap.address, amount);
  await abc.faucet(ethSwap.address,amount);


};