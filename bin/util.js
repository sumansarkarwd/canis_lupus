const fs = require("fs");
const color = require("colors");
const envPath = `${__dirname}/../.env`;

module.exports.addEnv = () => {
  const file_stream = fs.createWriteStream(envPath);
  file_stream.close();
};

module.exports.saveToken = token => {
  const content = `O_AUTH_ACCESS_TOKEN="${token}"`;

  fs.writeFile(envPath, content, err => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log(color.green("Success!"));
  });
};
