export default {
	tags: [
		"posts",
		"archive"
	],
	"layout": "layouts/post.njk",
	eleventyComputed: {
		permalink: (data) => "/archive/{{ page.date | htmlDateString }}/{{ page.fileSlug | slugify }}/",
	},
};
