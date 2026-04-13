import Link from 'next/link';
import { storySteps } from '@/lib/story';
import { getSkills } from '@/lib/skills';

export default async function Sidebar({ currentPath }: { currentPath: string }) {
  const skills = await getSkills();
  const currentStoryStep = currentPath.startsWith('/story/')
    ? currentPath.replace('/story/', '')
    : null;

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
            Story
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
                    <span className="truncate">{step.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Skills Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Skills
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
