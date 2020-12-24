$(() => {

    // youtube ids to seach for:
    const IDS = [
        "dQw4w9WgXcQ",
        "YddwkMJG1Jo",
        "xvFZjo5PgG0",
        "oHg5SJYRHA0",
        "j8PxqgliIno",
        "RvBwypGUkPo",
        "pHhb4biR9k"
    ];
    
    // image to insert:
    const image = chrome.extension.getURL("rick.jpg");
    
    // matches links to ids:
    const matchLink = url => {
        for (id of IDS) {
            if (url.includes(id)) {
                return true;
            }
        }
    
        return false;
    }
    
    // inserts image next to matching links
    const addImage = () => {
        console.log("Inspecting page for Rick Rolls...");
        let count = 0;
    
        $("a").filter(function() {
            if (this.href && matchLink(this.href)) {
                ++count;
    
                $(this).append(
                    $(`<img class="__rickrolldetected" src="${image}" alt="Suspect Link" height="21px" />`)
                );
            }
        });
    
        console.log(`Detected ${count} Rick Roll${count === 1 ? '' : 's'}`);
    }
    
    // adds/removes images
    const runSearch = on => {
        if (on) {
            addImage();
        }
        else {
            $(".__rickrolldetected").each(function() {
                $(this).remove();
            })
        }
    }

    // on start up load state
    chrome.storage.sync.get('state', ({ state }) => {
        runSearch(state);
    });

    // listen to popup
    chrome.runtime.onMessage.addListener(({ state }) => {
        runSearch(state);
    });

})