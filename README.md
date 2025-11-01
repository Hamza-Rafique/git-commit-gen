# commit-wizard 📝✨

A CLI tool to generate standardized Git commit messages with ease.

[![npm version](https://img.shields.io/npm/v/@hamzarafique964/commit-wizard)](https://www.npmjs.com/package/@hamzarafique964/commit-wizard)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Features

- 🚀 Interactive prompt for commit messages
- 🔍 Supports Conventional Commits standard
- 🎨 Colorful terminal output
- ⚡ Zero dependencies (runs natively in Node.js)
- 🔧 Works with any Git repository

## Installation

```bash
npm install -g commit-wizard
```
## Usage
Stage your changes:
```bash
git add .
```
Generate and commit:
```bash
commit-wizard
```
Follow the prompts:
```bash ? Select commit type: (Use arrow keys)
❯ feat: A new feature
  fix: A bug fix
  docs: Documentation changes
  chore: Maintenance tasks
? Enter commit message: [your message here]
```
