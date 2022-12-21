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
  const copyBtn = document.createElement("span");
  copyBtn.ariaLabel = "copy-btn";
  copyBtn.className = "copy-btn material-symbols-outlined";
  copyBtn.textContent = "content_copy";

  copyBtn.onclick = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ticketId);
    copyBtn.textContent = "done"; // Change to done icon

    // Reset icon
    setTimeout(() => {
      copyBtn.textContent = "content_copy";
    }, 1000);
  };

  return copyBtn;
}

// Jira regularly re-renders as live updates come in (eg if someone moves a ticket)
// which removes our copy button, so we regularly re-inject.
setInterval(() => {
  injectCopyBtns();
}, 1000);
