const STATIC_CONTENT = {
  CONTENT_COPY_IMG: chrome.runtime.getURL("images/content_copy.svg"),
  DONE_IMG: chrome.runtime.getURL("images/done.svg"),
}

function injectCopyBtns() {
  const ticketIdContainerEls = document.querySelectorAll("div[class*='_footerChildSection']");

  for (const ticketIdContainerEl of ticketIdContainerEls) {
    const hasCopyBtn =
      ticketIdContainerEl.getElementsByClassName('copy-btn').length > 0;
    if (hasCopyBtn) continue;

    const links = ticketIdContainerEl.getElementsByTagName('a');
    if (!links.length) continue;

    const ticketId = links[0].children[0].textContent;
    const copyBtn = createCopyBtn(ticketId);
    ticketIdContainerEl.appendChild(copyBtn);
  }
}

function createCopyBtn(ticketId) {
  const copyBtn = document.createElement("img");
  copyBtn.className = "copy-btn";
  copyBtn.src = STATIC_CONTENT.CONTENT_COPY_IMG;

  copyBtn.onclick = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ticketId);
    copyBtn.src = STATIC_CONTENT.DONE_IMG;

    // Reset icon
    setTimeout(() => {
      copyBtn.src = STATIC_CONTENT.CONTENT_COPY_IMG;
    }, 1000);
  };

  return copyBtn;
}

// Jira regularly re-renders as live updates come in (eg if someone moves a ticket)
// which removes our copy button, so we regularly re-inject.
setInterval(() => {
  injectCopyBtns();
}, 200);
