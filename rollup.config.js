import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import cleanup from 'rollup-plugin-cleanup';

const moduleName = 'p5ex';
const umdName = 'p5ex';
const version = '0.1.1';
const year = '2018';
const description =
`* An extension of p5.js.`;
const includingModules =
`* Including module: no-more-for-loops (Copyright 2018 FAL, licensed under MIT).`;

const myBanner = `/**
${description}
${includingModules}
* GitHub repository: {@link https://github.com/fal-works/${moduleName}}
* @module ${moduleName}
* @copyright ${year} FAL
* @author FAL <falworks.contact@gmail.com>
* @license MIT
* @version ${version}
*/
`;

export default {
  input: `src/${moduleName}.ts`,
  output: [
    {
      file: `lib/${moduleName}.js`,
      format: 'umd',
      name: umdName,
      sourcemap: false,
      banner: myBanner
    },
    {
      file: `lib/${moduleName}.mjs`,
      format: 'es',
      sourcemap: false,
      banner: myBanner
    }
  ],
  plugins: [
    resolve({
      extensions: [ '.mjs' ],
      modulesOnly: true
    }),
    typescript({
      useTsconfigDeclarationDir: true
    }),
    cleanup({
      comments: [
        /^\*\*(?![\s\S]*@module\b)/,
        /^\*[^*](?!\s*tslint\s*:\s*(enable|disable))/,
        /^\/(?!\s*tslint\s*:\s*(enable|disable))/
      ],
      maxEmptyLines: 1,
      extensions: ['.ts', '.mjs']
    })
  ]
}
