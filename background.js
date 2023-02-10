const INCOGNITO_ICON_DEFAULT = 'images/incognito_default.svg';
const INCOGNITO_ICON_ON = 'images/incognito_on.svg';
const INCOGNITO_ICON_OFF = 'images/incognito_off.svg';

function updateBrowserActionIcon(enabled) {
    let path;

    if (enabled === undefined) {
        path = INCOGNITO_ICON_DEFAULT;
    } else {
        path = enabled ? INCOGNITO_ICON_ON : INCOGNITO_ICON_OFF;
    }

    browser.browserAction.setIcon({
        path,
    });
}

browser.tabs.onActivated.addListener((active_info) => {
    browser.tabs.get(active_info.tabId).then((tab_data) => {
        updateBrowserActionIcon(tab_data.incognito);
    });
});

browser.windows.onFocusChanged.addListener((window_id) => {
    if (window_id === browser.windows.WINDOW_ID_NONE) return updateBrowserActionIcon();

    browser.windows
        .get(window_id, {
            populate: true,
        })
        .then((window_info) => {
            const active_tab = window_info.tabs.find((tab) => tab.active);
            console.log('active tab', active_tab);

            updateBrowserActionIcon(active_tab.incognito);
        });
});
