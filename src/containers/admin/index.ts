import { createContainer } from '../../core';
import { giveRole } from './commands';
import { onlyAdmin } from './guards';

export const adminContainer = createContainer();

adminContainer.protect(/.*/, onlyAdmin);
adminContainer.set(/беляш дай роль ([а-яА-Я]+)/i, giveRole);
