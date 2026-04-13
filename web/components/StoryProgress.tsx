'use client';

import { useI18n } from '@/lib/i18n';

interface StoryProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function StoryProgress({ currentStep, totalSteps }: StoryProgressProps) {
  const { t } = useI18n();
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          {t.common.stepXOfY
            .replace('{current}', currentStep.toString())
            .replace('{total}', totalSteps.toString())}
        </span>
        <span className="text-sm text-gray-500">
          {t.common.percentComplete.replace('{percent}', Math.round(progress).toString())}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
