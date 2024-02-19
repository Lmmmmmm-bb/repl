import { ENTRY_FILE, ENTRY_STYLE, MAIN_FILE, WELCOME_FILE, WELCOME_STYLE } from './config';
import type { VirtualFile } from '~/virtual-file';

import MainRaw from '~/templates/Main?raw';
import AppRaw from '~/templates/App?raw';
import AppCSSRaw from '~/templates/App.css?raw';
import WelcomeRaw from '~/templates/Welcome?raw';
import WelcomeCSSRaw from '~/templates/Welcome.css?raw';

export const initialFiles: Record<string, VirtualFile> = {
  [MAIN_FILE]: {
    hidden: true,
    filename: MAIN_FILE,
    code: MainRaw,
  },
  [ENTRY_FILE]: {
    filename: ENTRY_FILE,
    code: AppRaw,
  },
  [ENTRY_STYLE]: {
    filename: ENTRY_STYLE,
    code: AppCSSRaw,
  },
  [WELCOME_FILE]: {
    filename: WELCOME_FILE,
    code: WelcomeRaw,
  },
  [WELCOME_STYLE]: {
    filename: WELCOME_STYLE,
    code: WelcomeCSSRaw,
  },
};
