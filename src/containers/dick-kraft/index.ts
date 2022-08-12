import { createContainer } from '../../core';
import { changeSize, showSize } from './commands';
import { onlyDickKraft } from './guards';

export const dickKraftContainer = createContainer();

dickKraftContainer.protect(/.*/, onlyDickKraft);
dickKraftContainer.set(/твій пісюн (зменшився|виріс)/, changeSize);
dickKraftContainer.set(/довжина твого писюна \d+ см/, showSize);
