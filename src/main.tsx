import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import GlobalStyles from "../public/assets/GlobalStyles/index.tsx";
import { Provider } from "react-redux";
import store from "./redux";
import { WagmiConfig } from "wagmi";
import { chains, wagmiConfig } from "./service/Web3/Web3Service.tsx";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <GlobalStyles>
              <App />
              <ToastContainer />
            </GlobalStyles>
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
