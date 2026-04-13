'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { Skill } from '@/lib/types';
import SkillCard from '@/components/SkillCard';

interface SkillsListClientProps {
  skills: Skill[];
}

export default function SkillsListClient({ skills }: SkillsListClientProps) {
  const { t } = useI18n();

  // Sort skills alphabetically
  const sortedSkills = [...skills].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-primary-600">
          {t.common.backToHome}
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">{t.common.allSkills}</h1>
        <p className="text-gray-600 mt-2">
          {t.common.skillsAvailable.replace('{count}', sortedSkills.length.toString())}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedSkills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
}
