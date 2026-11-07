# Your portfolio: how to put it online and add videos

Everything here is free. You do not need to install anything.

## 1. Put the site online (about 10 minutes)

1. Go to github.com and make a new account for the portfolio. Pick a clean username, for example `sakshamsharma-edits`. Keep your old account as it is.
2. Click **New repository**. Name it exactly `YOUR-USERNAME.github.io` (same as your username). Set it to **Public**.
3. On the empty repo page, click **uploading an existing file**. Unzip the portfolio folder on your computer, open it, select everything inside (not the folder itself), and drag it all into the page. Click **Commit changes**.
4. Go to **Settings > Pages**. Under Branch, choose `main` and `/ (root)`, then Save.
5. Wait 1 to 2 minutes. Your site is at `https://YOUR-USERNAME.github.io`.

## 2. Fix the link in three places

Open `index.html` on GitHub (click the file, then the pencil icon). Near the top, replace `USERNAME` with your GitHub username in these three lines:

- `<link rel="canonical" ...>`
- `<meta property="og:url" ...>`
- `<meta property="og:image" ...>`

This makes the preview picture and title show up when you send your link on Instagram or WhatsApp. Commit the change.

## 3. Add a video later

Upload your video to YouTube first (public or unlisted). Then open `works.js` and find a line like this:

```
{ category: "vfx", title: "", youtube: "", ... }
```

Fill in a title and paste your YouTube link:

```
{ category: "vfx", title: "Product ad cleanup", youtube: "https://youtu.be/abc123XYZ00", ... }
```

Commit. The "Coming soon" frame turns into a playable video. The thumbnail comes from YouTube automatically.

- **Best work:** add `feature: true` to one line and it shows large at the top of the "All" view.
- **Vertical videos (Reels):** set `ratio: "9:16"`.
- **More slots:** copy any line and paste it below. **Fewer slots:** delete the line.
- **Showreel:** put your showreel link in `REEL` at the top of `works.js`. The color-bar frame on the home page becomes a play button.
- **Hover preview (optional):** put a short silent loop, a few MB at most, in the `assets` folder and set `preview: "assets/loop-1.mp4"`.

## 4. Before you send the link to clients

- Fill at least 3 or 4 slots with real work.
- Open the site on your phone and check it.
- Put the link in your Instagram bio.

## 5. Custom address later (optional, costs a little)

When you have paid work, you can buy a domain like `sakshamsharma.in`. In GitHub **Settings > Pages**, add it under Custom domain and follow the DNS steps your domain seller shows. The site files stay the same.

## What each file does

- `index.html`: the page and all the text
- `styles.css`: colors, fonts, layout
- `main.js`: animations, filters, video player
- `works.js`: your videos (the one you will edit most)
- `vendor/`, `fonts/`: animation library and font, stored in the site so nothing loads from outside
- `licenses/`: license notices for the font and animation library. Leave them in.
