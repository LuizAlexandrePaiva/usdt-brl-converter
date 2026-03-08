const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
    require.resolve('sharp');
} catch (e) {
    console.log('Installing sharp...');
    execSync('npm install sharp', { stdio: 'inherit', cwd: __dirname });
}

const sharp = require('sharp');

const iconsDir = path.join(__dirname, '../src/icons');
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

const svgContent = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="112" fill="#111a11"/>
  <text x="256" y="380" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="900" font-size="320" 
        fill="#69f069" text-anchor="middle">₮</text>
  <rect width="512" height="512" rx="112" fill="none" stroke="rgba(45, 90, 39, 0.5)" stroke-width="8"/>
</svg>
`;

async function generateIcons() {
    const svgBuffer = Buffer.from(svgContent);

    await sharp(svgBuffer)
        .resize(192, 192)
        .png()
        .toFile(path.join(iconsDir, 'icon-192.png'));

    console.log('Generated icon-192.png in src/icons/');

    await sharp(svgBuffer)
        .resize(512, 512)
        .png()
        .toFile(path.join(iconsDir, 'icon-512.png'));

    console.log('Generated icon-512.png in src/icons/');

    await sharp(svgBuffer)
        .resize(32, 32)
        .png()
        .toFile(path.join(__dirname, '../src/favicon.png'));

    console.log('Generated favicon.png in src/');
}

generateIcons().catch(console.error);
