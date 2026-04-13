import { getSkillsServer } from '@/lib/skills-server';
import HomeClient from '@/components/HomeClient';

export default async function HomePage() {
  const skills = await getSkillsServer();
  return <HomeClient skills={skills} />;
}
