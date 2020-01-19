const URLS = require("./constants");
const Table = require("cli-table");
const color = require("colors");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
const superagent = require("superagent");

module.exports.upload = (file_path, message) => {
  // 1. Get channels list
  superagent
    .get(URLS.GET_CHANNELS_LIST.URL)
    .set("Content-Type", "application/json")
    .then(res => {
      let data = res.body.channels;

      const channel_list = data.map(channel => ({
        channel_id: channel.id,
        name: channel.name
      }));

      // 2. Show channels list
      showList(channel_list);

      // 3. propt user to choose channel
      readline.question(`Choose your channel No. => `, channel_num => {
        const channel_index = channel_num - 1;
        const channel = channel_list[channel_index];

        if (channel) {
          console.log(
            color.green(`Uploading file to channel => ${channel.name}\n`)
          );

          // 4. Finally upload the file
          uploadFile(channel.channel_id, file_path, message);
        } else {
          console.error(color.red("Invalid channel!"));
        }
        readline.close();
      });
    })
    .catch(err => {
      console.error(err);
    });
};

const showList = list => {
  let table = new Table({
    head: ["No.", "ID", "Name"],
    colWidths: [10, 15, 30],
    chars: {
      top: "═",
      "top-mid": "╤",
      "top-left": "╔",
      "top-right": "╗",
      bottom: "═",
      "bottom-mid": "╧",
      "bottom-left": "╚",
      "bottom-right": "╝",
      left: "║",
      "left-mid": "╟",
      mid: "─",
      "mid-mid": "┼",
      right: "║",
      "right-mid": "╢",
      middle: "│"
    }
  });

  list.map((item, index) => {
    table.push([index + 1, item.channel_id, item.name]);
  });

  console.log(table.toString());
};

const uploadFile = (channel_id, file_path, message = null) => {
  let form_data = { channels: channel_id };
  if (message) {
    form_data.initial_comment = message;
  }

  superagent
    .post(URLS.UPLOAD_FILE.ULR)
    .set("Content-Type", "multipart/form-data")
    .attach("file", file_path)
    .field(form_data)
    .then(res => {
      const response = res.body;
      if (response.ok) {
        console.log(color.green("File uploaded successfully!"));

        const total_uploaded_size = response.file.size;
        const total_uploaded_size_KB = total_uploaded_size / 1024;
        const total_uploaded_size_MB = total_uploaded_size_KB / 1024;

        console.log(
          color.green(
            `Total uploaded size => ${total_uploaded_size_MB.toFixed(2)}MB.`
          )
        );
      } else {
        console.error(color.red(`Error ${response.error}`));
      }
    });
};
