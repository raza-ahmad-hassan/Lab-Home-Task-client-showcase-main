const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// 5x7 ASCII bitmap font
const FONT = {
  ' ': [0,0,0,0,0,0,0],
  '!': [4,4,4,4,4,0,4],
  '"': [10,10,0,0,0,0,0],
  '#': [10,31,10,31,10,0,0],
  '$': [4,15,20,14,5,30,4],
  '%': [25,26,4,8,19,19,0],
  '&': [12,18,20,8,21,18,13],
  '\'': [4,4,0,0,0,0,0],
  '(': [2,4,8,8,8,4,2],
  ')': [8,4,2,2,2,4,8],
  '*': [0,10,4,31,4,10,0],
  '+': [0,4,4,31,4,4,0],
  ',': [0,0,0,0,0,4,8],
  '-': [0,0,0,31,0,0,0],
  '.': [0,0,0,0,0,4,4],
  '/': [1,2,4,8,16,0,0],
  '0': [14,17,19,21,25,17,14],
  '1': [4,12,4,4,4,4,14],
  '2': [14,17,1,2,4,8,31],
  '3': [31,2,4,2,1,17,14],
  '4': [2,6,10,18,31,2,2],
  '5': [31,16,30,1,1,17,14],
  '6': [6,8,16,30,17,17,14],
  '7': [31,1,2,4,8,8,8],
  '8': [14,17,17,14,17,17,14],
  '9': [14,17,17,15,1,2,12],
  ':': [0,4,4,0,4,4,0],
  ';': [0,4,4,0,4,4,8],
  '<': [2,4,8,16,8,4,2],
  '=': [0,31,0,31,0,0,0],
  '>': [8,4,2,1,2,4,8],
  '?': [14,17,1,2,4,0,4],
  '@': [14,17,1,13,21,21,14],
  'A': [14,17,17,31,17,17,17],
  'B': [30,17,17,30,17,17,30],
  'C': [14,17,16,16,16,17,14],
  'D': [30,17,17,17,17,17,30],
  'E': [31,16,16,30,16,16,31],
  'F': [31,16,16,30,16,16,16],
  'G': [14,17,16,23,17,17,15],
  'H': [17,17,17,31,17,17,17],
  'I': [14,4,4,4,4,4,14],
  'J': [7,2,2,2,2,18,12],
  'K': [17,18,20,24,20,18,17],
  'L': [16,16,16,16,16,16,31],
  'M': [17,27,21,21,17,17,17],
  'N': [17,25,25,21,19,19,17],
  'O': [14,17,17,17,17,17,14],
  'P': [30,17,17,30,16,16,16],
  'Q': [14,17,17,17,21,18,13],
  'R': [30,17,17,30,20,18,17],
  'S': [15,16,16,14,1,1,30],
  'T': [31,4,4,4,4,4,4],
  'U': [17,17,17,17,17,17,14],
  'V': [17,17,17,17,17,10,4],
  'W': [17,17,17,21,21,27,17],
  'X': [17,17,10,4,10,17,17],
  'Y': [17,17,10,4,4,4,4],
  'Z': [31,1,2,4,8,16,31],
  '[': [14,8,8,8,8,8,14],
  ']': [14,2,2,2,2,2,14],
  '_': [0,0,0,0,0,0,31],
  '|': [4,4,4,4,4,4,4]
};

// Lowercase glyphs mapping to uppercase for clean pixel aesthetic
for (let c = 97; c <= 122; c++) {
  const upper = String.fromCharCode(c - 32);
  FONT[String.fromCharCode(c)] = FONT[upper];
}

