---
title: TIL of npm cross-platform support
description: 
date: 2025-11-14T09:56:50+00:00
date_updated: 2025-11-14T12:10:27+00:00
tags: 
- writing
- coding
post_language: Taglish
---

Just dedicating a post here to say that OH MY GOD, the reason my site was not building on the server was because of something that I couldn’t debug had I stayed on Windows for coding my site!! 😤

I was already getting confused why my site wasn’t building properly when I used to be able to run and build my site on my personal Windows PC _and_ my work Macbook just fine. Suddenly I kept getting errors after every publishing of a commit I set up in my repo.

Yun pala, all I had to do was to install some NPM package called `sharp`? Some sleuthing online got me stumbling upon [this Github issue](https://github.com/11ty/eleventy-img/issues/168) where they discuss that “`sharp` should be included in the installation” etc etc and grabe, isang linggo halos down yung site ko and I just had to work on it on my Mac / non-Windows machine to see the issue?! 😭 Potek naman hahaha

Though tbh, I’ve been seeing the error message already on the server for a while. It kept telling me *oh, we couldn’t install Eleventy because something*. Actually you know what, I’ll include the error message here from my previous deployments, for my own personal reference too when I look back at my past posts.

Initially, the error was more confusing, since this was the error message:
```Plaintext
2025-Nov-06 15:50:41.304701 #13 [stage-0 9/11] RUN --mount=type=cache,id=###-node_modules/cache,target=/app/node_modules/.cache npm run build

2025-Nov-06 15:50:41.304701 #13 0.665

2025-Nov-06 15:50:41.304701 #13 0.665 > build

2025-Nov-06 15:50:41.304701 #13 0.665 > npx @11ty/eleventy

2025-Nov-06 15:50:41.304701 #13 0.665

2025-Nov-06 15:50:41.304701 #13 1.912 npm warn exec The following package was not found and will be installed: @11ty/eleventy@3.1.2

2025-Nov-06 15:50:41.304701 #13 167.6 [11ty] Eleventy Fatal Error (CLI):

2025-Nov-06 15:50:41.304701 #13 167.6 [11ty] 1. Error in your Eleventy config file 'eleventy.config.js'. (via EleventyConfigError)

2025-Nov-06 15:50:41.304701 #13 167.6 [11ty] 2. There was a problem importing 'eleventy.config.js' via import(esm) (via EleventyImportError)

2025-Nov-06 15:50:41.304701 #13 167.6 [11ty] 3. Cannot find package '@11ty/eleventy' imported from /app/eleventy.config.js
```

At this point, I tinkered with the deployment setup stuff on [my website’s test environment](https://testinglang.chisenires.design).

(and yes, my site does have a test environment 😆 it’s currently set up to mirror what I have on my main site at the moment, but it opens up the opportunity for me to tinker with some things before I “push” it to the production site 😛)

One of the recommendations in the logs was to set up a new environment variable `NIXPACKS_NODE_VERSION` and set it to `22`, so I went and did that. Then the error changed.

This was from one of my failed deployments in my test environment after I tinkered with it for a while:
```Plaintext
...

2025-Nov-12 10:23:52.093308 #13 [stage-0 9/11] RUN --mount=type=cache,id=###-node_modules/cache,target=/app/node_modules/.cache npm run build

2025-Nov-12 10:23:52.363789 #13 0.423

2025-Nov-12 10:23:52.363789 #13 0.423 > build

2025-Nov-12 10:23:52.363789 #13 0.423 > npx @11ty/eleventy

2025-Nov-12 10:23:52.363789 #13 0.423

2025-Nov-12 10:23:53.922383 #13 1.969 [11ty] Eleventy Fatal Error (CLI):

2025-Nov-12 10:23:54.026557 #13 1.970 [11ty] 1. Error in your Eleventy config file 'eleventy.config.js'. (via EleventyConfigError)

2025-Nov-12 10:23:54.026557 #13 1.970 [11ty] 2. There was a problem importing 'eleventy.config.js' via import(esm) (via EleventyImportError)

2025-Nov-12 10:23:54.026557 #13 1.970 [11ty] 3. Could not load the "sharp" module using the linux-arm64 runtime

2025-Nov-12 10:23:54.026557 #13 1.970 [11ty] Possible solutions:

2025-Nov-12 10:23:54.026557 #13 1.970 [11ty] - Ensure optional dependencies can be installed:

2025-Nov-12 10:23:54.026557 #13 1.970 [11ty] npm install --include=optional sharp

2025-Nov-12 10:23:54.026557 #13 1.970 [11ty] - Ensure your package manager supports multi-platform installation:

2025-Nov-12 10:23:54.026557 #13 1.970 [11ty] See [https://sharp.pixelplumbing.com/install#cross-platform](https://sharp.pixelplumbing.com/install#cross-platform)

2025-Nov-12 10:23:54.026557 #13 1.970 [11ty] - Add platform-specific dependencies:

2025-Nov-12 10:23:54.026557 #13 1.970 [11ty] npm install --os=linux --cpu=arm64 sharp

2025-Nov-12 10:23:54.026557 #13 1.970 [11ty] - Consult the installation documentation:

2025-Nov-12 10:23:54.026557 #13 1.970 [11ty] See [https://sharp.pixelplumbing.com/install](https://sharp.pixelplumbing.com/install)

...
```

Technically speaking, the logs were already telling me what the issue was at this point. But it didn’t register to me until the same thing happened when I ran `npm start` (which will just go run `npx @11ty/eleventy --serve` anyways) on my Mac because I was just cleaning up the files I had on my Mac, given that I did publish some new commits via my Windows machine.

When I saw the error in my local machine, I couldn’t go with the excuse that *it works on my machine!!!* anymore. And when I tried running `npm install --include=optional sharp` then server my site locally again, *suddenly* magic. 🤯

I immediately pushed my changes and waited for the logs. But my deployment issues weren’t gonna stop there 😂

 I forgot to set up the new environment variables on my production site (technically, this site you’re looking at, which is [chisenires.design](https://chisenires.design)) so I just had to set that up and tada!! All my changes are now here! 🥳

![Screenshot of production deployment logs for Chi’s website, from latest to earliest. The latest item in the list is a successful deployment that was manually triggered, followed by a cancelled deployment, then the remaining items are all failed deployments from 38 minutes ago and 2 days ago.](../img/uploads/2025/Pasted%20image%2020251114182455.png "the bane of my existence the past few days. The cancelled one was when I saw I forgot to add the Nixpacks environment variable in this setup")

When I shared it to my boyfriend, he just said, “this is why I don’t like working on Windows.” 😆 I don’t know why exactly this is an issue of working on my website code on both Windows and Mac, but since the error logs did say something about checking if my package manager could support [cross-platform](https://sharp.pixelplumbing.com/install/#cross-platform) stuff, I guess this is truly a Windows moment(tm) 😛

Well, now that I have this set up, I guess I shouldn’t have to worry about anything anymore… right? 😅

At least now I finally get to share my updated website in all its glory 😁 Time to share this blog post and a bajillion others I’ve put up the past week lol