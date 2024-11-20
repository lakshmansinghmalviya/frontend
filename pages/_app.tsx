import { store } from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const QuizAppBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (router.pathname != '/login' && router.pathname != '/signup' && router.pathname != '/') {
      if (!token) {
        router.replace('/');
      }
    }
  }, [pageProps, Component]);

  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </>
  )
}
