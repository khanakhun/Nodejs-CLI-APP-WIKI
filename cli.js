const _ = require("lodash");
const yargs = require("yargs");
const inquirer = require("inquirer");
const Api = require("./app");

const argv = yargs
  .command("search", "Seach for a user")
  .command("wiki", "Seach for anything from wikipedia")
  .help().argv;

var command = argv._[0];

if (command === "search") {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Select a type to search for related :",
        name: "name",
        choices: ["users", "comments", "albums", "photos", "todos", "posts"],
      },
    ])
    .then((answers) => {
      const data = async () => {
        var result = await Api.getUser(answers.name);
        if (result) {
          console.log(`User found :
            ---
            Name: ${result}`);
        } else {
          console.log("User not found.");
        }
      };
      data();
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });

  // if (user) {
  //   console.log(`User found :
  //   ---
  //   Name: ${user}`);
  // } else {
  //   console.log("User not found.");
  // }
} else if (command === "wiki") {
  inquirer
    .prompt([
      {
        type: "option",
        message: "Select a term to search for in wiki :",
        name: "term",
      },
    ])
    .then((answers) => {
      const data = async () => {
        var result = await Api.getWiki(answers.term);
        if (result) {
          inquirer
            .prompt([
              {
                type: "list",
                message: "Select a result to get more details :",
                name: "name",
                choices: result,
              },
            ])
            .then((answers) => {
              var result = Api.wikiSubRes(answers).then((data) =>
                console.log(`DetailsData: ${data.trim()}`)
              );
            });
          //   console.log(`User found :
          //     ---
          //     searchResult: ${result}`);
        } else {
          console.log("User not found.");
        }
      };
      data();
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
} else {
  console.log("Command");
}
