const yargs = require("yargs");
const inquirer = require("inquirer");
const Api = require("./app");

const Search = () => {
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
                console.log(`DetailsData: ${data}`)
              );
            });
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
        console.log("invalid Command type --help to see commands");
      }
    });
};

module.exports = Search;
