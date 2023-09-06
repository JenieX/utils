type InfoObject = VMScriptGMInfoObject | { script: { name: string } };

let infoObject: InfoObject;

if (typeof GM !== 'undefined') {
  infoObject = GM.info;
// eslint-disable-next-line unicorn/no-negated-condition
} else if (typeof GM_info !== 'undefined') {
  infoObject = GM_info;
} else {
  infoObject = { script: { name: document.title } };
}

const scriptName = infoObject.script.name;

/** The identifier of the script to be used in logging. */
const logId = `[${scriptName}]:`;

/** The initial tab URL on the script run. */
const tabURL = window.location.href;

export { logId, scriptName, tabURL };
