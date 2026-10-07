// 카드 테마 공통 설정. 모든 테마 PNG는 같은 배치(칸 크기·번호)를 따릅니다.
// 시트: 가로 cols칸 × 세로 rows칸, 한 칸은 cell×cell px, 칸 번호 i는 왼쪽 위부터 가로 방향(0,1,2…)
window.CARD_SPRITE = {
  dir: 'themes/', ext: '.png',   // 테마 파일 위치: themes/<테마 이름>.png
  default: 'emoji',              // 처음 쓸 테마 이름
  cell: 192, cols: 8, rows: 7,
  back: 48,    // 카드 뒷면 문양 칸 번호
  stone: 49,   // 누름돌 칸 번호
  // 앞면 목록: i는 시트 칸 번호, emoji는 시트를 못 불러올 때 쓰는 대체 글자. 최소 48종 필요.
  faces: [
    { id: 'apple', i: 0, emoji: '🍎' },
    { id: 'orange', i: 1, emoji: '🍊' },
    { id: 'lemon', i: 2, emoji: '🍋' },
    { id: 'watermelon', i: 3, emoji: '🍉' },
    { id: 'grapes', i: 4, emoji: '🍇' },
    { id: 'strawberry', i: 5, emoji: '🍓' },
    { id: 'cherry', i: 6, emoji: '🍒' },
    { id: 'peach', i: 7, emoji: '🍑' },
    { id: 'kiwi', i: 8, emoji: '🥝' },
    { id: 'pineapple', i: 9, emoji: '🍍' },
    { id: 'coconut', i: 10, emoji: '🥥' },
    { id: 'carrot', i: 11, emoji: '🥕' },
    { id: 'corn', i: 12, emoji: '🌽' },
    { id: 'mushroom', i: 13, emoji: '🍄' },
    { id: 'burger', i: 14, emoji: '🍔' },
    { id: 'pizza', i: 15, emoji: '🍕' },
    { id: 'donut', i: 16, emoji: '🍩' },
    { id: 'cookie', i: 17, emoji: '🍪' },
    { id: 'cake', i: 18, emoji: '🎂' },
    { id: 'lollipop', i: 19, emoji: '🍭' },
    { id: 'dog', i: 20, emoji: '🐶' },
    { id: 'cat', i: 21, emoji: '🐱' },
    { id: 'mouse', i: 22, emoji: '🐭' },
    { id: 'hamster', i: 23, emoji: '🐹' },
    { id: 'rabbit', i: 24, emoji: '🐰' },
    { id: 'fox', i: 25, emoji: '🦊' },
    { id: 'bear', i: 26, emoji: '🐻' },
    { id: 'panda', i: 27, emoji: '🐼' },
    { id: 'koala', i: 28, emoji: '🐨' },
    { id: 'tiger', i: 29, emoji: '🐯' },
    { id: 'lion', i: 30, emoji: '🦁' },
    { id: 'cow', i: 31, emoji: '🐮' },
    { id: 'pig', i: 32, emoji: '🐷' },
    { id: 'frog', i: 33, emoji: '🐸' },
    { id: 'monkey', i: 34, emoji: '🐵' },
    { id: 'chicken', i: 35, emoji: '🐔' },
    { id: 'penguin', i: 36, emoji: '🐧' },
    { id: 'bird', i: 37, emoji: '🐦' },
    { id: 'duck', i: 38, emoji: '🦆' },
    { id: 'owl', i: 39, emoji: '🦉' },
    { id: 'soccer', i: 40, emoji: '⚽' },
    { id: 'basketball', i: 41, emoji: '🏀' },
    { id: 'dice', i: 42, emoji: '🎲' },
    { id: 'dart', i: 43, emoji: '🎯' },
    { id: 'guitar', i: 44, emoji: '🎸' },
    { id: 'car', i: 45, emoji: '🚗' },
    { id: 'rocket', i: 46, emoji: '🚀' },
    { id: 'star', i: 47, emoji: '⭐' }
  ]
};
