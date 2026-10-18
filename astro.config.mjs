// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// In CI, `site` and `base` come from the repo's GitHub Pages settings (see
// .github/workflows/deploy.yml), so moving to a custom domain needs no code
// change. On a custom domain `base_path` is empty, which Astro treats as `/`.
// The fallbacks mirror the github.io deployment for local builds.
const site = process.env.PAGES_ORIGIN ?? 'https://hughesan59.github.io';
const base = process.env.PAGES_BASE_PATH ?? '/seas-quartet';

// https://astro.build/config
export default defineConfig({
	site,
	base,
	// GitHub Pages serves `about/index.html` at `/about/`, so match it.
	trailingSlash: 'always',
	integrations: [sitemap()],
	// Fonts are downloaded from Fontsource at build time and self-hosted. Only
	// the styles listed here are shipped. The size-matched fallbacks shown
	// while they load are defined in src/styles/global.css, because Astro's
	// generated ones ignore italics and are far too big for upper-case Cinzel.
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'Playfair Display',
			cssVariable: '--display-font',
			weights: ['400 900'],
			styles: ['italic'],
			subsets: ['latin', 'latin-ext'],
			fallbacks: ['Display fallback', 'serif'],
			optimizedFallbacks: false,
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Cinzel',
			cssVariable: '--accent-font',
			weights: ['400 900'],
			styles: ['normal'],
			subsets: ['latin', 'latin-ext'],
			fallbacks: ['Accent fallback', 'serif'],
			optimizedFallbacks: false,
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Montserrat',
			cssVariable: '--body-font',
			weights: ['100 900'],
			styles: ['normal'],
			subsets: ['latin', 'latin-ext'],
			fallbacks: ['Body fallback', 'sans-serif'],
			optimizedFallbacks: false,
		},
	],
	vite: {
		plugins: [tailwindcss()],
		build: {
			// https://github.com/vitejs/vite/issues/21954
			cssTarget: ['safari16.4', 'chrome111', 'firefox128'],
		},
	},
	build: {
		inlineStylesheets: 'always',
	},
});
