const token = "token=<YOUR_CUSTOM_SLACK_BOT_TOKEN>";    //starting with `xoxb`
const channel = "&channel=@<YOUR_SLACK_USERNAME>"; // e.g. @john_wayne
const messageOptions = "&unfurl_links=true&pretty=1&as_user=true";
const slackUrl = "https://slack.com/api/chat.postMessage?" + token + channel + messageOptions;  // Magic Url
