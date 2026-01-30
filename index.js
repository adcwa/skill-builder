#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const chalk = require('chalk');

// Template generators
const templates = {
  skillJson: (data) => JSON.stringify({
    name: data.name,
    title: data.title,
    description: data.description,
    version: "0.1.0",
    author: data.author,
    license: data.license,
    runtime: data.runtime,
    entry: data.runtime === 'node' ? 'index.js' : 'main.py',
    tags: data.tags,
    commands: data.commands
  }, null, 2),

  packageJson: (data) => data.runtime === 'node' ? JSON.stringify({
    name: data.name,
    version: "0.1.0",
    description: data.description,
    main: "index.js",
    bin: {
      [data.name]: "./index.js"
    },
    scripts: {
      test: "echo \"Error: no test specified\" && exit 1"
    },
    keywords: data.tags,
    author: data.author,
    license: data.license,
    engines: {
      node: ">=14.0.0"
    }
  }, null, 2) : null,

  readme: (data) => `# ${data.title}

${data.description}

## Install

\`\`\`bash
npx skills install ${data.name}
\`\`\`

## Usage

\`\`\`bash
${data.name} <command> [options]
\`\`\`

### Commands

${data.commands.map(cmd => `- \`${cmd.name}\`: ${cmd.description}`).join('\n')}

## Examples

\`\`\`bash
# Example usage
${data.name} ${data.commands[0]?.name || 'help'}
\`\`\`

## Safety

${data.safety || '- This skill does not modify files without confirmation\n- All outputs are generated to stdout\n- No network requests are made'}

## Development

\`\`\`bash
# Clone the repository
git clone https://github.com/${data.author}/${data.name}
cd ${data.name}

# Install dependencies
${data.runtime === 'node' ? 'npm install' : 'pip install -r requirements.txt'}

# Test locally
${data.runtime === 'node' ? 'node index.js' : 'python main.py'}
\`\`\`

## License

${data.license}
`,

  nodeEntry: (data) => `#!/usr/bin/env node

const args = process.argv.slice(2);

function showHelp() {
  console.log(\`
${data.title}

Usage: ${data.name} <command> [options]

Commands:
${data.commands.map(cmd => `  ${cmd.name.padEnd(15)} ${cmd.description}`).join('\\n')}

Options:
  --help, -h      Show this help message
  --version, -v   Show version
\`);
}

function showVersion() {
  console.log('${data.name} v0.1.0');
}

// Parse command
const command = args[0];

if (!command || command === '--help' || command === '-h') {
  showHelp();
  process.exit(0);
}

if (command === '--version' || command === '-v') {
  showVersion();
  process.exit(0);
}

// Handle commands
switch (command) {
${data.commands.map(cmd => `  case '${cmd.name}':
    console.log('Executing ${cmd.name}...');
    // TODO: Implement ${cmd.name} command
    break;`).join('\n')}

  default:
    console.error(\`❌ Unknown command: \${command}\`);
    console.error('Run "${data.name} --help" for usage information');
    process.exit(1);
}
`,

  pythonEntry: (data) => `#!/usr/bin/env python3
"""
${data.title}
${data.description}
"""

import sys
import argparse

def main():
    parser = argparse.ArgumentParser(
        description='${data.description}',
        prog='${data.name}'
    )

    parser.add_argument('--version', action='version', version='${data.name} 0.1.0')

    subparsers = parser.add_subparsers(dest='command', help='Available commands')

${data.commands.map(cmd => `    # ${cmd.name} command
    ${cmd.name}_parser = subparsers.add_parser('${cmd.name}', help='${cmd.description}')
    # TODO: Add arguments for ${cmd.name}
`).join('\n')}

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(0)

${data.commands.map(cmd => `    if args.command == '${cmd.name}':
        print(f'Executing ${cmd.name}...')
        # TODO: Implement ${cmd.name} command
