module.exports =  {
  parser:  '@typescript-eslint/parser',
  extends:  [
    'plugin:react/recommended', 
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parserOptions:  {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react'],
  rules:  {
    "arrow-body-style": ["error", "as-needed"],
    "react/self-closing-comp": ["error", { "component": true, "html": true }]
  },
  settings:  {
    react:  {
      version:  'detect',
    },
  },
};