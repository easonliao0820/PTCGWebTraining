import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';

export default [
  js.configs.recommended,
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      // 這是 ESLint 的 import/no-unresolved 規則
      'import/no-unresolved': 'off',
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@', './src'],
            ['@public', './public'],
            ['@img', './src/assets/images']
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
];
