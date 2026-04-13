'use client';

import Link from 'next/link';
import { StoryStep as StoryStepType, Skill } from '@/lib/types';
import { useI18n } from '@/lib/i18n';
import { getSkillName, getSkillDescription, getSkillContent, getStoryContent, getWhatHappened } from '@/lib/skill-i18n';
import MarkdownRenderer from './MarkdownRenderer';

interface StoryStepProps {
  step: StoryStepType;
  skill?: Skill;
  showSkillDetails?: boolean;
}

export default function StoryStep({ step, skill, showSkillDetails = false }: StoryStepProps) {
  const { t, lang } = useI18n();
  const storyContent = getStoryContent(step, lang);
  const whatHappened = getWhatHappened(step, lang);

  return (
    <div className="space-y-8">
      {/* Story content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="prose prose-slate max-w-none">
          <MarkdownRenderer content={storyContent} />
        </div>
      </div>

      {/* Skill card */}
      {skill && (
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-primary-900 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                {t.common.currentSkill}: {getSkillName(skill, lang)}
              </h3>
              <p className="text-primary-800 mt-2">{getSkillDescription(skill, lang)}</p>
            </div>
            <Link
              href={`/skills/${skill.id}`}
              className="btn-primary whitespace-nowrap"
            >
              {t.common.viewFullSkill}
            </Link>
          </div>
          {showSkillDetails && (
            <div className="mt-4 pt-4 border-t border-primary-200">
              <details className="group">
                <summary className="cursor-pointer font-medium text-primary-800 hover:text-primary-900">
                  {t.common.showSkillPreview}
                </summary>
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <MarkdownRenderer content={getSkillContent(skill, lang).slice(0, 1000) + '...'} />
                  <Link
                    href={`/skills/${skill.id}`}
                    className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {t.common.readMore}
                  </Link>
                </div>
              </details>
            </div>
          )}
        </div>
      )}

      {/* What happened section */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">📝</span>
          {t.common.whatHappenedInThisStep}
        </h3>
        <ul className="space-y-3">
          {whatHappened.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
