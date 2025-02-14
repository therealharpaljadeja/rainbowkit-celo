import {
  Chain,
  getWalletConnectConnector,
  Wallet,
} from "@rainbow-me/rainbowkit";
import { Alfajores, Baklava, Mainnet } from "../chains";

export interface CeloTerminalOptions {
  chains: Chain[];
}

export const CeloTerminal = ({
  chains = [Alfajores, Baklava, Mainnet],
}: CeloTerminalOptions): Wallet => ({
  id: "celo-terminal",
  name: "Celo Terminal",
  iconUrl:
    "https://registry.walletconnect.com/api/v1/logo/md/8f8506b7f191a8ab95a8295fc8ca147aa152b1358bee4283d6ad2468d97e0ca4",
  iconBackground: "#FFF",
  createConnector: () => {
    const connector = getWalletConnectConnector({
      chains,
    });

    return {
      connector,
      desktop: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          // Note: This doesn't work. I'll try to have a PR to add deeplinking to CeloTerminal - Nicolas
          return `https://celoterminal.com/wc?uri=${encodeURIComponent(uri)}`;
        },
      }
    };
  },
});

export default CeloTerminal;
