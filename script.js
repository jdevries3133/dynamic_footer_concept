const STATE = {
  haveDoneTheThing: false,
};

function initToolbarBackground() {
  // create and add to DOM
  const background = document.createElement("div");
  background.id = "toolbarBackground";
  background.classList.add("toolbar", "toolbar--threeItems");
  document.body.appendChild(background);

  // insert children
  for (let i = 0; i < 3; i++) {
    const el = document.createElement("div");
    el.id = `toolbarChild${i}`;
    el.classList.add("toolbar__child");
    el.classList.add(
      i === 1 ? "toolbar__child--main" : "toolbar__child--secondary"
    );
    background.appendChild(el);
  }
}

/**
 * As the article scrolls into view, change the styling of the toolbar so
 * that the header for this article will scroll up with the article, and the
 * toolbar will change shape.
 */
function toolbarToHeader() {
  const background = document.getElementById("toolbarBackground");
  background.classList.remove("toolbar--threeItems");
  background.classList.add("toolbar--twoItems");
  document.getElementById("toolbarChild1").remove();
}

function headerToToolbar() {
  const background = document.getElementById("toolbarBackground");
  background.classList.remove("toolbar--twoItems");
  background.classList.add("toolbar--threeItems");

  const target = document.getElementById("toolbarChild0");
  const newChild = document.createElement("div");
  newChild.id = "toolbarChild1";
  newChild.classList.add("toolbar__child--main");
  target.insertAdjacentElement("afterend", newChild);
}

function handleIntersect(entries, observer) {
  entries.forEach((e) => {
    if (e === undefined) {
      // an undefined event comes in as soon as the page loads??...
      return;
    } else if (e.isIntersecting) {
      toolbarToHeader();
    } else if (e.boundingClientRect.y < 0) {
      // we have scrolled past the article. Do nothing
      return;
    } else if (STATE.haveDoneTheThing) {
      headerToToolbar();
    }
  });
}

const observer = new IntersectionObserver(handleIntersect, {
  root: null,
  rootMargin: "0px",
});
observer.observe(document.getElementById("articleOne"));

initToolbarBackground();
