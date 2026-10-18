import {
	getEntry,
	type CollectionEntry,
	type CollectionKey,
} from 'astro:content';

/** The entry for `src/content/<collection>.md`. Every collection is one file. */
export async function getSingle<C extends CollectionKey>(
	collection: C,
): Promise<CollectionEntry<C>> {
	const entry = await getEntry(collection, collection);
	if (!entry) throw new Error(`src/content/${collection}.md is missing`);
	return entry as CollectionEntry<C>;
}
