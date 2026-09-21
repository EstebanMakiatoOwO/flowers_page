const root = document.documentElement;

/* ---------- sparks & falling petals ---------- */
const sparksContainer = document.getElementById('sparks');
const petalsContainer = document.getElementById('petals');

function createSpark() {
  const spark = document.createElement('div');
  spark.className = 'spark';
  spark.style.left = Math.random() * 100 + 'vw';
  spark.style.animationDuration = 6 + Math.random() * 5 + 's';
  spark.style.animationDelay = Math.random() * 4 + 's';
  sparksContainer.appendChild(spark);
}

function createPetal() {
  const petal = document.createElement('div');
  petal.className = 'petal-fall';
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.animationDuration = 6 + Math.random() * 6 + 's';
  petal.style.animationDelay = Math.random() * 5 + 's';
  const scale = 0.6 + Math.random() * 0.8;
  petal.style.transform = `scale(${scale})`;
  petalsContainer.appendChild(petal);
}

for (let i = 0; i < 18; i++) createSpark();
for (let i = 0; i < 14; i++) createPetal();

/* ---------- stars ---------- */
const starsContainer = document.getElementById('stars');

function createStar() {
  const star = document.createElement('div');
  star.className = 'star';
  const size = 1 + Math.random() * 2.2;
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  star.style.top = Math.random() * 100 + '%';
  star.style.left = Math.random() * 100 + '%';
  star.style.animationDuration = 2 + Math.random() * 4 + 's';
  star.style.animationDelay = Math.random() * 5 + 's';
  starsContainer.appendChild(star);
}

for (let i = 0; i < 110; i++) createStar();

function createFlareStar() {
  const star = div('star flare');
  const size = 4 + Math.random() * 3;
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  star.style.top = 6 + Math.random() * 70 + '%';
  star.style.left = Math.random() * 96 + '%';
  star.style.animationDuration = 3 + Math.random() * 3 + 's';
  star.style.animationDelay = Math.random() * 4 + 's';
  starsContainer.appendChild(star);
}

for (let i = 0; i < 6; i++) createFlareStar();

function spawnShootingStar() {
  const shootingStar = document.createElement('div');
  shootingStar.className = 'shooting-star';
  shootingStar.style.top = Math.random() * 40 + '%';
  shootingStar.style.left = 40 + Math.random() * 50 + '%';
  starsContainer.appendChild(shootingStar);
  shootingStar.addEventListener('animationend', () => shootingStar.remove());
}

setInterval(spawnShootingStar, 5000 + Math.random() * 4000);
setTimeout(spawnShootingStar, 2000);

/* ---------- mouse parallax + cursor glow ---------- */
const cursorGlow = document.getElementById('cursorGlow');
let mouseTicking = false;
let lastX = window.innerWidth / 2;
let lastY = window.innerHeight / 2;

function updateMouse() {
  const nx = (lastX / window.innerWidth) * 2 - 1;
  const ny = (lastY / window.innerHeight) * 2 - 1;
  root.style.setProperty('--mx', nx.toFixed(3));
  root.style.setProperty('--my', ny.toFixed(3));
  cursorGlow.style.setProperty('--cx', lastX + 'px');
  cursorGlow.style.setProperty('--cy', lastY + 'px');
  mouseTicking = false;
}

window.addEventListener('mousemove', (e) => {
  lastX = e.clientX;
  lastY = e.clientY;
  if (!mouseTicking) {
    requestAnimationFrame(updateMouse);
    mouseTicking = true;
  }
}, { passive: true });

