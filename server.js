// server.js
import express from "express";
import { exec } from "child_process";

const app = express();

app.get("/api/video", (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "missing url" });

  // Use yt-dlp with real browser User-Agent and robust options
  const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36";

  const command = `python3 -m yt_dlp -f "best[ext=mp4]" -g --no-check-certificate --user-agent "${userAgent}" "${url}"`;

  exec(command, { timeout: 30000 }, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: stderr || err.message });
    }

    const lines = stdout.trim().split(/\r?\n/).filter(Boolean);
    const videoUrl = lines[0] || null;

    res.json({ videoUrl, all: lines });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`yt-dlp API listening on port ${port}`));