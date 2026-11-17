
const form = document.getElementById("shorten-form");
const input = document.getElementById("url");
const result = document.getElementById("result");
const error = document.getElementById("error");
const shortLink = document.getElementById("short-url");
const copyButton = document.getElementById("copy-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  result.hidden = true;
  error.textContent = "";

  const url = input.value.trim();

  if (!url) {
    error.textContent = "Masukkan link terlebih dahulu.";
    return;
  }

  try {
    const response = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Gagal membuat link.");
    }

    shortLink.textContent = data.shortUrl;
    shortLink.href = data.shortUrl;
    result.hidden = false;

  } catch (err) {
    error.textContent = err.message;
  }
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(shortLink.href);
    copyButton.textContent = "Tersalin!";
  } catch {
    error.textContent = "Gagal menyalin link.";
  }
});
