import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import GXProvider from "@dilane3/gx";
import store from "../gx/store";

import React from "react";
import { Windmill } from "@roketid/windmill-react-ui";
import type { AppProps } from "next/app";
import ModalContainer from "example/components/Modal/ModalContainer";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  if (typeof window !== "undefined") React.useLayoutEffect = React.useEffect;

  return (
    <GXProvider store={store}>
      <Windmill usePreferences={true}>
        <Component {...pageProps} />

        <ModalContainer />
        <ToastContainer 
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
        />
      </Windmill>
    </GXProvider>
  );
}
export default MyApp;
