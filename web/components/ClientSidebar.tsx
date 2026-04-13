'use client';

import Link from 'next/link';
import { storySteps } from '@/lib/story';
import { Skill } from '@/lib/types';
import { useI18n } from '@/lib/i18n';

interface ClientSidebarProps {
  skills: Skill[];
  currentPath: string;
}

export default function ClientSidebar({ skills, currentPath }: ClientSidebarProps) {
  const { t, lang } = useI18n();
  const currentStoryStep = currentPath.startsWith('/story/')
    ? currentPath.replace('/story/', '')
    : null;

  const getStoryTitle = (stepId: string) => {
    if (lang === 'zh') {
      const zhTitles: Record<string, string> = {
        intro: '想法',
        brainstorming: '头脑风暴',
        worktree: 'Git Worktree',
        planning: '编写计划',
        implementation: '子智能体开发',
        review: '代码审查',
        finish: '完成',
      };
      return zhTitles[stepId] || stepId;
    }
    const step = storySteps.find(s => s.id === stepId);
    return step?.title || stepId;
  };

  return (
    <aside className="w-72 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <Link href="/" className="text-xl font-bold text-gray-900 hover:text-primary-600">
          Superpowers
        </Link>
        <p className="text-sm text-gray-500 mt-1">Skills Guide</p>
      </div>

      <nav className="p-4 space-y-6">
        {/* Story Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            {t.common.story}
          </h3>
          <ul className="space-y-1">
            {storySteps.map((step, index) => {
              const isActive = currentStoryStep === step.id;
              const stepNumber = index + 1;

              return (
                <li key={step.id}>
                  <Link
                    href={`/story/${step.id}`}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                      isActive
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {stepNumber}
                    </span>
                    <span className="truncate">{getStoryTitle(step.id)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Skills Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            {t.common.skills}
          </h3>
          <ul className="space-y-1">
            {skills.map((skill) => {
              const isActive = currentPath === `/skills/${skill.id}`;

              return (
                <li key={skill.id}>
                  <Link
                    href={`/skills/${skill.id}`}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="truncate">{skill.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
