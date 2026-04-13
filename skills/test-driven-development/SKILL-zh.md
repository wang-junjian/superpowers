---
name: test-driven-development
description: "当实施任何功能或 bug 修复时，在编写实施代码之前使用"
---

# 测试驱动开发 (TDD)

## 概述

先写测试。看着它失败。编写最少的代码来通过。

**核心原则：** 如果你没有看着测试失败，你就不知道它是否测试了正确的东西。

**违反规则的文字就是违反规则的精神。**

## 何时使用

**始终：**
- 新功能
- Bug 修复
- 重构
- 行为更改

**例外情况（询问你的人类合作伙伴）：**
- 一次性原型
- 生成的代码
- 配置文件

想"只这一次跳过 TDD"吗？停止。那是合理化。

## 铁律

```
没有先失败的测试就不要生产代码
```

在测试之前写代码？删除它。重新开始。

**没有例外：**
- 不要把它作为"参考"保留
- 不要在写测试时"调整"它
- 不要看它
- 删除意味着删除

从测试重新实施。就这样。

## 红-绿-重构

```dot
digraph tdd_cycle {
    rankdir=LR;
    red [label="RED\nWrite failing test", shape=box, style=filled, fillcolor="#ffcccc"];
    verify_red [label="Verify fails\ncorrectly", shape=diamond];
    green [label="GREEN\nMinimal code", shape=box, style=filled, fillcolor="#ccffcc"];
    verify_green [label="Verify passes\nAll green", shape=diamond];
    refactor [label="REFACTOR\nClean up", shape=box, style=filled, fillcolor="#ccccff"];
    next [label="Next", shape=ellipse];

    red -> verify_red;
    verify_red -> green [label="yes"];
    verify_red -> red [label="wrong\nfailure"];
    green -> verify_green;
    verify_green -> refactor [label="yes"];
    verify_green -> green [label="no"];
    refactor -> verify_green [label="stay\ngreen"];
    verify_green -> next;
    next -> red;
}
```

### RED - 编写失败的测试

编写一个最小的测试，展示应该发生什么。

<好>
```typescript
test('retries failed operations 3 times', async () => {
  let attempts = 0;
  const operation = () => {
    attempts++;
    if (attempts < 3) throw new Error('fail');
    return 'success';
  };

  const result = await retryOperation(operation);

  expect(result).toBe('success');
  expect(attempts).toBe(3);
});
```
清晰的名称，测试真实行为，一件事
</好>

<坏>
```typescript
test('retry works', async () => {
  const mock = jest.fn()
    .mockRejectedValueOnce(new Error())
    .mockRejectedValueOnce(new Error())
    .mockResolvedValueOnce('success');
  await retryOperation(mock);
  expect(mock).toHaveBeenCalledTimes(3);
});
```
模糊的名称，测试模拟而不是代码
</坏>

**要求：**
- 一个行为
- 清晰的名称
- 真实代码（除非不可避免，否则不使用模拟）

### 验证 RED - 看着它失败

**强制性。永远不要跳过。**

```bash
npm test path/to/test.test.ts
```

确认：
- 测试失败（不是错误）
- 失败消息符合预期
- 因为缺少功能而失败（不是拼写错误）

**测试通过了？** 你在测试现有行为。修复测试。

**测试错误？** 修复错误，重新运行直到它正确失败。

### GREEN - 最少的代码

编写最简单的代码来通过测试。

<好>
```typescript
async function retryOperation<T>(fn: () => Promise<T>): Promise<T> {
  for (let i = 0; i < 3; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === 2) throw e;
    }
  }
  throw new Error('unreachable');
}
```
刚好足够通过
</好>

<坏>
```typescript
async function retryOperation<T>(
  fn: () => Promise<T>,
  options?: {
    maxRetries?: number;
    backoff?: 'linear' | 'exponential';
    onRetry?: (attempt: number) => void;
  }
): Promise<T> {
  // YAGNI
}
```
过度工程
</坏>

不要添加功能、重构其他代码或"改进"超出测试范围。

### 验证 GREEN - 看着它通过

**强制性。**

```bash
npm test path/to/test.test.ts
```

确认：
- 测试通过
- 其他测试仍然通过
- 输出干净（没有错误、警告）

**测试失败了？** 修复代码，而不是测试。

**其他测试失败了？** 现在修复。

### REFACTOR - 清理

仅在通过之后：
- 删除重复
- 改进名称
- 提取辅助函数

保持测试通过。不要添加行为。

### 重复

下一个功能的下一个失败测试。

## 好的测试

| 质量 | 好 | 坏 |
|---------|------|-----|
| **最小** | 一件事。名称中有"和"？拆分它。 | `test('validates email and domain and whitespace')` |
| **清晰** | 名称描述行为 | `test('test1')` |
| **显示意图** | 展示所需的 API | 模糊代码应该做什么 |

## 为什么顺序很重要

**"我会在之后写测试来验证它有效"**

在代码之后写的测试会立即通过。立即通过什么也证明不了：
- 可能测试了错误的东西
- 可能测试了实施，而不是行为
- 可能遗漏了你忘记的边缘情况
- 你从未看到它捕获 bug

测试优先迫使你看到测试失败，证明它实际上测试了某些东西。

