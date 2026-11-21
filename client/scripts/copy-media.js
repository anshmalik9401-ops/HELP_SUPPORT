import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const clientDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repositoryDirectory = path.resolve(clientDirectory, '..');
const sourceDirectory = path.join(repositoryDirectory, 'server', 'public', 'media');
const targetDirectory = path.join(clientDirectory, 'public', 'media');

await mkdir(targetDirectory, { recursive: true });
for (const directory of ['img', 'videos']) {
  await cp(path.join(sourceDirectory, directory), path.join(targetDirectory, directory), {
    recursive: true,
    force: true,
  });
}
console.log('[media] Copied screenshots and videos to client/public/media');
