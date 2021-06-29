module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': ['error', {allow: ['warn', 'error']}],
    'spaced-comment': ['error', 'always'],
    'no-shadow': 'off',
  },
};
