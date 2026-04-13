import { Skill } from './types';

export async function getSkillsClient(): Promise<Skill[]> {
  const response = await fetch('/skills-data.json');
  return response.json();
}

export async function getSkillClient(id: string): Promise<Skill | undefined> {
  const skills = await getSkillsClient();
  return skills.find((skill) => skill.id === id);
}
