import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Makes from "@/components/Makes";
import Shop from "@/components/Shop";
import About from "@/components/About";
import Steps from "@/components/Steps";
import OrderForm from "@/components/OrderForm";
import Social from "@/components/Social";
import Footer from "@/components/Footer";
import Scallop from "@/components/Scallop";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#shop">Skip to the shop</a>
      <Nav />
      <main id="top">
        <Hero />
        <Scallop color="var(--color-paper-2)" />
        <Makes />
        <Shop />
        <About />
        <Scallop color="var(--color-paper)" />
        <Steps />
        <OrderForm />
        <Social />
      </main>
      <Footer />
    </>
  );
}
