import Blog from "@/components/Blog";
import Consejo from "@/components/Consejo";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Inicio from "@/components/Inicio";
import Nosotros from "@/components/Nosotros";


export default function Home() {
  return (
    <section className="flex flex-col w-full">   
          <Header/> 
         <Inicio /> 
        <Nosotros/>
         <Consejo />
        <Blog/>
        <Contact/>
        <Footer/> 
    </section>
  );
}
