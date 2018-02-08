'use strict';

/**
 * Save options.
 *
 * Saves options to browser storage.
 */
function saveOptions() {
    const set = document.querySelector('input[name="set"]:checked').value;

    const setOptions = browser.storage.local.set({
        emojiSet: set
    });

    setOptions.then(function () {
        const status = document.getElementById('status');

        status.className = '';
        setTimeout(function () {
            status.className = 'hide';
        }, 1000);

        browser.tabs.query({url: "*://*.slack.com/*"}, function (tabs) {
            for (let i = 0; i < tabs.length; i++) {
                browser.tabs.executeScript(tabs[i].id, {file: "styles.js"}, function () {
                });
            }
        });
    });
}

/**
 * Restore options.
 *
 * Restores options from browser storage.
 */
function restoreOptions() {
    const getOptions = browser.storage.local.get({
        emojiSet: 'apple'
    });

    getOptions.then(function (items) {
        const selected = document.getElementById(items.emojiSet);
        selected.checked = true;
        selected.parentNode.className = "selected";
    });
}

/**
 * Change selected preview box.
 *
 * Toggles "selected" class for proper label tags.
 *
 * @param {Event} event
 */
function changeSelected(event) {
    const selected = document.querySelector('label.selected');
    if (null !== selected) {
        selected.className = "";
    }
    document.getElementById(event.target.id).parentNode.className = "selected";

    saveOptions();
}


const radios = document.querySelectorAll('input[name="set"]');
Array.prototype.forEach.call(radios, function (radio) {
    radio.addEventListener('change', changeSelected);
});
document.addEventListener('DOMContentLoaded', restoreOptions);
