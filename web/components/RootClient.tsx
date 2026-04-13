'use client';

import { Skill } from '@/lib/types';
import ClientProviders from './ClientProviders';
import SidebarI18n from './SidebarI18n';
import ClientHeader from './ClientHeader';

interface RootClientProps {
  skills: Skill[];
  children: React.ReactNode;
}

export default function RootClient({ skills, children }: RootClientProps) {
  return (
    <ClientProviders>
      <SidebarI18n skills={skills} currentPath="" />
      <div className="ml-72">
        <ClientHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </ClientProviders>
  );
}
