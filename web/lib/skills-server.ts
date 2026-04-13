'use server';

import 'server-only';
import { Skill } from './types';
import fs from 'fs';
import path from 'path';

// Cache for skills data
let skillsCache: Skill[] | null = null;

export async function getSkillsServer(): Promise<Skill[]> {
  if (skillsCache) {
    return skillsCache;
  }
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'skills-data.json');
    const data = fs.readFileSync(jsonPath, 'utf-8');
    skillsCache = JSON.parse(data) as Skill[];
    return skillsCache;
  } catch (e) {
    console.error('Failed to read skills data:', e);
    return [];
  }
}

export async function getSkillServer(id: string): Promise<Skill | undefined> {
  const skills = await getSkillsServer();
  return skills.find((skill) => skill.id === id);
}
