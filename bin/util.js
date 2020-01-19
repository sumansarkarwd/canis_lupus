const fs = require("fs");

const envPath = `${__dirname}/../.env`;

module.exports.addEnv = () => {
  const file_stream = fs.createWriteStream(envPath);
  file_stream.close();
};

module.exports.saveToken = token => {
  let buffer = new Buffer(`O_AUTH_TOKEN="${token}"`);

  fs.open(envPath, "w", function(err, fd) {
    if (err) {
      throw "could not open file: " + err;
    }

    fs.write(fd, buffer, 0, buffer.length, null, function(err) {
      if (err) throw "error writing file: " + err;
      fs.close(fd, function() {
        console.log("wrote the file successfully");
      });
    });
  });
};
