import "../app/globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata = {
  title: "Uzum Business Clone",
  description: "Uzum Seller Business Panel Clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body className="flex bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        <main className="flex-1">
          {/* Header */}
          <Header />
          <div className="">{children}</div>
        </main>
      </body>
    </html>
  );
}
