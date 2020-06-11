const inquirer = require("inquirer");
const fs = require('fs');
const axios = require("axios");
const generate = require('./generateMarkdown')


const questions = [
    {
        type: "input",
        name: "badge",
        message: "If you have a badge, the please provide the image source"
    },
    {
        type: "input",
        name: "title",
        message: "What is your project's title?"
    },
    {
        type: "input",
        name: "description",
        message: "Please submit your project's description here.",
    },
    {
        type: "input",
        name: "contents",
        message: "Please list your table of contents here.",
    },
    {
        type: "input",
        name: "installation",
        message: "Please type the installation instructions.",
    },
    {
        type: "input",
        name: "usage",
        message: "Please type the project usage.",
    },
    {
        type: "input",
        name: "license",
        message: "Please type the project license.",
    },
    {
        type: "input",
        name: "contributing",
        message: "Please type the contributing parties.",
    },
    {
        type: "input",
        name: "tests",
        message: "What tests did you perform for your project?",
    },
    {
        type: "input",
        name: "userName",
        message: "What is your github username?",
    },
    {
        type: "input",
        name: "repo",
        message: "What is your repo link?",
    }
]

inquirer
    .prompt(questions)
    .then(function(data){
        const queryUrl = `https://api.github.com/users/${data.username}`;

        axios.get(queryUrl).then(function(res) {
            
            const githubInfo = {
                githubImage: res.data.avatar_url,
                email: res.data.email,
                profile: res.data.html_url,
                name: res.data.name
            };
            
          fs.writeFile("README.md", generate(data, githubInfo), function(err) {
            if (err) {
              throw err;
            };
    
            console.log("New README file created with success!");
          });
        });

});

function init() {

}

init();