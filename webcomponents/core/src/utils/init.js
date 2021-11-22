const loadTrvtElements = async (root) => {
  const trvtElements = root.getElementsByTagName('*');
  const trvtNodes = trvtList.addedNodes || trvtList;
  const trvtTags = [...trvtNodes].map((e) => e.tagName).filter((s) => /trvt-/i.test(s));
  new Set(trvtTags).forEach((tag) => {
    try {
      import(tag.toLowerCase());
    } catch (e) {
      console.error(e, `Can not find ${tag}`);
    }
  });
};

loadTrvtElements(document.documentElement);

const config = { attributes: false, childList: true, subtree: true };
const trvtObserver = new MutationObserver(loadTrvtElements);
trvtObserver.observe(document.body, config);
root.style.setProperty('visibility', 'visible');

export { loadTrvtElements };