class Canvas2D {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.buf = Buffer.alloc(w * h * 4, 0);
  }

  setPixel(x, y, r, g, b, a = 255) {
    x = Math.round(x);
    y = Math.round(y);
    if (x < 0 || x >= this.w || y < 0 || y >= this.h) return;
    const idx = (y * this.w + x) * 4;
    if (a < 255) {
      const bgA = this.buf[idx + 3] / 255;
      const fgA = a / 255;
      const outA = fgA + bgA * (1 - fgA);
      if (outA > 0) {
        this.buf[idx] = Math.round((r * fgA + this.buf[idx] * bgA * (1 - fgA)) / outA);
        this.buf[idx + 1] = Math.round((g * fgA + this.buf[idx + 1] * bgA * (1 - fgA)) / outA);
        this.buf[idx + 2] = Math.round((b * fgA + this.buf[idx + 2] * bgA * (1 - fgA)) / outA);
        this.buf[idx + 3] = Math.round(outA * 255);
      }
    } else {
      this.buf[idx] = r;
      this.buf[idx + 1] = g;
      this.buf[idx + 2] = b;
      this.buf[idx + 3] = a;
    }
  }

  fillRect(x, y, w, h, [r, g, b, a = 255]) {
    const x0 = Math.max(0, Math.floor(x));
    const x1 = Math.min(this.w, Math.ceil(x + w));
    const y0 = Math.max(0, Math.floor(y));
    const y1 = Math.min(this.h, Math.ceil(y + h));
    for (let py = y0; py < y1; py++) {
      for (let px = x0; px < x1; px++) {
        this.setPixel(px, py, r, g, b, a);
      }
    }
  }

  fillGradientV(x, y, w, h, [r1, g1, b1], [r2, g2, b2]) {
    const x0 = Math.max(0, Math.floor(x));
    const x1 = Math.min(this.w, Math.ceil(x + w));
    const y0 = Math.max(0, Math.floor(y));
    const y1 = Math.min(this.h, Math.ceil(y + h));
    for (let py = y0; py < y1; py++) {
      const t = (py - y) / Math.max(1, h);
      const r = Math.round(r1 + (r2 - r1) * t);
      const g = Math.round(g1 + (g2 - g1) * t);
      const b = Math.round(b1 + (b2 - b1) * t);
      for (let px = x0; px < x1; px++) {
        this.setPixel(px, py, r, g, b, 255);
      }
    }
  }

  fillGradientH(x, y, w, h, [r1, g1, b1], [r2, g2, b2]) {
    const x0 = Math.max(0, Math.floor(x));
    const x1 = Math.min(this.w, Math.ceil(x + w));
    const y0 = Math.max(0, Math.floor(y));
    const y1 = Math.min(this.h, Math.ceil(y + h));
    for (let px = x0; px < x1; px++) {
      const t = (px - x) / Math.max(1, w);
      const r = Math.round(r1 + (r2 - r1) * t);
      const g = Math.round(g1 + (g2 - g1) * t);
      const b = Math.round(b1 + (b2 - b1) * t);
      for (let py = y0; py < y1; py++) {
        this.setPixel(px, py, r, g, b, 255);
      }
    }
  }

  fillRoundedRect(x, y, w, h, rad, color) {
    const [r, g, b, a = 255] = color;
    const rSq = rad * rad;
    const x0 = Math.max(0, Math.floor(x));
    const x1 = Math.min(this.w, Math.ceil(x + w));
    const y0 = Math.max(0, Math.floor(y));
    const y1 = Math.min(this.h, Math.ceil(y + h));
    for (let py = y0; py < y1; py++) {
      for (let px = x0; px < x1; px++) {
        let inside = true;
        if (px < x + rad && py < y + rad) {
          const dx = px - (x + rad), dy = py - (y + rad);
          if (dx * dx + dy * dy > rSq) inside = false;
        } else if (px > x + w - rad && py < y + rad) {
          const dx = px - (x + w - rad), dy = py - (y + rad);
          if (dx * dx + dy * dy > rSq) inside = false;
        } else if (px < x + rad && py > y + h - rad) {
          const dx = px - (x + rad), dy = py - (y + h - rad);
          if (dx * dx + dy * dy > rSq) inside = false;
        } else if (px > x + w - rad && py > y + h - rad) {
          const dx = px - (x + w - rad), dy = py - (y + h - rad);
          if (dx * dx + dy * dy > rSq) inside = false;
        }
        if (inside) this.setPixel(px, py, r, g, b, a);
      }
    }
  }

  strokeRoundedRect(x, y, w, h, rad, color) {
    const [r, g, b, a = 255] = color;
    for (let px = x + rad; px <= x + w - rad; px++) {
      this.setPixel(px, y, r, g, b, a);
      this.setPixel(px, y + h - 1, r, g, b, a);
    }
    for (let py = y + rad; py <= y + h - rad; py++) {
      this.setPixel(x, py, r, g, b, a);
      this.setPixel(x + w - 1, py, r, g, b, a);
    }
  }

  drawCircle(cx, cy, radius, [r, g, b, a = 255]) {
    const r2 = radius * radius;
    const x0 = Math.max(0, Math.floor(cx - radius));
    const x1 = Math.min(this.w, Math.ceil(cx + radius));
    const y0 = Math.max(0, Math.floor(cy - radius));
    const y1 = Math.min(this.h, Math.ceil(cy + radius));
    for (let py = y0; py <= y1; py++) {
      for (let px = x0; px <= x1; px++) {
        const dx = px - cx, dy = py - cy;
        if (dx * dx + dy * dy <= r2) this.setPixel(px, py, r, g, b, a);
      }
    }
  }

  // Draw real typography characters
  drawText(text, startX, startY, [r, g, b, a = 255], scale = 1, letterSpacing = 1) {
    let cursorX = startX;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const glyph = FONT[ch] || FONT[' '];
      for (let row = 0; row < 7; row++) {
        const byte = glyph[row];
        for (let col = 0; col < 5; col++) {
          if ((byte >> (4 - col)) & 1) {
            for (let sy = 0; sy < scale; sy++) {
              for (let sx = 0; sx < scale; sx++) {
                this.setPixel(cursorX + col * scale + sx, startY + row * scale + sy, r, g, b, a);
              }
            }
          }
        }
      }
      cursorX += (5 + letterSpacing) * scale;
    }
    return cursorX;
  }

  toPngBuffer() {
    const crcTable = [];
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
      crcTable[n] = c;
    }
    function crc32(buf) {
      let crc = 0xffffffff;
      for (let i = 0; i < buf.length; i++) {
        crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
      }
      return (crc ^ 0xffffffff) >>> 0;
    }
    function makeChunk(type, data) {
      const len = Buffer.alloc(4);
      len.writeUInt32BE(data.length, 0);
      const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
      const crc = Buffer.alloc(4);
      crc.writeUInt32BE(crc32(typeAndData), 0);
      return Buffer.concat([len, typeAndData, crc]);
    }
    const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(this.w, 0);
    ihdr.writeUInt32BE(this.h, 4);
    ihdr[8] = 8;
    ihdr[9] = 6;
    ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
    const raw = Buffer.alloc(this.h * (1 + this.w * 4));
    let offset = 0;
    for (let y = 0; y < this.h; y++) {
      raw[offset++] = 0;
      const rowStart = y * this.w * 4;
      this.buf.copy(raw, offset, rowStart, rowStart + this.w * 4);
      offset += this.w * 4;
    }
    const idatData = zlib.deflateSync(raw, { level: 6 });
    return Buffer.concat([
      sig,
      makeChunk('IHDR', ihdr),
      makeChunk('IDAT', idatData),
      makeChunk('IEND', Buffer.alloc(0))
    ]);
  }
}

