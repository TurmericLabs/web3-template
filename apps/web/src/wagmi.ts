import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const mumbaiLocalhost = {...polygonMumbai, 
  rpcUrls: {
    public: { http: ['http://localhost:8545'] },
    default: { http: ['http://localhost:8545'] },
  },
}

export const { chains, publicClient } = configureChains(
  [mumbaiLocalhost],
  import.meta.env.ALCHEMY_ID
    ? [
        alchemyProvider({ apiKey: import.meta.env.ALCHEMY_ID }),
        publicProvider(),
      ]
    : [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
