import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Список контактов с поиском",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/proxima-nova-2"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
