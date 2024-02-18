export interface VirtualFile {
  hidden?: boolean;
  filename: string;
  code: string;
}

export type FileLanguageType = 'css' | 'json' | 'typescript' | 'javascript';

export type FileExtensionType = 'css' | 'json' | 'ts' | 'tsx' | 'js' | 'jsx';
