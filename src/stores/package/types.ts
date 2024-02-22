export interface CorePackage {
  name: string;
  version: string;
  optional?: boolean;
}

interface PackageUser {
  username: string;
  email: string;
}

export interface Package extends CorePackage {
  description?: string;
  keywords?: string[];
  date?: string;
  links: {
    npm: string;
    homepage?: string;
    repository?: string;
    bugs?: string;
  };
  author?: {
    name: string;
    email?: string;
  };
  publisher: PackageUser;
  maintainers?: PackageUser[];
}

export interface PackageStore {
  corePackages: CorePackage[];
  extraPackages: Package[];
  extraPackageDisposal: Map<string, () => void>;
}
