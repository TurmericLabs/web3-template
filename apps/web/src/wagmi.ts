import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { localhost } from "wagmi/chains";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const wagmiConfig = getDefaultConfig({
  appName: "web3-template by TurmericLabs",
  projectId: "YOUR_PROJECT_ID",
  chains: [localhost],
});