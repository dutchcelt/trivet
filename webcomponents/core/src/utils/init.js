const loadTrvtElements = async (root = document) => {
  const trvtList = root.getElementsByTagName('*');
  const trvtNodes = trvtList.addedNodes || trvtList;
  const trvtTags = [...trvtNodes].map((e) => e.tagName).filter((s) => /trvt-/i.test(s));

  new Set(trvtTags.map((t) => t.split('-')[1].toLowerCase())).forEach((tag) => {
    try {
      import('/' + tag + '.js');
    } catch (e) {
      console.error(e, `Can not find ${tag}`);
    }
  });
};

loadTrvtElements(document.documentElement);

const config = { attributes: false, childList: true, subtree: true };
const trvtObserver = new MutationObserver(loadTrvtElements);
trvtObserver.observe(document.body, config);
document.documentElement.style.setProperty('visibility', 'visible');

export { loadTrvtElements };
