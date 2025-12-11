const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../dist/index.js");
const shebang = "#!/usr/bin/env node\n";

// Read the file
const content = fs.readFileSync(filePath, "utf-8");

// Check if shebang already exists
if (!content.startsWith("#!")) {
  // Add shebang at the beginning
  fs.writeFileSync(filePath, shebang + content);
  console.log("Shebang added to dist/index.js");
} else {
  console.log("Shebang already exists");
}
