import localFont from "next/font/local";
import "./globals.css";

const liShadhinata = localFont({
  src: [
    {
      path: "../public/fonts/Li-Shadhinata2-Unicode.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../public/fonts/Li-Shadhinata2-Unicode-Italic.ttf",
      weight: "400",
      style: "italic"
    }
  ],
  variable: "--font-li-shadhinata",
  display: "swap"
});

export const metadata = {
  title: "প্রেস্টিজ রান্নাঘর | প্রিমিয়াম কুকিং পট অফার",
  description:
    "প্রেস্টিজ কুকিং পট এর আকর্ষণীয় অফার। সীমিত সময়ের জন্য অর্ডার করুন এবং ঘরে বসে ডেলিভারি নিন।",
  icons: {
    icon: "/logo.svg"
  }
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#d44b66",
  viewportFit: "cover"
};
export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={liShadhinata.variable}>
      <body>{children}</body>
    </html>
  );
}
