import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import feedPlugin from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import eleventyPluginInterlinker from "@photogabble/eleventy-plugin-interlinker";
import pluginFilters from "./_config/filters.js";
import { EleventyRenderPlugin } from "@11ty/eleventy";
import externalLinks from "eleventy-plugin-external-links";
import footnote_plugin from "markdown-it-footnote";
import postGraph from "@rknightuk/eleventy-plugin-post-graph";

// for timezone
const TIME_ZONE = "UTC+8";

export function cloudinarySafeText(text) {
	return encodeURIComponent(text)
		.replace(/(%2C)/g, '%252C')
		.replace(/(%2F)/g, '%252F')
}

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
	// Eleventy Render Plugin from https://www.11ty.dev/docs/plugins/render/
	eleventyConfig.addPlugin(EleventyRenderPlugin);
	
	// Drafts, see also _data/eleventyDataSchema.js
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		// if (data.draft) {
		// 	data.title = `(draft) ${data.title}`;
		// }

		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});

	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_alias: "description",
		excerpt_separator: "<!-- more -->"
	});

	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig
		.addPassthroughCopy({
			"./public/": "/",
			"./content/img/favicon.png": "/img/favicon.png",
			"./content/img/chi/chi.jpg": "/img/chi.jpg",
		})
		.addPassthroughCopy("./content/feed/pretty-atom-feed.xsl");
	
	// getting the Victor Mono font pulled from node_modules
	eleventyConfig.addPassthroughCopy({
		"./node_modules/@fontsource-variable/victor-mono/files/*.woff2": "fonts/victor-mono/"
	});

	// getting the Anybody font pulled from node_modules
	eleventyConfig.addPassthroughCopy({
		"./node_modules/@fontsource-variable/anybody/files/*.woff2": "fonts/anybody/"
	});

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpg,jpeg,gif}");

	// Watch changes to posts
	eleventyConfig.addWatchTarget("content/{archive,blog}/**.*");

	// Watch changes to CSS files
	eleventyConfig.addWatchTarget("public/css/*.css");

	// Watch changes to njk files???
	eleventyConfig.addWatchTarget("_includes/**.*", "_includes/*/**.*");

	eleventyConfig.setChokidarConfig({
		usePolling: true,
		interval: 500,
	});

	// Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
	// Bundle <style> content and adds a {% css %} paired shortcode
	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
		// Add all <style> content to `css` bundle (use <style eleventy:ignore> to opt-out)
		// Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
		bundleHtmlContentFromSelector: "style",
	});

	// Bundle <script> content and adds a {% js %} paired shortcode
	eleventyConfig.addBundle("js", {
		toFileDirectory: "dist",
		// Add all <script> content to the `js` bundle (use <script eleventy:ignore> to opt-out)
		// Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
		bundleHtmlContentFromSelector: "script",
	});

	// Official plugins
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	eleventyConfig.addPlugin(feedPlugin);

	eleventyConfig.addLiquidFilter("dateToRfc3339", feedPlugin.dateToRfc3339);
	eleventyConfig.addLiquidFilter("dateToRfc822", feedPlugin.dateToRfc822);

	// eleventyConfig.addPlugin(feedPlugin, {
	// 	type: "atom", // or "rss", "json"
	// 	outputPath: "/feed.xml",
	// 	// stylesheet: "pretty-atom-feed.xsl",
	// 	templateData: {
	// 		eleventyNavigation: {
	// 			key: "Feed",
	// 			order: 7
	// 		},
	// 	},
	// 	collection: {
	// 		name: "posts",
	// 		limit: 10,
	// 	},
	// 	metadata: {
	// 		language: "en",
	// 		title: "Chi Señires",
	// 		subtitle: "Chi's space for thoughts and ideas on her side of the internet",
	// 		base: "https://chisenires.design/",
	// 		author: {
	// 			name: "Chi Señires",
	// 			url: "https://chisenires.design/about/",
	// 			email: "hello@chisenires.design"
	// 		}
	// 	}
	// });

	// Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// Output formats for each image.
		formats: ["webp", "png", "auto"],

		widths: ["auto"],

		failOnError: false,
		
		useCache: true,
		
		// returnType: "html",
		htmlOptions: {
			imgAttributes: {
				// e.g. <img loading decoding> assigned on the HTML tag will override these values.
				alt: "",
				loading: "lazy",
				decoding: "async",
			}
		},

		// Which source to use for `<img width height src>` attributes
		fallback: "largest", // or "smallest"

		fixOrientation: true,

		sharpOptions: {
			animated: true,
		},
	});

	// Filters
	eleventyConfig.addPlugin(pluginFilters);

	eleventyConfig.addPlugin(IdAttributePlugin, {
		// by default we use Eleventy's built-in `slugify` filter:
		// slugify: eleventyConfig.getFilter("slugify"),
		// selector: "h1,h2,h3,h4,h5,h6", // default
	});

	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	// Interlinker
	eleventyConfig.addPlugin(eleventyPluginInterlinker, {
			defaultLayout: 'layouts/default.liquid'
		}
	);

	// markdown-it plugins
	eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(footnote_plugin));

	// YouTube Embedder Shortcode
	eleventyConfig.addShortcode("youtube", (videoURL, title) => {
		const url = new URL(videoURL);
		const id = url.searchParams.get("v");
		return `<iframe class="yt-shortcode" src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video player${
		  title ? ` for ${title}` : ""
		}" frameborder="0" allowfullscreen></iframe>`;
	  });

	// Year Shortcode
	eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

	// Following Eleventy and Cloudinary Images tutorial: https://sia.codes/posts/eleventy-and-cloudinary-images/
	const CLOUDNAME = "chi-11ty"
	const FOLDER = "chisenires.design/";
	const BASE_URL = `https://res.cloudinary.com/${CLOUDNAME}/image/upload/`
	const FALLBACK_WIDTHS = [ 300, 600, 680, 1360 ];
	const FALLBACK_WIDTH = 680;
	const DEFAULT_SIZES = "(min-width: 580px) 512px, calc(95.38vw - 22px)";
	const SHARE_IMAGE_FILE_NAME = "thumbnail_odokru"; // points to https://res.cloudinary.com/chi-11ty/image/upload/v1745850878/chisenires.design/thumbnail_odokru.png
	// If font not in the root of your Cloudinary media library, need to prepend with `foldername:`
	
	const TITLE_FONT = "open%20sans" // setting to Open Sans for now
	const TITLE_FONT_SIZE = 60
	const TITLE_BOTTOM_OFFSET = 378
	const TAGLINE_FONT = "open%20sans"
	const TAGLINE_FONT_SIZE = 36
	const TAGLINE_TOP_OFFSET = 298
	const TAGLINE_LINE_HEIGHT = 10
	const URL_FONT = "open%20sans"
	const URL_FONT_SIZE = 36
	const URL_BOTTOM_OFFSET = 24
	const URL_VALUE = "chisenires.design" // update this if my domain changes
	const TEXT_AREA_WIDTH = 1071
	const TEXT_LEFT_OFFSET = 60
	const TEXT_COLOR = "FDFDFD"
	
	// Generate srcset attribute using the fallback widths or a supplied array of widths
	eleventyConfig.addShortcode("srcset", (file, widths) => {
		const widthSet = widths ? widths : FALLBACK_WIDTHS;
		return widthSet.map(width => {
			let src = `${BASE_URL}q_auto,f_auto,w_${width ? width : FALLBACK_WIDTH}/${FOLDER}${file}`;
			return `${src} ${width}w`;
		}).join(", ");
	});
	
	// Generate the src attribute using the fallback width or a width supplied
	// by the shortcode param
	eleventyConfig.addShortcode("src", (file, width) => {
		return `${BASE_URL}q_auto,f_auto,w_${width ? width : FALLBACK_WIDTH}/${FOLDER}${file}`
	});
	
	// Add defaultSizes shortcode
	eleventyConfig.addShortcode("defaultSizes", () => {
		return `${DEFAULT_SIZES}`;
	});
	
	// Create socialImageUrl shortcode
	// Applying the code from https://sia.codes/posts/social-share-images-using-cloudinary/
	eleventyConfig.addShortcode("socialImageUrl", (title, description, metadataTitle) => {
		// Thumbnail Image particulars
		const width = "1280";
		const height = "640";
		const imageConfig = `c_fill,h_${height},w_${width}/f_png/q_auto:best`;
	
		// encoding title using cloudinarySafeText function
		let thumbnailTitle = title;
		if (metadataTitle === "home") {
			thumbnailTitle = "Chi Señires";
		} else {
			thumbnailTitle = "Chi’s blog post";
		}
		const encodedTitle = cloudinarySafeText(thumbnailTitle);

		// encoding description using cloudinarySafeText function
		let thumbnailDescription = description;
		const encodedDescription = cloudinarySafeText(thumbnailDescription);

		// Title on thumbnail particulars
		const titleConfig = `co_rgb:${TEXT_COLOR},c_fit,w_${TEXT_AREA_WIDTH},l_text:${TITLE_FONT}_${TITLE_FONT_SIZE}_bold_normal_left:${encodedTitle}/fl_layer_apply,g_south_west,x_${TEXT_LEFT_OFFSET},y_${TITLE_BOTTOM_OFFSET}`;
		
		// Subtitle particulars
		const taglineConfig = `co_rgb:${TEXT_COLOR},c_fit,w_${TEXT_AREA_WIDTH},l_text:${TAGLINE_FONT}_${TAGLINE_FONT_SIZE}_normal_left:${encodedDescription}/fl_layer_apply,g_north_west,x_${TEXT_LEFT_OFFSET},y_${TAGLINE_TOP_OFFSET}`;
		
		// URL on thumbnail particulars
		const urlConfig = `co_rgb:${TEXT_COLOR},l_text:${URL_FONT}_${URL_FONT_SIZE}_bold_normal_left:${URL_VALUE}/fl_layer_apply,g_south_west,x_${TEXT_LEFT_OFFSET},y_${URL_BOTTOM_OFFSET}`;

		return `${BASE_URL}${imageConfig}/${titleConfig}/${taglineConfig}/${urlConfig}/${FOLDER}${SHARE_IMAGE_FILE_NAME}`;;
	});
	
	// Making all external links open in new window
	eleventyConfig.addPlugin(externalLinks, {
		// Plugin defaults:
        name: 'external-links',         // Plugin name
        regex: /^(([a-z]+:)(?!\/\/mastodon)|(\/\/))/i,  // Regex that test if href is external
        target: "_blank",               // 'target' attribute for external links
        rel: "noopener",                // 'rel' attribute for external links
        extensions: [".html"],          // Extensions to apply transform to
        includeDoctype: true,           // Default to include '<!DOCTYPE html>' at the beginning of the file
    });

	// PostGraph from Robb Knight (https://postgraph.rknight.me/)
	eleventyConfig.addPlugin(postGraph, {
		sort: "desc",
	});
};

export const config = {
	// Control which files Eleventy will process
	// e.g.: *.md, *.njk, *.html, *.liquid
	templateFormats: [
		"md",
		"njk",
		"html",
		"liquid",
		"11ty.js",
	],

	// Pre-process *.md files with: (default: `liquid`)
	markdownTemplateEngine: "njk",

	// Pre-process *.html files with: (default: `liquid`)
	htmlTemplateEngine: "njk",

	// These are all optional:
	dir: {
		input: "content",          // default: "."
		includes: "../_includes",  // default: "_includes" (`input` relative)
		data: "../_data",          // default: "_data" (`input` relative)
		output: "_site"
	},

	// -----------------------------------------------------------------
	// Optional items:
	// -----------------------------------------------------------------

	// If your site deploys to a subdirectory, change `pathPrefix`.
	// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

	// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
	// it will transform any absolute URLs in your HTML to include this
	// folder name and does **not** affect where things go in the output folder.

	// pathPrefix: "/",
};

