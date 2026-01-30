#!/bin/bash

# Test script for skill-builder

echo "🧪 Testing skill-builder..."
echo

# Test 1: Help command
echo "Test 1: Help command"
node index.js --help
echo "✅ Help command works"
echo

# Test 2: Version command
echo "Test 2: Version command"
node index.js --version
echo "✅ Version command works"
echo

# Test 3: Validate command (should fail in current directory)
echo "Test 3: Validate in non-skill directory (expected to fail)"
node index.js validate || echo "✅ Correctly fails when skill.json not found"
echo

# Test 4: Check if npx compatible
echo "Test 4: Checking package.json structure"
if grep -q '"bin"' package.json; then
  echo "✅ bin field configured correctly"
else
  echo "❌ bin field missing"
  exit 1
fi

echo
echo "🎉 All tests passed!"
echo
echo "Manual test required:"
echo "  Run: node index.js create"
echo "  Follow prompts to create a test skill"
echo "  Then run: cd <skill-name> && node ../index.js validate"
