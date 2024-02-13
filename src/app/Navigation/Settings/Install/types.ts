interface NpmUser {
  username: string;
  email: string;
}

export interface NpmPackage {
  name: string;
  version: string;
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
  publisher: NpmUser;
  maintainers?: NpmUser[];
}

export interface NpmObjects {
  package: NpmPackage;
}

export interface NpmSearchPackageResponse {
  objects?: NpmObjects[];
}
