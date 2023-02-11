const STORAGE_KEY_ICON_THEME = 'store/icon-theme';
const DEFAULT_ICON_THEME = 'firefox';

const INCOGNITO_ICON_DEFAULT = 'images/incognito_default.svg';
const INCOGNITO_ICON_ON = 'images/incognito_on.svg';
const INCOGNITO_ICON_OFF = 'images/incognito_off.svg';

browser.runtime.onInstalled.addListener(async () => {
    const storage = await browser.storage.sync.get(STORAGE_KEY_ICON_THEME);
    if (!storage[STORAGE_KEY_ICON_THEME]) {
        await browser.storage.sync.set({[STORAGE_KEY_ICON_THEME]: DEFAULT_ICON_THEME});
    }
});

browser.runtime.onInstalled.addListener(async () => {
    const storage = await browser.storage.sync.get(STORAGE_KEY_ICON_THEME);
    const iconTheme = storage[STORAGE_KEY_ICON_THEME];

    for (const windowInfo of await browser.windows.getAll()) {
        const incognitoStatus = windowInfo.incognito ? 'on' : 'off';
        const incognitoTitle = windowInfo.incognito ? 'private' : 'not private';
        const imagePath = `images/${iconTheme}-${incognitoStatus}.svg`;

        await browser.browserAction.setIcon({
            path: imagePath,
            windowId: windowInfo.id,
        });
        await browser.browserAction.setTitle({title: incognitoTitle, windowId: windowInfo.id});
    }
});

browser.windows.onCreated.addListener(async (windowInfo) => {
    const storage = await browser.storage.sync.get(STORAGE_KEY_ICON_THEME);
    const iconTheme = storage[STORAGE_KEY_ICON_THEME];
    const incognitoStatus = windowInfo.incognito ? 'on' : 'off';
    const incognitoTitle = windowInfo.incognito ? 'private' : 'not private';
    const imagePath = `images/${iconTheme}-${incognitoStatus}.svg`;

    await browser.browserAction.setIcon({
        path: imagePath,
        windowId: windowInfo.id,
    });
    await browser.browserAction.setTitle({title: incognitoTitle, windowId: windowInfo.id});
});

browser.browserAction.onClicked.addListener(() => {
    browser.runtime.openOptionsPage();
});
