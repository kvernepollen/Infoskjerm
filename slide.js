// Config
const slides = {
  "index.html": {next: "index2.html", timeout: 18 },  // yr1
  "index2.html": {next: "index3.html", timeout: 18 }, // yr2
  "index3.html": {next: "index4.html", timeout: 10 }, // livbøye
  "index4.html": {next: "index.html", timeout: 18 },  // kartverket
};

// Setup
const params = new URLSearchParams(window.location.search);
const matches = window.location.pathname.match(/index\d?\.html/);
const current =  matches ? matches[0] : "index.html";
const next    = slides[current].next;
const timeout = slides[current].timeout;

// Progressbar setup
const progressBar = document.getElementById("progress-bar");
document.documentElement.style.setProperty("--timeout", `${timeout}s`);


// Timeout handler
const timeoutHandle = setTimeout(() => {
  const progressState = progressBar.getAttribute("data-state");

  if (progressState === "paused") {
    return;
  }
  toNextSlide();
}, timeout * 1_000); // ms


// Touch handlers
document.addEventListener("keydown", e => {
  if (e.key == " ") {
    onTouch()
  }
})
document.addEventListener("click", e => {
  onTouch()
})

function onTouch() {
    let progressState = progressBar.getAttribute("data-state");

    if (progressState === "running" || progressState === "") {
      progressState = "paused";
    } else {
      progressState = "running";
      toNextSlide();
    }
    progressBar.setAttribute("data-state", progressState);
}

// to next slide function
function toNextSlide() {
  
  window.location.href = `${next}?next=${slides[next].next}`;
}
