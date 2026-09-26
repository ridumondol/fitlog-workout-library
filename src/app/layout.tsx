import type { Metadata } from 'next';
import { FitLogProvider } from './context/FitLogContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'FitLog — Workout Library & Gym Companion',
  description: "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-zinc-950 text-zinc-100 font-sans antialiased min-h-screen flex flex-col overflow-x-hidden">
        <FitLogProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <Toast />
        </FitLogProvider>
      </body>
    </html>
  );
}