import "@/styles/globals.css";
import { AuthProvider } from "@/components/context/AuthContext";
import Navbar from "../components/Navbar/Navbar";
import FavouriteState from "@/components/context/FavouriteState";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <FavouriteState>
        <Navbar />
        <Component {...pageProps} />
      </FavouriteState>
    </AuthProvider>
  );
}
