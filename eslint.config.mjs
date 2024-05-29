import eslint from '@eslint/js';
import reactRec from 'eslint-plugin-react/configs/recommended.js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['node_modules', 'vendor', 'public', 'app/assets'] },
  eslint.configs.recommended,
  reactRec,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ['**/*.{mjs,js}', '**/*.ts', '**/*.tsx'],
    settings: {
      react: { //
        version: 'detect',
      },
    },
    rules: {
      'indent': [
        'warn',
        2,
        {},
      ],
      'react/jsx-indent': [
        'warn',
        2,
      ],
      'object-curly-spacing': [
        'warn',
        'always',
        { 'objectsInObjects': false },
      ],
      'object-curly-newline': [
        'warn',
        {
          'ObjectExpression': { 'multiline': true },
          'ObjectPattern': { 'multiline': true },
          'ImportDeclaration': { 'minProperties': 2 },
        },
      ],
      'object-property-newline': [
        'warn',
        { 'allowAllPropertiesOnSameLine': true },
      ],
      'comma-dangle': [
        'warn',
        {
          'arrays': 'always-multiline',
          'objects': 'always-multiline',
          'imports': 'always-multiline',
          'exports': 'always-multiline',
        },
      ],
      'quotes': [
        'warn',
        'single',
        {
          'allowTemplateLiterals': true,
          'avoidEscape': true,
        },
      ],
      'prefer-template': [
        'warn',
      ],
      'computed-property-spacing': [
        'warn',
      ],
      'array-element-newline': [
        'warn',
        'consistent',
      ],
      'react/jsx-indent-props': [
        'warn',
        2,
      ],
      'react/jsx-max-props-per-line': [
        'warn',
        { 'when': 'multiline' },
      ],
      'react/jsx-sort-props': [
        'warn',
        {
          'callbacksLast': true,
          'noSortAlphabetically': true,
          'shorthandFirst': true,
        },
      ],
      'react/jsx-wrap-multilines': [
        'warn',
      ],
      'react/jsx-tag-spacing': [
        'warn',
      ],
      'react/jsx-closing-tag-location': [
        'warn',
      ],
      'react/self-closing-comp': [
        'warn',
      ],
      'react/jsx-newline': [
        'warn',
        {
          'prevent': true,
          'allowMultilines': true,
        },
      ],
      'react/jsx-first-prop-new-line': [
        'warn',
        'multiline-multiprop',
      ],
      'semi': [
        'error',
      ],
    },
  }
);
