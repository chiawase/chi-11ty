# Chi's 11ty setup

Chi's Digital Garden built with a Jekyll template and notes set up in [Obsidian](https://obsidian.md).

Currently built with [Eleventy](https://www.11ty.dev/) site generator (using the [v3.1.1 release](https://github.com/11ty/eleventy/releases/tag/v3.1.1)).

Will be housed in [chisenires.design](https://chisenires.design).

## TODOs

### Not yet done
> Update 7 June 2025: I have moved all the existing TODOs I listed that are not yet done in [my Github repo's Issues tab](https://github.com/chiawase/chi-11ty/issues). That's where I'll keep track of the things I wanna fix on my personal website.

### Already done
- ~~clean up old posts in `archive/` since there's gonna be a lot of missing images there + missing titles~~ done
- ~~add an option to switch between light mode and dark mode~~ done
- ~~fix the `index.njk` and `intro.md` to make it more fancy~~ this is fine for now
- ~~add a sun or moon depending on the setup color scheme~~ done
- ~~clean up the metadata? opengraph, etc.?~~ done

## Changelog
## 7 June 2025
- removed the ongoing TODOs from this README.md and laid them out in [chi-11ty/issues](https://github.com/chiawase/chi-11ty/issues)

> not really sure if i'll maintain this, but I'll write it here for my visibility lol
## 29 Apr 2025
- fixed metadata and auto social image generation via Cloudinary! Talked about it [in this blog post](https://chisenires.design/blog/finally-fixed-the-metadata-generation-and-the-auto-social-images/)
- also added a period after the last tag in the home page
- also commented out the eleventyImageTransformPlugin for now as I figure out my Image CDN setup

## 28 Apr 2025
- fixed how permalinks appear for posts with no titles (within `blog/` mostly)
- also added the date when posts within `archives/` since i have a lot of duplicate "titles"  there
- cleaned up some duplicate entries in my `archives/` that were messing with my permalinks

### 23 Apr 2025
- add [Stuff I Use](https://chisenires.design/stuff-i-use/) page
- modified the Blog list so I can show posts without titles
- fixed some styles that are noted in the commits anyways
- adjusted the base font size from 16px to 20px
- fixed how the `Date Updated` shows, it finally works properly
- also updated this list with some links
  - mulling over adding this list as a separate page in my blog

### 19 Apr 2025
- realize i forgot to include some updates from early this week, but I updated the font to the [Inconsolata Variable font](https://levien.com/type/myfonts/inconsolata.html) and did it [thru npm](https://fontsource.org/fonts/inconsolata)! wow
- also updated color scheme setup and made sure light mode was accessible / readable, and dark mode is something that can be toggled on as well

### 7 Apr 2025
- update site colors to make the red less... dark

### 3 Apr 2025
- removed Google Analytics and Tinylytics tracking
- replaced with [Umami](https://umami.is/) instead

### 30 Mar 2025
- deployed to `chisenires.design`
- setup Google Analytics and Tinylytics

### 12 Mar 2025
- pushed all these to github so it can be read by my server of choice
