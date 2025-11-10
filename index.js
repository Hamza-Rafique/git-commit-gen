#!/usr/bin/env node
const inquirer = require('inquirer');
const chalk = require('chalk').default;
const git = require('simple-git')();
const { execSync } = require('child_process');

const commitTypes = [
  { name: 'feat: A new feature', value: 'feat' },
  { name: 'fix: A bug fix', value: 'fix' },
  { name: 'docs: Documentation changes', value: 'docs' },
  { name: 'chore: Maintenance tasks', value: 'chore' },
  { name: 'style: Code style changes', value: 'style' },
  { name: 'refactor: Code refactoring', value: 'refactor' },
  { name: 'test: Adding tests', value: 'test' }
];

// Function to validate commit message using commitlint
function validateCommitMessage(message) {
  try {
    // Use commitlint to validate the message
    execSync(`echo "${message}" | npx commitlint`, { stdio: 'pipe' });
    return { isValid: true, error: null };
  } catch (error) {
    return { 
      isValid: false, 
      error: error.stdout?.toString() || error.message 
    };
  }
}

// Function to format commitlint error for better readability
function formatCommitlintError(error) {
  const lines = error.split('\n');
  const relevantLines = lines.filter(line => 
    line.includes('✖') || line.includes('⧗') || line.trim().startsWith('-')
  );
  return relevantLines.join('\n');
}

// Add this function to show staged files and allow modification
async function handleStagingArea() {
  try {
    const status = await git.status();
    
    // Check if status object has the expected properties
    if (!status) {
      console.log(chalk.yellow('⚠ Unable to read git status.'));
      return null;
    }
    
    const staged = status.staged || [];
    const notStaged = status.not_staged || [];
    const files = status.files || [];
    
    if (staged.length === 0 && notStaged.length === 0 && files.length === 0) {
      console.log(chalk.yellow('⚠ No changes to commit.'));
      return null;
    }

    if (staged.length === 0 && (notStaged.length > 0 || files.length > 0)) {
      console.log(chalk.yellow('No files staged. Current changes:'));
      
      // Show unstaged changes
      if (notStaged.length > 0) {
        notStaged.forEach(file => {
          console.log(chalk.gray(`  📄 ${file}`));
        });
      }
      
      // Also show other files if available
      if (files.length > 0 && notStaged.length === 0) {
        files.forEach(file => {
          if (file.working_dir !== ' ' && file.working_dir !== '?') {
            console.log(chalk.gray(`  📄 ${file.path} (${file.working_dir})`));
          }
        });
      }
      
      const { shouldStageAll } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'shouldStageAll',
          message: 'Stage all changes for commit?',
          default: true
        }
      ]);
      
      if (shouldStageAll) {
        await git.add('.');
        console.log(chalk.green('✓ All changes staged.'));
      } else {
        // Use files array for selection
        const filesToSelect = notStaged.length > 0 ? notStaged : files.map(f => f.path);
        const { filesToStage } = await inquirer.prompt([
          {
            type: 'checkbox',
            name: 'filesToStage',
            message: 'Select files to stage:',
            choices: filesToSelect.map(file => ({ 
              name: typeof file === 'string' ? file : file.path, 
              value: typeof file === 'string' ? file : file.path 
            }))
          }
        ]);
        
        if (filesToStage.length > 0) {
          await git.add(filesToStage);
          console.log(chalk.green(`✓ Staged ${filesToStage.length} files.`));
        } else {
          console.log(chalk.yellow('No files staged. Commit cancelled.'));
          return null;
        }
      }
    }
    
    return await git.status();
  } catch (error) {
    console.log(chalk.yellow('⚠ Could not check git status:', error.message));
    return null;
  }
}

async function run() {
  try {
    console.log(chalk.blue('🚀 Git Commit Wizard\n'));
    
    // Handle staging area first
    const status = await handleStagingArea();
    if (!status) {
      return;
    }

    // Then proceed with commit message creation
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
        validate: (input) => {
          const message = input.trim();
          if (!message) return 'Message cannot be empty!';
          
          // Basic validation before commitlint
          if (message.length < 3) return 'Message too short!';
          return true;
        }
      }
    ]);

    const commitMsg = `${answers.type}: ${answers.message.trim()}`;
    
    // Validate with commitlint
    console.log(chalk.blue('\n🔍 Validating commit message...'));
    const validation = validateCommitMessage(commitMsg);
    
    if (!validation.isValid) {
      console.log(chalk.red('✖ Commitlint validation failed:'));
      console.log(chalk.yellow(formatCommitlintError(validation.error)));
      
      // Ask if they want to proceed anyway
      const { proceed } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'proceed',
          message: 'Commit message does not follow conventions. Commit anyway?',
          default: false
        }
      ]);
      
      if (!proceed) {
        console.log(chalk.blue('Commit cancelled.'));
        process.exit(0);
      }
    } else {
      console.log(chalk.green('✓ Commit message validated!'));
    }

    console.log(chalk.green(`\n📝 Generated: "${commitMsg}"`));

    // Final confirmation
    const { confirmCommit } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmCommit',
        message: 'Proceed with commit?',
        default: true
      }
    ]);

    if (!confirmCommit) {
      console.log(chalk.blue('Commit cancelled.'));
      process.exit(0);
    }

    const commitResult = await git.commit(commitMsg);
    console.log(chalk.green('✔ Committed successfully!'));
    
    // Show commit summary
    if (commitResult.commit) {
      console.log(chalk.gray(`Commit hash: ${commitResult.commit.substr(0, 8)}`));
    }
    
    return commitResult;
  } catch (err) {
    console.error(chalk.red('✖ Error:', err.message));
    console.log(chalk.gray('Full error:', err));
    process.exit(1);
  }
}

// Export for testing
module.exports = { run, validateCommitMessage, handleStagingArea };

// Only run if called directly
if (require.main === module) {
  run();
}