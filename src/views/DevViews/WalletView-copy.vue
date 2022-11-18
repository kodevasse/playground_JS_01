<template>
  <div class="">
    <ConnectWalletButton
      class="mx-auto my-10"
      :address="address"
      @click="connect"
      :dark="true"
    />
  </div>
  <span class=""> {{ address }}</span>
  <!-- <div class="p-4 flex flex-col space-y-6 pt-10">
    <button class="btn btn-warning" @click="connectWallet">
      Connect Wallet
    </button>
    <button class="btn" :disabled="myAddress" @click="getAccountInfo">
      Get Account Info</button
    >{{ blockNumber }}<br />{{ balance }}<br />{{ myAddress }} 
  </div> -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ethers } from "ethers";
import { ConnectWalletButton } from "vue-connect-wallet";
import { useMetaMaskWallet } from "vue-connect-wallet";

const address = ref("");
const chainId = ref("");
const wallet = useMetaMaskWallet();

wallet.onAccountsChanged((accounts) => {
  console.log("account changed to: ", accounts[0]);
  address.value = accounts[0];
});
wallet.onChainChanged((chainId) => {
  console.log("chain changed to:", chainId);
});

const connect = async () => {
  const accounts = await wallet.connect();
  if (typeof accounts === "string") {
    console.log("An error occurred" + accounts);
  }
  address.value = accounts[0];
};

const switchAccount = async () => {
  await wallet.switchAccounts();
  connect();
};

const isConnected = async () => {
  const accounts = await wallet.getAccounts();
  address.value = accounts[0];
  if (typeof accounts === "string") return false;
  return accounts.length > 0;
};
onMounted(() => {
  isConnected();
});
// const provider = new ethers.providers.Web3Provider(window.ethereum);

// const signer = provider.getSigner();

// const connectWallet = async () => {
//   await provider.send("eth_requestAccounts", []);
//   getAccountInfo();
// };

// const blockNumber = ref();
// const balance = ref();
// const myAddress = ref();
// const getAccountInfo = async () => {
//   blockNumber.value = await provider.getBlockNumber();
//   myAddress.value = await signer.getAddress();
//   balance.value = await provider.getBalance(myAddress.value);
// };
</script>
