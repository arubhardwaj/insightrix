#!/bin/bash

# Get the repository name from the remote URL
REPO_NAME=$(basename -s .git $(git config --get remote.origin.url))
echo "Repository name: $REPO_NAME"

# Set environment variable
export REPO_NAME

# Run the fix script
node fix-paths.js "$REPO_NAME"

echo "Path fixing complete! You can now test the site locally to see if the CSS loads correctly."
echo "To revert these changes (before committing), run: git checkout -- index.html 404.html"
