---
name: requesting-code-review
description: "当完成任务、实施主要功能或合并之前使用，以验证工作符合要求"
---

# 请求代码审查

调度 superpowers:code-reviewer 子智能体在问题级联之前捕获问题。审查者获得精确构建的上下文用于评估——永远不是你会话的历史记录。这使审查者专注于工作产品，而不是你的思维过程，并为继续工作保留你自己的上下文。

**核心原则：** 尽早审查，经常审查。

## 何时请求审查

**强制性：**
- 在子智能体驱动开发中的每个任务之后
- 完成主要功能后
- 合并到 main 之前

**可选但有价值：**
- 当卡住时（新鲜视角）
- 重构之前（基线检查）
- 修复复杂 bug 后

## 如何请求

**1. 获取 git SHA：**
```bash
BASE_SHA=$(git rev-parse HEAD~1)  # 或 origin/main
HEAD_SHA=$(git rev-parse HEAD)
```

**2. 调度代码审查者子智能体：**

使用 Task 工具和 superpowers:code-reviewer 类型，填充 `code-reviewer.md` 中的模板

**占位符：**
- `{WHAT_WAS_IMPLEMENTED}` - 你刚构建的内容
- `{PLAN_OR_REQUIREMENTS}` - 它应该做什么
- `{BASE_SHA}` - 开始提交
- `{HEAD_SHA}` - 结束提交
- `{DESCRIPTION}` - 简要摘要

**3. 根据反馈采取行动：**
- 立即修复关键问题
- 在继续之前修复重要问题
- 记下小问题供以后处理
- 如果审查者错了则反驳（有理由）

## 示例

```
[刚完成任务 2：添加验证函数]

你：在继续之前让我请求代码审查。

BASE_SHA=$(git log --oneline | grep "Task 1" | head -1 | awk '{print $1}')
HEAD_SHA=$(git rev-parse HEAD)

[调度 superpowers:code-reviewer 子智能体]
  WHAT_WAS_IMPLEMENTED: 对话索引的验证和修复函数
  PLAN_OR_REQUIREMENTS: docs/superpowers/plans/deployment-plan.md 中的任务 2
  BASE_SHA: a7981ec
  HEAD_SHA: 3df7661
  DESCRIPTION: 添加了带有 4 种问题类型的 verifyIndex() 和 repairIndex()

[子智能体返回]：
  优势：清晰的架构，真实的测试
  问题：
    重要：缺少进度指示器
    次要：报告间隔的魔法数字 (100)
  评估：准备继续

你：[修复进度指示器]
[继续任务 3]
```

## 与工作流集成

**子智能体驱动开发：**
- 每个任务后审查
- 在问题复合之前捕获问题
- 在移动到下一个任务之前修复

**执行计划：**
- 每个批次（3 个任务）后审查
- 获取反馈，应用，继续

**临时开发：**
- 合并前审查
- 卡住时审查

## 红色警告

**永远不要：**
- 因为"很简单"而跳过审查
- 忽略关键问题
- 带着未修复的重要问题继续
- 与有效的技术反馈争论

**如果审查者错了：**
- 用技术推理反驳
- 展示证明它有效的代码/测试
- 请求澄清

请参阅模板：requesting-code-review/code-reviewer.md
