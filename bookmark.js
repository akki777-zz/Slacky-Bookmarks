const token = "token=<YOUR_CUSTOM_SLACK_BOT_TOKEN>";    //starting with `xoxb`
const channel = "&channel=@<YOUR_SLACK_USERNAME>"; // e.g. @john_wayne
const messageOptions = "&unfurl_links=true&pretty=1&as_user=true";
const slackUrl = "https://slack.com/api/chat.postMessage?" + token + channel + messageOptions;  // Magic Url


/* Create Context Menu and Handle click */
chrome.contextMenus.create({type: "normal", id: "101", title: "Slack-this", onclick: function(info) {
    sendToSlack(info.pageUrl);
}})

/* Handle Keyboard Shortcut */
chrome.commands.onCommand.addListener(function (command) {
  chrome.tabs.getSelected(null,function(tab) {
      sendToSlack(tab.url);
  });
});

/**
 * <p>Sends the page url to Slack. </p>
 * @param pageUrl The url of current page to be sent to Slack as bookmark.
**/
function sendToSlack(pageUrl) {
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var response = JSON.parse(this.response);
          if (response.ok == true) {
              console.log("Article sent to Slack");
          } else {
              console.log("Slack Error: " + response.error);
          }
       } else {
           console.log("Error: " + this.status);
       }
    };
  xhttp.open("POST", slackUrl + "&text=<" + pageUrl + ">", true);
  xhttp.send();
}