**"我已经手动测试了所有边缘情况"**

手动测试是临时的。你认为你测试了所有内容但：
- 没有你测试内容的记录
- 代码更改时无法重新运行
- 压力下容易忘记情况
- "我尝试时有效" ≠ 全面

自动化测试是系统性的。它们每次都以相同的方式运行。

**"删除 X 小时的工作是浪费的"**

沉没成本谬误。时间已经过去了。你现在的选择：
- 删除并用 TDD 重写（再 X 小时，高信心）
- 保留它并在之后添加测试（30 分钟，低信心，可能有 bug）

"浪费"是保留你无法信任的代码。没有真实测试的工作代码就是技术债务。

**"TDD 是教条，务实意味着适应"**

TDD 是务实的：
- 在提交之前找到 bug（比之后调试更快）
- 防止回归（测试立即捕获中断）
- 记录行为（测试展示如何使用代码）
- 实现重构（自由更改，测试捕获中断）

"务实"的捷径 = 在生产中调试 = 更慢。

**"之后测试实现相同的目标——这是精神而不是仪式"**

不。之后测试回答"这做什么？" 优先测试回答"这应该做什么？"

之后测试因你的实施而有偏差。你测试你构建的内容，而不是所需的内容。你验证记住的边缘情况，而不是发现的边缘情况。

优先测试在实施之前迫使边缘情况发现。之后测试验证你记住了所有内容（你没有）。

30 分钟的之后测试 ≠ TDD。你获得了覆盖，但失去了测试有效的证明。

## 常见合理化

| 借口 | 现实 |
|--------|---------|
| "太简单不需要测试" | 简单代码会坏。测试需要 30 秒。 |
| "我会之后测试" | 测试立即通过什么也证明不了。 |
| "之后测试实现相同目标" | 之后测试 = "这做什么？" 优先测试 = "这应该做什么？" |
| "已经手动测试了" | 临时 ≠ 系统性。没有记录，无法重新运行。 |
| "删除 X 小时是浪费的" | 沉没成本谬误。保留未经测试的代码是技术债务。 |
| "保留作为参考，优先写测试" | 你会调整它。那是之后测试。删除意味着删除。 |
| "需要先探索" | 好的。丢弃探索，从 TDD 开始。 |
| "测试难 = 设计不清楚" | 听测试的。难测试 = 难使用。 |
| "TDD 会减慢我" | TDD 比调试快。务实 = 测试优先。 |
| "手动测试更快" | 手动不证明边缘情况。你会每次更改都重新测试。 |
| "现有代码没有测试" | 你在改进它。为现有代码添加测试。 |

## 红色警告——停止并重新开始

- 测试前有代码
- 实施后有测试
- 测试立即通过
- 无法解释为什么测试失败
- "之后"添加测试
- 合理化"只这一次"
- "我已经手动测试了"
- "之后测试实现相同目的"
- "这是关于精神而不是仪式"
- "保留作为参考"或"调整现有代码"
- "已经花了 X 小时，删除是浪费的"
- "TDD 是教条，我很务实"
- "这不同因为..."

**所有这些都意味着：删除代码。用 TDD 重新开始。**

## 示例：Bug 修复

**Bug：** 接受空电子邮件

**RED**
```typescript
test('rejects empty email', async () => {
  const result = await submitForm({ email: '' });
  expect(result.error).toBe('Email required');
});
```

**验证 RED**
```bash
$ npm test
FAIL: expected 'Email required', got undefined
```

**GREEN**
```typescript
function submitForm(data: FormData) {
  if (!data.email?.trim()) {
    return { error: 'Email required' };
  }
  // ...
}
```

**验证 GREEN**
```bash
$ npm test
PASS
```

**REFACTOR**
如果需要，为多个字段提取验证。

## 验证清单

在标记工作完成之前：

- [ ] 每个新函数/方法都有测试
- [ ] 在实施之前看着每个测试失败
- [ ] 每个测试因预期原因失败（缺少功能，不是拼写错误）
- [ ] 编写了最少的代码来通过每个测试
- [ ] 所有测试通过
- [ ] 输出干净（没有错误、警告）
- [ ] 测试使用真实代码（仅在不可避免时使用模拟）
- [ ] 覆盖边缘情况和错误

无法检查所有框？你跳过了 TDD。重新开始。

## 当卡住时

| 问题 | 解决方案 |
|---------|----------|
| 不知道如何测试 | 编写期望的 API。先写断言。询问你的人类合作伙伴。 |
| 测试太复杂 | 设计太复杂。简化接口。 |
| 必须模拟所有内容 | 代码太耦合。使用依赖注入。 |
| 测试设置巨大 | 提取辅助函数。仍然复杂？简化设计。 |

## 调试集成

发现 bug？编写重现它的失败测试。遵循 TDD 循环。测试证明修复并防止回归。

永远不要没有测试就修复 bug。

## 测试反模式

添加模拟或测试实用程序时，阅读 @testing-anti-patterns.md 以避免常见陷阱：
- 测试模拟行为而不是真实行为
- 向生产类添加仅测试方法
- 在不理解依赖项的情况下模拟

## 最终规则

```
生产代码 → 测试存在并先失败
否则 → 不是 TDD
```

没有你的人类合作伙伴的许可就没有例外。
