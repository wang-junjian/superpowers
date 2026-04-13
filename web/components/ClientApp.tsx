'use client';

import { useI18n } from '@/lib/i18n';
import ClientSidebar from './ClientSidebar';
import ClientHeader from './ClientHeader';
import { Skill } from '@/lib/types';

interface ClientAppProps {
  skills: Skill[];
  children: React.ReactNode;
}

export default function ClientApp({ skills, children }: ClientAppProps) {
  return (
    <div className="min-h-screen">
      <ClientSidebar skills={skills} currentPath="" />
      <div className="ml-72">
        <ClientHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
