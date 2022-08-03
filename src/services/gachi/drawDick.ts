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

const PATTERN = `....▐░░░░░░░░░░░▌`;

const REDUCING_VALUE = 10;
const TAIL = 60;

function drawBodyPart(pattern: string, reducedLength: number) {
  let result = '';
  for (let i = 0; i <= reducedLength; i += REDUCING_VALUE) {
    result = `${result}${pattern} - ${TAIL + i} см\n`;
  }
  return result;
}

export function drawDick(length: number) {
  const COMMENT = `Все верно, длина твоего аппарата ${length} см.\n\n`;
  const normalizedLength = length - TAIL;
  if (normalizedLength < 0) {
    return `Мальчик, ты еще не дорос, чтобы показывать свое достояние в чате`;
  }
  const BODY = drawBodyPart(PATTERN, normalizedLength);

  return `${COMMENT}${HEAD}${BODY}${BALLS}`;
}
