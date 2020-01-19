#! /usr/bin/node
const path = `${__dirname}/../.env`;
const result = require("dotenv").config({ path });
const color = require("colors");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
const yargs = require("yargs");

// import my modules
const slack = require("./slack");
const util = require("./util");

if (result.error) {
  console.error(color.white("No .env file found!"));
  readline.question(
    `Would you like to add one? Type yes|y to add and no|n to cancel. => `,
    option => {
      if (option === "yes" || option === "y") {
        //add
        util.addEnv();
      } else if (option === "no" || option === "n") {
        console.error(color.red("\nCan't proceed without .env file!"));
      } else {
        console.error(color.red("\nInvalid option!"));
      }
      readline.close();
    }
  );
  return 0;
}

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
