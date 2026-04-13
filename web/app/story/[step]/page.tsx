import { getSkillsServer } from '@/lib/skills-server';
import StoryStepClient from './StoryStepClient';

export default async function StoryStepPage() {
  const skills = await getSkillsServer();
  return <StoryStepClient skills={skills} />;
}
