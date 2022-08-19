import { getGroups } from './getGroups';
import { getUsers } from './getUsers';

export function getUsersOrGroups(members_ids: number | number[]) {
  if (Array.isArray(members_ids)) {
    if (members_ids.every(m => m > 0)) {
      return getUsers(members_ids);
    }
    if (members_ids.every(m => m < 0)) {
      return getGroups(-members_ids);
    }
    throw new Error('Every member id must be either less or greater than zero');
  }
  return members_ids > 0 ? getUsers(members_ids) : getGroups(-members_ids);
}
