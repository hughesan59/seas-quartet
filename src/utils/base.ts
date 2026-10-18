export function withBase(path: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	return `${base}${path}`;
}

/** Full URL for a path that already includes the base (e.g. from `withBase()`). */
export function absoluteUrl(path: string): string {
	return new URL(path, import.meta.env.SITE).href;
}
