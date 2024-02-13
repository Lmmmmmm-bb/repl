import { addExtraLib, useExtraLibStore } from '~/stores/extra-lib';

export const registerExtraLib = async () => {
  const { extraLibs } = useExtraLibStore.getState();
  extraLibs.forEach(addExtraLib);
};
