'use client';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { Skill } from '@/lib/types';
import {
  storySteps,
  getStoryStep,
  getNextStepId,
  getPrevStepId,
  getStepIndex,
} from '@/lib/story';
import { getStoryTitle } from '@/lib/skill-i18n';
import StoryProgress from '@/components/StoryProgress';
import StoryStep from '@/components/StoryStep';

interface StoryStepClientProps {
  skills: Skill[];
}

export default function StoryStepClient({ skills }: StoryStepClientProps) {
  const params = useParams();
  const { t, lang } = useI18n();
  const stepId = params.step as string;
  const step = getStoryStep(stepId);

  if (!step) {
    notFound();
  }

  const getStoryTitleLocal = (id: string) => {
    const s = storySteps.find((x) => x.id === id);
    if (!s) return id;
    return getStoryTitle(s, lang);
  };

  const skill = step.skillId ? skills.find((s) => s.id === step.skillId) : undefined;
  const nextStepId = getNextStepId(stepId);
  const prevStepId = getPrevStepId(stepId);
  const currentIndex = getStepIndex(stepId);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-primary-600">
          {t.common.backToHome}
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">
          {getStoryTitleLocal(stepId)}
        </h1>
      </div>

      <StoryProgress currentStep={currentIndex + 1} totalSteps={storySteps.length} />

      <StoryStep step={step} skill={skill} showSkillDetails={true} />

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200">
        <div>
          {prevStepId ? (
            <Link
              href={`/story/${prevStepId}`}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <span>←</span>
              {t.common.previous}
            </Link>
          ) : (
            <Link href="/" className="btn-secondary inline-flex items-center gap-2">
              <span>←</span>
              {t.common.backToHome}
            </Link>
          )}
        </div>
        <div>
          {nextStepId ? (
            <Link
              href={`/story/${nextStepId}`}
              className="btn-primary inline-flex items-center gap-2"
            >
              {t.common.next}: {getStoryTitleLocal(nextStepId)}
              <span>→</span>
            </Link>
          ) : (
            <Link href="/skills" className="btn-primary inline-flex items-center gap-2">
              {t.common.browseAllSkills}
              <span>→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
