'use client';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { Skill } from '@/lib/types';
import { storySteps } from '@/lib/story';
import { getSkillName, getSkillDescription, getSkillContent, getStoryTitle } from '@/lib/skill-i18n';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface SkillDetailClientProps {
  skills: Skill[];
}

export default function SkillDetailClient({ skills }: SkillDetailClientProps) {
  const params = useParams();
  const { t, lang } = useI18n();
  const skillId = params.skill as string;
  const skill = skills.find((s) => s.id === skillId);

  if (!skill) {
    notFound();
  }

  const getStoryTitleLocal = (stepId: string) => {
    const step = storySteps.find((s) => s.id === stepId);
    if (!step) return stepId;
    return getStoryTitle(step, lang);
  };

  // Find story steps that use this skill
  const relatedStorySteps = storySteps.filter((step) => step.skillId === skill.id);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/skills" className="text-sm text-gray-500 hover:text-primary-600">
          {t.common.backToAllSkills}
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">{getSkillName(skill, lang)}</h1>
        <p className="text-gray-600 mt-2">{getSkillDescription(skill, lang)}</p>
      </div>

      {/* Related story steps */}
      {relatedStorySteps.length > 0 && (
        <div className="mb-8 p-4 bg-primary-50 border border-primary-200 rounded-xl">
          <h3 className="font-semibold text-primary-900 mb-2">
            {t.common.seeThisSkillInAction}
          </h3>
          <div className="space-y-2">
            {relatedStorySteps.map((step) => (
              <Link
                key={step.id}
                href={`/story/${step.id}`}
                className="block text-primary-700 hover:text-primary-800 font-medium"
              >
                {lang === 'zh' ? '故事' : 'Story'}: {getStoryTitleLocal(step.id)} →
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Skill content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <MarkdownRenderer content={getSkillContent(skill, lang)} />
      </div>
    </div>
  );
}
