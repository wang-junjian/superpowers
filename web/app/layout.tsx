import type { Metadata } from 'next';
import './globals.css';
import RootClient from '@/components/RootClient';
import { getSkillsServer } from '@/lib/skills-server';

export const metadata: Metadata = {
  title: 'Superpowers Skills Guide',
  description: 'Learn how to use Superpowers skills through an interactive story',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const skills = await getSkillsServer();

  return (
    <html lang="en">
      <body className="min-h-screen">
        <RootClient skills={skills}>
          {children}
        </RootClient>
      </body>
    </html>
  );
}
