import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isPagesBuild = process.env.GITHUB_ACTIONS === 'true' && Boolean(repoName);

export default defineConfig({
  plugins: [react()],
  base: isPagesBuild ? `/${repoName}/` : '/',
});
