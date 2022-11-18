<template>
  <div class="">
    <ConnectWalletButton
      class="mx-auto my-10"
      :address="address"
      @click="connect"
      :dark="true"
    /><button
      v-if="address"
      @click="initAccount"
      class="btn btn-xs btn-success flex mx-auto"
    >
      Resync
    </button>
  </div>
  <div
    class="flex flex-col p-0.5 border- justify-center rounded-xl w-full sm:w-3/5 h-64 mt-5 mx-auto bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
  >
    <div
      v-if="address"
      class="flex flex-col h-full bg-gray-800 text-white rounded-lg p-1"
    >
      <span class="flex flex-col">
        <span class="text-blue-400">Address:</span> {{ address }}</span
      >
      <span class="flex flex-col">
        <span class="text-blue-400">balance</span> {{ balance }}</span
      >
      <span class="flex flex-col">
        <span class="text-blue-400">Blocknumber:</span> {{ blockNumber }}</span
      >
      <span class="flex flex-col">
        <span class="text-blue-400">chainId</span> {{ cId }}</span
      >
      <span class="flex flex-col">
        <span class="text-blue-400">chainName </span>{{ chainName }}</span
      >
    </div>
    <div
      v-if="!address"
      class="flex flex-col h-full bg-gray-900 text-white rounded-lg p-1"
    >
      <div class="flex align-middle justify-center mt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="text-gray-600 animate-pulse icon icon-tabler icon-tabler-arrow-big-up-lines"
          width="60"
          height="60"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M9 12h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v3h-6v-3z"
          ></path>
          <path d="M9 21h6"></path>
          <path d="M9 18h6"></path>
        </svg>
      </div>
    </div>
  </div>
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
import { ref, onMounted, reactive } from "vue";
import { ethers } from "ethers";
import { ConnectWalletButton } from "vue-connect-wallet";
import { useMetaMaskWallet } from "vue-connect-wallet";

const address = ref("");
const balance = ref("");
const blockNumber = ref("sync...");
const cId = ref(0);
const chainName = ref("sync...");
const wallet = useMetaMaskWallet();

wallet.onAccountsChanged((accounts) => {
  console.log("account changed to: ", accounts[0]);
  address.value = accounts[0];
  initAccount();
});
wallet.onChainChanged((chainId) => {
  console.log("chain changed to:", chainId);
  window.location.reload();
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
  initAccount();
  if (typeof accounts === "string") return false;
  return accounts.length > 0;
};
onMounted(() => {
  isConnected();
});

// Ethers
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// init the account to ethers
const initAccount = async () => {
  balance.value = await provider.getBalance(address.value);
  blockNumber.value = await provider.getBlockNumber();
  var { name, chainId } = await provider.getNetwork();
  console.log(name, chainId);
  cId.value = chainId;
  chainName.value = name;
};
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
