import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ShareTaxxi | Your journey. Better when shared.',
  description:
    'Share the journey, split the cost, and make everyday travel more affordable. ShareTaxxi is preparing for launch in Kerala, India.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