/* ---------- scroll reveal ---------- */
const revealEls = document.querySelectorAll('[data-reveal]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealEls.forEach((el) => observer.observe(el));

/* ================= ORBIT BOUQUETS ================= */
const cardsData = [
  { type: 'message', icon: '💐', text: 'Eres mi persona favorita en cualquier universo 🌌' },
  { type: 'message', icon: '🌻', text: 'Cada vez que sonríes se me olvida hasta mi nombre 😳💛' },
  { type: 'photo', icon: '💐', file: 'img/foto1.jpg', caption: 'Me gusta ser un escarabajito contigo uwu 💛' },
  { type: 'message', icon: '🌼', text: 'Contigo hasta los lunes se sienten bonitos' },
  { type: 'photo', icon: '🌻', file: 'img/foto2.jpg', caption: 'Y este recuerdo lo guardo con mucho cariño 🌙' },
  { type: 'message', icon: '💐', text: 'Girasol o no, mi corazón siempre te mira a ti 🌻' },
  { type: 'message', icon: '🌼', text: 'Aunque estemos lejos, siempre te encuentro en el cielo 🌙' },
  { type: 'message', icon: '🌼', text: 'Te quiero muchísimo, mi Lunita 💛' },
];

const moonStage = document.getElementById('moonStage');
const orbitRing = document.getElementById('orbitRing');
const orbitItems = [];

function div(className) {
  const element = document.createElement('div');
  element.className = className;
  return element;
}

function buildPetalLayer(layerClass, petalCount) {
  const layer = div('petal-layer ' + layerClass);
  for (let p = 0; p < petalCount; p++) layer.appendChild(div('m-petal'));
  return layer;
}

/* each builder fills a .mini-flower shell with one species */
const flowerBuilders = {
  sunflower(flower) {
    flower.appendChild(buildPetalLayer('back', 8));
    flower.appendChild(buildPetalLayer('front', 8));
    flower.appendChild(div('m-center'));
  },
  daisy(flower) {
    flower.appendChild(buildPetalLayer('back d12', 12));
    flower.appendChild(buildPetalLayer('front d12', 12));
    flower.appendChild(div('m-center small'));
  },
  rose(flower) {
    const outer = div('rose-outer');
    for (let p = 0; p < 5; p++) outer.appendChild(div('rose-o-petal'));
    flower.appendChild(outer);
    ['r1', 'r2', 'r3', 'r4'].forEach((r) => flower.appendChild(div('rose-ring ' + r)));
  },
  tulip(flower) {
    flower.appendChild(div('tulip-petal side left'));
    flower.appendChild(div('tulip-petal side right'));
    flower.appendChild(div('tulip-petal mid'));
  },
  gypso(flower) {
    const cluster = div('gypso');
    for (let d = 0; d < 7; d++) cluster.appendChild(div('gypso-dot'));
    flower.appendChild(cluster);
  },
};

function buildMiniFlower(positionClass, spec) {
  const flower = div('mini-flower ' + positionClass + ' ' + (spec.color || 'c-gold'));
  flowerBuilders[spec.type](flower);
  return flower;
}

/* seven distinct bouquet recipes: species per slot + wrap/ribbon palette */
const bouquetStyles = [
  {
    wrap: 'wrap-kraft', ribbon: 'ribbon-red',
    slots: [
      { type: 'sunflower' }, { type: 'sunflower' },
      { type: 'sunflower' }, { type: 'sunflower' }, { type: 'sunflower' },
    ],
  },
  {
    wrap: 'wrap-cream', ribbon: 'ribbon-gold',
    slots: [
      { type: 'gypso', color: 'c-white' }, { type: 'gypso', color: 'c-white' },
      { type: 'rose' }, { type: 'rose' }, { type: 'rose' },
    ],
  },
  {
    wrap: 'wrap-mint', ribbon: 'ribbon-white',
    slots: [
      { type: 'daisy', color: 'c-white' }, { type: 'daisy', color: 'c-white' },
      { type: 'daisy', color: 'c-white' }, { type: 'daisy', color: 'c-white' },
      { type: 'sunflower' },
    ],
  },
  {
    wrap: 'wrap-blush', ribbon: 'ribbon-lilac',
    slots: [
      { type: 'gypso', color: 'c-white' }, { type: 'gypso', color: 'c-white' },
      { type: 'tulip', color: 'c-blush' }, { type: 'tulip', color: 'c-blush' },
      { type: 'tulip' },
    ],
  },
  {
    wrap: 'wrap-kraft', ribbon: 'ribbon-white',
    slots: [
      { type: 'rose', color: 'c-peach' }, { type: 'rose', color: 'c-peach' },
      { type: 'sunflower' }, { type: 'daisy', color: 'c-white' },
      { type: 'sunflower' },
    ],
  },
  {
    wrap: 'wrap-lilac', ribbon: 'ribbon-lilac',
    slots: [
      { type: 'daisy', color: 'c-white' }, { type: 'gypso', color: 'c-white' },
      { type: 'rose', color: 'c-blush' }, { type: 'rose', color: 'c-blush' },
      { type: 'rose', color: 'c-crimson' },
    ],
  },
  {
    wrap: 'wrap-slate', ribbon: 'ribbon-gold',
    slots: [
      { type: 'gypso', color: 'c-white' }, { type: 'gypso', color: 'c-white' },
      { type: 'tulip' }, { type: 'sunflower' }, { type: 'rose' },
    ],
  },
];

const SLOT_CLASSES = ['f-back-left', 'f-back-right', 'f-left', 'f-right', 'f-center'];

function buildBouquetHead(style) {
  const inner = div('bouquet-inner');

  const flowers = div('bouquet-flowers');

  const greens = div('bouquet-greens');
  ['g1', 'g2', 'g3', 'g4'].forEach((g) => greens.appendChild(div('big-leaf ' + g)));
  flowers.appendChild(greens);

  SLOT_CLASSES.forEach((slotClass, s) => {
    flowers.appendChild(buildMiniFlower(slotClass, style.slots[s]));
  });

  ['s1', 's2', 's3'].forEach((s) => flowers.appendChild(div('bouquet-sparkle ' + s)));

  const wrapArea = div('bouquet-wrap-area');
  const cone = div('wrap-cone');
  cone.appendChild(div('wrap-fold f1'));
  cone.appendChild(div('wrap-fold f2'));
  cone.appendChild(div('wrap-shine'));

  const bow = div('ribbon-bow');
  bow.appendChild(div('ribbon-knot'));

  wrapArea.appendChild(cone);
  wrapArea.appendChild(div('ribbon-tail left'));
  wrapArea.appendChild(div('ribbon-tail right'));
  wrapArea.appendChild(div('ribbon-band'));
  wrapArea.appendChild(bow);

  inner.appendChild(flowers);
  inner.appendChild(wrapArea);
  return inner;
}

cardsData.forEach((_card, i) => {
  const angle = (360 / cardsData.length) * i;
  const style = bouquetStyles[i % bouquetStyles.length];

  const item = document.createElement('div');
  item.className = 'orbit-item';
  item.style.setProperty('--angle', angle + 'deg');
  item.dataset.angle = angle;

  const bouquet = document.createElement('button');
  bouquet.className = 'bouquet ' + style.wrap + ' ' + style.ribbon;
  bouquet.type = 'button';
  bouquet.setAttribute('aria-label', 'Descubrir mensaje');
  bouquet.dataset.index = i;

  const glow = document.createElement('div');
  glow.className = 'bouquet-glow';
  glow.style.animationDelay = (i * 0.3) + 's';

  const badge = document.createElement('div');
  badge.className = 'poke-badge';
  badge.textContent = '¡Pícame!';
  badge.style.animationDelay = (i * 0.2) + 's';

  const inner = buildBouquetHead(style);
  inner.appendChild(badge);

  bouquet.appendChild(glow);
  bouquet.appendChild(inner);

  const billboard = div('bouquet-billboard');
  billboard.appendChild(bouquet);
  item.appendChild(billboard);
  orbitRing.appendChild(item);
  orbitItems.push({ item, billboard, angle });
});

/* ---------- 3D free-angle drag-to-rotate carousel ---------- */
let ringAngle = 0;
let tiltAngle = 13;
let momentumY = 0;
let momentumX = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let dragStartAngle = 0;
let dragStartTilt = 0;
let dragDistance = 0;
let lastPointerX = 0;
let lastPointerY = 0;
let lastMoveTime = 0;
const IDLE_SPEED = 0.045;
const DRAG_SENSITIVITY = 0.4;
const FRICTION = 0.96;

function onPointerDown(e) {
  isDragging = true;
  dragDistance = 0;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  dragStartAngle = ringAngle;
  dragStartTilt = tiltAngle;
  lastPointerX = e.clientX;
  lastPointerY = e.clientY;
  lastMoveTime = performance.now();
  momentumY = 0;
  momentumX = 0;
  moonStage.classList.add('dragging');
}

function onPointerMove(e) {
  if (!isDragging) return;
  const now = performance.now();
  const dt = Math.max(now - lastMoveTime, 1);
  const dx = e.clientX - lastPointerX;
  const dy = e.clientY - lastPointerY;

  ringAngle = dragStartAngle + (e.clientX - dragStartX) * DRAG_SENSITIVITY;
  tiltAngle = dragStartTilt - (e.clientY - dragStartY) * DRAG_SENSITIVITY;

  momentumY = (dx * DRAG_SENSITIVITY) / dt * 16;
  momentumX = (-dy * DRAG_SENSITIVITY) / dt * 16;
  dragDistance += Math.abs(dx) + Math.abs(dy);

  lastPointerX = e.clientX;
  lastPointerY = e.clientY;
  lastMoveTime = now;
}

function onPointerUp() {
  if (!isDragging) return;
  isDragging = false;
  moonStage.classList.remove('dragging');
}

moonStage.addEventListener('pointerdown', onPointerDown);
window.addEventListener('pointermove', onPointerMove, { passive: true });
window.addEventListener('pointerup', onPointerUp);
window.addEventListener('pointercancel', onPointerUp);

function animateOrbit() {
  if (!isDragging) {
    if (Math.abs(momentumY) > 0.01 || Math.abs(momentumX) > 0.01) {
      ringAngle += momentumY;
      tiltAngle += momentumX;
      momentumY *= FRICTION;
      momentumX *= FRICTION;
    } else {
      ringAngle += IDLE_SPEED;
    }
  }

  orbitRing.style.transform = `rotateX(${tiltAngle}deg) rotateY(${ringAngle}deg)`;

  orbitItems.forEach(({ item, billboard, angle }) => {
    const spin = angle + ringAngle;
    billboard.style.transform = `rotateY(${-spin}deg) rotateX(${-tiltAngle}deg)`;
    const depth = (Math.cos((spin * Math.PI) / 180) + 1) / 2;
    item.style.opacity = (0.5 + depth * 0.5).toFixed(2);
  });

  requestAnimationFrame(animateOrbit);
}

requestAnimationFrame(animateOrbit);

/* ---------- modal ---------- */
const modalBackdrop = document.getElementById('modalBackdrop');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openModal(index) {
  const card = cardsData[index];
  modalBody.innerHTML = '';

  if (card.type === 'photo') {
    const slot = document.createElement('div');
    slot.className = 'photo-slot';

    const img = document.createElement('img');
    img.src = card.file;
    img.alt = card.caption || 'Foto';

    const placeholder = document.createElement('div');
    placeholder.className = 'photo-placeholder';
    placeholder.innerHTML = `<span>📸</span><p>Coloca aquí "${card.file.split('/').pop()}" dentro de la carpeta <strong>img/</strong> y esta foto aparecerá sola.</p>`;

    img.onerror = () => {
      img.remove();
      placeholder.style.display = 'flex';
    };

    slot.appendChild(img);
    slot.appendChild(placeholder);
    modalBody.appendChild(slot);

    if (card.caption) {
      const caption = document.createElement('p');
      caption.className = 'photo-caption';
      caption.textContent = card.caption;
      modalBody.appendChild(caption);
    }
  } else {
    const icon = document.createElement('div');
    icon.className = 'modal-icon';
    icon.textContent = card.icon;

    const text = document.createElement('p');
    text.className = 'modal-message';
    text.textContent = card.text;

    modalBody.appendChild(icon);
    modalBody.appendChild(text);
  }

  modalBackdrop.classList.add('show');
}

function closeModal() {
  modalBackdrop.classList.remove('show');
}

orbitRing.addEventListener('click', (e) => {
  if (dragDistance > 10) return;
  const bouquet = e.target.closest('.bouquet');
  if (bouquet) openModal(Number(bouquet.dataset.index));
});

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ---------- surprise button + confetti ---------- */
const surpriseBtn = document.getElementById('surpriseBtn');
const hiddenMessage = document.getElementById('hiddenMessage');
const CONFETTI_EMOJI = ['🌻', '🌙', '💛', '✨', '🌼'];

function burstConfetti(x, y) {
  const count = 44;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.textContent = CONFETTI_EMOJI[Math.floor(Math.random() * CONFETTI_EMOJI.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * 260;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance - 80;
    const rot = (Math.random() - 0.5) * 720;

    piece.style.setProperty('--sx', x + 'px');
    piece.style.setProperty('--sy', y + 'px');
    piece.style.setProperty('--tx', tx + 'px');
    piece.style.setProperty('--ty', ty + 'px');
    piece.style.setProperty('--rot', rot + 'deg');
    piece.style.fontSize = 14 + Math.random() * 16 + 'px';

    document.body.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}

surpriseBtn.addEventListener('click', () => {
  const willShow = !hiddenMessage.classList.contains('show');
  hiddenMessage.classList.toggle('show');
  if (willShow) {
    const rect = surpriseBtn.getBoundingClientRect();
    burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }
});
