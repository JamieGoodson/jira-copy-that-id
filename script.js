const STATIC_CONTENT = {
  CONTENT_COPY_IMG: chrome.runtime.getURL("images/content_copy.svg"),
  DONE_IMG: chrome.runtime.getURL("images/done.svg"),
};

function addCopyBtnsToChildren(node) {
  const ticketIdContainers = node.querySelectorAll(
    "div[class*='_footerChildSection']"
  );

  for (const ticketIdContainer of ticketIdContainers) {
    if (ticketIdContainer.getAttribute("data-copybtn")) continue;
    ticketIdContainer.setAttribute("data-copybtn", true);

    const links = ticketIdContainer.getElementsByTagName("a");
    if (!links.length) continue;

    const ticketId = links[0].children[0].textContent;
    const copyBtn = createCopyBtn(ticketId);
    ticketIdContainer.appendChild(copyBtn);
  }
}

function createCopyBtn(ticketId) {
  const copyBtn = document.createElement("img");
  copyBtn.className = "copy-btn"
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

const observer = new MutationObserver(function (mutations) {
  for (const mutation of mutations) {
    if (!mutation.addedNodes.length) continue;

    for (const node of mutation.addedNodes) {
      if (node.nodeType !== Node.ELEMENT_NODE) continue;
      addCopyBtnsToChildren(node);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
