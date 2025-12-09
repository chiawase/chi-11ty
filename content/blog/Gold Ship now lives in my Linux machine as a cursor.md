---
title: Gold Ship now lives in my Linux machine as a cursor
description: In this post, I share my experience of learning how Linux cursors are set up—at least in a GTK? context—and how I set up the Gold Ship cursor pack to work in Linux.
date: 2025-12-09T10:15:22+00:00
date_updated: 2025-12-09T15:55:23+00:00
tags: 
- writing
- umamusume
- linux
post_language: english
---

In my desire to customize [my Linux machine](/blog/dual-boot-linux-pc/#display-cursor), I searched for what cursors I could use to further personalize my setup. I ended up choosing this [Gold Ship cursor set](https://ko-fi.com/s/25055f08b1) made by pixloen with some edits to the file names and added symlinks to make it usable in my Linux setup.

I want to share how I got to this point though, because it was not as easy as just downloading the files, opening the correct folder, moving files to relevant “cursors” folder, then selecting it as the cursor theme. 😅

## Starting my search for the perfect cursor theme

At first, I didn’t know what cursor theme to use. I don’t really have a particular vibe I want to go with, so I had to think first of what I wanted to try out before I settled on one choice.

I started my initial search for Katamari Damacy cursors since I thought, *it would be really cute to see the Prince roll a katamari as I click around my Linux setup lol* But I only found [this Katamari Damacy cursor](https://www.rw-designer.com/cursor-detail/215679) (and some related Katamari Damacy cursors are also shown on the page itself), but it seemed like they were just one-off designs, and wasn’t a cursor set like I initially envisioned. So, the search continues.

Then I remembered that back in college, I used to use this [Luigi cursor set](https://www.cursors-4u.com/cursor/2011/11/06/luigi-set.html)[^1] on my Windows PC. I didn’t really have any initial idea of *what kind* of cursor to use when I was going down this rabbit hole, so I figured I’d start with something familiar. So I go and download the cursor pack.

When I opened the ZIP file, I saw that they were all `.cur` files. *Alright, that seems to make sense, since they are cursors*, I think to myself, but after searching about it in the [Arch Linux Wiki](https://wiki.archlinux.org/title/Cursor_themes#Installation), I then learned that it wasn’t gonna be as simple like before. Windows does have a lot of GUIs, and setting up the cursor can be configured in the system settings with a lot of point-and-click action.

On Linux though, it’s a different story.

## Deciding whether to convert cursors or just look for another set

I was going to try and convert the Luigi cursor set to a Linux-friendly version, but at that point, I figured I should maybe try to find another cursor theme in case I saw something else I liked.

### Side quest: actually converting Windows cursors into usable files in Linux

I knew from some web sleuthing that one could convert Windows cursor themes into Linux with [win2xcur](https://github.com/quantum5/win2xcur)—and I even tested that now with the Luigi cursor set just to see what it outputs for the sake of this post, since I didn’t do it initially when I changed my cursor theme as I didn’t need to do it myself anymore.

![Screenshot of Chi’s desktop showing two window explorers side-by-side, with annotations on the contents of the left window as the Windows cursor files and the contents of the right window are the converted Linux cursor files.](../img/uploads/2025/Pasted%20image%2020251209192058.png)

(Just as an added note: I was the one that added the `index.theme` in the right side of the screenshot there. I noticed GTK Settings I use ([nwg-look](https://github.com/nwg-piotr/nwg-look)) likes it if this has some basic information like the Theme Name and a Description. I explain it more later in this post.)

So, does this work outright? Not necessarily. I had to rename a bunch of things and even set up [symlinks](https://en.wikipedia.org/wiki/Symbolic_link) to make it work. I can explain that more while talking about the Gold Ship cursor theme and how I set it up on my Linux machine.

## Cleaning up the Gold Ship Linux cursor set

I was happy to have found this [reddit post](https://www.reddit.com/r/UmaMusume/comments/1mfkxjp/someone_made_a_custom_cursor_with_uma_musume/) that led me to [pixloen’s ko-fi shop](https://ko-fi.com/pixloen/shop) where she has a bunch of Umamusume themed cursor sets. Immediately I went for Gold Ship’s cursor theme as [my bike](/stuff-i-use/#my-bicycle) also shares the same namesake, and I just really like Gold Ship as a character. It’s even in my favorite color, which is red, so that’s also a plus.

I downloaded the ZIP file[^2] and took a peek at the files:

![Screenshot of Chi’s file explorer showing ZIP file and the extracted parent folder “Gold Ship Cursor Pack by pixloen”, with 3 folders in it for Mac, Linux, and Windows, and a README text file and a preview image for the cursor set.](../img/uploads/2025/Pasted%20image%2020251209211715.png "As mentioned in the contents and the README, the ZIP does contian the relevant cursor files for Linux, too, as well as other OSes")

I followed [the instructions laid out in Arch Linux Wiki](https://wiki.archlinux.org/title/Cursor_themes#GTK:~:text=The%20cursor%20theme%20directory%20structure%20is%20theme%2Dname%2Fcursors) to set up the directory properly in my `~/.local/share/icons/` folder and hoped for the best. I did see it show up in my **GTK Settings > Mouse cursor** tab, so I felt hopeful this was working.

![Cropped screenshot of a file explorer on the left showing a folder named “gold-ship-initial” with another folder named “cursors” and an index.theme file, and the GTK Settings on the right with the mouse cursor tab active. In the settings, the highlighted item in the list is labeled “Gold-Ship”, with a cursor theme preview to its right.](../img/uploads/2025/Pasted%20image%2020251209212646.png)

(I have another item here named “Gold Ship Cursors” as that’s my properly set up cursor set already.)

I was confused at the start on why this wasn’t working. So I took a peek at how other cursor themes were set up in `/usr/share/icons` since I saw that was also another place one could look at for cursor themes. I looked at the Adwaita cursor set and noticed there were specific names to certain cursor image, and some were even using the same image, but had a 🔗 link icon on its preview as well.

![Screenshot of Chi’s file explorer showing the Adwaita cursors folder contents, with an annotation for the first 3 cursor images saying, “why do these have no link icons?” and the next 5 cursor images have another annotation saying, “why do these have a link icon and the file name is in italics?”](../img/uploads/2025/Pasted%20image%2020251209214930.png)

*What’s that? Why is it like that?*

Then I saw at the bottom of the file explorer that there’s a note specifically mentioning that the `arrow` file (for example, I highlighted it here) is an X11 cursor and it’s a **link to `default`**. After scrolling down the rest of the files, there *is* a `default` cursor file that doesn’t have a link icon for its preview.

Judging from how everything else is laid out in the folder, I inferred that this is how one could indicate what cursor will be used for pointers, crosshairs, indicating text input, resizing things, etc. I went ahead and used this as a reference and plotted the Gold Ship cursor set files to the naming convention of Adwaita.

This is the final output:

![Screenshot of Chi’s Linux desktop with two file explorers side by side. The left side is showing the contents of the Adwaita cursors folder contents, while the right side is showing the gold-ship-cursors contents. Some of the files have the same names.](../img/uploads/2025/Pasted%20image%2020251209215846.png)

The left side is my reference, which are the Adwaita cursor images. The right side is my cleaned up version for the Gold Ship cursors to work well with Linux.

### Explaining the (manual) process

I didn’t know how to do this programatically, so I did each remapping one-by-one.

![3 side-by-side file folders showing the Adwaita cursors as the reference folder, the Gold Ship cursor pack based on how it looked initially after exporting, and the cleaned up Gold Ship cursor files as a preview of the final output that works as the cursor set used in Chi’s Linux setup.](../img/uploads/2025/Pasted%20image%2020251209224136.png "the reference, the before, and the after")

My process was just like this:

1. For each Gold Ship cursor file, check if another Adwaita cursor file has a similar setup.
2. Then,
	- If the Adwaita file reference is a symlink to another file (AKA it has the 🔗 icon), I check what the original file was. For example, the `arrow` cursor file is a symlink to the `default` cursor file.
	- If the Adwaita file reference is not a symlink (AKA no 🔗 icon present), I just take note that this would be the main reference for other cursors.
3. In the Gold Ship cursors folder, I just copy the implementation based on what I indicated in #2.
	- For main reference files, I just do simple renaming. So for example, `default` in Adwaita is the *default* pointer, but I noticed in the exported file, the file name is `left_ptr` instead. To align it with the Adwaita reference, I set the file name to be the same.
	- For symlink files, I had to run some terminal commands to set this up, since I didn’t see any way to do that with my file explorer. For the sake of making it easier to type the commands, I opened a terminal within the `cursors/` folder and ran the following command:
	  
		```shell
		ln -s <original_name> <name_of_symlink_file>
		```
		
		This essentially creates a new symlink file, makes its target whatever file name was mentioned first, and its new file name is the second indicated value.
		
		Here’s the history of my shell logs when I set it up:

	  ![Screenshot of a terminal showing a log of the commands run by Chi on 8 December, consisting mostly of commands creating symbolic links using the ln -s command.](../img/uploads/2025/Pasted%20image%2020251209222407.png "Recently learned about the `history` command which is helpful to trace back my steps and show them here 😁")
	  
	  There’s some liberties exercised in some of them, where I matched them based on what the cursor felt like it would work better in. 
	  
	  ![Three file explorer views showing cursor files: left shows Adwaita’s “wait” and “watch” cursors that look identical, middle shows the Gold Ship “wait” cursor, and right shows the Gold Ship final mapping where “wait” and “watch” are different cursors.](../img/uploads/2025/Pasted%20image%2020251209230334.png)
	  
	  An example is the `wait` cursor for golshi[^3], instead of copying how Adwaita cursors have it set up—where `wait` and `watch` are the same cursor—I used the `left_ptr_watch` cursor instead and just renamed it accordingly.
4. Once I was done doing that, I had one last thing to check: the `index.theme` file. The exported cursor pack also did have the same file, but I edited it to rename the title, add a description, and also add an `Inherits=` item and set it to Adwaita, to make it some sort of fallback cursor theme.[^4]
   
   ![Three index.theme files side-by-side: left shows Adwaita cursor theme configuration, middle shows Gold Ship initial theme with Name=Gold-Ship, right shows Gold Ship Cursors final theme with Inherits=Adwaita.](../img/uploads/2025/Pasted%20image%2020251209232138.png)
   
After selecting the Gold Ship Cursors in my GTK Settings and clicking **Apply**, I rebooted my Linux machine and hoped for the best.

When it loaded again… violà! It’s here!

![Screenshot of GTK Settings window with the Mouse cursor tab open and Gold Ship Cursors is the selected cursor theme. A preview of the different cursors available in the theme is shown to the right, along with an option to adjust cursor size, which is currently set to 24 pixels.](../img/uploads/2025/Pasted%20image%2020251209233002.png "Showing the Gold Ship Cursors off… with my Gold Ship cursor 😎 hehe")

I’m so happy the cursor also has animations. She’s so cute next to the cursor pointer. *Anything but training* loljk

## Some reflections after doing… all that

Part of me wonders if (a) another tool to convert Windows cursors into Linux cursors already exists elsewhere online, I just haven’t searched hard enough, or (b) regardless of the first point, if I could build whatever I did manually into an executable script that could help someone else in the future (or me! lol).

I did initially also want to reach out to the artist who put together the umamusume cursor themes to share that the Linux version in her other cursor themes may not necessarily work out of the box like how the Windows and Mac (maybe?) would, and to share that I got to make it work with golshi’s and could fix the rest for her too. I dunno. Maybe it would be smarter to do that if I figure out the less-manual way to go about it 😆

I also wanna do the same for the Luigi cursors I already got to convert already… maybe I’ll share the files once I’ve cleaned it up so at least if someone else wanted to have that cursor theme, most of the tedious work has been done 😆

This post became longer than I initially thought it would be, but if ever you read until here, thank you! You deserve a carrot. 🥕 Or a break. Or both. 😛

[^1]: As I was writing this post, I searched for the link to the original creator, and I found her original post for this very same cursor set in [DeviantArt](https://www.deviantart.com/magical-bra/art/Luigi-cursors-190124625). Man, she made this in 2010! 😱 It’s been that long ago wow time flies

[^2]: Initially I downloaded it without paying anything since it was allowed, but now as I write this, I gave 5 USD to chip in and to thank her for the wonderful set 😁

[^3]: The nickname for Gold Ship, the umamusume character. I’ve been typing her name in full for so long and only now did I decide to just write her nickname lmao

[^4]: I do not know if this actually works as intended as I haven’t really encountered any interactions yet that would merit having to show those other cursors I didn’t map yet, so I guess I’ll just see in the future what happens.