// ----------------------------------------------------
// 1. DESKTOP REALISTIC WEBSITE PNG (1500 x 950)
// ----------------------------------------------------
console.log('Generating Desktop Realistic Website PNG...');
const dW = 1500, dH = 950;
const d = new Canvas2D(dW, dH);

// Background: deep dark futuristic theme
d.fillGradientV(0, 0, dW, dH, [10, 14, 22], [5, 8, 14]);

// Ambient subtle orbs
d.drawCircle(300, 260, 260, [99, 102, 241, 30]);
d.drawCircle(1200, 280, 280, [14, 165, 233, 30]);

// Browser Header Bar (macOS style)
d.fillRect(0, 0, dW, 46, [19, 25, 38, 255]);
d.drawCircle(24, 23, 6, [239, 68, 68, 255]);
d.drawCircle(44, 23, 6, [245, 158, 11, 255]);
d.drawCircle(64, 23, 6, [34, 197, 94, 255]);

// Address Bar
d.fillRoundedRect(350, 9, 800, 28, 14, [11, 15, 25, 255]);
d.drawText('HTTPS://STRATA-CLOUD.IO/PLATFORM/OBSERVABILITY', 500, 18, [148, 163, 184, 255], 1, 1);

// Navigation Bar
d.fillRect(0, 46, dW, 68, [14, 19, 31, 240]);
// Logo
d.fillRoundedRect(48, 62, 38, 38, 10, [99, 102, 241, 255]);
d.drawText('S', 61, 71, [255, 255, 255, 255], 3, 1);
d.drawText('STRATA CLOUD', 96, 73, [255, 255, 255, 255], 2, 1);

