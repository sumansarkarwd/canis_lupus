const ACCESS_TOKEN = process.env.O_AUTH_ACCESS_TOKEN;

const URLS = {
  GET_CHANNELS_LIST: {
    URL: `https://slack.com/api/conversations.list?token=${ACCESS_TOKEN}`,
    METHOD: "GET"
  },
  UPLOAD_FILE: {
    ULR: `https://slack.com/api/files.upload?token=${ACCESS_TOKEN}`,
    METHOD: "POST"
  }
};

module.exports = URLS;
