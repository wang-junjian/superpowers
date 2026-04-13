export interface Translations {
  common: {
    home: string;
    allSkills: string;
    github: string;
    backToHome: string;
    backToAllSkills: string;
    previous: string;
    next: string;
    startTheStory: string;
    browseAllSkills: string;
    viewAllSkills: string;
    readMore: string;
    seeThisSkillInAction: string;
    story: string;
    skills: string;
    welcomeToSuperpowers: string;
    tagline: string;
    whatIsSuperpowers: string;
    whatIsSuperpowersDesc: string;
    coreWorkflow: string;
    brainstorm: string;
    brainstormDesc: string;
    plan: string;
    planDesc: string;
    implement: string;
    implementDesc: string;
    ship: string;
    shipDesc: string;
    skillsAvailable: string;
    stepXOfY: string;
    percentComplete: string;
    currentSkill: string;
    viewFullSkill: string;
    showSkillPreview: string;
    whatHappenedInThisStep: string;
  };
  story: {
    intro: {
      title: string;
    };
    brainstorming: {
      title: string;
    };
    worktree: {
      title: string;
    };
    planning: {
      title: string;
    };
    implementation: {
      title: string;
    };
    review: {
      title: string;
    };
    finish: {
      title: string;
    };
  };
}

export const translations: Record<string, Translations> = {
  en: {
    common: {
      home: 'Home',
      allSkills: 'All Skills',
      github: 'GitHub',
      backToHome: '← Back to Home',
      backToAllSkills: '← Back to All Skills',
      previous: 'Previous',
      next: 'Next',
      startTheStory: 'Start the Story',
      browseAllSkills: 'Browse All Skills',
      viewAllSkills: 'View all {count} skills →',
      readMore: 'Read more →',
      seeThisSkillInAction: 'See this skill in action',
      story: 'Story',
      skills: 'Skills',
      welcomeToSuperpowers: 'Welcome to Superpowers',
      tagline: 'A complete software development workflow for your coding agents',
      whatIsSuperpowers: 'What is Superpowers?',
      whatIsSuperpowersDesc: 'Superpowers is a system of composable "skills" that change how your coding agent works. Instead of guessing and iterating, agents follow systematic workflows.',
      coreWorkflow: 'The core workflow:',
      brainstorm: 'Brainstorm',
      brainstormDesc: 'Refine ideas into a validated design',
      plan: 'Plan',
      planDesc: 'Break into bite-sized, actionable tasks',
      implement: 'Implement',
      implementDesc: 'Test-Driven Development, subagent review',
      ship: 'Ship',
      shipDesc: 'Verify, review, and finish',
      skillsAvailable: '{count} Skills Available',
      stepXOfY: 'Step {current} of {total}',
      percentComplete: '{percent}% complete',
      currentSkill: 'Current Skill',
      viewFullSkill: 'View Full Skill',
      showSkillPreview: 'Show skill preview',
      whatHappenedInThisStep: 'What happened in this step?',
    },
    story: {
      intro: { title: 'The Idea' },
      brainstorming: { title: 'Brainstorming' },
      worktree: { title: 'Git Worktree' },
      planning: { title: 'Writing Plans' },
      implementation: { title: 'Subagent Development' },
      review: { title: 'Code Review' },
      finish: { title: 'Finishing Up' },
    },
  },
  zh: {
    common: {
      home: '首页',
      allSkills: '所有技能',
      github: 'GitHub',
      backToHome: '← 返回首页',
      backToAllSkills: '← 返回所有技能',
      previous: '上一页',
      next: '下一页',
      startTheStory: '开始故事',
      browseAllSkills: '浏览所有技能',
      viewAllSkills: '查看全部 {count} 个技能 →',
      readMore: '阅读更多 →',
      seeThisSkillInAction: '查看此技能的实际应用',
      story: '故事',
      skills: '技能',
      welcomeToSuperpowers: '欢迎使用 Superpowers',
      tagline: '为你的编码智能体提供完整的软件开发工作流',
      whatIsSuperpowers: '什么是 Superpowers？',
      whatIsSuperpowersDesc: 'Superpowers 是一套可组合的"技能"系统，它改变了编码智能体的工作方式。智能体不再盲目猜测和迭代，而是遵循系统化的工作流程。',
      coreWorkflow: '核心工作流程：',
      brainstorm: '头脑风暴',
      brainstormDesc: '将想法细化为经过验证的设计',
      plan: '规划',
      planDesc: '分解为可执行的小任务',
      implement: '实施',
      implementDesc: '测试驱动开发，子智能体审查',
      ship: '发布',
      shipDesc: '验证、审查并完成',
      skillsAvailable: '{count} 个技能可用',
      stepXOfY: '第 {current} 步，共 {total} 步',
      percentComplete: '已完成 {percent}%',
      currentSkill: '当前技能',
      viewFullSkill: '查看完整技能',
      showSkillPreview: '显示技能预览',
      whatHappenedInThisStep: '这一步发生了什么？',
    },
    story: {
      intro: { title: '想法' },
      brainstorming: { title: '头脑风暴' },
      worktree: { title: 'Git Worktree' },
      planning: { title: '编写计划' },
      implementation: { title: '子智能体开发' },
      review: { title: '代码审查' },
      finish: { title: '完成' },
    },
  },
};
