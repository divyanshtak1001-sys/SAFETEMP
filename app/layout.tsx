import type { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
    title: 'SAFE-NET AI - Advanced Phishing Detection & Cyber Fraud Prevention',
    description: 'Advanced Phishing Detection & Cyber Fraud Prevention System powered by AI',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
