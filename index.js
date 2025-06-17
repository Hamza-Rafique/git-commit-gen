#!/usr/bin/env node
const inquirer = require('inquirer');
const chalk = require('chalk').default; // Fixed chalk import
const git = require('simple-git')();

const commitTypes = [
  { name: 'feat: A new feature', value: 'feat' },
  { name: 'fix: A bug fix', value: 'fix' },
  { name: 'docs: Documentation changes', value: 'docs' },
  { name: 'chore: Maintenance tasks', value: 'chore' }
];

async function run() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Select commit type:',
        choices: commitTypes
      },
      {
        type: 'input',
        name: 'message',
        message: 'Enter commit message:',
        validate: input => input.trim() ? true : 'Message cannot be empty!'
      }
    ]);

    const commitMsg = `${answers.type}: ${answers.message.trim()}`;
    console.log(chalk.green(`\nGenerated: "${commitMsg}"`));

    const commitResult = await git.commit(commitMsg);
    console.log(chalk.blue('✔ Committed successfully!'));
    return commitResult;
  } catch (err) {
    console.error(chalk.red('✖ Error:', err.message));
    process.exit(1);
  }
}

run();