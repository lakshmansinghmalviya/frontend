import { persistor, store } from "@/redux/store";
import { getRefreshToken } from "@/services/CommonServices";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const token = getRefreshToken();
    console.log("Another component loaded..");
    if (router.pathname != '/login' && router.pathname != '/signup' && router.pathname != '/') {
      if (!token) {
        router.push('/');
      }
    }
  }, [pageProps, Component]);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
          <ToastContainer />
        </PersistGate>
      </Provider>
    </>
  )
}
