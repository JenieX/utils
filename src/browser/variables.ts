const scriptName = typeof GM === 'undefined' ? '' : GM.info.script.name;

/** The initial tab URL on the script run. */
const tabURL = typeof window === 'undefined' ? '' : window.location.href;

export { scriptName, tabURL };
