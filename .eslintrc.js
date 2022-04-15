const extensions = ['.ts', '.d.ts', '.js', '.mjs', '.vue'];

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'import',
    'typescript',
    'nuxt',
    'vue',
  ],
  rules: {
    'no-shadow': 0,
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/no-shadow': 'error',
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'no-undef': 0,
        'max-len': 0,
        'vue/multi-word-component-names': 0,
        'vue/script-setup-no-uses-vars': 0,
        'vue/max-len': ['error', {
          code: 80,
          template: 500,
        }],
      }
    }
  ],
  settings: {
    'import/resolver': {
      typescript: {
        extensions,
        project: './tsconfig.json',
      },
    }
  },
};
