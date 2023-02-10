const INCOGNITO_ICON_DEFAULT = 'images/incognito_default.svg';
const INCOGNITO_ICON_ON = 'images/incognito_on.svg';
const INCOGNITO_ICON_OFF = 'images/incognito_off.svg';

browser.runtime.onInstalled.addListener(async () => {
    const windows = await browser.windows.getAll();

    for (const windowInfo of windows) {
        if (windowInfo.incognito) {
            await browser.browserAction.setIcon({path: INCOGNITO_ICON_ON, windowId: windowInfo.id});
            await browser.browserAction.setTitle({title: 'private', windowId: windowInfo.id});
        } else {
            await browser.browserAction.setIcon({path: INCOGNITO_ICON_OFF, windowId: windowInfo.id});
            await browser.browserAction.setTitle({title: 'not private', windowId: windowInfo.id});
        }
    }
});

browser.windows.onCreated.addListener(async (windowInfo) => {
    if (windowInfo.incognito) {
        await browser.browserAction.setIcon({path: INCOGNITO_ICON_ON, windowId: windowInfo.id});
        await browser.browserAction.setTitle({title: 'private', windowId: windowInfo.id});
    } else {
        await browser.browserAction.setIcon({path: INCOGNITO_ICON_OFF, windowId: windowInfo.id});
        await browser.browserAction.setTitle({title: 'not private', windowId: windowInfo.id});
    }
});
