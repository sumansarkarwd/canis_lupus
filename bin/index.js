#! /usr/bin/node
const result = require("dotenv").config({ path: `${__dirname}/../.env` });
const color = require("colors");
if (result.error) {
  console.error(color.red(result.error.message));
  return 1;
}

const yargs = require("yargs");

// import my modules
const slack = require("./slack");

const yargsOptions = yargs
  .option("p", {
    alias: "path",
    describe: "Path of the file to upload.",
    type: "string",
    demandOption: true
  })
  .option("m", {
    alias: "message",
    describe: "The message text introducing the file in specified channels.",
    type: "string",
    demandOption: false
  }).argv;

const file_path = yargsOptions.path;
const message = yargsOptions.message;

slack.upload(file_path, message);
