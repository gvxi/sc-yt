// server.js
import express from "express";
import { exec } from "child_process";

const app = express();

app.get("/api/video", (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "missing url" });

  // yt-dlp command: fetch best video URL
  exec(`yt-dlp -f "best[ext=mp4]" -g ${url}`, { timeout: 20000 }, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: stderr || err.message });
    }
    const lines = stdout.trim().split(/\r?\n/).filter(Boolean);
    const videoUrl = lines[0] || null;
    res.json({ videoUrl, all: lines });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`yt-dlp API listening on ${port}`));
