# git-commit-gen 📝✨

A CLI tool to generate standardized Git commit messages with ease.

[![npm version](https://img.shields.io/npm/v/@hamzarafique964/git-commit-gen)](https://www.npmjs.com/package/@hamzarafique964/git-commit-gen)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Features

- 🚀 Interactive prompt for commit messages
- 🔍 Supports Conventional Commits standard
- 🎨 Colorful terminal output
- ⚡ Zero dependencies (runs natively in Node.js)
- 🔧 Works with any Git repository

## Installation

```bash
npm install -g git-commit-gen
```
## Usage
Stage your changes:
```bash
git add .
```
Generate and commit:
```bash
git-commit-gen
```
Follow the prompts:
```bash ? Select commit type: (Use arrow keys)
❯ feat: A new feature
  fix: A bug fix
  docs: Documentation changes
  chore: Maintenance tasks
? Enter commit message: [your message here]
```
