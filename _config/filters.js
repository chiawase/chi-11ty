import { DateTime } from "luxon";

export default function (eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		let d = new Date(dateObj);
		return DateTime.fromJSDate(d, { zone: "UTC+8" }).toFormat("ff ZZZZ");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		let d = new Date(dateObj);
		return DateTime.fromJSDate(d).toFormat("yyyy-LL-dd'T'TZZ");
	});

	eleventyConfig.addFilter("typeOf", (value) => {
		return typeof value;
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if (!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if (n < 0) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", (target) => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter((tag) => ["all", "posts"].indexOf(tag) === -1);
	});

	eleventyConfig.addFilter("sortAlphabetically", (strings) =>
		(strings || []).sort((b, a) => b.localeCompare(a)),
	);

	// for Webmentions
	eleventyConfig.addFilter("getWebmentionsForUrl", (webmentions, url) => {
		return webmentions.children
			.filter((entry) => entry["wm-target"] === url)
			.sort((a, b) => new Date(b.published) - new Date(a.published));
	});

	eleventyConfig.addFilter("webmentionsSize", (mentions) => {
		return !mentions ? 0 : mentions.length;
	});

	eleventyConfig.addFilter("webmentionsByType", (mentions, mentionType) => {
		return mentions.filter((entry) => !!entry[mentionType]);
	});
}
