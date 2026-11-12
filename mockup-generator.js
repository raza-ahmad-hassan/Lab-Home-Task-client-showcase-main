/**
 * High-DPI Canvas Mockup Generator (v3.0)
 * Generates razor-sharp, authentic, modern SaaS website graphics
 * with true 19.5:9 smartphone aspect ratios and QHD 16:9 desktop layouts.
 */

class MockupGenerator {
  static createDesktopPNG() {
    const w = 2560, h = 1440; // 16:9 QHD resolution
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#0a0e17');
    bgGrad.addColorStop(1, '#05070c');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Ambient background lights
    const glow1 = ctx.createRadialGradient(400, 300, 10, 400, 300, 600);
    glow1.addColorStop(0, 'rgba(99, 102, 241, 0.25)');
    glow1.addColorStop(1, 'rgba(99, 102, 241, 0)');
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, w, h);

    const glow2 = ctx.createRadialGradient(2100, 400, 10, 2100, 400, 700);
    glow2.addColorStop(0, 'rgba(14, 165, 233, 0.22)');
    glow2.addColorStop(1, 'rgba(14, 165, 233, 0)');
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, w, h);

    // Subtle grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 80) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Navigation Bar
    ctx.fillStyle = 'rgba(15, 22, 36, 0.9)';
    ctx.fillRect(0, 0, w, 100);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(w, 100);
    ctx.stroke();

    // Logo Mark
    ctx.save();
    const logoGrad = ctx.createLinearGradient(80, 20, 140, 80);
    logoGrad.addColorStop(0, '#6366f1');
    logoGrad.addColorStop(0.5, '#38bdf8');
    logoGrad.addColorStop(1, '#10b981');
    ctx.fillStyle = logoGrad;
    ctx.beginPath();
    ctx.roundRect(80, 20, 60, 60, 16);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 34px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('A', 110, 51);
    ctx.restore();

    // Brand Name
    ctx.font = '700 36px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Aether', 158, 57);
    ctx.font = '500 20px "JetBrains Mono", monospace';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('CLOUD OS', 285, 57);

    // Nav Links
    const links = ['Platform', 'Solutions', 'Infrastructure', 'Developers', 'Pricing', 'Docs'];
    ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    let lx = 660;
    links.forEach(link => {
      ctx.fillText(link, lx, 57);
      lx += ctx.measureText(link).width + 65;
    });

    // Right Nav Buttons
    ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('Sign In', 2040, 57);

    // Launch Console CTA
    const btnGrad = ctx.createLinearGradient(2160, 20, 2400, 80);
    btnGrad.addColorStop(0, '#6366f1');
    btnGrad.addColorStop(1, '#38bdf8');
    ctx.fillStyle = btnGrad;
    ctx.beginPath();
    ctx.roundRect(2160, 20, 240, 60, 30);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('Get Started Free', 2280, 57);

    // HERO SECTION
    // Eyebrow Pill Badge
    ctx.textAlign = 'center';
    const pillX = w / 2 - 240, pillY = 160, pillW = 480, pillH = 46;
    ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, 23);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(pillX + 32, pillY + 23, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '600 17px "JetBrains Mono", monospace';
    ctx.fillStyle = '#c7d2fe';
    ctx.fillText('AUTONOMOUS CLOUD INFRASTRUCTURE 2026', pillX + 250, pillY + 29);

    // Main Hero Headline
    ctx.font = '800 70px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Deploy Intelligence at the Global Edge', w / 2, 275);

    // Subtitle Line
    ctx.font = '400 27px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Scale distributed microservices with automated failover and sub-millisecond edge latency.', w / 2, 340);

    // Hero Action Buttons
    const heroBtn1X = w / 2 - 250, heroBtnY = 395;
    ctx.fillStyle = btnGrad;
    ctx.beginPath();
    ctx.roundRect(heroBtn1X, heroBtnY, 230, 58, 29);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 21px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Start Free Trial', heroBtn1X + 115, heroBtnY + 36);

    const heroBtn2X = w / 2 + 20;
    ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(heroBtn2X, heroBtnY, 230, 58, 29);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('View Architecture', heroBtn2X + 115, heroBtnY + 36);

    // 3 KEY METRIC CARDS
    const cardY = 500, cardH = 190, cardW = 750;
    const cards = [
      { num: '99.999%', label: 'SLA Availability', desc: 'Zero-downtime rolling deployments across 320 regions worldwide.', color: '#10b981' },
      { num: '8.4 ms', label: 'Global Edge Latency', desc: 'Sub-10ms response to 98.4% of connected worldwide population.', color: '#38bdf8' },
      { num: '4.8M / s', label: 'Real-Time Workloads', desc: 'High-throughput event streaming with automated concurrency.', color: '#a855f7' }
    ];

    cards.forEach((c, idx) => {
      const cx = 80 + idx * 820;
      ctx.fillStyle = 'rgba(17, 24, 39, 0.8)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.09)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cx, cardY, cardW, cardH, 20);
      ctx.fill();
      ctx.stroke();

      // Indicator dot
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.arc(cx + 40, cardY + 40, 8, 0, Math.PI * 2);
      ctx.fill();

      // Metric Number
      ctx.textAlign = 'left';
      ctx.font = '800 46px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(c.num, cx + 65, cardY + 54);

      // Label
      ctx.font = '600 23px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(c.label, cx + 40, cardY + 105);

      // Description
      ctx.font = '400 19px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(c.desc, cx + 40, cardY + 145);
    });

    // LARGE REAL-TIME TELEMETRY & CLUSTERS MONITOR
    const monY = 730, monH = 650, monW = 2400, monX = 80;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.09)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(monX, monY, monW, monH, 24);
    ctx.fill();
    ctx.stroke();

    // Monitor Header
    ctx.textAlign = 'left';
    ctx.font = '700 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Live Infrastructure Telemetry Stream', monX + 45, monY + 60);

    ctx.font = '500 20px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748b';
    ctx.fillText('CLUSTER NODES: 148,920 ACTIVE  //  LATENCY TOLERANCE: < 10MS', monX + 45, monY + 98);

    // Right live indicator
    ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(monX + monW - 240, monY + 38, 195, 42, 21);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(monX + monW - 215, monY + 59, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '600 16px "JetBrains Mono", monospace';
    ctx.fillStyle = '#6ee7b7';
    ctx.fillText('SYSTEM HEALTHY', monX + monW - 195, monY + 65);

    // Left Chart Area
    const chartX = monX + 45, chartY = monY + 140, chartW = 1550, chartH = 460;
    ctx.fillStyle = 'rgba(10, 14, 26, 0.6)';
    ctx.beginPath();
    ctx.roundRect(chartX, chartY, chartW, chartH, 16);
    ctx.fill();

    // Chart grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let gy = 0; gy <= 4; gy++) {
      const yPos = chartY + 45 + gy * 85;
      ctx.beginPath();
      ctx.moveTo(chartX + 60, yPos);
      ctx.lineTo(chartX + chartW - 40, yPos);
      ctx.stroke();

      ctx.font = '500 16px "JetBrains Mono", monospace';
      ctx.fillStyle = '#64748b';
      ctx.fillText(`${(4 - gy) * 25} GB/s`, chartX + 15, yPos + 5);
    }

    // Smooth Bezier Curve Area
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(chartX + 60, chartY + 320);
    const points = [
      { x: chartX + 60, y: chartY + 320 },
      { x: chartX + 280, y: chartY + 240 },
      { x: chartX + 540, y: chartY + 140 },
      { x: chartX + 800, y: chartY + 200 },
      { x: chartX + 1070, y: chartY + 110 },
      { x: chartX + 1300, y: chartY + 160 },
      { x: chartX + chartW - 40, y: chartY + 80 }
    ];

    for (let i = 0; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.lineTo(chartX + chartW - 40, chartY + chartH - 40);
    ctx.lineTo(chartX + 60, chartY + chartH - 40);
    ctx.closePath();

    const chartFill = ctx.createLinearGradient(0, chartY, 0, chartY + chartH);
    chartFill.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
    chartFill.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.fillStyle = chartFill;
    ctx.fill();

    // Chart stroke line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Data points glow
    points.forEach(pt => {
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    // Right Column: Active Regions List
    const regX = chartX + chartW + 35, regY = chartY, regW = monW - chartW - 125;
    ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Global Region Topologies', regX, regY + 30);

    const regions = [
      { name: 'US-East (N. Virginia)', latency: '4.2 ms', load: '68% Load' },
      { name: 'EU-Central (Frankfurt)', latency: '7.8 ms', load: '74% Load' },
      { name: 'AP-Northeast (Tokyo)', latency: '11.4 ms', load: '62% Load' },
      { name: 'SA-East (São Paulo)', latency: '16.1 ms', load: '55% Load' }
    ];

    regions.forEach((r, idx) => {
      const ry = regY + 70 + idx * 90;
      ctx.fillStyle = 'rgba(10, 14, 26, 0.6)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(regX, ry, regW, 76, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(regX + 25, ry + 38, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '600 21px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(r.name, regX + 45, ry + 34);

      ctx.font = '400 16px "JetBrains Mono", monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(r.load, regX + 45, ry + 60);

      ctx.font = '700 21px "JetBrains Mono", monospace';
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'right';
      ctx.fillText(r.latency, regX + regW - 25, ry + 44);
      ctx.textAlign = 'left';
    });

    return canvas.toDataURL('image/png');
  }

  // ----------------------------------------------------
  // MOBILE PORTRAIT (Authentic 19.5:9 Smartphone Ratio: 780 x 1650)
  // ----------------------------------------------------
  static createMobilePortraitPNG() {
    const w = 780, h = 1650; // Exact 19.5:9 ratio
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    // Background
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#0a0e17');
    bg.addColorStop(1, '#05070c');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Subtle Ambient Glows
    const mGlow = ctx.createRadialGradient(w / 2, 350, 10, w / 2, 350, 450);
    mGlow.addColorStop(0, 'rgba(99, 102, 241, 0.22)');
    mGlow.addColorStop(1, 'rgba(99, 102, 241, 0)');
    ctx.fillStyle = mGlow;
    ctx.fillRect(0, 0, w, h);

    // Mobile Top Status Bar (iOS style) - Left: Time, Right: 5G/Battery (Center has physical notch on phone chassis)
    ctx.font = '600 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('9:41', 50, 52);

    // Battery & 5G
    ctx.textAlign = 'right';
    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('5G  100%', w - 50, 52);
    ctx.textAlign = 'left';

    // Mobile Web Header
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(0, 85, w, 95);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 180);
    ctx.lineTo(w, 180);
    ctx.stroke();

    // Mobile Logo
    const mLogoGrad = ctx.createLinearGradient(45, 102, 95, 152);
    mLogoGrad.addColorStop(0, '#6366f1');
    mLogoGrad.addColorStop(1, '#38bdf8');
    ctx.fillStyle = mLogoGrad;
    ctx.beginPath();
    ctx.roundRect(45, 102, 52, 52, 14);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('A', 71, 138);

    ctx.font = '700 32px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Aether', 115, 139);

    // Hamburger lines
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(w - 90, 114, 42, 4);
    ctx.fillRect(w - 90, 126, 42, 4);
    ctx.fillRect(w - 90, 138, 42, 4);

    // Mobile Hero Section
    ctx.textAlign = 'center';
    // Pill tag
    ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
    ctx.beginPath();
    ctx.roundRect(w / 2 - 160, 220, 320, 40, 20);
    ctx.fill();
    ctx.stroke();

    ctx.font = '600 16px "JetBrains Mono", monospace';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('AUTONOMOUS CLOUD 2026', w / 2, 246);

    // Mobile Headline
    ctx.font = '800 50px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Deploy Intelligence', w / 2, 320);
    ctx.fillText('at Global Edge', w / 2, 380);

    ctx.font = '400 23px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Scale microservices with zero-latency streaming.', w / 2, 440);

    // Primary CTA Button
    const btnGrad = ctx.createLinearGradient(50, 490, w - 50, 565);
    btnGrad.addColorStop(0, '#6366f1');
    btnGrad.addColorStop(1, '#38bdf8');
    ctx.fillStyle = btnGrad;
    ctx.beginPath();
    ctx.roundRect(50, 490, w - 100, 76, 38);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Start Free 14-Day Trial', w / 2, 538);

    // 3 Stacked Mobile Metric Cards
    const mCards = [
      { num: '99.999%', label: 'SLA Availability', sub: '320 Global Regions Worldwide', color: '#10b981' },
      { num: '8.4 ms', label: 'Average Edge Latency', sub: 'Sub-10ms global response time', color: '#38bdf8' },
      { num: '4.8M / s', label: 'Real-Time Requests', sub: 'Automated cluster concurrency', color: '#a855f7' }
    ];

    mCards.forEach((c, i) => {
      const cy = 600 + i * 160;
      ctx.fillStyle = 'rgba(17, 24, 39, 0.85)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(50, cy, w - 100, 140, 20);
      ctx.fill();
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.arc(88, cy + 42, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '800 40px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(c.num, 110, cy + 54);

      ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(c.label, 88, cy + 96);

      ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.fillText(c.sub, 88, cy + 125);
    });

    // Mobile Live Stream Card
    const streamY = 1120;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(50, streamY, w - 100, 370, 22);
    ctx.fill();
    ctx.stroke();

    ctx.font = '700 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Live Workload Telemetry', 85, streamY + 48);

    ctx.font = '500 18px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748b';
    ctx.fillText('THROUGHPUT: 42.8 GB/S // REALTIME', 85, streamY + 84);

    // Mini chart bars
    for (let b = 0; b < 19; b++) {
      const bh = 40 + Math.sin(b * 0.42) * 85 + (b % 3) * 25;
      const bx = 85 + b * 32;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.roundRect(bx, streamY + 320 - bh, 20, bh, 6);
      ctx.fill();
    }

    // Bottom Mobile App Dock
    ctx.fillStyle = 'rgba(10, 14, 26, 0.96)';
    ctx.fillRect(0, h - 105, w, 105);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.moveTo(0, h - 105);
    ctx.lineTo(w, h - 105);
    ctx.stroke();

    const tabs = ['Home', 'Metrics', 'Clusters', 'Profile'];
    ctx.textAlign = 'center';
    ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
    tabs.forEach((tab, i) => {
      const tx = 95 + i * 195;
      ctx.fillStyle = i === 0 ? '#38bdf8' : '#64748b';
      ctx.fillText(tab, tx, h - 50);
    });

    // iOS Gesture Home Bar at Bottom Center
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.roundRect(w / 2 - 90, h - 16, 180, 5, 2.5);
    ctx.fill();

    return canvas.toDataURL('image/png');
  }

  // ----------------------------------------------------
  // MOBILE LANDSCAPE (Authentic 19.5:9 Smartphone Ratio: 1650 x 780)
  // ----------------------------------------------------
  static createMobileLandscapePNG() {
    const w = 1650, h = 780; // Exact 19.5:9 ratio
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    // Background
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#0a0e17');
    bg.addColorStop(1, '#05070c');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Ambient glow
    const mGlow = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, 600);
    mGlow.addColorStop(0, 'rgba(14, 165, 233, 0.2)');
    mGlow.addColorStop(1, 'rgba(14, 165, 233, 0)');
    ctx.fillStyle = mGlow;
    ctx.fillRect(0, 0, w, h);

    // Top Status Bar (Horizontal layout)
    ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('9:41 AM', 60, 36);

    ctx.textAlign = 'right';
    ctx.fillText('5G ULTRA  100%', w - 60, 36);
    ctx.textAlign = 'left';

    // Horizontal Nav Header
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.fillRect(0, 52, w, 76);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.moveTo(0, 128);
    ctx.lineTo(w, 128);
    ctx.stroke();

    // Logo
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.roundRect(60, 64, 50, 50, 14);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('A', 85, 100);

    ctx.font = '700 30px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Aether Cloud // Mobile Landscape', 130, 99);

    // 2-Column Responsive Landscape Grid
    // Left Column
    const col1X = 60, col1W = 680;
    ctx.fillStyle = 'rgba(17, 24, 39, 0.85)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(col1X, 150, col1W, 260, 20);
    ctx.fill();
    ctx.stroke();

    ctx.font = '700 34px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Deploy at Global Edge', col1X + 35, 205);

    ctx.font = '400 21px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Active Clusters: 148,920 worldwide', col1X + 35, 248);
    ctx.fillText('Global Latency: 8.4 ms (99.999% SLA)', col1X + 35, 284);

    const btnGrad = ctx.createLinearGradient(col1X + 35, 320, col1X + 380, 380);
    btnGrad.addColorStop(0, '#6366f1');
    btnGrad.addColorStop(1, '#38bdf8');
    ctx.fillStyle = btnGrad;
    ctx.beginPath();
    ctx.roundRect(col1X + 35, 320, 310, 60, 30);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Manage Clusters', col1X + 190, 358);
    ctx.textAlign = 'left';

    // Left Column Bottom Region Card
    ctx.fillStyle = 'rgba(17, 24, 39, 0.85)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(col1X, 435, col1W, 280, 20);
    ctx.fill();
    ctx.stroke();

    ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Live Region Telemetry', col1X + 35, 480);

    const rItems = [
      { r: 'US-East (Virginia)', ms: '4.2 ms' },
      { r: 'EU-West (Frankfurt)', ms: '7.8 ms' },
      { r: 'AP-East (Tokyo)', ms: '11.4 ms' }
    ];
    rItems.forEach((it, idx) => {
      const iy = 525 + idx * 52;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(col1X + 45, iy, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(it.r, col1X + 65, iy + 6);

      ctx.font = '700 20px "JetBrains Mono", monospace';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(it.ms, col1X + col1W - 130, iy + 6);
    });

    // Right Column: Telemetry Waveform
    const col2X = col1X + col1W + 40, col2W = w - col2X - 60;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(col2X, 150, col2W, 565, 20);
    ctx.fill();
    ctx.stroke();

    ctx.font = '700 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Real-Time Data Streaming Waveform', col2X + 35, 205);

    ctx.font = '500 18px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748b';
    ctx.fillText('THROUGHPUT: 42.8 GB/S // REALTIME LIVE STREAM', col2X + 35, 245);

    // Smooth Bezier Curve inside Right Column
    ctx.save();
    const pts = [
      { x: col2X + 40, y: 560 },
      { x: col2X + 200, y: 470 },
      { x: col2X + 380, y: 350 },
      { x: col2X + 540, y: 430 },
      { x: col2X + 680, y: 300 },
      { x: col2X + col2W - 40, y: 380 }
    ];

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 0; i < pts.length - 1; i++) {
      const xc = (pts[i].x + pts[i + 1].x) / 2;
      const yc = (pts[i].y + pts[i + 1].y) / 2;
      ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
    }
    ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
    ctx.lineTo(col2X + col2W - 40, 660);
    ctx.lineTo(col2X + 40, 660);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, 300, 0, 660);
    grad.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
    grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 0; i < pts.length - 1; i++) {
      const xc = (pts[i].x + pts[i + 1].x) / 2;
      const yc = (pts[i].y + pts[i + 1].y) / 2;
      ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
    }
    ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3.5;
    ctx.stroke();

    pts.forEach(p => {
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    // iOS Gesture Home Bar at Bottom Center (Landscape)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.roundRect(w / 2 - 90, h - 14, 180, 5, 2.5);
    ctx.fill();

    return canvas.toDataURL('image/png');
  }
}
