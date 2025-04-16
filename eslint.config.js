import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        window: 'readonly',
        process: 'readonly',
      },
    },    
    plugins: {
      '@typescript-eslint': tseslint,
      react,      
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-undef': 'off', 
      '@typescript-eslint/no-explicit-any': 'warn',      
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ignores: ['.next', 'node_modules', 'dist', 'public'],
  },
];
