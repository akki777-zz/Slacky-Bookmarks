'use strict';

/* Create Context Menu and Handle click */
chrome.contextMenus.create({
    type: "normal",
    id: "101",
    title: "Slack this",
    onclick: (info) => {
        sendToSlack(info.pageUrl);
    }
})

/* Handle Keyboard Shortcut */
chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.getSelected(null, function (tab) {
        sendToSlack(tab.url);
    });
});

/**
 * Converts the Request to Query Params String.
 * @param {Object} params
 * @return {String}
 */
function convertToQueryParams(params) {
    let esc = encodeURIComponent;
    let query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
    return query;
}

/**
 * Sends the page url to Slack.
 * @param {String} pageUrl The url of current page to be sent to Slack as bookmark.
 **/
function sendToSlack(pageUrl) {

    const request = {
        token: token,
        channel: channel,
        unfurl_links: true,
        pretty: 1,
        as_user: true,
        text: pageUrl
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: convertToQueryParams(request)
    };

    fetch(slackUrl, options)
        .then((response) => {
            if (response.ok) {
                return Promise.resolve(response);
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.ok) {
                console.log("Article sent to Slack");
            } else {
                console.log(data.error);
            }
        })
        .catch((error) => {
            console.log("Error: " + this.status);
        });
}
