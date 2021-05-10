/**
 * Update the DOM depending on whatever article is in view. This removes
 * the Nth item from dynamicFooter and replaces it with an empty placebolder.
 *
 * Also, if null is passed, that means that none of the articles are
 * currently being viewed, and the dynamicFooter returns to it's original
 * state.
 */
function viewingArticle(articleIndex) {
  destroyDynamicFooter();
  createDynamicHeader(articleIndex);
}

/**
 * If omitIndex, we will leave an empty placeholder for that item in the
 * new toolbar. Like when we are viewing a given article.
 */
function createDynamicHeader(omitIndex = null) {
  const container = document.querySelector("main");
  const headers = document.querySelectorAll("h1");

  const footerHtml = `
    ${[...headers]
      .map((h, i) => {
        console.log(i, omitIndex);
        return i === omitIndex
          ? "<div></div>"
          : `
    <button id=${h.innerText + "MenuElement"}>
      ${h.innerText}
    </button>`;
      })
      .join("")}
  `;
  const footer = document.createElement("div");
  footer.id = "dynamicFooter";
  footer.classList.add("dynamicFooter");
  footer.innerHTML = footerHtml;
  container.appendChild(footer);
}

function destroyDynamicFooter() {
  document.getElementById("dynamicFooter").remove();
}

document.addEventListener("DOMContentLoaded", () => createDynamicHeader());
