// Config
const VENTETID = 10_000; // ms
const nextMap = {
  "index.html": "index2.html",
  "index2.html": "index3.html",
  "index3.html": "index4.html",
  "index4.html": "index.html",
};

// Get element
const progressBar = document.getElementById("progress-bar");


// Timeout handler
const timeoutHandle = setTimeout(() => {
  const progressState = progressBar.getAttribute("data-state");

  if (progressState === "paused") {
    return;
  }
  toNextSlide();
}, VENTETID);


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
  const params = new URLSearchParams(window.location.search);
  const next = params.get("next") ?? nextMap["index.html"];
  
  window.location.href = `${next}?next=${nextMap[next]}`;
}