`).join('\n')}

if __name__ == '__main__':
    main()
`,

  requirements: (data) => `# Python dependencies for ${data.name}
`,

  gitignore: () => `node_modules/
*.pyc
__pycache__/
.DS_Store
*.log
.env
dist/
`,

  exampleFile: (data) => `# Example for ${data.title}

This directory contains example usage of ${data.name}.

## Basic Example

\`\`\`bash
${data.name} ${data.commands[0]?.name || 'help'}
\`\`\`
`
};

// Validation functions
function validateSkillName(name) {
  const regex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
  if (!regex.test(name)) {
    return 'Skill name must be lowercase, kebab-case (e.g., my-skill)';
  }
  return true;
}

function validateVersion(version) {
  const regex = /^\d+\.\d+\.\d+$/;
  if (!regex.test(version)) {
    return 'Version must follow semver (e.g., 0.1.0)';
  }
  return true;
}

// Main CLI
async function createSkill() {
  console.log(chalk.cyan.bold('\n🦞 Skill Builder - Create a new skill\n'));
  console.log(chalk.gray('This tool will help you create a compliant skill for skills.sh\n'));

  const questions = [
    {
      type: 'text',
      name: 'name',
      message: 'Skill name (lowercase, kebab-case):',
      validate: validateSkillName
    },
    {
      type: 'text',
      name: 'title',
      message: 'Human-friendly title:',
      validate: value => value.length > 0 || 'Title is required'
    },
    {
      type: 'text',
      name: 'description',
      message: 'One-line description (max 120 chars):',
      validate: value => {
        if (!value) return 'Description is required';
        if (value.length > 120) return 'Description must be under 120 characters';
        return true;
      }
    },
    {
      type: 'text',
      name: 'author',
      message: 'Author name or GitHub username:',
      validate: value => value.length > 0 || 'Author is required'
    },
    {
      type: 'select',
      name: 'runtime',
      message: 'Select runtime:',
      choices: [
        { title: 'Node.js', value: 'node' },
        { title: 'Python', value: 'python' }
      ]
    },
    {
      type: 'list',
      name: 'tags',
      message: 'Tags (2-5, comma-separated):',
      separator: ',',
      validate: value => {
        if (value.length < 2) return 'At least 2 tags required';
        if (value.length > 5) return 'Maximum 5 tags allowed';
        return true;
      }
    },
    {
      type: 'select',
      name: 'license',
      message: 'License:',
      choices: [
        { title: 'MIT', value: 'MIT' },
        { title: 'Apache-2.0', value: 'Apache-2.0' },
        { title: 'GPL-3.0', value: 'GPL-3.0' },
        { title: 'BSD-3-Clause', value: 'BSD-3-Clause' }
      ]
    }
  ];

  let answers = await prompts(questions);

  if (Object.keys(answers).length !== questions.length) {
    console.log(chalk.yellow('\\n⚠️  Skill creation cancelled'));
    process.exit(0);
  }

  // Commands configuration
  console.log(chalk.cyan('\\n📋 Configure commands (at least 1 required):'));

  const commands = [];
  let addMore = true;

  while (addMore) {
    const cmdAnswers = await prompts([
      {
        type: 'text',
        name: 'name',
        message: `Command name (lowercase):`,
        validate: value => {
          if (!value) return 'Command name is required';
          if (!/^[a-z]+(-[a-z]+)*$/.test(value)) return 'Must be lowercase kebab-case';
          return true;
        }
      },
      {
        type: 'text',
        name: 'description',
        message: 'Command description:',
        validate: value => value.length > 0 || 'Description is required'
      }
    ]);

    if (cmdAnswers.name && cmdAnswers.description) {
      commands.push(cmdAnswers);
    }

    if (commands.length === 0) {
      console.log(chalk.yellow('At least one command is required'));
      continue;
    }

    const shouldContinue = await prompts({
      type: 'confirm',
      name: 'value',
      message: 'Add another command?',
      initial: false
    });

    addMore = shouldContinue.value;
  }

  answers.commands = commands;

  // Safety configuration
  console.log(chalk.cyan('\\n🔒 Safety configuration:'));

  const safetyAnswers = await prompts([
    {
      type: 'confirm',
      name: 'modifiesFiles',
      message: 'Will this skill modify existing files?',
      initial: false
    },
    {
      type: 'confirm',
      name: 'needsConfirmation',
      message: 'Should dangerous operations require confirmation?',
      initial: true
    }
  ]);

  const safetyNotes = [];
  if (safetyAnswers.modifiesFiles) {
    safetyNotes.push('- This skill may modify existing files');
    if (safetyAnswers.needsConfirmation) {
      safetyNotes.push('- All destructive operations require explicit confirmation');
    }
  } else {
    safetyNotes.push('- This skill does not modify existing files');
  }
  safetyNotes.push('- No network requests are made without user consent');

  answers.safety = safetyNotes.join('\\n');

  // Create skill directory
  const skillDir = path.join(process.cwd(), answers.name);

  if (fs.existsSync(skillDir)) {
    console.log(chalk.red(`\\n❌ Directory "${answers.name}" already exists`));
    process.exit(1);
  }

  console.log(chalk.cyan(`\\n📁 Creating skill in ${skillDir}...`));

  try {
    // Create directory structure
    fs.mkdirSync(skillDir);
    fs.mkdirSync(path.join(skillDir, 'examples'));

    // Generate files
    console.log(chalk.gray('  ✓ Creating skill.json'));
    fs.writeFileSync(
      path.join(skillDir, 'skill.json'),
      templates.skillJson(answers)
    );

    console.log(chalk.gray('  ✓ Creating README.md'));
    fs.writeFileSync(
      path.join(skillDir, 'README.md'),
      templates.readme(answers)
    );

    if (answers.runtime === 'node') {
      console.log(chalk.gray('  ✓ Creating package.json'));
      fs.writeFileSync(
        path.join(skillDir, 'package.json'),
        templates.packageJson(answers)
      );

      console.log(chalk.gray('  ✓ Creating index.js'));
      const entryFile = path.join(skillDir, 'index.js');
      fs.writeFileSync(entryFile, templates.nodeEntry(answers));
      fs.chmodSync(entryFile, '755');
    } else {
      console.log(chalk.gray('  ✓ Creating main.py'));
      const entryFile = path.join(skillDir, 'main.py');
      fs.writeFileSync(entryFile, templates.pythonEntry(answers));
      fs.chmodSync(entryFile, '755');

      console.log(chalk.gray('  ✓ Creating requirements.txt'));
      fs.writeFileSync(
        path.join(skillDir, 'requirements.txt'),
        templates.requirements(answers)
      );
    }

    console.log(chalk.gray('  ✓ Creating .gitignore'));
    fs.writeFileSync(
      path.join(skillDir, '.gitignore'),
      templates.gitignore()
    );

    console.log(chalk.gray('  ✓ Creating examples/README.md'));
    fs.writeFileSync(
      path.join(skillDir, 'examples', 'README.md'),
      templates.exampleFile(answers)
    );

    console.log(chalk.green.bold(`\\n✅ Skill "${answers.name}" created successfully!\\n`));

    console.log(chalk.cyan('Next steps:'));
    console.log(chalk.gray(`  cd ${answers.name}`));
    if (answers.runtime === 'node') {
      console.log(chalk.gray('  npm install'));
      console.log(chalk.gray('  node index.js --help'));
    } else {
      console.log(chalk.gray('  pip install -r requirements.txt'));
      console.log(chalk.gray('  python main.py --help'));
    }
    console.log(chalk.gray('\\n  # Implement your commands in the entry file'));
    console.log(chalk.gray('  # Test your skill'));
    console.log(chalk.gray('  # Publish to skills.sh\\n'));

  } catch (error) {
    console.error(chalk.red('\\n❌ Error creating skill:'), error.message);
    process.exit(1);
  }
}

