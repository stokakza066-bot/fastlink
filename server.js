const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "links.json");

app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));

function readLinks() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, "utf8")); }
  catch { return {}; }
}
function saveLinks(links) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(links, null, 2));
}
function makeCode() {
  return crypto.randomBytes(4).toString("base64url").slice(0, 6);
}

app.post("/api/shorten", (req, res) => {
  const raw = typeof req.body.url === "string" ? req.body.url.trim() : "";
  let target;
  try { target = new URL(raw); }
  catch { return res.status(400).json({ error: "Masukkan URL yang valid." }); }

  if (!["http:", "https:"].includes(target.protocol)) {
    return res.status(400).json({ error: "Hanya URL http:// atau https:// yang didukung." });
  }

  const links = readLinks();
  let code = makeCode();
  while (links[code]) code = makeCode();
  links[code] = { url: target.href, clicks: 0, createdAt: new Date().toISOString() };
  saveLinks(links);

  const base = `${req.protocol}://${req.get("host")}`;
  res.json({ shortUrl: `${base}/${code}`, code });
});

app.get("/:code", (req, res, next) => {
  if (req.params.code === "favicon.ico") return next();
  const links = readLinks();
  const item = links[req.params.code];
  if (!item) return res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
  item.clicks = (item.clicks || 0) + 1;
  saveLinks(links);
  res.redirect(302, item.url);
});

app.listen(PORT, () => console.log(`FastLink running on port ${PORT}`));
