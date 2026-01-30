# Examples

This directory contains examples of using skill-builder.

## Basic Usage

### Create a Simple Node.js Skill

```bash
$ skill-builder create

🦞 Skill Builder - Create a new skill

? Skill name (lowercase, kebab-case): hello-world
? Human-friendly title: Hello World
? One-line description (max 120 chars): A simple greeting skill
? Author name or GitHub username: yourname
? Select runtime: Node.js
? Tags (2-5, comma-separated): cli, demo, tutorial
? License: MIT

📋 Configure commands (at least 1 required):
? Command name (lowercase): greet
? Command description: Greet the user
? Add another command? No

🔒 Safety configuration:
? Will this skill modify existing files? No
? Should dangerous operations require confirmation? Yes

📁 Creating skill in ./hello-world...
  ✓ Creating skill.json
  ✓ Creating README.md
  ✓ Creating package.json
  ✓ Creating index.js
  ✓ Creating .gitignore
  ✓ Creating examples/README.md

✅ Skill "hello-world" created successfully!
```

### Create a Python Data Processing Skill

```bash
$ skill-builder create

? Skill name: data-processor
? Human-friendly title: Data Processor
? One-line description: Process and transform data files
? Author name: yourname
? Select runtime: Python
? Tags: data, processing, transform, cli
? License: MIT

📋 Commands:
? Command name: process
? Command description: Process a data file
? Add another command? Yes

? Command name: validate
? Command description: Validate data format
? Add another command? No

🔒 Safety:
? Will this skill modify existing files? Yes
? Should dangerous operations require confirmation? Yes

✅ Skill "data-processor" created successfully!
```

## Validation Example

```bash
$ cd hello-world
$ skill-builder validate

🔍 Skill Validator

Checking skill.json...
Checking README.md...
Checking entry file...

✅ Skill validation passed!

Your skill appears to be compliant with skills.sh requirements.
```

## Testing Generated Skills

### Node.js Skill

```bash
$ cd hello-world
$ npm install
$ node index.js --help

Hello World

Usage: hello-world <command> [options]

Commands:
  greet           Greet the user

Options:
  --help, -h      Show this help message
  --version, -v   Show version
```

### Python Skill

```bash
$ cd data-processor
$ pip install -r requirements.txt
$ python main.py --help

usage: data-processor [-h] [--version] {process,validate} ...

Process and transform data files

optional arguments:
  -h, --help          show this help message and exit
  --version           show version

Available commands:
  {process,validate}
    process           Process a data file
    validate          Validate data format
```

## Advanced Example: Multi-Command Skill

Create a skill with multiple commands and proper structure:

```bash
skill-builder create

# Configuration:
- Name: file-tools
- Title: File Tools
- Description: Collection of file manipulation utilities
- Runtime: Node.js
- Tags: files, utilities, cli, tools
- Commands:
  1. compress - Compress files
  2. extract - Extract archives
  3. convert - Convert file formats
  4. analyze - Analyze file contents
```

This generates a well-structured skill ready for implementation.

## Tips

1. **Keep names descriptive**: Use clear, purpose-driven names
2. **One skill, one job**: Don't create "Swiss army knife" skills
3. **Document safety**: Always specify if files will be modified
4. **Add examples**: Include usage examples in your skill's README
5. **Test before publishing**: Use `validate` command before submitting

## Common Patterns

### CLI Wrapper Pattern

```bash
# For wrapping existing CLI tools
Name: docker-helper
Commands: build, deploy, clean
```

### Data Transformer Pattern

```bash
# For data processing
Name: json-converter
Commands: to-yaml, to-csv, validate
```

### Code Generator Pattern

```bash
# For generating code
Name: api-scaffold
Commands: generate, validate, build
```

### File Processor Pattern

```bash
# For file operations
Name: image-optimizer
Commands: optimize, resize, convert
```
