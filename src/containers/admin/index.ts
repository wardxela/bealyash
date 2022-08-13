import { createContainer } from '../../core';
import { onlyAdmin } from './guards';

export const adminContainer = createContainer();

adminContainer.protect(/.*/, onlyAdmin);
