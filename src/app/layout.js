import "./global.scss";

export const metadata = {
  title: "Tic-Tac-Toe",
  description: "A fun game to play with friends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
