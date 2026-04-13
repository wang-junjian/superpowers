import { Skill, StoryStep as StoryStepType } from './types';

export function getSkillName(skill: Skill, lang: string): string {
  if (lang === 'zh' && skill.nameZh) {
    return skill.nameZh;
  }
  return skill.name;
}

export function getSkillDescription(skill: Skill, lang: string): string {
  if (lang === 'zh' && skill.descriptionZh) {
    return skill.descriptionZh;
  }
  return skill.description;
}

export function getSkillContent(skill: Skill, lang: string): string {
  if (lang === 'zh' && skill.contentZh) {
    return skill.contentZh;
  }
  return skill.content;
}

export function getStoryTitle(step: StoryStepType, lang: string): string {
  if (lang === 'zh' && step.titleZh) {
    return step.titleZh;
  }
  return step.title;
}

export function getStoryContent(step: StoryStepType, lang: string): string {
  if (lang === 'zh' && step.storyContentZh) {
    return step.storyContentZh;
  }
  return step.storyContent;
}

export function getWhatHappened(step: StoryStepType, lang: string): string[] {
  if (lang === 'zh' && step.whatHappenedZh && step.whatHappenedZh.length > 0) {
    return step.whatHappenedZh;
  }
  return step.whatHappened;
}
