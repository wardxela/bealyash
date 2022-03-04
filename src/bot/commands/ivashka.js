export default function ivashka(value, callback) {
  const random = Math.ceil(Math.random() * 100);
  const response = `Ты Ивашка с вероятностью ${random}%`;
  return callback(response);
}
