const contentCopyImgUrl = chrome.runtime.getURL("images/content_copy.svg");
const doneImgUrl = chrome.runtime.getURL("images/done.svg");

function injectCopyBtns() {
  const ticketIdContainerEls = document.getElementsByClassName("ghx-stat-2");

  for (const ticketIdContainerEl of ticketIdContainerEls) {
    const hasCopyBtn =
      ticketIdContainerEl.querySelector('[aria-label="copy-btn"]') != null;
    if (hasCopyBtn) continue;

    const ticketIdEl = ticketIdContainerEl.getElementsByClassName("ghx-key")[0];
    const ticketId = ticketIdEl.ariaLabel;
    const copyBtn = createCopyBtn(ticketId);
    ticketIdContainerEl.appendChild(copyBtn);
  }
}

function createCopyBtn(ticketId) {
  const copyBtn = document.createElement("img");
  copyBtn.ariaLabel = "copy-btn";
  copyBtn.className = "copy-btn";
  copyBtn.src = contentCopyImgUrl;

  copyBtn.onclick = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ticketId);
    copyBtn.src = doneImgUrl;

    // Reset icon
    setTimeout(() => {
      copyBtn.src = contentCopyImgUrl;
    }, 1000);
  };

  return copyBtn;
}

// Jira regularly re-renders as live updates come in (eg if someone moves a ticket)
// which removes our copy button, so we regularly re-inject.
setInterval(() => {
  injectCopyBtns();
}, 1000);
