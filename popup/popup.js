$(() => {

    const applyChange = checked => {
        // save settings:
        chrome.storage.sync.set({ state: checked });

        // tell content.js to update:
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, { state: checked });
        });
    };

    $('input#on').on('change', function() {
        applyChange(this.checked);
    });

    chrome.storage.sync.get('state', ({ state }) => {
        const next = state !== undefined ? state : true;

        $('input#on')[0].checked = next;
        applyChange(next);
    });

});