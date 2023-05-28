import "@/styles/globals.css";
import { AuthProvider } from "@/components/context/AuthContext";
import Navbar from "../components/Navbar/Navbar";
import FavouriteState from "@/components/context/FavouriteState";
import { ThemeProvider } from "@/components/context/ThemeContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider>
      <FavouriteState>
        <Navbar />
        <Component {...pageProps} />
      </FavouriteState>
      </ThemeProvider>
    </AuthProvider>
  );
}