// Nav items
const navWords = ['OVERVIEW', 'SOLUTIONS', 'ENTERPRISE', 'DOCS', 'PRICING'];
let navX = 520;
navWords.forEach(w => {
  d.drawText(w, navX, 75, [148, 163, 184, 255], 1, 1);
  navX += w.length * 6 + 38;
});

// Sign In & CTA Button
d.drawText('SIGN IN', 1230, 75, [203, 213, 225, 255], 1, 1);
d.fillRoundedRect(1320, 60, 130, 40, 20, [99, 102, 241, 255]);
d.drawText('GET STARTED', 1342, 73, [255, 255, 255, 255], 1, 1);

// HERO SECTION
// Badge pill
d.fillRoundedRect(530, 140, 440, 32, 16, [30, 41, 59, 220]);
d.drawCircle(550, 156, 4, [16, 185, 129, 255]);
d.drawText('INTELLIGENT EDGE OBSERVABILITY & DEPLOYMENT 2026', 564, 150, [199, 210, 254, 255], 1, 1);

// Main Hero Title
d.drawText('NEXT-GEN DISTRIBUTED SYSTEMS', 340, 195, [255, 255, 255, 255], 4, 1);
d.drawText('ENGINEERED FOR ZERO LATENCY', 370, 235, [56, 189, 248, 255], 4, 1);

// Subtitle
d.drawText('DEPLOY RESILIENT MICROSERVICES, MONITOR REAL-TIME TELEMETRY,', 400, 280, [148, 163, 184, 255], 1, 1);
d.drawText('AND SCALE ENTERPRISE AGENTS ACROSS 320+ GLOBAL REGIONS EFFORTLESSLY.', 370, 298, [148, 163, 184, 255], 1, 1);

// Hero Action Buttons
d.fillRoundedRect(550, 330, 180, 46, 23, [99, 102, 241, 255]);
d.drawText('START FREE TRIAL', 585, 345, [255, 255, 255, 255], 1, 1);
d.fillRoundedRect(750, 330, 180, 46, 23, [30, 41, 59, 220]);
d.drawText('EXPLORE DOCS', 795, 345, [226, 232, 240, 255], 1, 1);

// 3 Metric Cards
const cards = [
  { label: 'GLOBAL LATENCY', val: '8.4 MS', sub: '99.9TH PERCENTILE WORLDWIDE', col: [99, 102, 241, 255] },
  { label: 'DAILY QUERIES', val: '94.2M', sub: '+34.8% GROWTH THIS MONTH', col: [14, 165, 233, 255] },
  { label: 'ACTIVE WORKLOADS', val: '148,920', sub: 'OPERATIONAL WITH 99.99% SLA', col: [16, 185, 129, 255] }
];

const cW = 420, cH = 125, cY = 405;
const cXs = [60, 540, 1020];
cards.forEach((c, i) => {
  const x = cXs[i];
  d.fillRoundedRect(x, cY, cW, cH, 14, [17, 24, 38, 240]);
  d.strokeRoundedRect(x, cY, cW, cH, 14, [51, 65, 85, 180]);
  d.fillRoundedRect(x + 20, cY + 20, 44, 44, 12, c.col);
  d.drawText(c.label[0], x + 35, cY + 31, [255, 255, 255, 255], 2, 1);
  d.drawText(c.label, x + 78, cY + 24, [148, 163, 184, 255], 1, 1);
  d.drawText(c.val, x + 78, cY + 40, [255, 255, 255, 255], 3, 1);
  d.drawText(c.sub, x + 20, cY + 92, [100, 116, 139, 255], 1, 1);
});

