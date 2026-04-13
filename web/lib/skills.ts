import { Skill } from './types';

// This file is for backward compatibility
// Use skills-server.ts for server-side and skills-client.ts for client-side

export async function getSkills(): Promise<Skill[]> {
  // This will be called from server components only
  throw new Error('Use getSkillsServer from skills-server.ts instead');
}

export async function getSkill(id: string): Promise<Skill | undefined> {
  // This will be called from server components only
  throw new Error('Use getSkillServer from skills-server.ts instead');
}
