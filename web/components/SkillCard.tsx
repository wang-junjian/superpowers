'use client';

import Link from 'next/link';
import { Skill } from '@/lib/types';
import { useI18n } from '@/lib/i18n';
import { getSkillName, getSkillDescription } from '@/lib/skill-i18n';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const { lang } = useI18n();
  const name = getSkillName(skill, lang);
  const description = getSkillDescription(skill, lang);

  return (
    <Link
      href={`/skills/${skill.id}`}
      className="block p-6 bg-white border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}
