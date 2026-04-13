'use client';

import { useI18n } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          lang === 'en'
            ? 'bg-primary-100 text-primary-700 font-medium'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('zh')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          lang === 'zh'
            ? 'bg-primary-100 text-primary-700 font-medium'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        中文
      </button>
    </div>
  );
}