// Large Dashboard Telemetry Chart Card
const chartX = 60, chartY = 555, chartW = 900, chartH = 350;
d.fillRoundedRect(chartX, chartY, chartW, chartH, 16, [17, 24, 38, 240]);
d.strokeRoundedRect(chartX, chartY, chartW, chartH, 16, [51, 65, 85, 180]);

// Chart Card Header
d.drawText('REALTIME EDGE STREAMING TELEMETRY', chartX + 28, chartY + 24, [255, 255, 255, 255], 2, 1);
d.drawText('LIVE PRODUCTION METRICS (US-EAST / EU-WEST / AP-TOKYO)', chartX + 28, chartY + 50, [100, 116, 139, 255], 1, 1);
d.fillRoundedRect(chartX + chartW - 140, chartY + 20, 110, 28, 14, [16, 185, 129, 220]);
d.drawText('● ACTIVE FEED', chartX + chartW - 128, chartY + 28, [255, 255, 255, 255], 1, 1);

// Chart Grid & Axes
d.fillRect(chartX + 80, chartY + 90, 1, 210, [51, 65, 85, 150]);
d.fillRect(chartX + 80, chartY + 300, chartW - 130, 1, [51, 65, 85, 150]);
d.drawText('50 GB/S', chartX + 25, chartY + 95, [100, 116, 139, 255], 1, 1);
d.drawText('25 GB/S', chartX + 25, chartY + 195, [100, 116, 139, 255], 1, 1);
d.drawText('0 GB/S', chartX + 30, chartY + 295, [100, 116, 139, 255], 1, 1);

// Waveform Area & Points
const timeX = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'NOW'];
timeX.forEach((t, i) => {
  const tx = chartX + 90 + i * 110;
  d.drawText(t, tx, chartY + 312, [100, 116, 139, 255], 1, 1);
});

// Draw Line Points
for (let px = chartX + 85; px < chartX + chartW - 50; px += 4) {
  const t = (px - chartX - 85) / (chartW - 135);
  const py = chartY + 200 - Math.sin(t * 8) * 55 - Math.cos(t * 4) * 35;
  for (let fillY = py; fillY < chartY + 300; fillY += 3) {
    d.setPixel(px, fillY, 99, 102, 241, 40);
  }
  d.drawCircle(px, py, 1.5, [56, 189, 248, 255]);
}

// Right Side Server Nodes Status Card
const rightX = 990, rightY = 555, rightW = 450, rightH = 350;
d.fillRoundedRect(rightX, rightY, rightW, rightH, 16, [17, 24, 38, 240]);
d.strokeRoundedRect(rightX, rightY, rightW, rightH, 16, [51, 65, 85, 180]);
d.drawText('GLOBAL NODE TOPOLOGY', rightX + 24, rightY + 24, [255, 255, 255, 255], 2, 1);
d.drawText('320 LOCATIONS WORLDWIDE', rightX + 24, rightY + 50, [100, 116, 139, 255], 1, 1);

const nodes = [
  { name: 'US-EAST (VIRGINIA)', ms: '4 MS', status: 'HEALTHY - 100%' },
  { name: 'EU-WEST (IRELAND)', ms: '8 MS', status: 'HEALTHY - 100%' },
  { name: 'AP-NORTHEAST (TOKYO)', ms: '12 MS', status: 'HEALTHY - 99.99%' },
  { name: 'SA-EAST (SAO PAULO)', ms: '16 MS', status: 'HEALTHY - 100%' }
];

