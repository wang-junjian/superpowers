'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';

export default function ClientHeader() {
  const { t } = useI18n();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Superpowers Skills Guide</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/skills"
            className="text-sm text-gray-600 hover:text-primary-600"
          >
            {t.common.allSkills}
          </Link>
          <a
            href="https://github.com/obra/superpowers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-primary-600"
          >
            {t.common.github}
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
