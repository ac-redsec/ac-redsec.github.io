const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const links = [...document.querySelectorAll("a[href]")];

for (const link of links) {
  const textNodes = [];
  const walker = document.createTreeWalker(link, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
      if (node.parentElement.closest('[aria-hidden="true"]')) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const original = node.textContent;
    textNodes.push({ node, original });
  }

  if (textNodes.length === 0) continue;

  const accessibleLabel =
    link.getAttribute("aria-label") ??
    textNodes
      .map(({ original }) => original.trim())
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ");
  link.setAttribute("aria-label", accessibleLabel);

  let animation;
  const totalCharacters = textNodes.reduce(
    (total, { original }) => total + [...original].length,
    0,
  );

  const randomCharacter = () =>
    alphabet[Math.floor(Math.random() * alphabet.length)];

  const createScrambledVersions = () =>
    textNodes.map(({ original }) =>
      [...original]
        .map((character) => (/\s/.test(character) ? character : randomCharacter()))
        .join(""),
    );

  const renderScrambledVersions = (versions) => {
    for (const [index, { node }] of textNodes.entries()) {
      node.textContent = versions[index];
    }
  };

  const initialScrambledVersions = createScrambledVersions();
  const originalWidth = link.getBoundingClientRect().width;
  renderScrambledVersions(initialScrambledVersions);
  const scrambledWidth = link.getBoundingClientRect().width;
  for (const { node, original } of textNodes) node.textContent = original;
  link.style.width = `${Math.ceil(Math.max(originalWidth, scrambledWidth))}px`;

  const animateText = (scramble) => {
    window.clearInterval(animation);
    if (reduceMotion) {
      if (scramble) renderScrambledVersions(createScrambledVersions());
      else {
        for (const { node, original } of textNodes) node.textContent = original;
      }
      return;
    }

    let progress = 0;
    const scrambledVersions = createScrambledVersions();

    animation = window.setInterval(() => {
      let characterIndex = 0;
      for (const [nodeIndex, { node, original }] of textNodes.entries()) {
        const scrambledVersion = scrambledVersions[nodeIndex];
        node.textContent = [...original]
          .map((character, index) => {
            const shouldScramble = characterIndex < progress;
            characterIndex += 1;
            if (/\s/.test(character)) return character;
            if (scramble) {
              return shouldScramble ? scrambledVersion[index] : character;
            }
            return shouldScramble ? character : scrambledVersion[index];
          })
          .join("");
      }

      progress += 1;
      if (progress > totalCharacters) {
        window.clearInterval(animation);
        if (scramble) renderScrambledVersions(scrambledVersions);
        else {
          for (const { node, original } of textNodes) node.textContent = original;
        }
      }
    }, 24);
  };

  renderScrambledVersions(initialScrambledVersions);
  link.addEventListener("pointerenter", () => animateText(false));
  link.addEventListener("pointerleave", () => {
    if (!link.matches(":focus")) animateText(true);
  });
  link.addEventListener("focus", () => animateText(false));
  link.addEventListener("blur", () => {
    if (!link.matches(":hover")) animateText(true);
  });
}
