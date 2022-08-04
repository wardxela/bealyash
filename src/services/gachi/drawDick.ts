const HEAD = `..............▄▄ ▄▄▄ - 0 см
........▄▌▒▒▀▒▒▐▄ - 10 см
..... ▐▒▒▒▒▒▒▒▒▒▌ - 20 см
... ▐▒▒▒▒▒▒▒▒▒▒▒▌ - 30 см
....▐▒▒▒▒▒▒▒▒▒▒▒▌ - 40 см
....▐▀▄▄▄▄▄▄▄▄▄▀▌ - 50 см
`;

const BALLS = `...▄█▓░░░░░░░░░▓█▄
..▄▀░░░░░░░░░░░░░ ▀▄
.▐░░░░░░░▀▄▒▄▀░░░░░░▌
▐░░░░░░░▒▒▐▒▒░░░░░░░▌
▐▒░░░░░▒▒▒▐▒▒▒░░░░░▒▌
.▀▄▒▒▒▒▒▄▀▒▀▄▒▒▒▒▒▄▀
`;

const BODY_PATTERN = `....▐░░░░░░░░░░░▌`;

const SPLIT_LENGTH = 10;
const TAIL = 60;

function drawBody(length: number) {
  let result = '';
  for (let i = TAIL; i <= length; i += SPLIT_LENGTH) {
    result = `${result}${BODY_PATTERN} - ${i} см\n`;
  }
  return result;
}

export function drawDick(length: number) {
  if (length - TAIL < 0) {
    return `Мальчик, ты еще не дорос, чтобы показывать свое достояние в чате`;
  }

  const COMMENT = `Все верно, длина твоего аппарата ${length} см.\n\n`;
  const BODY = drawBody(length);

  return `${COMMENT}${HEAD}${BODY}${BALLS}`;
}
