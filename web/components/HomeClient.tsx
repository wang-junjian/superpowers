'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { storySteps } from '@/lib/story';
import { Skill } from '@/lib/types';
import { getSkillName, getSkillDescription } from '@/lib/skill-i18n';

interface HomeClientProps {
  skills: Skill[];
}

const workflowPhases = [
  {
    id: 'design',
    skills: ['brainstorming'],
  },
  {
    id: 'setup',
    skills: ['using-git-worktrees'],
  },
  {
    id: 'planning',
    skills: ['writing-plans'],
  },
  {
    id: 'implementation',
    skills: [
      'subagent-driven-development',
      'executing-plans',
      'test-driven-development',
      'dispatching-parallel-agents',
    ],
  },
  {
    id: 'debugging',
    skills: [
      'systematic-debugging',
      'verification-before-completion',
    ],
  },
  {
    id: 'review',
    skills: [
      'requesting-code-review',
      'receiving-code-review',
    ],
  },
  {
    id: 'completion',
    skills: ['finishing-a-development-branch'],
  },
  {
    id: 'meta',
    skills: [
      'using-superpowers',
      'writing-skills',
    ],
  },
];

const getPhaseNames = (lang: string) => {
  if (lang === 'zh') {
    return {
      design: '1. 需求分析与设计',
      setup: '2. 创建隔离环境',
      planning: '3. 编写实施计划',
      implementation: '4. 实施开发',
      debugging: '5. 调试验证',
      review: '6. 代码审查',
      completion: '7. 完成发布',
      meta: '元技能',
    };
  }
  return {
    design: '1. Requirements & Design',
    setup: '2. Isolated Workspace',
    planning: '3. Implementation Planning',
    implementation: '4. Development',
    debugging: '5. Debugging & Verification',
    review: '6. Code Review',
    completion: '7. Completion',
    meta: 'Meta Skills',
  };
};

export default function HomeClient({ skills }: HomeClientProps) {
  const { t, lang } = useI18n();
  const phaseNames = getPhaseNames(lang);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t.common.welcomeToSuperpowers}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {t.common.tagline}
        </p>

        <div className="flex gap-4 justify-center">
          <Link href={`/story/${storySteps[0].id}`} className="btn-primary text-lg">
            {t.common.startTheStory}
          </Link>
          <Link href="/skills" className="btn-secondary text-lg">
            {t.common.browseAllSkills}
          </Link>
        </div>
      </div>

      {/* What is Superpowers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t.common.whatIsSuperpowers}
        </h2>
        <div className="prose prose-slate max-w-none">
          <p>
            {t.common.whatIsSuperpowersDesc}
          </p>
        </div>
      </div>

      {/* Skills by workflow phase */}
      <div className="space-y-8 mb-8">
        {workflowPhases.map((phase) => (
          <div key={phase.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {phaseNames[phase.id as keyof typeof phaseNames]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {phase.skills.map((skillId) => {
                const skill = skills.find(s => s.id === skillId);
                if (!skill) return null;
                return (
                  <Link
                    key={skillId}
                    href={`/skills/${skillId}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900">
                      {getSkillName(skill, lang)}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {getSkillDescription(skill, lang)}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* All skills link */}
      <div className="text-center">
        <Link href="/skills" className="text-primary-600 hover:text-primary-700 font-medium text-lg">
          {t.common.viewAllSkills.replace('{count}', skills.length.toString())}
        </Link>
      </div>
    </div>
  );
}
