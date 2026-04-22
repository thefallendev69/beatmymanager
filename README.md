# BeatMyManager (Phase 1)

React + TypeScript + SCSS + Redux Toolkit starter for:
1. Uploading a person image
2. Client-side blur detection
3. Client-side person detection
4. Gender selection workflow

## Run locally

```bash
npm install
npm run dev
```

## Host on GitHub Pages

This repo includes a GitHub Actions workflow that builds and deploys `dist/` to GitHub Pages on every push to `main`.

### 1) Push this repo to GitHub

```bash
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2) Enable Pages in GitHub

In your GitHub repo:
- Go to **Settings → Pages**
- Under **Build and deployment**, set **Source** to **GitHub Actions**

### 3) Trigger deploy

Push any commit to `main` (or run the workflow manually from the **Actions** tab).

### 4) Open your live app

Your app will be available at:

```text
https://<your-github-username>.github.io/<your-repo-name>/
```

> Note: person detection loads TensorFlow.js COCO-SSD in-browser.
