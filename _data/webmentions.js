import fs from "fs";
import fetch from "node-fetch";
import unionBy from "lodash/unionBy.js";
import metadata from "./metadata.js";
import dotenv from "dotenv";

const { domain } = metadata;

// Load .env variables with dotenv
dotenv.config();

// Gotten from https://sia.codes/posts/webmentions-eleventy-in-depth/ and https://github.com/maxboeck/eleventy-webmentions/blob/master/_data/webmentions.js

// Added comment: Though I know I can copy paste this from Sia's website,
// in an effort to understand what each line does, I've re-typed everything 
// and occasionally will change some word to match how I would write things.

// const fs = require("fs");
// const fetch = require("node-fetch");
// const unionBy = require("lodash/unionBy");
// const metadata = require("./metadata.js").domain;

// require("dotenv").config();

// Config parameters
const CACHE_FILE_PATH = "_cache/webmentions.json";
const API = "https://webmention.io/api/";
const TOKEN = process.env.WEBMENTION_IO_TOKEN;

// Function to fetch the Webmentions
async function fetchWebmentions(since, perPage = 10000) {
    // If we don't have a domain name or token, abort
    if (!domain || !TOKEN) {
        console.warn(">>> Unable to fetch webmentions: missing domain or token");
        return false;
    }

    let url = `${API}/mentions.jf2?domain=${domain}&token=${TOKEN}&per-page=${perPage}`;
    if (since) url += `&since=${since}`; // only fetch new mentions

    const response = await fetch(url);
    if (response.ok) {
        const feed = await response.json();
        console.log(`>>> {feed.children.length} new webmentions fetched from ${API}`);
        return feed;
    }

    return null;
}

// Merge fresh webmentions with cached entries, unique per ID
function mergeWebmentions(a, b) {
    return unionBy(a.children, b.children, "wm-id");
}

// save combined Webmentions in cache file
function writeToCache(data) {
    const dir = "_cache";
    const fileContent = JSON.stringify(data, null, 2);

    // create cache folder if it doesn't exist already
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    // write data to cache JSON file
    fs.writeFile(CACHE_FILE_PATH, fileContent, (err) => {
        if (err) throw err;
        console.log(`>>> Webmentions cached to ${CACHE_FILE_PATH}`);
    });
}

// get cache contents from JSON file
function readFromCache() {
    if (fs.existsSync(CACHE_FILE_PATH)) {
        const cacheFile = fs.readFileSync(CACHE_FILE_PATH);
        return JSON.parse(cacheFile);
    }

    // if no cache found
    return {
        lastFetched: null,
        children: []
    };
}

export default async function() {
    console.log(">>> Reading webmentions from cache...");

    const cache = readFromCache();

    if (cache.children.length) {
        console.log(`>>> Found ${cache.children.length} webmentions loaded from cache`);
    }

    // Only fetch new mentions in production
    if (process.env.NODE_ENV === "production") {
        console.log(">>> Checking for new webmentions...");
        const feed = await fetchWebmentions(cache.lastFetched);
        if (feed) {
            const webmentions = {
                lastFetched: new Date().toISOString(),
                children: mergeWebmentions(cache, feed)
            };

            writeToCache(webmentions);
            return webmentions;
        }
    }

    return cache;
};