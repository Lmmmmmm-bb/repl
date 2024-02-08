import * as monaco from 'monaco-editor';

export const registerExtraLib = async () => {
  const content = await fetch('https://cdn.jsdelivr.net/npm/@types/react@18.2.0/index.d.ts');
  const dts = await content.text();
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    dts,
    `file:///node_modules/@types/react/index.d.ts`,
  );

  // monaco.languages.typescript.javascriptDefaults.addExtraLib(`
  //   declare module '${pack.name}' {
  //     let x: any;
  //     export = x;
  //   }
  // `, pack.name)
};