nodes.forEach((nd, idx) => {
  const ny = rightY + 85 + idx * 60;
  d.fillRoundedRect(rightX + 20, ny, rightW - 40, 50, 10, [13, 18, 30, 220]);
  d.drawCircle(rightX + 38, ny + 25, 5, [16, 185, 129, 255]);
  d.drawText(nd.name, rightX + 54, ny + 15, [255, 255, 255, 255], 1, 1);
  d.drawText(nd.status, rightX + 54, ny + 30, [148, 163, 184, 255], 1, 1);
  d.drawText(nd.ms, rightX + rightW - 90, ny + 20, [56, 189, 248, 255], 1, 1);
});

const deskBuf = d.toPngBuffer();
fs.writeFileSync(path.join(__dirname, 'assets', 'images', 'sample-website-desktop.png'), deskBuf);
console.log('Saved Desktop Realistic PNG, Size:', deskBuf.length);


// ----------------------------------------------------
// 2. MOBILE PORTRAIT REALISTIC WEBSITE PNG (440 x 880)
// ----------------------------------------------------
console.log('Generating Mobile Portrait Realistic Website PNG...');
const mpW = 440, mpH = 880;
const mp = new Canvas2D(mpW, mpH);

// Background
mp.fillGradientV(0, 0, mpW, mpH, [10, 14, 22], [5, 8, 14]);

// Status Bar (iPhone 16 style)
mp.drawText('9:41', 34, 18, [255, 255, 255, 255], 1, 1);
mp.fillRoundedRect(170, 12, 100, 24, 12, [0, 0, 0, 255]);
mp.drawCircle(255, 24, 4, [30, 41, 59, 255]);
mp.drawText('5G', 350, 18, [255, 255, 255, 255], 1, 1);
mp.drawText('100%', 382, 18, [34, 197, 94, 255], 1, 1);

// Mobile Nav
mp.fillRect(0, 48, mpW, 58, [14, 19, 31, 240]);
mp.fillRoundedRect(20, 58, 34, 34, 8, [99, 102, 241, 255]);
mp.drawText('S', 31, 66, [255, 255, 255, 255], 2, 1);
mp.drawText('STRATA CLOUD', 64, 68, [255, 255, 255, 255], 2, 1);
// Hamburger
mp.fillRect(385, 66, 24, 3, [255, 255, 255, 255]);
mp.fillRect(385, 74, 24, 3, [255, 255, 255, 255]);
mp.fillRect(385, 82, 24, 3, [255, 255, 255, 255]);

// Hero
mp.fillRoundedRect(20, 125, 260, 26, 13, [30, 41, 59, 220]);
mp.drawCircle(34, 138, 3, [16, 185, 129, 255]);
mp.drawText('MOBILE EDGE TELEMETRY 2026', 44, 133, [199, 210, 254, 255], 1, 1);

mp.drawText('INTELLIGENT CLOUD', 20, 168, [255, 255, 255, 255], 3, 1);
mp.drawText('AT GLOBAL EDGE', 20, 198, [56, 189, 248, 255], 3, 1);

mp.drawText('MONITOR CLUSTERS AND DEPLOY ANYWHERE.', 20, 235, [148, 163, 184, 255], 1, 1);

// Mobile CTA
mp.fillRoundedRect(20, 260, 400, 48, 24, [99, 102, 241, 255]);
mp.drawText('OPEN MOBILE CONSOLE', 145, 277, [255, 255, 255, 255], 1, 1);

// Metric Stack (3 cards)
const mobCards = [
  { t: 'GLOBAL LATENCY', v: '8.4 MS', s: 'OPTIMAL (VIRGINIA)', c: [99, 102, 241, 255] },
  { t: 'ACTIVE INSTANCES', v: '148,920', s: '320 REGIONS LIVE', c: [14, 165, 233, 255] },
  { t: 'SYSTEM HEALTH', v: '99.99%', s: 'ZERO REPORTED INCIDENTS', c: [16, 185, 129, 255] }
];

