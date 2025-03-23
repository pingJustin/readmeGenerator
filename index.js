// Include packages needed for this application
var inquirer = require('inquirer');

const fs = require('fs');

// Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the project title?'
    },
    {
        type: 'input',
        name: 'description',
        message: 'What is the project description?'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the installation instructions?'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'What is sample usage information?'
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'What are the contribution guidelines?'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'What are the test instructions?'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: [
            'MIT License',
            'Apache License 2.0',
            'GNU GPLv3'
        ]
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?'
    }
];

// Function to write README file
async function writeToFile(fileName, data) {
    const licenseBadge = {
        'MIT License': '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
        'Apache License 2.0': '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
        'GNU GPLv3': '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
    };
    const readmeContent = `${licenseBadge[data.license]}

## Title
${data.title}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Description
${data.description}

## Installation
${data.installation}

## Usage
${data.usage}

## Contributing
${data.contributing}

## Tests
${data.tests}

## License
This project is covered under the ${data.license}.

## Questions
For questions about this project, please visit my GitHub profile:
[${data.github}](https://github.com/${data.github})

For additional questions, you can reach me at: ${data.email}
`;
    try {
       await fs.writeFileSync(fileName, readmeContent);
    }
    catch (error) {
        console.error('Error writing README:', error);
    }
}

// Function to initialize app
async function init() {
    try {
        // Prompt user for answers
        const answers = await inquirer.prompt(questions);
        
        // Generate README file
        writeToFile('README.md', answers);
        
        console.log('Successfully created README.md');
    } catch (error) {
        console.error('Error creating README:', error);
    }
}

// Function call to initialize app
init();
