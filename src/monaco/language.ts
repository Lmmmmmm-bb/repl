import * as monaco from 'monaco-editor';

export const initLanguages = () => {
  monaco.languages.register({ id: 'css', extensions: ['.css'] });
  monaco.languages.register({ id: 'json', extensions: ['.json'] });
  monaco.languages.register({ id: 'javascript', extensions: ['.js', '.jsx'] });
  monaco.languages.register({ id: 'typescript', extensions: ['.ts', '.tsx'] });

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    noEmit: true,
    allowJs: true,
    esModuleInterop: true,
    resolveJsonModule: true,
    allowNonTsExtensions: true,
    jsx: monaco.languages.typescript.JsxEmit.Preserve,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    target: monaco.languages.typescript.ScriptTarget.Latest,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  });

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });
};
