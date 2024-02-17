import { create } from 'zustand';
import type { Package } from '~/stores/package';

interface PackageStore {
  packages: Package[];
}

export const usePackageStore = create<PackageStore>(() => ({ packages: [] }));

export const setPackages = (packages: Package[]) => usePackageStore.setState({ packages });
