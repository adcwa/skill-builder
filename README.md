# Skill Builder

Interactive tool to create compliant skills for Claude Code that follow the skills.sh registry specification.

## Install

```bash
# Through Claude Code (recommended)
/install skill-builder

# Or manually from this repository
cd /path/to/skills-hub/skill-builder
npm install
```

## Usage

This skill provides two main commands:

### 1. Create a New Skill

```bash
# In Claude Code, use:
/run skill-builder create

# Or directly in terminal:
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

### 2. Validate an Existing Skill

```bash
# In Claude Code, navigate to your skill directory:
/run skill-builder validate

# Or directly in terminal:
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

## What Gets Generated

When you create a skill, a complete project structure is generated:

### Node.js Skills:
```
your-skill-name/
├── skill.json           # Skill metadata (compliant with skills.sh)
├── package.json         # npm configuration with bin entry
├── index.js             # CLI entry point (executable)
├── README.md            # Complete documentation
├── .gitignore           # Standard ignores
└── examples/
    └── README.md        # Usage examples
```

### Python Skills:
```
your-skill-name/
├── skill.json           # Skill metadata (compliant with skills.sh)
├── main.py              # CLI entry point (executable)
├── requirements.txt     # Python dependencies
├── README.md            # Complete documentation
├── .gitignore           # Standard ignores
└── examples/
    └── README.md        # Usage examples
```

## Generated Code Features

### CLI Framework (Node.js)
- Argument parsing with --help and --version support
- Command routing based on skill.json commands
- Error handling with clear messages
- Exit codes (0 for success, 1 for errors)

### CLI Framework (Python)
- argparse configuration with subcommands
- Help text and version display
- Command routing based on skill.json commands
- Proper error handling

### Documentation (README.md)
- **Install**: Installation instructions
- **Usage**: Command examples
- **Examples**: Practical usage scenarios
- **Safety**: Clear statements about file modifications and confirmations
- **License**: License information

## Compliance with skills.sh

All generated skills are compliant with the skills.sh registry requirements:

✅ **File Structure**
- skill.json with all required fields
- README.md with mandatory sections
- Executable entry point

✅ **Naming Conventions**
- Skill name: kebab-case (e.g., my-skill)
- Command names: kebab-case lowercase
- No special characters

✅ **Metadata Requirements**
- Description: ≤120 characters
- Tags: 2-5 tags minimum
- Version: Semantic versioning (0.1.0)
- License: Standard OSI license

✅ **Safety Standards**
- Explicit declaration of file modifications
- Confirmation for dangerous operations
- No destructive defaults
- Clear error messages

✅ **CLI Behavior**
- Predictable input/output
- Proper exit codes
- Help and version flags
- No hanging processes

## Example: Creating a File Processor Skill

**Step 1: Run the create command**
```bash
/run skill-builder create
```

**Step 2: Fill in the wizard**
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

**Step 3: Implement your logic**
```bash
cd file-merger
# Edit index.js to implement the merge command
npm install
node index.js --help
```

**Step 4: Validate before publishing**
```bash
/run skill-builder validate
```

## Safety

This skill:
- ✓ Only creates new directories and files
- ✓ Never modifies existing files without explicit confirmation
- ✓ Does not perform network operations
- ✓ All operations are local and traceable
- ✓ Generated skills include safety documentation

## Common Use Cases

### 1. Code Generator Skill
```bash
/run skill-builder create
# Name: api-generator
# Commands: generate, validate
# Runtime: Node.js
```

### 2. Data Transformer Skill
```bash
/run skill-builder create
# Name: json-converter
# Commands: to-yaml, to-csv, validate
# Runtime: Python
```

### 3. CLI Wrapper Skill
```bash
/run skill-builder create
# Name: docker-helper
# Commands: build, deploy, clean
# Runtime: Node.js
```

## Development Workflow

1. **Create**: Use `skill-builder create` to generate the skeleton
2. **Implement**: Add your logic to the entry file (index.js or main.py)
3. **Test**: Test locally with example inputs
4. **Validate**: Run `skill-builder validate` to ensure compliance
5. **Document**: Add examples and update README
6. **Publish**: Submit to skills.sh registry or share on GitHub

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

## Reference Documents

- **skill_builder_spec.md**: Complete skills.sh specification
- **GUIDE_CN.md**: 中文完整使用指南
- **QUICKSTART.md**: Quick start guide
- **examples/README.md**: Detailed examples

## Contributing

Found a bug or want to improve the templates?
1. Fork this repository
2. Make your changes
3. Test with `node index.js create` and `node index.js validate`
4. Submit a pull request

## License

MIT

---

🦞 The Lobster Way - Skills that AI can trust
# skill-builder
# skill-builder
