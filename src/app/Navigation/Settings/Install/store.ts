import { create } from 'zustand';
import type { NpmPackage } from '~/stores/package';

interface PackageStore {
  packages: NpmPackage[];
}

export const usePackageStore = create<PackageStore>(() => ({ packages: [] }));

export const setPackages = (packages: NpmPackage[]) => usePackageStore.setState({ packages });
