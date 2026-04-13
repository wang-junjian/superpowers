import { getSkillsServer } from '@/lib/skills-server';
import SkillDetailClient from './SkillDetailClient';

export default async function SkillDetailPage() {
  const skills = await getSkillsServer();
  return <SkillDetailClient skills={skills} />;
}
