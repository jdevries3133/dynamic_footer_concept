/******************************************************************************
 *    FOOTER CREATION AND MUTATION
 */

/**
 * If omitIndex, we will leave an empty placeholder for that item in the
 * new toolbar. Like when we are viewing a given article.
 */
function createDynamicHeader(omitIndex = null) {
  const container = document.querySelector("main");
  const headers = document.querySelectorAll("h1");

  const footerHtml = `
    ${[...headers]
      .map((h, i) =>
        i === omitIndex
          ? "<div></div>"
          : `
    <button id=${h.innerText + "MenuElement"}>
      ${h.innerText}
    </button>`
      )
      .join("")}
  `;
  const footer = document.createElement("div");
  footer.id = "dynamicFooter";
  footer.classList.add("dynamicFooter");
  footer.innerHTML = footerHtml;
  container.appendChild(footer);
}

function destroyDynamicHeader() {
  document.getElementById("dynamicFooter").remove();
}

/**
 * Update the DOM depending on whatever article is in view. This removes
 * the Nth item from dynamicFooter and replaces it with an empty placebolder.
 *
 * Also, if null is passed, that means that none of the articles are
 * currently being viewed, and the dynamicFooter returns to it's original
 * state.
 */
function viewingArticle(articleIndex) {
  destroyDynamicHeader();
  createDynamicHeader(articleIndex);
}

/******************************************************************************
 *    INTERSECTION OBSERVER, MUTATION TRIGGERS
 */

function onIntersect(entries) {
  const articlesVisible = !!entries
    .map((e) => e.isIntersecting)
    .reduce((prev, cur) => prev | cur);
  entries.forEach((event) => {
    if (event.isIntersecting) {
      // I've just tagged the index I'll need for the omitIndex onto the
      // article element itself.
      const omitIndex = parseInt(event.target.getAttribute("index"));
      destroyDynamicHeader();
      createDynamicHeader(omitIndex);
    } else if (articlesVisible) {
      return;
    } else {
      // no articles visible. Refresh toolbar
      destroyDynamicHeader();
      createDynamicHeader();
    }
  });
}

function initObserver() {
  const observer = new IntersectionObserver(onIntersect);
  const targets = document.querySelectorAll("article");
  targets.forEach((t, i) => {
    // tag the index I'll need for the omitIndex onto the article element
    // itself.
    t.setAttribute("index", i);
    observer.observe(t);
  });
}

function onDomContentLoaded() {
  createDynamicHeader();
  initObserver();
}

document.addEventListener("DOMContentLoaded", onDomContentLoaded);
