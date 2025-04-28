export default {
	tags: [
		"posts"
	],
	"layout": "layouts/post.njk",
	eleventyComputed: {
		permalink: (data) => "/blog/{{ page.fileSlug | slugify }}/",
	},
};
