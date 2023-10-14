import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { arbitrum, bsc, bscTestnet, optimism, polygon } from "wagmi/chains";

// WalletConnect API Key
const ABI_KEY = "0b5af3e3a2f611979b36be387f8ea8ad";

const { chains, publicClient } = configureChains(
  [bscTestnet, polygon, optimism, arbitrum, bsc],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "BabbuCity",
  projectId: ABI_KEY,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { wagmiConfig, chains };
