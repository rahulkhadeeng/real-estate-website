const fs = require('fs');
const js = fs.readFileSync('site_bundle.js', 'utf8');

// Find routes
const routeMatches = js.match(/path:\s*["'][^"']+["']/g) || [];
console.log('Routes:', Array.from(new Set(routeMatches)));

// Find text patterns, headings, sections
const headings = js.match(/>[A-Z][A-Za-z0-9\s,&'’\-–:?!]{3,60}</g) || [];
console.log('Headings sample:', Array.from(new Set(headings)).slice(0, 50));
