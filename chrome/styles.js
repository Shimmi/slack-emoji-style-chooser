'use strict';

/**
 * Update the emoji set.
 *
 * @param {string} set Name of the Emoji set to use.
 */
function updateSet(set) {
    let style = document.querySelector("style#slackEmoji");

    if (null === style) {
        style = document.createElement("style");
        style.type = "text/css";
        style.id = "slackEmoji";
        document.head.appendChild(style);
    }

    const url = 'https://raw.githubusercontent.com/iamcal/emoji-data/v4.0.4/sheets-indexed-256/sheet_'
        + set + '_64_indexed_256.png';

    style.innerHTML = `
.emoji-outer, .msg_input_wrapper .emoji[style*="background-position"] {
    background-image: url("${url}") !important;
}
    `;
}

chrome.storage.sync.get({
    emojiSet: 'apple'
}, function (items) {
    updateSet(items.emojiSet);
});
