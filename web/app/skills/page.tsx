import { getSkillsServer } from '@/lib/skills-server';
import SkillsListClient from './SkillsListClient';

export default async function SkillsListPage() {
  const skills = await getSkillsServer();
  return <SkillsListClient skills={skills} />;
}
