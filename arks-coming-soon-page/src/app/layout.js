import { Nunito } from 'next/font/google';
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: "Sliq Pay",
  description: "Pay anyone in the world instantly, with a click.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://sliqpay.wordpress.com/wp-includes/css/dist/block-library/style.min.css"
        />
      </head>
      <body className={`${nunito.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
