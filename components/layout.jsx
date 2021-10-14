import Header from "@/components/ui/header";
// import Footer from '@/components/ui/footer'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      {/* <Footer/> */}
    </>
  );
}
