import { create } from 'zustand';
import type { NpmPackage } from './types';

interface PackageStore {
  packages: NpmPackage[];
}

export const usePackageStore = create<PackageStore>(() => ({ packages: [] }));

export const setPackages = (packages: NpmPackage[]) => usePackageStore.setState({ packages });
