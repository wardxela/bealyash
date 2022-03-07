import { MAX_LENGTH } from '../../config.js';

export default function filterResponse(response) {
  response.text = filterText(response.text);

  return response;
}

function filterText(text) {
  if (text.length > MAX_LENGTH) {
    return text.slice(0, MAX_LENGTH);
  }
  return text;
}
