# Chi's 11ty setup

Chi's Digital Garden built with a Jekyll template and notes set up in [Obsidian](https://obsidian.md).

Currently built with [Eleventy](https://www.11ty.dev/) site generator (using the [v3.0 release](https://github.com/11ty/eleventy/releases/tag/v3.0.0)).

Will be housed in [chisenires.design](https://chisenires.design).

## TODOs

- ~~clean up old posts in `archive/` since there's gonna be a lot of missing images there + missing titles~~ done
- clean up the metadata? opengraph, etc.?
  - link for refrence to check: https://sia.codes/posts/social-share-images-using-cloudinary/
- fix the tags or categories
- ~~add an option to switch between light mode and dark mode~~ done
- ~~fix the `index.njk` and `intro.md` to make it more fancy~~ this is fine for now
- make a distinction for the microblog posts and the ones that were formatted to be a proper blog post?
- add `tracking.njk` to ignored files when building locally
- add automation to add the URLs to post front matter once articles are "posted"
- set up a better POSSE method xd
- add a sun or moon depending on the setup color scheme
  - i just liked the example from here: https://www.npmjs.com/package/dark-mode-toggle
- learn more about Webmentions and see if it's something I can add here?
  - resources to check:
    - https://sia.codes/posts/webmentions-eleventy-in-depth/
    - https://sia.codes/posts/webmentions-eleventy-talk/

## Changelog

> not really sure if i'll maintain this, but I'll write it here for my visibility lol
## 19 Apr 2025
- realize i forgot to include some updates from early this week, but I updated the font to the Inconsolata Variable font and did it thru npm! wow
- also updated color scheme setup and made sure light mode was accessible / readable, and dark mode is something that can be toggled on as well

## 7 Apr 2025
- update site colors to make the red less... dark

## 30 Mar 2025
- deployed to `chisenires.design`
- setup Google Analytics and Tinylytics

### 12 Mar 2025
- pushed all these to github so it can be read by my server of choice