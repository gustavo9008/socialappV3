import Header from "@/components/ui/header";
import Footer from "@/components/layout/Footer";
import { ToastWrapper } from "context/state";

export default function Layout({ children }) {
  return (
    <>
      <ToastWrapper>
        <Header />
        {children}
        <Footer />
      </ToastWrapper>
    </>
  );
}
