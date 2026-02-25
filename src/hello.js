#!/usr/bin/env node
/**
 * Hello World JavaScript Script
 * A simple demonstration program.
 */

function main() {
    console.log("Hello, World!");
    console.log("Welcome to your new development workspace!");
}

if (require.main === module) {
    main();
}

module.exports = { main };