---
title: My personal Obsidian vault setup
description: "While mulling over whether I should make my own page for storing my personal Obsidian vault stuff, I’ll just put this post together so I can at least share it someplace and get back to it in the future."
date: 2025-12-04T13:09:40+00:00
date_updated: 2025-12-04T14:25:27+00:00
tags: 
- writing
- Obsidian
post_language: 
---

I’ve made the decision to get an [Obsidian Sync](https://obsidian.md/sync) Standard yearly subscription for my personal Vault (aptly named *ObCHIdian*, hehe) since after some searching, it seems like there’s no easy non-paid way to have the setup I have in mind: being able to connect to my personal Obsidian vault with my iPhone, my work Macbook, and my Linux PC with everything syncing cleanly.

Before this, when I only had Windows on my PC, I just made use of iCloud since I was paying for it already. Since iCloud was also available as a shared online drive on my PC or Mac (and in extension, my phone), it worked out for me as a “non-paid” (but actually paid) option for the meantime.

I spent a good chunk of yesterday and another day (I forget) searching for a solution that would *also* work on Linux, though. I learned about [rclone](https://rclone.org/iclouddrive/) and saw its config docs for setting it up, but when I tried setting it up, my iCloud login wasn’t working for some reason. After a bit of searching, I learned that it is known to be broken now, and the latest post sharing about [a temporary workaround](https://github.com/rclone/rclone/issues/8587#issuecomment-3590852566) was made 5 days ago as of this writing. And it might only really work with those who had previously set this up before the bug started happening, because when I was trying this out, all I kept getting were error 400s. So, no dice.

I guess eventually I could look into how much it would cost for me to either sub in some online server that can be dedicated to my personal Vault (though honestly this is just like having Obsidian Sync, with extra steps and headaches) or eventually something else in the future that is more Linux-friendly (maybe…) and cross-platform friendly and maybe move to that.

But for now, I’ll make do with this setup for my personal setup. It’s already part of my routine or things I note to go through stuff in my Vault, maybe not in the “traditional” way how others may use Obsidian, but it works enough for me:

#### Daily notes

I have a daily notes template that helps me quickly track my mood for that day (using a 7-point scale, 1 lowest mood and 7 highest mood) as well as any thoughts or things of note for that day or what I’m thinking about. Eventually if I decide to look back at past posts, then maybe this would be helpful.

I also have a weeklies template that gets the information for each day of the dailies and compiles them in one place, mostly for my sake so it’s easier to track where things are.

#### Tracking tasks

*Though maybe, not really?*

I *used to* use Obsidian to track tasks too, but that… hasn’t really moved on for a while. At some point I got overwhelmed with all the things I took note as TODOs and by the time I was ready to get back to all of them, I either have forgotten their importance or I didn’t see it since I wasn’t on it 24/7.

This is why I use my Google Calendar as my way to remind myself of things to do. Either I actually save it as a task, or it’s some random personal event where I block off time for me to work on a thing.

Secondary is leaving myself notes in my Telegram Saved Messages, which work better for me now as I have the option to keep it there so I could get back to it in the future, or I delete the message to mark it as “done”.

#### Tracking my bills to pay

I also track my bills payments in Obsidian. For some reason, filling it up with my custom [Metabind](https://www.moritzjung.dev/obsidian-meta-bind-plugin-docs/) + [Templater](https://silentvoid13.github.io/Templater/) stuck with me instead of doing it in plain ol’ spreadsheets. The only thing missing in my logging of bills is being able to do basic arithmetic in the fields when I deal with numbers—which is where the huge benefit of spreadsheets come in—but since [I use Actual](/stuff-i-use/#budgeting-and-personal-finance) for tracking and budgeting my money, I usually have no need to do the arithmetic in Obsidian because I’ve either done it myself in my head or I’m just copying the information from Actual itself.

#### A contacts list, or a “people to remember by” list

I don’t use it as often, but I have some sort of CRM or Contacts List base so I could “mention” certain people in my daily notes and in turn I could use the fact that I mentioned them in certain notes to recall memories or notable things with them.

It’s not sticking as great as the bills payment tracking has with me, mostly because actually taking a few minutes to note a person’s name, (maybe) age/birthday, (maybe) what they do, where they’re based, how to contact them, who they’re connected to… those are all seamlessly done by social networks with little to no effort. But, for the sake of my own personal “tracking” and way to help my future self remember past memories, I’ll do my best to take the time to create a note for someone dear to me and list down anything I want to remember about them.

#### (An attempt to) track the media I consume

Honestly, to keep this short, I’ll just give up on doing this privately in my personal Vault. I’ve attempted multiple setups for the way I track the manga & books I read, or the anime, series, movies & films I watch. They have all been very tedious ways for me that I end up just not doing them for various reasons.

After seeing [anh’s website](https://anhvn.com/) with her [media library](https://anhvn.com/media/) and [digital garden](https://anhvn.com/garden/)—I particularly love the callout on her home page with what she’s recently playing (Hades 2!!!), what she’s listened to, and what she last watched—I figured I could maybe try to start that on *my* personal website, as well. I think that way I could re-purpose the old notes I made before when I was trying to stick to a workflow for me to successfully track all the *media* I consume without having to involve third-party apps or whatnot, all just… *out there*.

#### (Also an attempt to) track the locations I’ve visited

This was also an ambitious project of mine to note where I’ve gone and visited in the past, and I’ve even tried to use this to log *events* and *meetings* with people, all in Obsidian with my personal custom template notes.

Suffice to say, they were clunky to set up every time, and I’ve long decided to give up on making that thing work. For now, I have resigned to just letting Google do its thing and track my past places and save my Location history, even if that does make me feel a bit uncomfy knowing I’m willingly giving in to a huge company using my data for whatever. I *do* utilize the maps and GPS as much as I can, and I don’t know how I’ll live without it now—I know I can live without it, just with much more difficulty than I do now—so I figured I could also just maximize it for the meantime.

I don’t think this’ll change anytime soon, as it’s pretty tricky to work with maps and GPS on a personal project considering the stuff to set that up essentially costs money to maintain, and most of the solutions are paid or need a subscription to work. There is [OpenStreetMap](https://www.openstreetmap.org/#map=6/13.02/121.77) which is great and all, but while that’s not yet the norm or what majority of the people around me use, I’ll keep using the more accessible-to-me apps.

I am also on iOS, so I also have the option to use Apple Maps… but my 3rd-world / developing country living ass doesn’t feel like it’s as reliable as how Google Maps is here, since *that* is what’s more accessible to everyone here. Easier to also coordinate with people with this rather than having to force / convince them to “my side” and use other apps.

*Why did I go blabber on about maps here? Time to get back to talking about my personal Obsidian setup…*

## It’s been more than a year

I do want to recognize that I’ve been using my personal Obsidian vault for more than 1 year now, since I started last 28 February 2024 and set it up so that if I turn on my PC, I automatically create a note for that day so I could note down anything in particular there.

![Screenshot of the contents of Chi’s Obsidian vault folder named “06 Timestamps”, which has a subfolder for 2024 and 2025, and another subfolder dedicated to each month starting “02-February”. The cursor is highlighting the file named “2024-02-28-Wednesday”.](../img/uploads/2025/Pasted%20image%2020251204220735.png "That was a very random end of Februrary + leap year lol")

I think my naming could use some updating, as I don’t know if <abbr title="Map of Content">MOC</abbr>s still make sense in my context, but I don’t really know what else to call them.

![Screenshot of Chi’s Home Obsidian file, which serves as her vault’s home page. The first section has a list of links for different MOCs in her vault, as well as quick action buttons to create notes, with the primary action being a red button labeled “Open today’s daily note”. Below the button is another table of contents of the headings in the file, noting that the file also has a Mood Tracker section that has links to the year 2025 and 2024, respectively.](../img/uploads/2025/Pasted%20image%2020251204220931.png "This is pinned to my Obsidian workspace, so it’s easy for me to access everything else. It’s worked well for me so far!")

I also initially collated that Mood Tracker in Obsidian for the purpose of therapy, but I’ve finished my past sessions and just kept the habit of doing it ever since. At least just as a means to see if there are trends with my overall mood, and to see if I’m getting to a point where it’s a cause of concern.

I initially got inspiration with this way of tracking from using the Mood tracker in MS Viva Insights, when I still worked for a company that had us deep within MS Teams every working day.

![Screenshot of Microsoft’s mood tracker in Viva Insights. To the left is  a range of emojis ranging from the happiest grinning face, until the saddest and most worried expression in a 5-point scale. To the rigth is a graph of the user’s “Reflection History” on July 2022, showing the historical data in the past 7 days on how their mood fluctuated up and down throughout the week.](../img/uploads/2025/Pasted%20image%2020251204221430.png "This was essentially what I saw in MS Teams, but in dark mode. I don’t know if I still have screenshots of when I’d note my own mood before there lol")

I just extended it from 5 points to 7 points after reading [kepano’s blog post](https://stephango.com/vault#rating-system) about why he uses this particular rating scale, and after trying it out for a few days, it gave me a bit more leeway to note when days weren’t necessarily super bad, but weren’t all that good either, and the vice versa of that. I had to do some initial refactoring and translating 5-points to 7-points a little after the start of the year… but once I set it up and saved it to my note template, it’s been like that ever since.

## Wrapping up

I meant to wrap this up in a more shorter post initially, but I’ve gone ahead and practically just noted down the things I’ve done within the past year into this post. I guess that worked out in the end for me.

I don’t know if I’ll ever share my personal note templates publicly, as I really just mimicked how others set their own note templates up—I started with mimicking [kepano’s Obsidian setup](https://stephango.com/obsidian), but branched out from there afterward while being inspired by other people’s vaults without me noting them down so I don’t have sources huhu—but maybe in the future, once I have a setup that may make more… sense… I could share it.

Or I could always not; either way it doesn’t matter 😆 I’ll worry about that more in the future.
