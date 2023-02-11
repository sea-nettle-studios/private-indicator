const STORAGE_KEY_ICON_THEME = 'store/icon-theme';

document.addEventListener('DOMContentLoaded', async () => {
    const storage = await browser.storage.sync.get(STORAGE_KEY_ICON_THEME);
    const iconTheme = storage[STORAGE_KEY_ICON_THEME];

    document.querySelector('#icon-theme').value = iconTheme;
});

document.querySelector('#icon-theme').addEventListener('input', async (event) => {
    await browser.storage.sync.set({[STORAGE_KEY_ICON_THEME]: event.target.value});
});
