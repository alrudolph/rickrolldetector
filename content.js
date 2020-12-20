const IDS = [
    "dQw4w9WgXcQ",
    "YddwkMJG1Jo",
    "xvFZjo5PgG0",
    "oHg5SJYRHA0",
    "j8PxqgliIno",
    "RvBwypGUkPo",
    "pHhb4biR9k"
];
const image = chrome.extension.getURL("rick.jpg");

let matchLink = (url) => {
    for (id of IDS) {
        if (url.includes(id)) {
            return true;
        }
    }

    return false;
}

console.log("Inspecting page for Rick Rolls...");
let count = 0;

$("a").filter(function() {
    if (this.href && matchLink(this.href)) {
        ++count;

        $(this).append(
            $(`<img src="${image}" alt="Suspect Link" height="21px" />`)
        );
    }
});

console.log(`Detected ${count} Rick Roll${count === 1 ? '' : 's'}`);