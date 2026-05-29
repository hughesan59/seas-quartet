// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://hughesan59.github.io',
	base: '/seas-quartet',
	integrations: [sitemap()],
	build: {
		inlineStylesheets: 'always',
	},
});
