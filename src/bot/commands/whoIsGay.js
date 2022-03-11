import BotResponse from '../utilities/BotResponse.js';
import { getVkConversationMembers } from '../../vk/api.js';
import { anyElement } from '../utilities/random.js';

const INTRODUCTION_TEMPLATES = [
  'Что-то мне подсказывает, что пидор -',
  'Говорят, главный фанат ЛГБТ движения -',
  'Улицы говорят, что пидор -',
  'Белоснежка нашептала мне, что пидор -',
  'Хоть ты лопни, хоть ты тресни, пидор -',
  'Томас Шелби просил передать, что гей -',
  'Ни на что не намекаю, но у вас в беседе завелся пидор -',
  'Любитель сильных мужиков в масле -',
];

export default async function whoIsGay(requestMessage, vkRequest) {
  const json = await getVkConversationMembers({
    peer_id: vkRequest.object.message.peer_id,
  });

  const randomUser = anyElement(json.response.profiles);
  const introduction = anyElement(INTRODUCTION_TEMPLATES);

  return new BotResponse({
    message: `${introduction} [id${randomUser.id}|${randomUser.first_name} ${randomUser.last_name}]`,
  });
}
