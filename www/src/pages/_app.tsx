import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../../components/Header";
import withUrql from "../utils/client";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="container mx-auto max-w-5xl">
        <Header />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default withUrql(MyApp);
