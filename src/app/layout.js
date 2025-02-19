import "@/app/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FloWeather",
  description: "Pagina para realizar cuentas para climatizar hospedajes en tu ciudad",
  manifest: "/pwa/manifest.json",
};

export default async function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        <main className="py-8">
       
          {children}
      
        </main>
        <Footer />
      </body>
    </html>
  );
}
