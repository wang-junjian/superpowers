export interface Skill {
  id: string;
  name: string;
  description: string;
  content: string;
  nameZh: string | null;
  descriptionZh: string | null;
  contentZh: string | null;
}

export interface StoryStep {
  id: string;
  title: string;
  titleZh: string;
  skillId?: string;
  storyContent: string;
  storyContentZh: string;
  whatHappened: string[];
  whatHappenedZh: string[];
}