mobCards.forEach((mc, i) => {
  const mcy = 328 + i * 92;
  mp.fillRoundedRect(20, mcy, 400, 78, 14, [17, 24, 38, 240]);
  mp.strokeRoundedRect(20, mcy, 400, 78, 14, [51, 65, 85, 180]);
  mp.fillRoundedRect(36, mcy + 16, 46, 46, 10, mc.c);
  mp.drawText(mc.t[0], 52, mcy + 28, [255, 255, 255, 255], 2, 1);
  mp.drawText(mc.t, 94, mcy + 20, [148, 163, 184, 255], 1, 1);
  mp.drawText(mc.v, 94, mcy + 34, [255, 255, 255, 255], 2, 1);
  mp.drawText(mc.s, 94, mcy + 55, [100, 116, 139, 255], 1, 1);
});

// Mobile Bottom Chart Card
const mChartY = 620;
mp.fillRoundedRect(20, mChartY, 400, 170, 14, [17, 24, 38, 240]);
mp.strokeRoundedRect(20, mChartY, 400, 170, 14, [51, 65, 85, 180]);
mp.drawText('HOURLY BANDWIDTH STREAM', 36, mChartY + 18, [255, 255, 255, 255], 1, 1);
mp.drawText('CURRENT: 42.6 GB/S', 280, mChartY + 18, [56, 189, 248, 255], 1, 1);

// mini chart bars
for (let b = 0; b < 16; b++) {
  const bh = 20 + Math.sin(b * 0.5) * 35 + ((b % 3) * 15);
  const bx = 38 + b * 23;
  mp.fillRoundedRect(bx, mChartY + 150 - bh, 16, bh, 3, [99, 102, 241, 200]);
}

// Mobile Bottom Nav Dock
mp.fillRect(0, mpH - 64, mpW, 64, [11, 15, 25, 255]);
mp.fillRect(0, mpH - 64, mpW, 1, [51, 65, 85, 150]);
const bNavWords = ['HOME', 'CLUSTERS', 'TELEMETRY', 'SETTINGS'];
bNavWords.forEach((bn, idx) => {
  const bx = 28 + idx * 105;
  mp.drawText(bn, bx, mpH - 36, idx === 0 ? [56, 189, 248, 255] : [148, 163, 184, 255], 1, 1);
});

// Home indicator bar
mp.fillRoundedRect(mpW / 2 - 60, mpH - 10, 120, 4, 2, [255, 255, 255, 200]);

const mobPortBuf = mp.toPngBuffer();
fs.writeFileSync(path.join(__dirname, 'assets', 'images', 'sample-website-mobile-portrait.png'), mobPortBuf);
console.log('Saved Mobile Portrait Realistic PNG, Size:', mobPortBuf.length);


// ----------------------------------------------------
// 3. MOBILE LANDSCAPE REALISTIC WEBSITE PNG (880 x 440)
// ----------------------------------------------------
console.log('Generating Mobile Landscape Realistic Website PNG...');
const mlW = 880, mlH = 440;
const ml = new Canvas2D(mlW, mlH);

// Background
ml.fillGradientV(0, 0, mlW, mlH, [10, 14, 22], [5, 8, 14]);

// Top Status Bar (Horizontal layout)
ml.fillRect(0, 0, mlW, 30, [14, 19, 31, 255]);
ml.drawText('9:41 AM', 28, 10, [255, 255, 255, 255], 1, 1);
ml.fillRoundedRect(mlW / 2 - 50, 4, 100, 20, 10, [0, 0, 0, 255]);
ml.drawText('5G ULTRA', mlW - 120, 10, [255, 255, 255, 255], 1, 1);
ml.drawText('100%', mlW - 55, 10, [34, 197, 94, 255], 1, 1);

// Left Sidebar Navigation (Landscape UX)
const sideBarW = 90;
ml.fillRect(0, 30, sideBarW, mlH - 30, [14, 19, 31, 240]);
ml.fillRect(sideBarW, 30, 1, mlH - 30, [51, 65, 85, 180]);
// Logo
ml.fillRoundedRect(25, 48, 40, 40, 10, [99, 102, 241, 255]);
ml.drawText('S', 38, 59, [255, 255, 255, 255], 2, 1);

const sideItems = ['OVERVIEW', 'TELEMETRY', 'NODES', 'SECURITY', 'LOGS'];
sideItems.forEach((si, idx) => {
  const sy = 115 + idx * 55;
  ml.drawText(si, 14, sy, idx === 0 ? [56, 189, 248, 255] : [148, 163, 184, 255], 1, 1);
});

