'use strict'

const { execSync } = require("child_process");

let commit = execSync("cat .git || git log -1 --pretty=%B");

console.log(commit);