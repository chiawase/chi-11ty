export default {
	tags: [
		"posts",
		"blog"
	],
	"layout": "layouts/post.njk",
	eleventyComputed: {
		permalink: (data) => "/blog/{{ page.fileSlug | slugify }}/",
	},
};
