# Chi's 11ty setup

Chi's Digital Garden built with a Jekyll template and notes set up in [Obsidian](https://obsidian.md).

Currently built with [Eleventy](https://www.11ty.dev/) site generator (using the [v3.0 release](https://github.com/11ty/eleventy/releases/tag/v3.0.0)).

Will be housed in [chisenires.design](https://chisenires.design).

## TODOs

> Just listing all the things I wanna do for this site, in no particular order.
### Not yet done
- ~~fix~~ clean up the tags or categories
- clean up the metadata? opengraph, etc.?
  - link for refrence to check: https://sia.codes/posts/social-share-images-using-cloudinary/
- make a distinction for the microblog posts and the ones that were formatted to be a proper blog post?
  - slowly getting there
- add `tracking.njk` to ignored files when building locally
- add automation to add the URLs to post front matter once articles are "posted"
- set up a better POSSE method xd
  - stuff to check:
    - https://www.citationneeded.news/posse/
    - https://echofeed.app/
- learn more about Webmentions and see if it's something I can add here?
  - resources to check:
    - https://sia.codes/posts/webmentions-eleventy-in-depth/
    - https://sia.codes/posts/webmentions-eleventy-talk/
- add a secondary nav for showing ALL the links and pages I have
  - inspiration:
    - https://heydingus.net/
- check what other pages in https://slashpages.net/ are things I'd like to have on my own site
  - particularly: also write about my AI usage
    - references:
      - https://www.bydamo.la/p/ai-manifesto
      - https://sive.rs/ai
- include site in Webrings!
  - another related task to this: figure out how to set up a Tambayan 404 Webring

### Already done
- ~~clean up old posts in `archive/` since there's gonna be a lot of missing images there + missing titles~~ done
- ~~add an option to switch between light mode and dark mode~~ done
- ~~fix the `index.njk` and `intro.md` to make it more fancy~~ this is fine for now
- ~~add a sun or moon depending on the setup color scheme~~ done

## Changelog

> not really sure if i'll maintain this, but I'll write it here for my visibility lol
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
