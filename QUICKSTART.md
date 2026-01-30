# Quick Start Guide

## Installation

### Option 1: Use with npx (Recommended)

No installation needed! Just run:

```bash
npx skill-builder create
```

### Option 2: Global Installation

```bash
npm install -g skill-builder
skill-builder create
```

### Option 3: Local Usage

```bash
# Clone or download
cd skill-builder
npm install
node index.js create
```

## Creating Your First Skill

```bash
# Start the interactive wizard
npx skill-builder create

# Follow the prompts:
# - Skill name: my-awesome-skill
# - Title: My Awesome Skill
# - Description: Does something awesome
# - Author: your-name
# - Runtime: Node.js or Python
# - Tags: cli, tool, awesome
# - License: MIT
# - Add commands
# - Configure safety options
```

## Validating Your Skill

```bash
cd my-awesome-skill
npx skill-builder validate
```

## What You Get

After creation, your skill will have:

✅ Compliant `skill.json`
✅ Complete `README.md`
✅ Executable entry point
✅ Package configuration
✅ .gitignore
✅ Examples directory

## Next Steps

1. Implement your commands in `index.js` (Node) or `main.py` (Python)
2. Add tests
3. Update examples
4. Test locally
5. Publish to skills.sh

## Examples

### Node.js Skill
```bash
cd my-awesome-skill
npm install
node index.js --help
```

### Python Skill
```bash
cd my-awesome-skill
pip install -r requirements.txt
python main.py --help
```

## Tips

- Keep skill names lowercase and kebab-case
- Add 2-5 descriptive tags
- Document safety considerations
- Include usage examples
- Test before publishing

## Troubleshooting

**Q: "Skill name must be lowercase, kebab-case"**
A: Use names like `my-skill`, not `MySkill` or `my_skill`

**Q: "Description must be under 120 characters"**
A: Keep it concise and clear

**Q: "At least 2 tags required"**
A: Add meaningful tags to help users discover your skill

**Q: skill.json validation fails**
A: Run `npx skill-builder validate` for detailed errors

## Support

- Issues: [GitHub Issues](https://github.com/skills-sh/skill-builder)
- Docs: [skills.sh/docs](https://skills.sh/docs)
