export default function bot(data, end) {
  if (data.error) {
    return end(data.error);
  }

  return end('ok');
}
