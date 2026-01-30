---
name: skill-builder
description: "Interactive CLI tool to create compliant skills for Claude Code that follow the skills.sh registry specification. Use when the user wants to: (1) Create a new skill interactively, (2) Generate a complete skill project structure with Node.js or Python, (3) Validate an existing skill for compliance with skills.sh standards, (4) Set up a skill with proper metadata, commands, and documentation."
---

# Skill Builder

Interactive tool to create compliant skills for Claude Code that follow the skills.sh registry specification.

## Quick Start

### Create a New Skill

```bash
node index.js create
```

The interactive wizard will guide you through:
- **Basic metadata**: Name (kebab-case), title, description (≤120 chars)
- **Author information**: Name or GitHub username
- **Runtime selection**: Node.js or Python
- **Tags**: 2-5 relevant tags
- **License**: MIT, Apache-2.0, GPL-3.0, BSD-3-Clause
- **Commands**: Define at least one command
- **Safety configuration**: File modification warnings, confirmation requirements

### Validate an Existing Skill

```bash
cd your-skill-directory
node /path/to/skill-builder/index.js validate
```

**Validation checks:**
- ✓ skill.json has all required fields (name, title, description, version, author, license, runtime, entry, tags, commands)
- ✓ Name follows kebab-case convention
- ✓ Description is ≤120 characters
- ✓ README.md includes required sections (Install, Usage, Safety, License)
- ✓ Entry file exists and is executable
- ✓ Commands are properly defined

## Workflow

### 1. Gather Requirements

Ask the user about their skill:
- **Purpose**: What problem does this skill solve?
- **Commands**: What actions should the skill perform?
- **Runtime**: Node.js or Python?
- **Safety**: Does it modify files? Need confirmation for operations?

### 2. Run Create Command

```bash
node index.js create
```

Follow the interactive prompts to configure:
- Skill name (must be kebab-case)
- Human-readable title
- One-sentence description
- Author information
- Runtime environment
- Tags (2-5 keywords)
- License
- Command definitions
- Safety settings

### 3. Generated Structure

**For Node.js:**
```
your-skill-name/
├── skill.json           # Skill metadata
├── package.json         # npm configuration with bin entry
├── index.js             # CLI entry point (executable)
├── README.md            # Complete documentation
├── .gitignore           # Standard ignores
└── examples/
    └── README.md        # Usage examples
```

**For Python:**
```
your-skill-name/
├── skill.json           # Skill metadata
├── main.py              # CLI entry point (executable)
├── requirements.txt     # Python dependencies
├── README.md            # Complete documentation
├── .gitignore           # Standard ignores
└── examples/
    └── README.md        # Usage examples
```

### 4. Implement Logic

After generation:
1. Navigate to the skill directory: `cd your-skill-name`
2. Install dependencies: `npm install` (Node.js) or `pip install -r requirements.txt` (Python)
3. Edit the entry file (index.js or main.py) to implement command logic
4. Test locally: `node index.js <command>` or `python main.py <command>`

### 5. Validate Before Publishing

```bash
node /path/to/skill-builder/index.js validate
```

Fix any issues reported by the validator before publishing.

## Generated Features

### CLI Framework

**Node.js:**
- Argument parsing with --help and --version support
- Command routing based on skill.json commands
- Error handling with clear messages
- Exit codes (0 for success, 1 for errors)
- Shebang for direct execution

**Python:**
- argparse configuration with subcommands
- Help text and version display
- Command routing based on skill.json commands
- Proper error handling
- Shebang for direct execution

### Documentation

Each generated skill includes:
- **skill.json**: Complete metadata (name, title, description, version, author, license, runtime, entry, tags, commands)
- **README.md**: Install, Usage, Examples, Safety, License sections
- **examples/README.md**: Usage examples and patterns

### Compliance

All generated skills comply with skills.sh requirements:
- ✅ Proper file structure
- ✅ kebab-case naming
- ✅ Required metadata fields
- ✅ Safety documentation
- ✅ Executable entry point
- ✅ Clear CLI behavior

## Example: Creating a File Processor Skill

**Step 1: Run create**
```bash
node index.js create
```

**Step 2: Answer prompts**
```
? Skill name: file-merger
? Title: File Merger
? Description: Merge multiple files into one output file
? Author: yourname
? Runtime: Node.js
? Tags: files, cli, merge, tools
? License: MIT

Commands:
? Command name: merge
? Description: Merge files into one output file
? Add another? No

Safety:
? Modify files? No
? Need confirmation? Yes

✅ Skill "file-merger" created successfully!
```

**Step 3: Implement**
```bash
cd file-merger
npm install
# Edit index.js to implement merge logic
node index.js --help
node index.js merge file1.txt file2.txt output.txt
```

**Step 4: Validate**
```bash
node ../skill-builder/index.js validate
```

## Common Use Cases

### 1. Code Generator Skill
Generate boilerplate code from templates
```bash
node index.js create
# Name: api-generator
# Commands: generate, validate
# Runtime: Node.js
```

### 2. Data Transformer Skill
Convert between data formats
```bash
node index.js create
# Name: json-converter
# Commands: to-yaml, to-csv, validate
# Runtime: Python
```

### 3. CLI Wrapper Skill
Wrap existing CLI tools with enhanced functionality
```bash
node index.js create
# Name: docker-helper
# Commands: build, deploy, clean
# Runtime: Node.js
```

## Validation Rules

The validator checks:

**skill.json:**
- All required fields present
- Name is kebab-case
- Description ≤120 characters
- Tags: 2-5 items
- Commands properly defined
- Valid semver version

**README.md:**
- Install section exists
- Usage section exists
- Safety section exists
- License section exists

**Entry file:**
- File exists at specified path
- File has execute permissions
- File has proper shebang

## Troubleshooting

### "Skill name must be lowercase, kebab-case"
Use names like `my-skill`, not `MySkill`, `my_skill`, or `mySkill`.

### "Description must be under 120 characters"
Keep it concise. Focus on what the skill does, not how.

### "At least 2 tags required"
Add meaningful tags that help users discover your skill (e.g., "cli", "files", "data").

### Entry file is not executable
The generated file should have execute permissions. If not:
```bash
chmod +x index.js  # or main.py
```

## Safety

This skill:
- ✓ Only creates new directories and files
- ✓ Never modifies existing files without explicit confirmation
- ✓ Does not perform network operations
- ✓ All operations are local and traceable
- ✓ Generated skills include safety documentation

Generated skills also include safety documentation and follow best practices for user data protection.

## Resources

- **skill_builder_spec.md**: Complete skills.sh specification
- **GUIDE_CN.md**: 中文完整使用指南
- **QUICKSTART.md**: Quick start guide
- **examples/README.md**: Detailed examples
- **DEPLOYMENT.md**: Deployment report

---

🦞 The Lobster Way - Skills that AI can trust
