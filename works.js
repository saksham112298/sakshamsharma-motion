/*
  YOUR WORK LIVES HERE. This is the only file you need to edit to add videos.

  Each line in WORKS is one video slot. A slot with no video shows a "Coming soon" frame.
  To fill a slot, add a YouTube link (or a video file) and it becomes clickable.

  Fields
    category  "motion-graphics", "vfx", "3d" or "documentary"
    title     Name of the video. Leave "" to show the category name.
    youtube   A YouTube link or video ID. Example: "https://youtu.be/abc123XYZ00"
    video     Instead of YouTube: a small .mp4 inside this folder. Example: "assets/clip.mp4"
    thumb     Cover picture inside this folder. Example: "assets/thumb-1.jpg"
    preview   Optional short silent loop that plays on hover. Example: "assets/loop-1.mp4"
    ratio     "16:9" (default) or "9:16" for vertical videos and Reels
    feature   true makes the slot big on the "All" view (use it for your best work)

  REEL is the big frame at the top of the page. Add your showreel link there when you have one.
*/

window.REEL = {
  youtube: "",
  video: "",
  poster: ""
};

window.WORKS = [
  { category: "motion-graphics", feature: true, title: "", youtube: "", video: "", thumb: "", preview: "", ratio: "16:9" },
  { category: "vfx",             title: "", youtube: "", video: "", thumb: "", preview: "", ratio: "16:9" },
  { category: "3d",              title: "", youtube: "", video: "", thumb: "", preview: "", ratio: "16:9" },
  { category: "documentary",     title: "", youtube: "", video: "", thumb: "", preview: "", ratio: "16:9" },
  { category: "motion-graphics", title: "", youtube: "", video: "", thumb: "", preview: "", ratio: "16:9" },
  { category: "vfx",             title: "", youtube: "", video: "", thumb: "", preview: "", ratio: "16:9" },
  { category: "3d",              title: "", youtube: "", video: "", thumb: "", preview: "", ratio: "16:9" },
  { category: "documentary",     title: "", youtube: "", video: "", thumb: "", preview: "", ratio: "16:9" },
  { category: "motion-graphics", title: "", youtube: "", video: "", thumb: "", preview: "", ratio: "16:9" }
];
