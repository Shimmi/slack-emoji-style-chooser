'use strict';

/**
 * Save options.
 *
 * Saves options to Chrome storestorage.
 */
function saveOptions() {
    const set = document.querySelector('input[name="set"]:checked').value;

    chrome.storage.sync.set({
        emojiSet: set
    }, function () {
        const status = document.getElementById('status');
        status.textContent = 'Options saved. Please refresh you Slack tab.';
    });
}

/**
 * Restore options.
 *
 * Restores options from Chrome storage.
 */
function restoreOptions() {
    chrome.storage.sync.get({
        emojiSet: 'apple'
    }, function (items) {
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
}

const radios = document.querySelectorAll('input[name="set"]');
Array.prototype.forEach.call(radios, function (radio) {
    radio.addEventListener('change', changeSelected);
});
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);