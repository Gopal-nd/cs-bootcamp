import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl("mainnet-beta"));
const data = connection.getAccountInfo(new PublicKey('214TZ3rwmhS9e1DX26dwTQ1zKDZw2yn7ZxtqhEZfzfsq')).then((data) => {
  console.log(data)
})
