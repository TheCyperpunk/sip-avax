import "./globals.css";
import { Connect } from '@stacks/connect-react';
import { userSession } from '../utils/auth';

export const metadata = {
  title: "StacksSIP",
  description: "Decentralized Systematic Investment Plans on Stacks Testnet",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <Connect
          authOptions={{
            appDetails: {
              name: 'StacksSIP',
              icon: '/icon.png',
            },
            userSession,
            onFinish: () => {
              window.location.reload();
            },
          }}
        >
          {children}
        </Connect>
      </body>
    </html>
  );
}
