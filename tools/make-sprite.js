// 기본 테마 시트(themes/emoji.png, themes/letters.png)와 themes/config.js 를 만드는 스크립트.
// 사용: node tools/make-sprite.js   (playwright 필요)  — 직접 그린 PNG를 쓸 거라면 실행할 필요 없음.
const fs = require('fs'), path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const OUT = path.join(__dirname, '../themes');

const CELL = 192, COLS = 8, ROWS = 7;
const FACES = [
  ['apple','🍎'],['orange','🍊'],['lemon','🍋'],['watermelon','🍉'],['grapes','🍇'],['strawberry','🍓'],['cherry','🍒'],['peach','🍑'],
  ['kiwi','🥝'],['pineapple','🍍'],['coconut','🥥'],['carrot','🥕'],['corn','🌽'],['mushroom','🍄'],['burger','🍔'],['pizza','🍕'],
  ['donut','🍩'],['cookie','🍪'],['cake','🎂'],['lollipop','🍭'],['dog','🐶'],['cat','🐱'],['mouse','🐭'],['hamster','🐹'],
  ['rabbit','🐰'],['fox','🦊'],['bear','🐻'],['panda','🐼'],['koala','🐨'],['tiger','🐯'],['lion','🦁'],['cow','🐮'],
  ['pig','🐷'],['frog','🐸'],['monkey','🐵'],['chicken','🐔'],['penguin','🐧'],['bird','🐦'],['duck','🦆'],['owl','🦉'],
  ['soccer','⚽'],['basketball','🏀'],['dice','🎲'],['dart','🎯'],['guitar','🎸'],['car','🚗'],['rocket','🚀'],['star','⭐']
];
const BACK = FACES.length, STONE = FACES.length + 1;
const CHARS = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890♠♥♦♣★♪☀☂☾✿✈☎'];

const css = `html,body{margin:0;background:transparent}
 #s{display:grid;grid-template-columns:repeat(${COLS},${CELL}px);grid-auto-rows:${CELL}px;width:${CELL*COLS}px}
 #s>span{display:flex;align-items:center;justify-content:center;width:${CELL}px;height:${CELL}px}
 .e{font-size:${Math.round(CELL*.78)}px;line-height:1;font-family:"Noto Color Emoji","Apple Color Emoji","Segoe UI Emoji",sans-serif}
 .q{font:800 ${Math.round(CELL*.7)}px/1 system-ui,sans-serif;color:rgba(255,255,255,.4)}
 .c{width:${Math.round(CELL*.84)}px;height:${Math.round(CELL*.84)}px;border-radius:50%;display:flex;align-items:center;justify-content:center;
    color:#fff;font:800 ${Math.round(CELL*.5)}px/1 system-ui,"Noto Sans Symbols","Noto Sans Symbols 2","DejaVu Sans",sans-serif;box-shadow:inset 0 -6px 0 rgba(0,0,0,.18)}`;

const sheets = {
  emoji: FACES.map(([, e]) => `<span class="e">${e}</span>`),
  letters: CHARS.map((ch, i) => `<span><i class="c" style="background:hsl(${Math.round(i*360/48*7)%360},68%,52%)">${ch}</i></span>`)
};
for (const k of Object.keys(sheets)) { sheets[k][BACK] = '<span class="q">?</span>'; sheets[k][STONE] = '<span class="e">🪨</span>'; }

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch();
  for (const [name, cells] of Object.entries(sheets)) {
    const p = await b.newPage({ viewport: { width: CELL * COLS, height: CELL * ROWS }, deviceScaleFactor: 1 });
    await p.setContent(`<!doctype html><style>${css}</style><div id="s">${cells.join('')}</div>`);
    await p.screenshot({ path: path.join(OUT, name + '.png'), omitBackground: true, clip: { x: 0, y: 0, width: CELL * COLS, height: CELL * ROWS } });
    await p.close();
  }
  await b.close();
  fs.writeFileSync(path.join(OUT, 'config.js'),
`// 카드 테마 공통 설정. 모든 테마 PNG는 같은 배치(칸 크기·번호)를 따릅니다.
// 시트: 가로 cols칸 × 세로 rows칸, 한 칸은 cell×cell px, 칸 번호 i는 왼쪽 위부터 가로 방향(0,1,2…)
window.CARD_SPRITE = {
  dir: 'themes/', ext: '.png',   // 테마 파일 위치: themes/<테마 이름>.png
  default: 'emoji',              // 처음 쓸 테마 이름
  cell: ${CELL}, cols: ${COLS}, rows: ${ROWS},
  back: ${BACK},    // 카드 뒷면 문양 칸 번호
  stone: ${STONE},   // 누름돌 칸 번호
  // 앞면 목록: i는 시트 칸 번호, emoji는 시트를 못 불러올 때 쓰는 대체 글자. 최소 48종 필요.
  faces: [
${FACES.map(([id, e], i) => `    { id: '${id}', i: ${i}, emoji: '${e}' }`).join(',\n')}
  ]
};
`);
  console.log('sheets:', Object.keys(sheets).join(', '));
})();
