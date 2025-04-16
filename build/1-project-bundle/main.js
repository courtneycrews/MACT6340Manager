/*! For license information please see bundle.js.LICENSE.txt */
const geomanticFigures = {
    "Via": [1, 1, 1, 1],
    "Populus": [2, 2, 2, 2],
    "Fortuna Major": [2, 2, 1, 1],
    "Fortuna Minor": [1, 1, 2, 2],
    "Conjunctio": [2, 1, 1, 2],
    "Carcer": [1, 2, 2, 1],
    "Tristitia": [2, 2, 2, 1],
    "Laetitia": [1, 2, 2, 2],
    "Puer": [1, 1, 2, 1],
    "Puella": [1, 2, 1, 1],
    "Albus": [2, 2, 1, 2],
    "Rubeus": [2, 1, 2, 2],
    "Acquisitio": [2, 1, 2, 1],
    "Amissio": [1, 2, 1, 2],
    "Caput Draconis": [2, 1, 1, 1],
    "Cauda Draconis": [1, 1, 1, 2]
  };
  
  let edition = parseInt(window.location.hash.replace("#", "")) || 0;
  let currentSymbol = Object.keys(geomanticFigures)[edition % 16];
  let symbolPattern = geomanticFigures[currentSymbol];
  
  let h1, h, s1, s, b1, b, i, j, h2;
  let mv = 50;
  let colmv = 2;
  let alph = 6;
  let maxVary;
  
  function setup() {
    createCanvas(1080, 1080); 
    randomSeed(edition * 1000);
    noiseSeed(edition * 1000);
  
    colorMode(HSB, 360, 120, 100, 255);
    noStroke();
    maxVary = 20;
  
    getColor();            
    setGemColor();         
    background(h1, s1 - 10, b1 - 30);
  
    numb = (width * height) / 100;
    fillBackground();
  
    numb = (width * height) / 250;
    fillBackground();
  
    drawEmbossedBorder();
    paperTexture();
    filter(BLUR, 0.5);
  }
  
  let gemHue, gemSaturation, gemBrightness;
  
  function setGemColor() {
    let hueShift = random(-15, 15);
    let satShift = random(-15, 15);
    let brightShift = random(5, 10);
  
    gemHue = constrain(h1 + hueShift, 0, 360);
    gemSaturation = constrain(s1 + satShift, 0, 100);
    gemBrightness = constrain(b1 + brightShift, 0, 100);
  }
  
  function getColor() {
    h1 = h = random(360);
    hMax = h1 + maxVary;
    hMin = h1 - maxVary;
    s1 = s = 50;
    sMax = 50;
    sMin = 20;
    b1 = b = 80;
    bMax = 90;
    bMin = 60;
    i = random(width);
    j = random(height);
  }
  
  function fillBackground() {
    for (let q = 0; q < numb; q++) {
      i += random(-mv, mv);
      j += random(-mv, mv);
      h += random(-colmv, colmv);
      s += random(-colmv * 2, colmv * 2);
      b += random(-colmv * 2, colmv * 2);
  
      i = constrain(i, 0, width);
      j = constrain(j, 0, height);
      h = constrain(h, hMin, hMax);
      s = constrain(s, sMin, sMax);
      b = constrain(b, bMin, bMax);
  
      h2 = h;
      if (h2 > 360) h2 -= 360;
      else if (h2 < 0) h2 += 360;
  
      fill(h2, s, b, alph);
      push();
      translate(i, j);
      rotate(random(TWO_PI));
      beginShape();
      for (let m = 0; m < TWO_PI; m += 1) {
        let r = random(20, 50);
        vertex(cos(m) * r, sin(m) * r);
      }
      endShape(CLOSE);
      pop();
    }
  }
  
  function drawGeomanticSymbolPatternEmbossed(x, y, pattern) {
    let spacing = height * 0.216;
    let dotSize = width * 0.12;
    let offset = width * 0.14;
  
    for (let i = 0; i < pattern.length; i++) {
      let dots = pattern[i];
      let yPos = y + i * spacing;
  
      for (let j = 0; j < dots; j++) {
        let xOffset = (dots === 1) ? 0 : (j === 0 ? -offset : offset);
        let cx = x + xOffset;
        let cy = yPos;
  
        let ringSizes = [dotSize * 0.55, dotSize * 0.85, dotSize * 1.15, dotSize * 1.45];
  
        for (let r = 0; r < ringSizes.length; r++) {
          let ring = ringSizes[r];
  
          // Shadow
          push();
          translate(cx + 1, cy + 1);
          noFill();
          stroke(0, 0, 0, 25);
          strokeWeight(2.5);
          ellipse(0, 0, ring);
          pop();
  
          // Highlight
          push();
          translate(cx - 1, cy - 1);
          noFill();
          stroke(0, 0, 100, 30);
          strokeWeight(2.5);
          ellipse(0, 0, ring);
          pop();
        }
  
        let g = createGraphics(width, height);
        g.colorMode(HSB, 360, 120, 100, 255);
        g.noStroke();
  
        for (let r = dotSize * 0.5; r > 1; r -= 1.5) {
          let alpha = map(r, dotSize * 0.8, 1, 10, 0);
          g.fill(gemHue, gemSaturation, gemBrightness, alpha);
          g.ellipse(cx, cy, r);
        }
  
        g.fill(0, 0, 100, 18);
        g.ellipse(cx, cy, dotSize * 1.4);
  
        g.push();
        g.translate(cx, cy);
        g.rotate(PI / 4);
        g.rectMode(CENTER);
        g.fill(gemHue, gemSaturation, gemBrightness, 75);
        g.rect(0, 0, dotSize * 0.16, dotSize * 0.16, 1);
        g.fill(gemHue, gemSaturation * 0.5, gemBrightness + 20, 100);
        g.rect(0, 0, dotSize * 0.08, dotSize * 0.08, 1);
        g.fill(gemHue, gemSaturation * 0.3, gemBrightness + 20, 80);
        g.rect(0, 0, dotSize * 0.04, dotSize * 0.04, 1);
        g.pop();
  
        g.filter(BLUR, 1.5);
        image(g, 0, 0);
      }
    }
  }
  
  function drawEmbossedBorder() {
    let borderSize = width * 0.06;
    let w = width - borderSize;
    let h = height - borderSize;
  
    push();
    translate(1, 1);
    noFill();
    stroke(0, 0, 0, 20);
    strokeWeight(2.5);
    rect(borderSize / 2, borderSize / 2, w, h);
    pop();
  
    push();
    translate(-1, -1);
    noFill();
    stroke(0, 0, 100, 25);
    strokeWeight(2.5);
    rect(borderSize / 2, borderSize / 2, w, h);
    pop();
  }
  
  function paperTexture() {
    noFill();
    let textureNum = width * height / 80;
    for (let i = 0; i < textureNum; i++) {
      stroke(h1, s1 * 0.8, b1, 8);
      let x = random(-width * 0.2, width * 1.2);
      let y = random(-height * 0.2, height * 1.2);
      push();
      translate(x, y);
      strokeWeight(3);
      point(0, 0);
      strokeWeight(1);
      rotate(random(TWO_PI));
      curve(
        random(60, 220), 0,
        0, random(-50, 50),
        random(-50, 50), random(60, 120),
        random(60, 120), random(60, 220)
      );
      pop();
    }
  
    let patternOffset = (height * 0.216 * (symbolPattern.length - 1)) / 2;
    push();
    stroke(0, 0, 0, 6);
    strokeWeight(2);
    drawGeomanticSymbolPatternEmbossed(width / 2, height / 2 - patternOffset, symbolPattern);
    drawEmbossedBorder();
    pop();
  }