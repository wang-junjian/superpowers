import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Building in:', __dirname);

try {
  execSync('npm run build', {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true
  });
  console.log('Build successful!');
} catch (e) {
  console.error('Build failed:', e);
  process.exit(1);
}