// Main Horizontal Area
// Header
ml.fillRect(sideBarW, 30, mlW - sideBarW, 46, [17, 24, 38, 200]);
ml.drawText('STRATA CLOUD // REALTIME LANDSCAPE DASHBOARD', sideBarW + 20, 46, [255, 255, 255, 255], 1, 1);
ml.drawText('REGION: ALL GLOBAL ZONES', mlW - 220, 46, [16, 185, 129, 255], 1, 1);

// Left Column: Metrics
const col1X = sideBarW + 18, col1W = 350;
ml.fillRoundedRect(col1X, 90, col1W, 150, 12, [17, 24, 38, 240]);
ml.strokeRoundedRect(col1X, 90, col1W, 150, 12, [51, 65, 85, 180]);
ml.drawText('ACTIVE CLUSTERS & NODES', col1X + 16, 106, [148, 163, 184, 255], 1, 1);
ml.drawText('148,920', col1X + 16, 124, [255, 255, 255, 255], 3, 1);
ml.drawText('AVG LATENCY: 8.4 MS (99.9% SLA)', col1X + 16, 156, [56, 189, 248, 255], 1, 1);
ml.fillRoundedRect(col1X + 16, 180, col1W - 32, 40, 12, [99, 102, 241, 255]);
ml.drawText('SCALE CLUSTERS NOW', col1X + 90, 195, [255, 255, 255, 255], 1, 1);

// Left Column 2nd widget
ml.fillRoundedRect(col1X, 255, col1W, 165, 12, [17, 24, 38, 240]);
ml.strokeRoundedRect(col1X, 255, col1W, 165, 12, [51, 65, 85, 180]);
ml.drawText('LIVE REGION STATUS', col1X + 16, 272, [255, 255, 255, 255], 1, 1);

const rNodes = [
  'US-EAST-1: NORMAL (4 MS)',
  'EU-WEST-1: NORMAL (8 MS)',
  'AP-NORTHEAST: NORMAL (12 MS)'
];
rNodes.forEach((rn, i) => {
  const ry = 300 + i * 36;
  ml.drawCircle(col1X + 24, ry + 6, 4, [16, 185, 129, 255]);
  ml.drawText(rn, col1X + 36, ry, [148, 163, 184, 255], 1, 1);
});

// Right Column: Wide Telemetry Stream
const col2X = col1X + col1W + 16, col2W = mlW - col2X - 18;
ml.fillRoundedRect(col2X, 90, col2W, 330, 12, [17, 24, 38, 240]);
ml.strokeRoundedRect(col2X, 90, col2W, 330, 12, [51, 65, 85, 180]);
ml.drawText('LIVE GLOBAL TRAFFIC WAVEFORM', col2X + 16, 108, [255, 255, 255, 255], 1, 1);
ml.drawText('PEAK: 84.6 GB/S // REALTIME', col2X + col2W - 190, 108, [56, 189, 248, 255], 1, 1);

// Waveform inside right column
for (let px = col2X + 20; px < col2X + col2W - 20; px += 3) {
  const t = (px - col2X - 20) / (col2W - 40);
  const py = 240 - Math.sin(t * 10) * 50 - Math.cos(t * 5) * 30;
  for (let fillY = py; fillY < 380; fillY += 3) {
    ml.setPixel(px, fillY, 99, 102, 241, 40);
  }
  ml.drawCircle(px, py, 1.5, [56, 189, 248, 255]);
}

// Bottom Home bar in landscape
ml.fillRoundedRect(mlW / 2 - 50, mlH - 8, 100, 4, 2, [255, 255, 255, 200]);

const mobLandBuf = ml.toPngBuffer();
fs.writeFileSync(path.join(__dirname, 'assets', 'images', 'sample-website-mobile-landscape.png'), mobLandBuf);
console.log('Saved Mobile Landscape Realistic PNG, Size:', mobLandBuf.length);

console.log('All 3 realistic PNGs with full alphabets generated!');
