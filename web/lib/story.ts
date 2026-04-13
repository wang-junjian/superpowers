import { StoryStep } from './types';

export const storySteps: StoryStep[] = [
  {
    id: 'intro',
    title: 'The Idea',
    titleZh: '想法',
    storyContent: `
# It starts with an idea

You open your coding agent and say:

> "I want to add a new skill to Superpowers that helps with debugging CSS layout issues."

The agent doesn't just start writing code. It pauses.

Because Superpowers skills change the agent's behavior from "guess and go" to "systematic workflow."
`,
    storyContentZh: `
# 从一个想法开始

你打开编码智能体并说：

> "我想给 Superpowers 添加一个新技能，帮助调试 CSS 布局问题。"

智能体不会直接开始写代码。它会停下来。

因为 Superpowers 技能会将智能体的行为从"猜测并前进"改变为"系统化工作流"。
`,
    whatHappened: [
      'You have an idea for a new feature',
      'You tell your coding agent what you want',
      'The agent recognizes this needs a structured approach'
    ],
    whatHappenedZh: [
      '你有了一个新功能的想法',
      '你告诉编码智能体你想要什么',
      '智能体认识到这需要结构化的方法'
    ]
  },
  {
    id: 'brainstorming',
    title: 'Brainstorming',
    titleZh: '头脑风暴',
    skillId: 'brainstorming',
    storyContent: `
# The brainstorming skill activates

The agent doesn't jump into code. Instead, it starts asking questions:

> "Let me understand what you're trying to build. What would this CSS debugging skill actually do?"

And then:

> "Should this be part of systematic-debugging, or a separate skill?"

And later:

> "What should happen first when someone encounters a CSS issue?"

This continues until you have a clear design.
`,
    storyContentZh: `
# 头脑风暴技能激活

智能体不会直接跳到代码。相反，它开始提问：

> "让我理解你想要构建什么。这个 CSS 调试技能实际上会做什么？"

然后：

> "这应该是 systematic-debugging 的一部分，还是一个单独的技能？"

稍后：

> "当有人遇到 CSS 问题时，首先应该发生什么？"

这会持续直到你有一个清晰的设计。
`,
    whatHappened: [
      'brainstorming skill is automatically invoked',
      'The agent asks clarifying questions',
      'You explore 2-3 different approaches',
      'A design is presented and approved',
      'Design document is saved to docs/'
    ],
    whatHappenedZh: [
      'brainstorming 技能被自动调用',
      '智能体提出澄清问题',
      '你探索 2-3 种不同的方法',
      '设计被展示并获得批准',
      '设计文档保存到 docs/'
    ]
  },
  {
    id: 'worktree',
    title: 'Git Worktree',
    titleZh: 'Git Worktree',
    skillId: 'using-git-worktrees',
    storyContent: `
# Creating an isolated workspace

With the design approved, the agent doesn't start coding on main.

Instead:

> "I'm using the using-git-worktrees skill to create an isolated workspace."

It creates a new git worktree on a new branch. Your main branch stays clean. You can switch back to it at any time.
`,
    storyContentZh: `
# 创建隔离的工作区

设计获得批准后，智能体不会在 main 分支上开始编码。

相反：

> "我正在使用 using-git-worktrees 技能来创建隔离的工作区。"

它在新分支上创建一个新的 git worktree。你的 main 分支保持干净。你可以随时切换回去。
`,
    whatHappened: [
      'using-git-worktrees skill activates',
      'New git worktree created',
      'New branch created for the feature',
      'Project setup verified',
      'Clean test baseline confirmed'
    ],
    whatHappenedZh: [
      'using-git-worktrees 技能激活',
      '新的 git worktree 已创建',
      '为功能创建新分支',
      '项目设置已验证',
      '确认干净的测试基线'
    ]
  },
  {
    id: 'planning',
    title: 'Writing Plans',
    titleZh: '编写计划',
    skillId: 'writing-plans',
    storyContent: `
# Breaking it down

Now the agent reads the design and writes a plan:

> "I'm using the writing-plans skill to create the implementation plan."

The plan is detailed. Every file to create. Every code change. Every test.

It assumes the engineer has:
- Zero context
- Questionable taste
- No idea what "good tests" look like

Each step is 2-5 minutes of work.
`,
    storyContentZh: `
# 分解任务

现在智能体阅读设计并编写计划：

> "我正在使用 writing-plans 技能来创建实施计划。"

计划非常详细。每个要创建的文件。每个代码更改。每个测试。

它假设工程师：
- 零上下文
- 品味可疑
- 不知道"好测试"是什么样子

每个步骤都是 2-5 分钟的工作。
`,
    whatHappened: [
      'writing-plans skill activates',
      'Design is decomposed into bite-sized tasks',
      'Every file change is mapped out',
      'Exact code is shown for each step',
      'Plan is saved to docs/superpowers/plans/'
    ],
    whatHappenedZh: [
      'writing-plans 技能激活',
      '设计被分解为小型任务',
      '每个文件更改都已规划',
      '每个步骤都显示确切的代码',
      '计划保存到 docs/superpowers/plans/'
    ]
  },
  {
    id: 'implementation',
    title: 'Subagent Development',
    titleZh: '子智能体开发',
    skillId: 'subagent-driven-development',
    storyContent: `
# Let's build this

With a plan in hand, the agent starts executing:

> "I'm using the subagent-driven-development skill to implement this plan."

For each task:
1. A fresh subagent is dispatched
2. It follows the TDD cycle: RED → GREEN → REFACTOR
3. Two-stage review happens after each task

You can watch as each task completes. Progress is visible. Quality is enforced.
`,
    storyContentZh: `
# 让我们构建这个

有了计划，智能体开始执行：

> "我正在使用 subagent-driven-development 技能来实施这个计划。"

对于每个任务：
1. 派遣一个新的子智能体
2. 它遵循 TDD 循环：RED → GREEN → REFACTOR
3. 每个任务后进行两阶段审查

你可以观看每个任务完成。进度可见。质量得到保证。
`,
    whatHappened: [
      'subagent-driven-development skill activates',
      'Fresh subagent per task',
      'test-driven-development enforces RED-GREEN-REFACTOR',
      'Two-stage review after each task',
      'requesting-code-review between tasks'
    ],
    whatHappenedZh: [
      'subagent-driven-development 技能激活',
      '每个任务使用新的子智能体',
      'test-driven-development 强制执行 RED-GREEN-REFACTOR',
      '每个任务后两阶段审查',
      '任务之间进行 requesting-code-review'
    ]
  },
  {
    id: 'review',
    title: 'Code Review',
    titleZh: '代码审查',
    skillId: 'requesting-code-review',
    storyContent: `
# Checking the work

Between tasks and at the end:

> "I'm using the requesting-code-review skill to review this work."

The agent checks:
- Does this match the spec?
- Are there any critical issues?
- Does the code quality meet standards?

Critical issues block progress. They must be fixed before continuing.
`,
    storyContentZh: `
# 检查工作

在任务之间和结束时：

> "我正在使用 requesting-code-review 技能来审查这项工作。"

智能体检查：
- 这与规范匹配吗？
- 有任何关键问题吗？
- 代码质量是否符合标准？

关键问题会阻止进度。必须在继续之前修复它们。
`,
    whatHappened: [
      'requesting-code-review skill activates',
      'Work is reviewed against the plan',
      'Issues reported by severity',
      'Critical issues block progress',
      'Review checklist completed'
    ],
    whatHappenedZh: [
      'requesting-code-review 技能激活',
      '根据计划审查工作',
      '按严重程度报告问题',
      '关键问题阻止进度',
      '审查清单已完成'
    ]
  },
  {
    id: 'finish',
    title: 'Finishing Up',
    titleZh: '完成',
    skillId: 'finishing-a-development-branch',
    storyContent: `
# Wrapping it up

All tasks complete. All tests pass.

> "I'm using the finishing-a-development-branch skill to complete this work."

The agent presents options:
- Merge to main
- Create a PR
- Keep the branch
- Discard the work

You choose. The work is done.
`,
    storyContentZh: `
# 收尾

所有任务完成。所有测试通过。

> "我正在使用 finishing-a-development-branch 技能来完成这项工作。"

智能体展示选项：
- 合并到 main
- 创建 PR
- 保留分支
- 丢弃工作

你选择。工作完成。
`,
    whatHappened: [
      'finishing-a-development-branch skill activates',
      'All tests verified',
      'Options presented (merge/PR/keep/discard)',
      'Worktree cleaned up',
      'Feature ready to ship!'
    ],
    whatHappenedZh: [
      'finishing-a-development-branch 技能激活',
      '所有测试已验证',
      '展示选项（合并/PR/保留/丢弃）',
      'Worktree 已清理',
      '功能准备发布！'
    ]
  }
];

export function getStoryStep(id: string): StoryStep | undefined {
  return storySteps.find(step => step.id === id);
}

export function getNextStepId(currentId: string): string | undefined {
  const index = storySteps.findIndex(step => step.id === currentId);
  if (index !== -1 && index < storySteps.length - 1) {
    return storySteps[index + 1].id;
  }
  return undefined;
}

export function getPrevStepId(currentId: string): string | undefined {
  const index = storySteps.findIndex(step => step.id === currentId);
  if (index > 0) {
    return storySteps[index - 1].id;
  }
  return undefined;
}

export function getStepIndex(id: string): number {
  return storySteps.findIndex(step => step.id === id);
}
