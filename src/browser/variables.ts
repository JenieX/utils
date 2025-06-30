const scriptName = GM.info.script.name;

/** The identifier of the script to be used in logging. */
const logId = `[${scriptName}]:`;

/** The initial tab URL on the script run. */
const tabURL = window.location.href;

export { logId, scriptName, tabURL };