async function validateSkill() {
  console.log(chalk.cyan.bold('\\n🔍 Skill Validator\\n'));

  const skillJsonPath = path.join(process.cwd(), 'skill.json');

  if (!fs.existsSync(skillJsonPath)) {
    console.log(chalk.red('❌ skill.json not found in current directory'));
    process.exit(1);
  }

  const errors = [];
  const warnings = [];

  try {
    // Check skill.json
    console.log(chalk.gray('Checking skill.json...'));
    const skillJson = JSON.parse(fs.readFileSync(skillJsonPath, 'utf8'));

    const requiredFields = ['name', 'title', 'description', 'version', 'author', 'license', 'runtime', 'entry'];
    for (const field of requiredFields) {
      if (!skillJson[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    }

    if (skillJson.name && !validateSkillName(skillJson.name)) {
      errors.push('Invalid skill name format (must be lowercase kebab-case)');
    }

    if (skillJson.description && skillJson.description.length > 120) {
      warnings.push('Description exceeds 120 characters');
    }

    if (!skillJson.commands || skillJson.commands.length === 0) {
      errors.push('At least one command is required');
    }

    // Check README.md
    console.log(chalk.gray('Checking README.md...'));
    const readmePath = path.join(process.cwd(), 'README.md');
    if (!fs.existsSync(readmePath)) {
      errors.push('README.md is missing');
    } else {
      const readme = fs.readFileSync(readmePath, 'utf8');
      const requiredSections = ['Install', 'Usage', 'Safety', 'License'];
      for (const section of requiredSections) {
        if (!readme.includes(`## ${section}`)) {
          warnings.push(`README missing recommended section: ${section}`);
        }
      }
    }

    // Check entry file
    console.log(chalk.gray('Checking entry file...'));
    const entryPath = path.join(process.cwd(), skillJson.entry || 'index.js');
    if (!fs.existsSync(entryPath)) {
      errors.push(`Entry file not found: ${skillJson.entry}`);
    } else {
      const stats = fs.statSync(entryPath);
      if (!(stats.mode & 0o111)) {
        warnings.push('Entry file is not executable (chmod +x required)');
      }
    }

    // Display results
    console.log();
    if (errors.length === 0 && warnings.length === 0) {
      console.log(chalk.green.bold('✅ Skill validation passed!\\n'));
      console.log(chalk.gray('Your skill appears to be compliant with skills.sh requirements.'));
    } else {
      if (errors.length > 0) {
        console.log(chalk.red.bold(`❌ ${errors.length} error(s) found:\\n`));
        errors.forEach(err => console.log(chalk.red(`  • ${err}`)));
        console.log();
      }

      if (warnings.length > 0) {
        console.log(chalk.yellow.bold(`⚠️  ${warnings.length} warning(s):\\n`));
        warnings.forEach(warn => console.log(chalk.yellow(`  • ${warn}`)));
        console.log();
      }

      process.exit(errors.length > 0 ? 1 : 0);
    }

  } catch (error) {
    console.error(chalk.red('\\n❌ Validation error:'), error.message);
    process.exit(1);
  }
}

// Main entry point
async function main() {
  const command = process.argv[2];

  if (!command || command === '--help' || command === '-h') {
    console.log(`
${chalk.cyan.bold('Skill Builder')}

Create compliant skills for skills.sh registry

${chalk.yellow('Usage:')}
  skill-builder <command> [options]

${chalk.yellow('Commands:')}
  create      Create a new skill interactively
  validate    Validate an existing skill structure

${chalk.yellow('Options:')}
  --help, -h      Show this help message
  --version, -v   Show version
    `);
    process.exit(0);
  }

  if (command === '--version' || command === '-v') {
    console.log('skill-builder v0.1.0');
    process.exit(0);
  }

  switch (command) {
    case 'create':
      await createSkill();
      break;

    case 'validate':
      await validateSkill();
      break;

    default:
      console.error(chalk.red(`❌ Unknown command: ${command}`));
      console.error('Run "skill-builder --help" for usage information');
      process.exit(1);
  }
}

// Run
main().catch(error => {
  console.error(chalk.red('\\n❌ Unexpected error:'), error);
  process.exit(1);
});
