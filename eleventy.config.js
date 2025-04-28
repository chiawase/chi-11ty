import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import eleventyPluginInterlinker from "@photogabble/eleventy-plugin-interlinker";
import pluginFilters from "./_config/filters.js";
import { EleventyRenderPlugin } from "@11ty/eleventy";
import { DateTime } from "luxon";
import externalLinks from "eleventy-plugin-external-links";

// for timezone
const TIME_ZONE = "UTC+8";


/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
	// Eleventy Render Plugin from https://www.11ty.dev/docs/plugins/render/
	eleventyConfig.addPlugin(EleventyRenderPlugin);
	
	// Drafts, see also _data/eleventyDataSchema.js
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
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
		})
		.addPassthroughCopy("./content/feed/pretty-atom-feed.xsl");
	
	// getting the Inconsolata font pulled from node_modules
	eleventyConfig.addPassthroughCopy({
		"./node_modules/@fontsource-variable/inconsolata/files/*.woff2": "fonts/inconsolata/"
	});

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpg,jpeg,gif}");

	// Watch changes to posts
	eleventyConfig.addWatchTarget("content/");

	// Watch changes to CSS files
	eleventyConfig.addWatchTarget("public/css/");

	// Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
	// Adds the {% css %} paired shortcode
	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
	});
	// Adds the {% js %} paired shortcode
	eleventyConfig.addBundle("js", {
		toFileDirectory: "dist",
	});

	// Official plugins
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed/feed.xml",
		stylesheet: "pretty-atom-feed.xsl",
		templateData: {
			eleventyNavigation: {
				key: "Feed",
				order: 9
			}
		},
		collection: {
			name: "posts",
			limit: 10,
		},
		metadata: {
			language: "en",
			title: "Chi Señires",
			subtitle: "Chi's space for thoughts and ideas on her side of the internet",
			base: "https://chisenires.design/",
			author: {
				name: "Chi Señires"
			}
		}
	});

	// Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
	// eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
	// 	// Output formats for each image.
	// 	formats: ["webp", "png", "auto"],

	// 	widths: ["auto"],

	// 	failOnError: false,
		
	// 	useCache: true,
		
	// 	// returnType: "html",
	// 	htmlOptions: {
	// 		imgAttributes: {
	// 			// e.g. <img loading decoding> assigned on the HTML tag will override these values.
	// 			alt: "",
	// 			loading: "lazy",
	// 			decoding: "async",
	// 		}
	// 	},

	// 	// Which source to use for `<img width height src>` attributes
	// 	fallback: "largest", // or "smallest"

	// 	fixOrientation: true,

	// 	sharpOptions: {
	// 		animated: true,
	// 	},

	// 	outputDir: "./img/",

	// 	// Once Cloudinary is used or CDN
	// 	// urlFormat: function ({
	// 	// 	hash, // not included for `statsOnly` images
	// 	// 	src,
	// 	// 	width,
	// 	// 	format,
	// 	// }) {
	// 	// 	return `https://example.com/${encodeURIComponent(src)}/${width}/${format}/`;
	// 	// }
	// });

	// Filters
	eleventyConfig.addPlugin(pluginFilters);

	eleventyConfig.addPlugin(IdAttributePlugin, {
		// by default we use Eleventy's built-in `slugify` filter:
		// slugify: eleventyConfig.getFilter("slugify"),
		// selector: "h1,h2,h3,h4,h5,h6", // default
	});

	eleventyConfig.addShortcode("currentBuildDate", () => {
		return (new Date()).toISOString();
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
	const FOLDER = "v1745848628/chisenires.design/";
	const BASE_URL = `https://res.cloudinary.com/${CLOUDNAME}/image/upload/`
	const FALLBACK_WIDTHS = [ 300, 600, 680, 1360 ];
	const FALLBACK_WIDTH = 680;
	const DEFAULT_SIZES = "(min-width: 580px) 512px, calc(95.38vw - 22px)";
	
	// Generate srcset attribute using the fallback widths or a supplied array of widths
	eleventyConfig.addShortcode("srcset", (file, widths) => {
		const widthSet = widths ? widths : FALLBACK_WIDTHS;
		return widthSet.map(width => {
			let src = `${BASE_URL}q_auto,f_auto,w_${width ? width : FALLBACK_WIDTH}/${FOLDER}${file}`;
			return `${src} ${width}w`;
		}).join(", ");
	});
	
	// Generate the src attribute using the fallback width or a width supplied
	// by the shortcode params
	eleventyConfig.addShortcode("src", (file, width) => {
		return `${BASE_URL}q_auto,f_auto,w_${width ? width : FALLBACK_WIDTH}/${FOLDER}${file}`
	});

	// Add defaultSizes shortcode
	eleventyConfig.addShortcode("defaultSizes", () => {
		return `${DEFAULT_SIZES}`;
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

	// Timezone
	eleventyConfig.addDateParsing(function(dateValue) {
		let localDate;
		if(dateValue instanceof Date) { // and YAML
			localDate = DateTime.fromJSDate(dateValue, { zone: "utc" }).setZone(TIME_ZONE, { keepLocalTime: true });
		} else if(typeof dateValue === "string") {
			localDate = DateTime.fromISO(dateValue, { zone: TIME_ZONE });
		}
		if (localDate?.isValid === false) {
			throw new Error(`Invalid \`date\` value (${dateValue}) is invalid for ${this.page.inputPath}: ${localDate.invalidReason}`);
		}
		return localDate;
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

