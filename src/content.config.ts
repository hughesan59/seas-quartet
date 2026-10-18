import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Each collection is a single file in `src/content/`.
const single = (name: string) =>
	glob({ pattern: `${name}.md`, base: './src/content' });

// A full web address, or "" to hide that link.
const optionalUrl = z.url().or(z.literal(''));

const settings = defineCollection({
	loader: single('settings'),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			tagline: z.string(),
			description: z.string(),
			foundingYear: z.number().int(),
			areaServed: z.string(),
			genres: z.array(z.string()),
			sharePhoto: image(),
			sharePhotoAlt: z.string(),
			instagram: optionalUrl,
			facebook: optionalUrl,
			youtube: optionalUrl,
			ctaHeading: z.string(),
			ctaButtonText: z.string(),
		}),
});

const home = defineCollection({
	loader: single('home'),
	schema: ({ image }) =>
		z.object({
			pageDescription: z.string().optional(),
			heroImage: image(),
			heroImageAlt: z.string(),
			heroLabel: z.string(),
			heroTitle: z.string(),
			heroButtonText: z.string(),
		}),
});

const about = defineCollection({
	loader: single('about'),
	schema: z.object({
		pageTitle: z.string(),
		pageDescription: z.string(),
		label: z.string(),
		heading: z.string(),
		members: z.array(
			z.object({
				name: z.string(),
				instrument: z.string(),
			}),
		),
	}),
});

const repertoire = defineCollection({
	loader: single('repertoire'),
	schema: z.object({
		pageTitle: z.string(),
		pageDescription: z.string(),
		label: z.string(),
		heading: z.string(),
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

const contact = defineCollection({
	loader: single('contact'),
	schema: z.object({
		pageTitle: z.string(),
		pageDescription: z.string(),
		label: z.string(),
		heading: z.string(),
		subheading: z.string(),
		email: z.email(),
		intro: z.string(),
		details: z.array(z.string()).min(1),
		buttonText: z.string(),
		emailPrompt: z.string(),
	}),
});

export const collections = { settings, home, about, repertoire, contact };
