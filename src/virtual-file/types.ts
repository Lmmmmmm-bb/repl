export interface VirtualFile {
  hidden?: boolean;
  filename: string;
  code: string;
}

export type FileLanguageType = 'html' | 'css' | 'json' | 'typescript' | 'javascript';

export type FileExtensionType = 'html' | 'css' | 'json' | 'ts' | 'tsx' | 'js' | 'jsx';
