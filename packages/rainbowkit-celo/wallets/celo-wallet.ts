import type { Chain, Wallet } from "@rainbow-me/rainbowkit";
import { getWalletConnectConnector } from "@rainbow-me/rainbowkit";

import { Alfajores, Baklava, Mainnet } from "../chains";

export interface CeloWalletOptions {
  chains: Chain[];
}

export const CeloWallet = ({
  chains = [Alfajores, Baklava, Mainnet],
}: CeloWalletOptions): Wallet => ({
  id: "celo-wallet",
  name: "Celo Wallet",
  iconUrl:
    "https://registry.walletconnect.com/api/v1/logo/md/36d854b702817e228d5c853c528d7bdb46f4bb041d255f67b82eb47111e5676b",
  iconBackground: "#FFF",
  createConnector: () => {
    const connector = getWalletConnectConnector({
      chains,
    });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return uri;
        },
      },
      desktop: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return `celowallet://wc?uri=${encodeURIComponent(uri)}`;
        },
      },
    };
  },
});

export default CeloWallet;
