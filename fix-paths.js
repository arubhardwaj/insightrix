const fs = require('fs');
const path = require('path');

// Get repository name from environment variable or command line argument
const repoName = process.env.REPO_NAME || process.argv[2];

if (!repoName) {
  console.error('Repository name is required. Set REPO_NAME environment variable or pass as argument.');
  process.exit(1);
}

// Files to process
const htmlFiles = ['index.html', '404.html'];

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace all instances of /_next/ with /{repoName}/_next/
    content = content.replace(/\/_next\//g, `/${repoName}/_next/`);
    
    // Fix absolute URLs for other resources
    content = content.replace(/href="\//g, `href="/${repoName}/`);
    content = content.replace(/src="\//g, `src="/${repoName}/`);
    
    // Don't modify URLs that already have the repo name
    content = content.replace(new RegExp(`/${repoName}/${repoName}/`, 'g'), `/${repoName}/`);
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated paths in ${file}`);
  } else {
    console.log(`File ${file} not found, skipping`);
  }
});

console.log('Path fixing complete!');
