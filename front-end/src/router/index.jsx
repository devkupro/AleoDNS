import { Outlet, createBrowserRouter } from "react-router-dom";
import AuthProvider from "../context/AuthProvider";
import DashBoard from "../pages/DashBoard";
import DNS from "../pages/DNS";
import Marketplace from "../pages/Marketplace";
import Check from "../pages/Check";
import {
  WalletProvider,
  useWallet,
} from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { useMemo } from "react";
// eslint-disable-next-line react-refresh/only-export-components
const AuthLayout = () => {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "Leo Demo App",
      }),
    ],
    []
  );
  return (
    <div className="mb-1">
      <WalletProvider
        wallets={wallets}
        decryptPermission={DecryptPermission.UponRequest}
        network={WalletAdapterNetwork.Localnet}
        localStorageKey="wallets"
        autoConnect
      >
        <WalletModalProvider>
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        </WalletModalProvider>
      </WalletProvider>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <DashBoard />,
    children: [
      {
        element: <DashBoard />,
        path: "/",
      },
      {
        element: <DashBoard />,
        path: "/register",
      },
      {
        element: <DNS />,
        path: "/dns",
      },
      {
        element: <Marketplace />,
        path: "/marketplace",
      },
      {
        element: <Check />,
        path: "/check",
      },
    ],
  },
]);
