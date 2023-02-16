const STORAGE_KEY_ICON_THEME = 'store/icon-theme';

document.addEventListener('DOMContentLoaded', async () => {
    const storage = await browser.storage.sync.get(STORAGE_KEY_ICON_THEME);
    const iconTheme = storage[STORAGE_KEY_ICON_THEME];

    document.querySelector('#icon-theme').value = iconTheme;
});

document.querySelector('#icon-theme').addEventListener('input', async (event) => {
    const iconTheme = event.currentTarget.value;

    await browser.storage.sync.set({[STORAGE_KEY_ICON_THEME]: iconTheme});

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
