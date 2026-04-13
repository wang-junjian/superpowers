import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SKILLS_DIR = path.join(__dirname, '../../skills');
const OUTPUT_FILE = path.join(__dirname, '../public/skills-data.json');

async function loadSkills() {
  const skills = [];

  const skillDirs = fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const skillId of skillDirs) {
    // Load English skill
    const skillPath = path.join(SKILLS_DIR, skillId, 'SKILL.md');

    // Load Chinese skill (if exists)
    const skillZhPath = path.join(SKILLS_DIR, skillId, 'SKILL-zh.md');

    if (fs.existsSync(skillPath)) {
      const content = fs.readFileSync(skillPath, 'utf-8');
      const { data, content: markdownContent } = matter(content);

      const skill = {
        id: skillId,
        name: data.name || skillId,
        description: data.description || '',
        content: markdownContent.trim(),
        nameZh: null,
        descriptionZh: null,
        contentZh: null,
      };

      // Load Chinese translation if available
      if (fs.existsSync(skillZhPath)) {
        const contentZh = fs.readFileSync(skillZhPath, 'utf-8');
        const { data: dataZh, content: markdownContentZh } = matter(contentZh);
        skill.nameZh = dataZh.name || skill.name;
        skill.descriptionZh = dataZh.description || skill.description;
        skill.contentZh = markdownContentZh.trim();
      }

      skills.push(skill);
    }
  }

  // Ensure public directory exists
  const publicDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(skills, null, 2));
  console.log(`Loaded ${skills.length} skills into ${OUTPUT_FILE}`);
  const translatedCount = skills.filter(s => s.contentZh).length;
  console.log(`  ${translatedCount} skills have Chinese translations`);
}

loadSkills().catch(console.error);
