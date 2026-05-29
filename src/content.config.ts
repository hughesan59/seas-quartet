import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const about = defineCollection({
	loader: glob({ pattern: 'about.md', base: './src/content' }),
	schema: z.object({
		heading: z.string(),
		subtitle: z.string().optional(),
		members: z.array(
			z.object({
				name: z.string(),
				instrument: z.string(),
			}),
		),
	}),
});

const repertoire = defineCollection({
	loader: glob({ pattern: 'repertoire.md', base: './src/content' }),
	schema: z.object({
		heading: z.string(),
		subtitle: z.string().optional(),
		note: z.string().optional(),
		categories: z.array(
			z.object({
				title: z.string(),
				pieces: z.array(
					z.object({
						composer: z.string(),
						title: z.string(),
					}),
				),
			}),
		),
	}),
});

const socials = defineCollection({
	loader: glob({ pattern: 'socials.md', base: './src/content' }),
	schema: z.object({
		links: z.array(
			z.object({
				platform: z.string(),
				href: z.string(),
				icon: z.enum(['instagram', 'facebook', 'youtube']),
			}),
		),
	}),
});

const structuredData = defineCollection({
	loader: glob({ pattern: 'structured-data.md', base: './src/content' }),
	schema: z.object({
		description: z.string(),
		foundingDate: z.string(),
		genres: z.array(z.string()),
		image: z.string(),
		areaServed: z.string(),
		email: z.email().optional(),
		telephone: z.string().optional(),
	}),
});

export const collections = { about, repertoire, socials, structuredData };
