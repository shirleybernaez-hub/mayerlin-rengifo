import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata = {
  title: "Mayerlin Rengifo | Asesoría Inmobiliaria",
  description: "Asesoría inmobiliaria de alto nivel en Caracas, Venezuela.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased bg-black">
        <div className="grain-overlay" aria-hidden="true" />
        <Navbar />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
