export default {
	tags: [
		"posts"
	],
	"layout": "layouts/post.njk",
	eleventyComputed: {
		permalink: (data) => "/archive/{{ page.date | htmlDateString }}/{{ page.fileSlug | slugify }}/",
	},
};
