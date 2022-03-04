import { getConversationMembers } from '../../vk/api.js';

export default function pidor(value, data, callback) {
  return getConversationMembers(
    { peer_id: data.object.message.peer_id },
    ({ response }) => {
      const randomIndex = Math.floor(Math.random() * response.profiles.length);
      const randomPerson = response.profiles[randomIndex];
      const text = `Пидор в беседе - [id${randomPerson.id}|${randomPerson.first_name} ${randomPerson.last_name}]`;
      callback({ text });
    }
  );
}
