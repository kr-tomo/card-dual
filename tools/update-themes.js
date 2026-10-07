// themes 폴더의 PNG 파일을 훑어서 themes/themes.js (테마 목록)를 다시 만듭니다. 테마 이름 = 파일 이름(확장자 제외).
// 사용: node tools/update-themes.js   — 새 스프라이트 PNG를 themes 폴더에 넣은 뒤 한 번 실행하세요.
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '../themes');
const names = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.png')).map(f => f.slice(0, -4)).sort((a, b) => a.localeCompare(b));
fs.writeFileSync(path.join(dir, 'themes.js'),
`// 자동 생성: node tools/update-themes.js  (themes 폴더의 PNG 파일 이름 = 테마 이름)
window.CARD_THEMES = ${JSON.stringify(names)};
`);
console.log('themes:', names.join(', '));
