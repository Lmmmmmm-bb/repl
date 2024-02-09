import { useContext } from 'react';
import { virtualFileContext } from './context';

export const useVirtualFileContext = () => useContext(virtualFileContext);
