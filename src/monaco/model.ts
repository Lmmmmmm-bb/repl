import { getOrCreateModel } from './utils';
import { initVirtualFileStore } from '~/stores/virtual-file';

export const initModel = () => {
  Object.values(initVirtualFileStore.files).forEach(item => getOrCreateModel(item));
};
