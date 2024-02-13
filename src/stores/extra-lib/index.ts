import { create } from 'zustand';
import type { ExtraLib } from './types';
import { monaco } from '~/monaco';

interface ExtraLibStore {
  extraLibs: ExtraLib[];
}

export const useExtraLibStore = create<ExtraLibStore>(() => ({
  extraLibs: [],
}));

const esmShBase = 'https://esm.sh';

export const addExtraLib = async (lib: ExtraLib) => {
  const raw = await fetch(`${esmShBase}/${lib.name}@${lib.version}`);
  const dts = await raw.text();

  const moduleName = lib.name.startsWith('@types/') ? lib.name.split('/')[1] : lib.name;
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `declare module '${moduleName}' {
      ${dts}
    }`,
    `file:///node_modules/${lib.name}`,
  );

  const { extraLibs } = useExtraLibStore.getState();
  useExtraLibStore.setState({
    extraLibs: [...extraLibs, lib],
  });
};

export { ExtraLib };
