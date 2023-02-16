const STORAGE_KEY_ICON_THEME = 'store/icon-theme';
const DEFAULT_ICON_THEME = 'firefox';

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
        const iconStatus = windowInfo.incognito ? 'on' : 'off';
        const iconTitle = windowInfo.incognito ? 'private' : 'not private';

        await browser.browserAction.setIcon({
            path: `images/${iconTheme}-${iconStatus}.svg`,
            windowId: windowInfo.id,
        });
        await browser.browserAction.setTitle({title: iconTitle, windowId: windowInfo.id});
    }
});

browser.windows.onCreated.addListener(async (windowInfo) => {
    const storage = await browser.storage.sync.get(STORAGE_KEY_ICON_THEME);
    const iconTheme = storage[STORAGE_KEY_ICON_THEME];
    const iconStatus = windowInfo.incognito ? 'on' : 'off';
    const iconTitle = windowInfo.incognito ? 'private' : 'not private';

    await browser.browserAction.setIcon({
        path: `images/${iconTheme}-${iconStatus}.svg`,
        windowId: windowInfo.id,
    });
    await browser.browserAction.setTitle({title: iconTitle, windowId: windowInfo.id});
});

browser.browserAction.onClicked.addListener(() => {
    browser.runtime.openOptionsPage();
});
