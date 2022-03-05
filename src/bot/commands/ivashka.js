export default function ivashka(value, data, callback) {
  const random = Math.round(Math.random() * 100);
  const response = `Ты Ивашка с вероятностью ${random}%`;
  return callback({
    text: response,
  });
}
