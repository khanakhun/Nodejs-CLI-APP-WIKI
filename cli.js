const _ = require("lodash");
const yargs = require("yargs");
const Search = require("./index");

const argv = yargs
  .command("search", "Type anything to search")

  .help().argv;

var command = argv._[0];

if (command === "search") {
  Search();
} else {
  console.log("Invalid Command Type --help to see Commands");
}
