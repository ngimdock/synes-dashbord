import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import GXProvider from "@dilane3/gx";
import store from "../gx/store";

import React from "react";
import { Windmill } from "@roketid/windmill-react-ui";
import type { AppProps } from "next/app";
import ModalContainer from "example/components/Modal/ModalContainer";

function MyApp({ Component, pageProps }: AppProps) {
  // suppress useLayoutEffect warnings when running outside a browser
  if (!process.browser) React.useLayoutEffect = React.useEffect;

  return (
    <GXProvider store={store}>
      <Windmill usePreferences={true}>
        <Component {...pageProps} />

        <ModalContainer />
      </Windmill>
    </GXProvider>
  );
}
export default MyApp;
