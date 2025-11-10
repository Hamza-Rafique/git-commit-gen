# git-commit-gen 📝✨

A CLI tool to generate standardized Git commit messages with ease.

[![npm version](https://img.shields.io/npm/v/@hamzarafique964/git-commit-gen)](https://www.npmjs.com/package/@hamzarafique964/git-commit-gen)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Features

- 🚀 Interactive prompt for commit messages
- 🔍 **Commitlint integration** for validation
- 🛡️ **Husky hooks** for automatic commit message validation
- 📋 **Smart staging area** management
- 🎨 Colorful terminal output with chalk
- ⚡ Fast and lightweight
- 🔧 Works with any Git repository
- ✅ **Conventional Commits** standard compliance

## Installation

```bash
npm install -g @hamzarafique964/git-commit-gen
```

## For project-specific setup (recommended):
```bash
 # Install as dev dependency
npm install --save-dev @hamzarafique964/git-commit-gen

# Set up commitlint and husky (optional)
npx commitlint --install
```

```bash
npm install -g @hamzarafique964/git-commit-gen
```
## Usage
### Basic Usage
```bash
git-commit-gen
```
### Advanced Usage with Staging
The tool automatically detects unstaged changes and lets you:

- Stage all changes at once
- Select specific files to stage
- Skip staging if needed
- Stage your changes:

### Full Workflow Example
```bash
# Make some changes to your files
echo "console.log('new feature');" >> feature.js

# Run the commit wizard
git-commit-gen

# Follow the interactive prompts:
? Select commit type: (Use arrow keys)
❯ feat: A new feature
  fix: A bug fix 
  docs: Documentation changes
  chore: Maintenance tasks
  style: Code style changes
  refactor: Code refactoring
  test: Adding tests

? Enter commit message: add new authentication system

🔍 Validating commit message...
✓ Commit message validated!

📝 Generated: "feat: add new authentication system"
? Proceed with commit? Yes
✔ Committed successfully!
```
## Commit Types Supported

- feat - A new feature
- fix - A bug fix
- docs - Documentation changes
- chore - Maintenance tasks
- style - Code style changes (formatting, etc.)
- refactor - Code refactoring
- test - Adding or updating tests

## Integration with Commitlint & Husky
The package includes built-in support for commit message validation:
### Manual Validation
```bash
# Test a commit message
echo "feat: add new feature" | npx commitlint
```
### Automatic Validation with Husky
When installed in a project, it sets up Husky hooks to automatically validate commit messages.

### Configuration
Create a commitlint.config.js file in your project root:
```bash
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'chore', 'style', 'refactor', 'test'
    ]]
  }
};
```


### Example Commit Messages
**✅ Valid:**

- feat: add user authentication
- fix: resolve login timeout issue
- docs: update API documentation

**❌ Invalid:**

- added new stuff (missing type)
- fix: (missing description)
- FEAT: add feature (uppercase type)

## Troubleshooting

### If you get Husky pre-commit errors:
```bash
# Add a test script to package.json
npm pkg set scripts.test="echo 'No tests'"

# Or skip hooks temporarily
git commit --no-verify
```
### If commitlint is not installed:
 ```bash
 npm install --save-dev @commitlint/cli @commitlint/config-conventional
 ```
 ## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**MIT © [Hamza Rafique](https://github.com/Hamza-Rafique)**